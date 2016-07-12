require([], function () {
  'use strict';

  describe('%{nameCap}Directive', function () {
    var $compile;
    var $rootScope;
    var $httpBackend;
    // Mocks
    // TODO: Define your mocks here
    var someModuleMock = {

    };
    // Initialize the app
    beforeEach(module('%{application}'));
    // Configure the providers
    beforeEach(module('%{application}', function ($provide) {
      // TODO: Configure angular providers if needed
      // TODO: Remove this line if no dependency
      $provide.value('someModule', someModuleMock);
    }));
    // load the templates
    // TODO: Configure templaes if needed
    // TODO: Remove this line if no template needed
    beforeEach(module('templates/someTemplate.html'));
    // Retrieve necessary object
    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
    }));
    it('shall do something', function () {
      // Compile a piece of HTML containing the directive
      var template = '<%{name}></%{name}>';
      var element = $compile(template)($rootScope);
      // Evaluate the angular expression in the view
      $rootScope.$digest();
      // Check that the compiled element contains the templated content
      // TODO: describe here appropriate expectations
      var div = element.find('div');
      expect(div.length).toBeGreaterThan(1);
    });
  });
});
