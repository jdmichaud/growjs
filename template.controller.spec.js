define(function () {
  'use strict';

  describe('%{nameCap}Controller', function () {
    var $controller;
    var $rootScope;
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

    // Retrieve the controller factory in a global variable then used to
    // instantiate controller in the it tests
    beforeEach(inject(function (_$controller_, _$rootScope_, $translate) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));

    it('shall do something', function () {
      var $scope = $rootScope.$new();
      var controller = $controller('${nameCap}Controller', { $scope: $scope });
      // TODO: describe here appropriate expectations
    });
  });
});
