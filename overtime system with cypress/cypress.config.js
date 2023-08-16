const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Config Auto Run When You Save Code
    watchForFileChanges: false, 
    // Config Timeout All Project
    defaultCommandTimeout: 10000,
    baseUrl: 'your-base-url',
    setupNodeEvents(on, config) {
    },
  },
});
