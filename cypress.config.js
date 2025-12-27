const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://demoqa.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
