/* istanbul ignore file */

import { Interaction, InteractionObject, Pact } from "@pact-foundation/pact";
import { like } from "@pact-foundation/pact/dsl/matchers";
import path from "path";
import {
  URL_REQUETES,
  URL_REQUETES_COUNT,
  URL_REQUETES_SERVICE
} from "../../api/appels/requeteApi";
import { StatutRequete } from "../../model/requete/StatutRequete";
import { ApiPact } from "./ApiPact";
import { requetesPact } from "./requetes.pact";

const provider = new Pact({
  consumer: "ReceUiMesRequetes",
  provider: "ReceRequeteApi",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pact/publish/pacts"),
  spec: 2
});

describe("Requete API Pact test", () => {
  beforeAll(() => {
    return provider.setup();
  });

  afterEach(async () => {
    await provider.verify();
  });

  afterAll(async () => {
    return provider.finalize();
  });

  const queryParameters = {
    statuts: [StatutRequete.ASigner],
    tri: "dateStatut",
    sens: "ASC",
    range: "0-1"
  };

  describe("Comptage des requêtes pour un oec connecté", () => {
    const uri = "/rece-requete-api/v1" + URL_REQUETES_COUNT;

    const expectedCount = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: uri,
      data: like(0),
      errors: []
    };

    const queryCountParameters = {
      statuts: [StatutRequete.ASigner]
    };
    test("Comptage des requêtes pour un OEC", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state: "Comptage des requêtes pour un OEC",
        uponReceiving: "Comptage des requêtes pour un oec connecté",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryCountParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedCount
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryCountParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
    });
  });

  describe("Récupération des requêtes pour un oec connecté", () => {
    const uri = "/rece-requete-api/v1" + URL_REQUETES;
    const expectedPartialResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 206,
      url: uri,
      data: requetesPact,
      errors: []
    };

    const expectedFullResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: uri,
      data: requetesPact,
      errors: []
    };

    const expectedResultVide = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: uri,
      data: [],
      errors: []
    };

    test("L'OEC dispose de requêtes au statut à signer sur plusieurs pages", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state:
          "L'OEC dispose de requêtes au statut à signer sur plusieurs pages",
        uponReceiving: "Récupération des requêtes pour un oec connecté",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedPartialResult
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].idRequete).toBe(
        expectedPartialResult.data.contents.idRequete
      );
    });

    test("L'OEC dispose de requêtes au statut à signer sur une seule page", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state:
          "L'OEC dispose de requêtes au statut à signer sur une seule page",
        uponReceiving: "Récupération des requêtes pour un oec connecté",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedFullResult
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].idRequete).toBe(
        expectedFullResult.data.contents.idRequete
      );
    });

    test("L'OEC ne dispose pas de requêtes au statut à signer", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state: "L'OEC ne dispose pas de requêtes au statut à signer",
        uponReceiving: "Récupération des requêtes pour un oec connecté",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedResultVide
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(0);
    });

    test("Les headers nécessaires de l'OEC connecté ne sont pas envoyés", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state: "Les headers nécessaires de l'OEC connecté ne sont pas envoyés",
        uponReceiving: "Récupération des requêtes pour un oec connecté",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedResultVide
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(0);
    });
  });

  describe("Récupération des requêtes affectées au service", () => {
    const uri = "/rece-requete-api/v1" + URL_REQUETES_SERVICE;
    const expectedPartialResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 206,
      url: uri,
      data: requetesPact,
      errors: []
    };

    const expectedFullResult = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: uri,
      data: requetesPact,
      errors: []
    };

    const expectedResultVide = {
      hasTechnicalError: false,
      hasBusinessError: false,
      status: 200,
      url: uri,
      data: [],
      errors: []
    };

    test("Le service dispose de requêtes au statut à signer sur plusieurs pages", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state:
          "Le service dispose de requêtes au statut à signer sur plusieurs pages",
        uponReceiving: "Récupération des requêtes affectées au service",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedPartialResult
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].idRequete).toBe(
        expectedPartialResult.data.contents.idRequete
      );
    });

    test("Le service dispose de requêtes au statut à signer sur une seule page", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state:
          "Le service dispose de requêtes au statut à signer sur une seule page",
        uponReceiving: "Récupération des requêtes affectées au service",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedFullResult
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0].idRequete).toBe(
        expectedFullResult.data.contents.idRequete
      );
    });

    test("Le service ne dispose pas de requêtes au statut à signer", async () => {
      // set up Pact interactions

      const interaction: InteractionObject | Interaction = {
        state: "Le service ne dispose pas de requêtes au statut à signer",
        uponReceiving: "Récupération des requêtes affectées au service",
        withRequest: {
          method: "GET",
          path: uri,
          query: queryParameters,
          headers: {
            id_sso: "03901913"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: expectedResultVide
        }
      };

      await provider.addInteraction(interaction);

      const result = await new ApiPact(provider)
        .get(uri)
        .setHeaderIdSso("03901913")
        .queryParameters(queryParameters)
        .execute()
        .then(res => {
          return res;
        });

      expect(result.body).not.toBeNull();
      expect(result.body.data).not.toBeNull();
      expect(result.body.data.length).toBe(0);
    });
  });
});
