import {
  CHOIX_COURRIER,
  COURRIER,
  TEXTE,
  TEXTE_LIBRE
} from "@composant/formulaire/ConstantesNomsForm";
import requeteDelivrance, {
  requeteDelivranceInstitutionnel
} from "@mock/data/requeteDelivrance";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { OptionCourrier } from "@model/requete/IOptionCourrier";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  controleFormulaire,
  getDefaultValuesCourrier,
  getTypesCourrier
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";

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
      nom: "RUIZ",
      prenom: "Paul",
      raisonSociale: ""
    },
    adresse: {
      adresseCourriel: "",
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      complementDestinataire: "Appartement 258",
      complementPointGeo: "Batiment Z",
      lieuDit: "lieu dit la martinière",
      numeroTelephone: "",
      pays: "France",
      voie: "61 avenue Foch"
    },
    requete: {
      documentDemande: "",
      motif: "MARIAGE_PACS",
      natureActe: "",
      complementMotif: "",
      nbExemplaire: 2
    }
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
      nom: "Ruiz",
      prenom: "Paul",
      raisonSociale: "Ambassade du Rwanda"
    },
    adresse: {
      adresseCourriel: "",
      codePostal: "310 GL24",
      commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      complementDestinataire: "Appartement 258",
      complementPointGeo: "Batiment Z",
      lieuDit: "lieu dit la martinière",
      numeroTelephone: "",
      pays: "Rwanda",
      voie: "61 avenue Foch"
    },
    requete: {
      documentDemande: "",
      motif: "MARIAGE_PACS",
      natureActe: "",
      complementMotif: "",
      nbExemplaire: 2
    }
  });
});

test("getTypesCourrier", () => {
  expect(getTypesCourrier(requeteDelivrance)).toStrictEqual([
    {
      cle: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2",
      libelle: "Informations diverses manquantes (117)"
    },
    {
      cle: "0296fc7a-fb81-4eb7-a72f-94286b8d8301",
      libelle: "Mandat généalogiste manquant (18)"
    },
    {
      cle: "fd2c6d07-367f-4770-994c-397c0bc63fba",
      libelle: "Justificatif représentant légal manquant (19)"
    }
  ]);
  let requete2 = requeteDelivrance;
  requete2.choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
  expect(getTypesCourrier(requete2)).toStrictEqual([
    {
      cle: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      libelle: "Délivrance d'acte (116)"
    },
    {
      cle: "4b60aab4-2e9f-479c-bec6-f38edbd6e647",
      libelle: "Délivrance d'acte incomplet (50)"
    }
  ]);
  let requete3 = requeteDelivrance;
  requete3.choixDelivrance = ChoixDelivrance.REP_SANS_DEL_EC_DIVERS;
  expect(getTypesCourrier(requete3)).toStrictEqual([
    { cle: "fce55a9f-4f4b-4996-a60b-59332bc10565", libelle: "Divers (17)" },
    {
      cle: "2776c0c7-2ad4-4949-9743-046c4c687eec",
      libelle: "Refus délivrance mariage"
    }
  ]);
  let requete4 = requeteDelivrance;
  requete4.choixDelivrance =
    ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC;
  expect(getTypesCourrier(requete4)).toStrictEqual([
    {
      cle: "c1c17758-98ce-444e-82eb-a4f885fddc2c",
      libelle: "Acte non trouvé (115)"
    },
    {
      cle: "c40bccfd-8e65-47fc-a3eb-1d25d7779a29",
      libelle: "Acte non trouvé Algérie (64)"
    },
    {
      cle: "002f64ff-b3da-4ff1-8f81-704059134327",
      libelle: "Acte de naissance non trouvé pour mariage (24)"
    },
    {
      cle: "db0a3d5a-34ca-47bf-bce5-33ec7ffb9148",
      libelle: "Attestation de pension de réversion"
    },
    {
      cle: "062526c5-e5a7-48d1-bc22-11938347f0bc",
      libelle: "Proposition de transcription d'acte"
    }
  ]);
});

test("controle formulaire", () => {
  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: { [COURRIER]: "062526c5-e5a7-48d1-bc22-11938347f0bc" }
      } as SaisieCourrier,
      [{ ordreEdition: 20 } as OptionCourrier],
      jest.fn()
    )
  ).toBeTruthy();

  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: { [COURRIER]: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2" }
      } as SaisieCourrier,
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
      } as SaisieCourrier,
      [{ ordreEdition: 20 } as OptionCourrier],
      jest.fn()
    )
  ).toBeTruthy();
  expect(
    controleFormulaire(
      {
        [CHOIX_COURRIER]: { [COURRIER]: "0296fc7a-fb81-4eb7-a72f-94286b8d8301" }
      } as SaisieCourrier,
      [],
      jest.fn()
    )
  ).toBeTruthy();
});

test("getStatutEnTraitement", () => {
  expect(
    ChoixDelivrance.getStatutApresChoixDelivrance(
      ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    )
  ).toBe(StatutRequete.A_SIGNER);
  expect(
    ChoixDelivrance.getStatutApresChoixDelivrance(
      ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE
    )
  ).toBe(StatutRequete.A_VALIDER);
});
