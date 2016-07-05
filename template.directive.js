/**
 * @module directive/%{name}
 */
define('directives/%{name}/%{name}.directive', function () {
  'use strict';

  /**
   * Decription of the %{name} directive here
   * @param
   * @constructor
   * @alias module:directive/%{name}
   */
  var %{nameCap}Directive = function () {
    return {
      // 'E' - only matches element name
      restrict: 'E',
      // To access the scope outside
      transclude: true,
      scope: {
        attribute: '@',
      },
      templateUrl: '%{name}.directive.html',
    };
  };

  return %{nameCap}Directive;
});
