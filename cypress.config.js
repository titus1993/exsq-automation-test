const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    burn: 0,
  },
  reporter: 'cypress-mochawesome-reporter', 
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'EXSQ Automation Test Report',
    overwrite: true,
    saveJson: true,
    autoOpen: true,
    charts: true,    
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  e2e: {
    baseUrl: 'https://demoqa.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      require('cypress-mochawesome-reporter/plugin')(on);
      cypressGrepPlugin(config)
      return config
    },
  },
});
