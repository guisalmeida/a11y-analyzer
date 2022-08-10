const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    "hideElements": true
  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    screenshotOnRunFailure: false,
    video: false,
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on);
    },
  },
});
