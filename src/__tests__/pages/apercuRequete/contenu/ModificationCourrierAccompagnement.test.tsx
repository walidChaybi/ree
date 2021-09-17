import request from "superagent";
import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../mock/data/requeteDelivrance";
import { configMultiAPi } from "../../../../mock/superagent-config/superagent-mock-multi-apis";
import { ChoixDelivrance } from "../../../../model/requete/v2/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import {
  getDefaultValuesAccompagnement,
  getOptionsCourrier
} from "../../../../views/pages/apercuRequete/apercuCourrierAccompagnement/ModificationCourrierAccompagnement";

const superagentMock = require("superagent-mock")(request, configMultiAPi);

beforeAll(() => {
  DocumentDelivrance.init();
});

test("getDefaultValuesAccompagnement", () => {
  expect(
    getDefaultValuesAccompagnement(requeteDelivrance, {
      value: "test",
      str: "test"
    })
  ).toStrictEqual({
    enTete: {
      courrier: "test",
      delivrance: "Réponse sans délivrance E/C - Requête incomplète"
    },
    requerant: {
      requerantLigne1: "DUBOIS Léonard",
      requerantLigne2: ""
    },
    adresse: {
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      complementDestinataire: "Appartement 258",
      complementPointGeo: "Batiment Z",
      lieuDit: "lieu dit la martinière",
      pays: "France",
      voie: "61 avenue Foch"
    },
    requete: { motif: "MARIAGE_PACS", complementMotif: "", nbExemplaire: 2 }
  });

  expect(
    getDefaultValuesAccompagnement(requeteDelivranceInstitutionnel, {
      value: "test",
      str: "test"
    })
  ).toStrictEqual({
    enTete: {
      delivrance: undefined,
      courrier: "test"
    },
    requerant: {
      requerantLigne1: "Ambassade du Rwanda",
      requerantLigne2: "DUBOIS Léonard"
    },
    adresse: {
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      complementDestinataire: "Appartement 258",
      complementPointGeo: "Batiment Z",
      lieuDit: "lieu dit la martinière",
      pays: "Rwanda",
      voie: "61 avenue Foch"
    },
    requete: { motif: "MARIAGE_PACS", complementMotif: "", nbExemplaire: 2 }
  });
});

test("getOptionscourrier", () => {
  expect(getOptionsCourrier(requeteDelivrance, undefined)).toStrictEqual([
    {
      value: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2",
      str: "Informations diverses manquantes (117)"
    },
    {
      value: "0296fc7a-fb81-4eb7-a72f-94286b8d8301",
      str: "Mandat généalogiste manquant (18)"
    },
    {
      value: "fd2c6d07-367f-4770-994c-397c0bc63fba",
      str: "Justificatif représentant légal manquant (19)"
    }
  ]);
  let requete2 = requeteDelivrance;
  requete2.choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
  expect(getOptionsCourrier(requete2, undefined)).toStrictEqual([
    {
      value: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      str: "Délivrance d'acte (116)"
    },
    {
      value: "4b60aab4-2e9f-479c-bec6-f38edbd6e647",
      str: "Délivrance d'acte incomplet (50)"
    }
  ]);
  let requete3 = requeteDelivrance;
  requete3.choixDelivrance = ChoixDelivrance.REP_SANS_DEL_EC_DIVERS;
  expect(getOptionsCourrier(requete3, undefined)).toStrictEqual([
    { value: "fce55a9f-4f4b-4996-a60b-59332bc10565", str: "Divers (17)" }
  ]);
  let requete4 = requeteDelivrance;
  requete4.choixDelivrance =
    ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC;
  expect(getOptionsCourrier(requete4, undefined)).toStrictEqual([
    {
      value: "c1c17758-98ce-444e-82eb-a4f885fddc2c",
      str: "Acte non trouvé (115)"
    },
    {
      value: "c40bccfd-8e65-47fc-a3eb-1d25d7779a29",
      str: "Acte non trouvé Algérie (64)"
    },
    {
      value: "002f64ff-b3da-4ff1-8f81-704059134327",
      str: "Acte de naissance non trouvé pour mariage (24)"
    },
    {
      value: "db0a3d5a-34ca-47bf-bce5-33ec7ffb9148",
      str: "Attestation de pension de réversion"
    },
    {
      value: "062526c5-e5a7-48d1-bc22-11938347f0bc",
      str: "Proposition de transcription d'acte"
    }
  ]);
});

afterAll(() => {
  superagentMock.unset();
});
