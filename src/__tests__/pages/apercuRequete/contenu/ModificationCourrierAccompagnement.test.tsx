import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "../../../../mock/data/requeteDelivrance";
import { ChoixDelivrance } from "../../../../model/requete/v2/enum/ChoixDelivrance";
import {
  getDefaultValuesAccompagnement,
  getOptionsCourrier
} from "../../../../views/pages/apercuRequete/apercuCourrierAccompagnement/ModificationCourrierAccompagnement";

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
      requerantLigne2: "",
      adresseLigne2: "Appartement 258",
      adresseLigne3: "Batiment Z",
      adresseLigne4: "61 avenue Foch",
      adresseLigne5: "lieu dit la martinière",
      adresseCodePostal: "310 GL24",
      adresseVille: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      adressePays: "France"
    },
    requete: { motif: "MARIAGE_PACS", complement: "", nbExemplaire: 2 }
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
      requerantLigne2: "DUBOIS Léonard",
      adresseLigne2: "Appartement 258",
      adresseLigne3: "Batiment Z",
      adresseLigne4: "61 avenue Foch",
      adresseLigne5: "lieu dit la martinière",
      adresseCodePostal: "310 GL24",
      adresseVille: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      adressePays: "Rwanda"
    },
    requete: { motif: "MARIAGE_PACS", complement: "", nbExemplaire: 2 }
  });
});

test("getOptionscourrier", () => {
  expect(getOptionsCourrier(requeteDelivrance, undefined)).toStrictEqual([
    { value: "", str: "Informations diverses manquantes (117)" },
    { value: "", str: "Mandat généalogiste manquant (18)" },
    { value: "", str: "Justificatif représentant légal manquant (19)" }
  ]);
  let requete2 = requeteDelivrance;
  requete2.choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
  expect(getOptionsCourrier(requete2, undefined)).toStrictEqual([
    { value: "", str: "Délivrance d'acte (116)" },
    { value: "", str: "Délivrance d'acte incomplet (50)" }
  ]);
  let requete3 = requeteDelivrance;
  requete3.choixDelivrance = ChoixDelivrance.REP_SANS_DEL_EC_DIVERS;
  console.log(getOptionsCourrier(requete3, undefined));
  expect(getOptionsCourrier(requete3, undefined)).toStrictEqual([
    { value: "", str: "Divers (17)" }
  ]);
  let requete4 = requeteDelivrance;
  requete4.choixDelivrance =
    ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC;
  expect(getOptionsCourrier(requete4, undefined)).toStrictEqual([
    { value: "", str: "Acte non trouvé (115)" },
    { value: "", str: "Acte non trouvé Algérie (64)" },
    { value: "", str: "Acte de naissance non trouvé pour mariage (24)" },
    { value: "", str: "Attestation de pension de réversion" },
    { value: "", str: "Proposition de transcription d'acte" }
  ]);
});
