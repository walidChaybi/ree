import request from "superagent";
import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../../mock/data/requeteDelivrance";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { ChoixDelivrance } from "../../../../../model/requete/v2/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import {
  controleFormulaire,
  getDefaultValuesCourrier,
  getStatutEnTraitement,
  getTypesCourrier
} from "../../../../../views/pages/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import {
  CHOIX_COURRIER,
  COURRIER,
  TEXTE,
  TEXTE_LIBRE
} from "../../../../../views/pages/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

beforeAll(() => {
  DocumentDelivrance.init();
});

test("getDefaultValues", () => {
  expect(getDefaultValuesCourrier(requeteDelivrance)).toStrictEqual({
    choixCourrier: {
      courrier: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2",
      delivrance: "Réponse sans délivrance E/C - Requête incomplète"
    },
    option: {
      contenu: "",
      libelleOption: ""
    },
    texteLibre: {
      texte: "Texte libre Courrier 117"
    },
    requerant: {
      requerantLigne1: "PAUL RUIZ",
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
    getDefaultValuesCourrier(requeteDelivranceInstitutionnel)
  ).toStrictEqual({
    choixCourrier: {
      courrier: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      delivrance: "Délivrer E/C - Extrait plurilingue"
    },
    option: {
      contenu: "",
      libelleOption: ""
    },
    texteLibre: {
      texte: ""
    },
    requerant: {
      requerantLigne1: "AMBASSADE DU RWANDA",
      requerantLigne2: "PAUL RUIZ"
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

test("getTypesCourrier", () => {
  expect(getTypesCourrier(requeteDelivrance)).toStrictEqual([
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
  expect(getTypesCourrier(requete2)).toStrictEqual([
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
  expect(getTypesCourrier(requete3)).toStrictEqual([
    { value: "fce55a9f-4f4b-4996-a60b-59332bc10565", str: "Divers (17)" },
    {
      value: "2776c0c7-2ad4-4949-9743-046c4c687eec",
      str: "Refus délivrance mariage"
    }
  ]);
  let requete4 = requeteDelivrance;
  requete4.choixDelivrance =
    ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC;
  expect(getTypesCourrier(requete4)).toStrictEqual([
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

test("controle formulaire", () => {
  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: { [COURRIER]: "062526c5-e5a7-48d1-bc22-11938347f0bc" }
      },
      [{ ordreEdition: 20 }],
      jest.fn()
    )
  ).toBeTruthy();

  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: { [COURRIER]: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2" }
      },
      [],
      jest.fn()
    )
  ).toBeFalsy();

  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: {
          [COURRIER]: "fce55a9f-4f4b-4996-a60b-59332bc10565"
        },
        [TEXTE_LIBRE]: { [TEXTE]: "je suis gentil" }
      },
      [{ ordreEdition: 20 }],
      jest.fn()
    )
  ).toBeTruthy();
  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: { [COURRIER]: "0296fc7a-fb81-4eb7-a72f-94286b8d8301" }
      },
      [],
      jest.fn()
    )
  ).toBeTruthy();
});

test("getStatutEnTraitement", () => {
  expect(
    getStatutEnTraitement(ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION)
  ).toBe(StatutRequete.A_SIGNER);
  expect(getStatutEnTraitement(ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE)).toBe(
    StatutRequete.A_VALIDER
  );
});

afterAll(() => {
  superagentMock.unset();
});
