import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";

import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";

export const ReponseEnregistrementProjetActe = {
  errors: [],
  data: {
    id: "dcd70ce9-1bb4-45b1-b672-a94dc152c339",
    dateCreation: 1698153110423,
    modeCreation: "ETABLI",
    statut: "BROUILLON",
    dateStatut: 1698153110423,
    nature: "NAISSANCE",
    numero: "0",
    dateDerniereMaj: 1698153110423,
    visibiliteArchiviste: "NON",
    evenement: {
      id: "dcd7d061-a935-4745-8f87-b2e071c28967",
      jour: 5,
      mois: 1,
      annee: 1991,
      ville: "Inc",
      region: "",
      pays: "Cuba"
    },
    titulaires: [
      {
        nom: "PLAGNE",
        prenoms: ["Sylvie"],
        ordre: 1,
        sexe: "MASCULIN",
        naissance: {
          jour: 5,
          mois: 1,
          annee: 1991,
          ville: "Inc",
          region: "",
          pays: "Cuba",
          neDansLeMariage: false
        },
        age: 0,
        domicile: { ville: "Courbevoie", region: "95", pays: "France" },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 2,
            nom: "PLAGNE",
            sexe: "MASCULIN",
            naissance: {
              jour: 31,
              mois: 12,
              annee: 1963,
              ville: "La Havane",
              arrondissement: "",
              region: "",
              pays: "Cuba"
            },
            age: 0,
            prenoms: ["Paul"]
          },
          {
            lienParente: "PARENT",
            ordre: 1,
            nom: "ANBDE",
            sexe: "FEMININ",
            naissance: {
              jour: 31,
              mois: 12,
              annee: 1962,
              ville: "La Havane",
              arrondissement: "",
              region: "",
              pays: "Cuba"
            },
            age: 0,
            prenoms: ["Anne"]
          }
        ],
        identiteAvantDecret: "",
        decretNaturalisation: {}
      }
    ],
    corpsTexte: {
      id: "dcd72a7d-4a95-475f-b63c-2f30b7108257",
      texte:
        "Nom                : PLAGNE\nPrénoms            : Sylvie\nSexe               : masculin\nÂgé de             : 0\nLieu de naissance  : Inc (Cuba)\n\nNom de la mère     : ANBDE\nPrénoms            : Anne\nÂgée de            : 0\nLieu de naissance  : La Havane (Cuba)\n\nNom du père        : PLAGNE\nPrénoms            : Paul\nÂgé de             : 0\nLieu de naissance  : La Havane (Cuba)\n\nDéclarant          : null\n\nAdresse            : Courbevoie (95)\nFrançais par       : décret de réintégration du\n\n"
    },
    analyseMarginales: [
      {
        id: "dcd74fbf-a30e-4530-a756-099538f4f7d0",
        dateDebut: 1698153110423,
        titulaires: [{ nom: "PLAGNE", prenoms: ["Sylvie"], ordre: 1 }]
      }
    ],
    type: "TEXTE",
    declarant: { identiteDeclarant: "ABSCENCE_DE_VALEUR" },
    numeroDossierNational: "2022X 200150"
  }
};

export const projetActeNaissanceDto: IProjetActeTranscritDto = {
  id: "51ee1514-57f7-4c8e-a7d0-1c86414f8d3d",
  dateCreation: 1747137490481,
  modeCreation: ETypeRedactionActe.TRANSCRIT,
  statut: "BROUILLON",
  dateStatut: 1747137490481,
  nature: "NAISSANCE",
  dateDerniereMaj: [2025, 5, 13],
  visibiliteArchiviste: "NON",
  evenement: {
    id: "51ee94e5-7b7e-4f94-9c66-beaa6f8bc340",
    annee: 1992,
    jour: null,
    mois: null,
    voie: null,
    ville: null,
    arrondissement: null,
    region: null,
    pays: null,
    heure: null,
    minute: null,
    neDansLeMariage: null
  },
  mentions: [],
  titulaires: [
    {
      nom: "ddddddcc",
      prenoms: [],
      ordre: 1,
      sexe: "MASCULIN",
      naissance: {
        annee: 1992,
        neDansLeMariage: true,
        jour: null,
        mois: null,
        voie: null,
        ville: null,
        arrondissement: null,
        region: null,
        pays: null,
        heure: null,
        minute: null,
        departement: null
      },
      filiations: [],
      nomActeEtranger: "zsza",
      domicile: {
        pays: "France",
        region: "",
        ville: "",
        arrondissement: "",
        voie: ""
      },
      nomPartie1: "",
      nomPartie2: "",
      pasDePrenom: false
    }
  ],
  corpsTexte: {
    id: "51eefd46-2c95-479b-83ea-fe4a864b4ee1",
    texte:
      "Nom                : ddddddcc\nPrénoms            : ---\nsexe               : masculin\nné en              : mille neuf cent quatre-vingt-douze\nà                  : ---\n\nNom du père        : ---\nPrénoms            : ---\ndate de naissance  : ---\nà                  : ---\n\nNom de la mère     : ---\nPrénoms            : ---\ndate de naissance  : ---\nà                  : ---\n\nDéclarant          : le père\n\nAdresse            : ---\n"
  },
  analyseMarginales: [
    {
      id: "51eeb7e0-8b43-439e-b9aa-7d077c607f10",
      dateDebut: 1747137490481,
      titulaires: [{ nom: "dddddd", prenoms: [], ordre: 1, typeDeclarationConjointe: "ABSENCE_DECLARATION" }],
      estValide: false
    }
  ],
  type: "TEXTE",
  declarant: {
    identiteDeclarant: "PERE",
    prenoms: [],
    sexe: "INCONNU",
    nom: null,
    age: null,
    qualite: null,
    sansProfession: null,
    profession: null,
    adresseDomicile: null,
    complementDeclarant: null
  },
  formuleFinale: {
    identiteDemandeur: "PARENT_1",
    pieceProduite: "COPIE",
    modeDepot: "TRANSMISE",
    identiteTransmetteur: "LE_REQUERANT",
    nomDemandeur: null,
    prenomDemandeur: null,
    qualiteDemandeur: null,
    legalisation: null,
    autresPieces: null,
    nomTransmetteur: null
  },
  acteEtranger: {
    typeActeEtranger: "ACTE_DRESSE",
    cadreNaissance: "NE_DANS_LE_MARIAGE",
    adresseEnregistrement: { pays: "", region: "", ville: "", arrondissement: "", voie: "" },
    texteEnonciations: null,
    redacteur: null,
    reference: null,
    complement: null,
    mentions: null
  }
};
