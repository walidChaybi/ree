const path = require("path");
const { Publisher } = require("@pact-foundation/pact");

const version = "0.7.0";

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pact/publish/pacts")],
  pactBroker: "http://pact-broker.rece.devng.diplomatie.gouv.fr/",
  pactBrokerUsername: "pact_broker",
  pactBrokerPassword: "pact_broker",
  consumerVersion: version
};

new Publisher(opts).publishPacts().then(() => {
  // nothing
});
