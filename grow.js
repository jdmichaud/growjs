/* eslint no-loop-func: 0 */
/* eslint global-require: 0 */
/* eslint import/no-unresolved: 0 */
'use strict';

var fs = require('fs');

var gTemplate = {
  directive: {
    files: [
      {
        filename: 'app/js/directives/%{name}/%{name}.directive.js',
        content: 'template.directive.js',
      },
      {
        filename: 'app/js/directives/%{name}/%{name}.directive.html',
      },
      {
        filename: 'app/js/directives/%{name}/%{name}.directive.less',
      },
      {
        filename: 'test/unit/directives/%{name}.directive.spec.js',
        content: 'template.directive.spec.js',
      },
    ],
  },
  service: {
    files: [
      {
        filename: 'app/js/services/%{name}.service.js',
        content: 'template.service.js',
      },
      {
        filename: 'test/unit/services/%{name}.service.spec.js',
        content: 'template.service.spec.js',
      },
    ],
  },
  controller: {
    files: [
      {
        filename: 'app/js/controllers/%{name}.controller.js',
        content: 'template.controller.js',
      },
      {
        filename: 'test/unit/controllers/%{name}.controller.js',
        content: 'template.controller.spec.js',
      },
    ],
  },
};

function usage() {
  console.log('node grow.js <directives|controller|service> <name> <frontend folder>');
  console.log('node grow.js directives button ./frontend/');
}

function makePath(path) {
  const pathArray = path.split('/');
  var growingPath = '';
  for (const folder of pathArray.slice(0, -1)) {
    growingPath = `${growingPath}/${folder}`;
    if (!fs.existsSync(growingPath)) {
      console.log('create folder', growingPath);
      fs.mkdirSync(growingPath);
    }
  }
}

function camelcize(id) {
  const elements = id.split('-');
  return elements[0] + (elements.slice(1).map((item) =>
    item.charAt(0).toUpperCase() + item.slice(1)
  )).join('');
}

function getPackageInfo(frontendPath) {
  let pjson;
  try {
    pjson = require(`${frontendPath}/package.json`);
  } catch (exception) {
    console.log(`warning: error loading ${frontendPath}/package.json:`, exception);
    console.log('warning: %{application} will be replaced by empty strings.');
    return { name: '' };
  }
  return pjson;
}

function createContent(template, type, name, frontendPath) {
  const application = getPackageInfo(frontendPath).name;
  for (const file of template[type].files) {
    const filepath = `${frontendPath}/${file.filename.replace(/%{name}/g, name)}`;
    makePath(filepath);
    if (file.hasOwnProperty('content')) {
      const content = fs.readFileSync(file.content, { encoding: 'utf-8' })
        .replace(/%{name}/g, name)
        .replace(/%{nameCap}/g, camelcize(name))
        .replace(/%{application}/g, application);
      var fd = fs.writeFile(filepath, content, (err) => {
        if (err) throw err;
        console.log(filepath, 'created');
      });
    } else {
      // Create an empty file
      fs.closeSync(fs.openSync(filepath, 'w'));
      console.log(filepath, 'created (empty)');
    }
  }
}

// Check the number of parameter
if (process.argv.length !== 5) {
  usage();
  console.log('error:', process.argv.length, ' provided');
  process.exit(1);
}

// Check the type is known
if (!gTemplate.hasOwnProperty(process.argv[2])) {
  console.log('error:', process.argv[2], ': Unknown type');
  process.exit(2);
}

// Check the frontend path exists
try {
  fs.statSync(process.argv[4]);
} catch (exception) {
  console.log('error: frontend path does not exists: ', process.argv[4]);
  process.exit(3);
}

createContent(gTemplate, process.argv[2], process.argv[3], process.argv[4]);
