const {
  createAzureFunction,
  createProbot,
} = require("@probot/adapter-azure-functions");
const app = require("../lib/index.js");

module.exports = createAzureFunction(app, {
  probot: createProbot(),
});
