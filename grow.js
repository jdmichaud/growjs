/* eslint no-loop-func: 0 */
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
        filename: 'test/unit/directives/%{name}/%{name}.directive.spec.js',
        content: 'template.directive.spec.js',
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
  for (let folder of pathArray.slice(0, -1)) {
    growingPath += '/' + folder;
    if (!fs.existsSync(growingPath)){
      console.log('create folder', growingPath);
      fs.mkdirSync(growingPath);
    }
  }
}

function camelcize(id) {
  let elements = id.split('-');
  return elements[0] + (elements.slice(1).map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  })).join('');
}

function createContent(template, type, name, frontendPath) {
  for (const file of template[type].files) {
    const filepath = frontendPath + '/' + file.filename.replace(/%{name}/g, name);
    makePath(filepath);
    if (file.hasOwnProperty('content')) {
      const content = fs.readFileSync(file.content, { encoding: 'utf-8' })
        .replace(/%{name}/g, name)
        .replace(/%{nameCap}/g, camelcize(name));
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
