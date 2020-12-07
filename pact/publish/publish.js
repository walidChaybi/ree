const path = require("path");
const { Publisher } = require("@pact-foundation/pact");

const version = "0.1.3";

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pact/publish/pacts")],
  pactBroker: "http://10.110.192.130/pact-broker",
  pactBrokerUsername: "pact_broker",
  pactBrokerPassword: "pact_broker",
  consumerVersion: version
};

new Publisher(opts).publishPacts().then(() => {
  // nothing
});
