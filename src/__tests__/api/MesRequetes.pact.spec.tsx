import path from "path";
import { Pact, InteractionObject, Interaction } from "@pact-foundation/pact";
import { ApiEndpoints } from "../../views/router/UrlManager";
import { StatutRequete } from "../../model/requete/StatutRequete";
import { ApiPact } from "./ApiPact";
import { requetesPact } from "./requetes.pact";

const provider = new Pact({
  consumer: "ReceUiMesRequetes",
  provider: "ReceRequeteApi",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
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

  describe("getting all requests of an oec", () => {
    const uri = "/rece-requete-api/v1" + ApiEndpoints.RequetesUrl;

    const queryParameters = {
      statut: StatutRequete.ASigner,
      tri: "dateStatus",
      sens: "ASC",
      nomOec: "SLAOUI",
      prenomOec: "Nabil",
      idArobas: "03901913"
    };

    const expectedResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: "/rece-requete-api/v1/requetes",
      data: requetesPact,
      errors: []
    };

    test("requests exist", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state: "requests exist",
        uponReceiving: "get all requests of an oec",
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
        .then((res) => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].idRequete).toBe(
        expectedResult.data.contents.idRequete
      );
    });
  });
});
