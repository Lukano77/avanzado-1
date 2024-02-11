const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //baseUrl : "https://pushing-it.vercel.app",
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 1000,
    watchForFileChanges: false,
    supportFile: false,
    fixturesFolder: 'cypress/e2e/',
    videpUploadOnPasses:false,
    videoCompression:false,
    experimentalStudio:true

  },
});
