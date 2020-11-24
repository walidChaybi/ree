import path from "path";
import { Pact, InteractionObject, Interaction } from "@pact-foundation/pact";
import { ApiEndpoints } from "../../views/router/UrlManager";
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
    const uri = "/rece-rcrca-api/v1" + ApiEndpoints.RequetesUrl;

    const queryParameters = {
      nomOec: "SLAOUI",
      prenomOec: "Nabil",
      idArobas: "03901913"
    };

    const expectedResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: "/rece-rcrca-api/v1/rc",
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
          path: uri,
          query: queryParameters
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
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
    });
  });
});
