require([], function () {
  'use strict';

  describe('%{nameCap}Service', function () {
    var %{nameCap}Service;
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
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$%{nameCap}_) {
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      %{nameCap}Service = _%{nameCap}Service_
    }));

    it('shall do something', function () {
      // TODO: describe here appropriate expectations
    });
  });
});
