import { StatutRequete } from "../../../../model/requete/StatutRequete";
import path from "path";
import { Pact, InteractionObject, Interaction } from "@pact-foundation/pact";
import { ApiEndpoints } from "../../../router/UrlManager";
import { requetePact } from "./data/requete.pact";
//import { ApiPact } from "../../../../api/__tests__/ApiPact";
import * as superagent from "superagent";

const provider = new Pact({
  consumer: "ReceUiMesRequetes",
  provider: "ReceRequeteApi",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: 2,
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
    let queryParameters = {
      statut: StatutRequete.ASigner,
      tri: "dateStatus",
      sens: "ASC",
      nomOec: "SLAOUI",
      prenomOec: "Nabil",
      idArobas: "03901913",
    };

    let expectedResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: "/rece-requete-api/v1/requetes",
      data: requetePact,
      errors: [],
    };

    test("requests exist", async () => {
      // set up Pact interactions

      let interaction: InteractionObject | Interaction = {
        state: "requests exist",
        uponReceiving: "get all requests of an oec",
        withRequest: {
          method: "GET",
          path: "/rece-requete-api/v1" + ApiEndpoints.RequetesUrl,
          query: queryParameters,
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: expectedResult,
        },
      };

      await provider.addInteraction(interaction);

      let result = (await superagent
        .get(provider.mockService.baseUrl + "/" + interaction.withRequest.path)
        .query(queryParameters)
        .then((res) => {
          return res;
        })) as superagent.Response;

      // let result = await new ApiPact(provider)
      //   .get(interaction.withRequest.path)
      //   .queryParameters(queryParameters)
      //   .then((res) => {
      //     return res;
      //   });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].idRequete).toBe(
        expectedResult.data.contents.idRequete
      );
    });
  });
});
