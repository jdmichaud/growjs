/**
 * @module service/%{name}
 */
define('services/%{name}.service', function () {
  'use strict';

  /**
   * Decription of the %{name} service here
   * @constructor
   * @alias module:service/%{name}
   */
  var %{nameCap}ServiceFactory = function () {
    /** The model service object */
    var %{nameCap}Service = {};
    return %{nameCap}Service;
  };

  return %{nameCap}ServiceFactory;
});
