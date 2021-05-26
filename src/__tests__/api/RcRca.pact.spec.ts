/* istanbul ignore file */

import { Interaction, InteractionObject, Pact } from "@pact-foundation/pact";
import path from "path";
import { ApiPact } from "./ApiPact";
import { rcPact } from "./rc.pact";

const provider = new Pact({
  consumer: "rece-rc-ui",
  provider: "rece-rc-ui",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pact/publish/pacts"),
  spec: 2
});

describe("API Pact test", () => {
  beforeAll(() => {
    return provider.setup();
  });

  afterEach(async () => {
    await provider.verify();
  });

  afterAll(async () => {
    return provider.finalize();
  });

  describe("getting rc", () => {
    const uri =
      "/rece-etatcivil-api/v1/repertoirecivil/rc/7566e16c-2b0e-11eb-adc1-0242ac120002";

    const expectedResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: "/rece-rcrca-api/v1/fiche/rc/7566e16c-2b0e-11eb-adc1-0242ac120002",
      data: rcPact,
      errors: []
    };

    test("rc exist", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state: "rc exist",
        uponReceiving: "get an rc",
        withRequest: {
          method: "GET",
          path: uri
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: expectedResult
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
    });
  });
});
