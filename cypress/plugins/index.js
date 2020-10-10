/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // on('task', {
  //   failed: require('cypress-failed-log/src/failed')(),
  // })
  require('cypress-log-to-output').install(on)
  allureWriter(on, config);
  return config;
}
