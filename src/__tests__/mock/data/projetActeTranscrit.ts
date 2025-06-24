import { declarantTranscritDtoVide } from "@model/etatcivil/acte/projetActe/transcription/DeclarantProjetActeTranscrit";
import {
  IProjetActeTranscritDto,
  IProjetActeTranscritPatchDto,
  IProjetActeTranscritPostDto,
  ProjetActeTranscrit
} from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { ETypeActe } from "@model/etatcivil/enum/TypeActe";

export const projetActeNaissanceDto: IProjetActeTranscritDto = {
  id: "6190b304-18dc-43e5-a53a-02612dbadeae",
  dateCreation: 123456,
  modeCreation: ETypeRedactionActe["TRANSCRIT"],
  statut: "BROUILLON",
  dateStatut: 123456,
  nature: "NAISSANCE",
  dateDerniereMaj: [2010, 10, 10],
  evenement: {
    id: "61905dd2-5451-4360-94de-17fada9685c8",
    annee: 1966,
    ville: "Nantes",
    arrondissement: "",
    heure: 10,
    jour: 12,
    minute: 10,
    mois: 10,
    neDansLeMariage: false,
    pays: "France",
    region: "",
    voie: ""
  },
  titulaires: [
    {
      nomActeEtranger: "Toto",
      nom: "Jo",
      ordre: 1,
      prenoms: ["Michel"],
      sexe: "MASCULIN",
      naissance: {
        id: undefined,
        annee: 1966,
        ville: "Nantes",
        neDansLeMariage: true,
        arrondissement: "",
        heure: 10,
        jour: 12,
        minute: 10,
        mois: 10,
        pays: "France",
        region: "",
        voie: ""
      },
      filiations: [
        {
          nom: "Perez",
          prenoms: ["Joseph"],
          age: 12,
          domicile: { pays: "France", region: "", ville: "" },
          sexe: "MASCULIN",
          naissance: {
            annee: 2010,
            arrondissement: "",
            voie: "",
            heure: 10,
            id: "456",
            jour: 5,
            minute: 20,
            neDansLeMariage: false,
            mois: 5,
            pays: "France",
            region: "",
            ville: "Nantes"
          },
          domicileCommun: false,
          lienParente: LienParente.PARENT,
          ordre: 1,
          profession: "Banquier",
          sansProfession: true
        }
      ],
      domicile: {
        ville: "",
        region: "",
        pays: ""
      },
      nomPartie1: "",
      nomPartie2: "",
      pasDePrenom: false
    }
  ],
  corpsTexte: { texte: "" },
  analyseMarginales: [
    {
      id: "6190e7cf-2745-42ed-9109-d86db3f5469d",
      titulaires: [
        {
          nom: "Jo",
          prenoms: ["Michel"],
          ordre: 1
        }
      ],
      estValide: false,
      dateDebut: 123456
    }
  ],
  type: ETypeActe["TEXTE"],
  declarant: {
    identiteDeclarant: "TIERS",
    sexe: "INCONNU",
    prenoms: [{ numeroOrdre: 1, prenom: "Patrick" }],
    nom: "Garcion",
    age: 52,
    qualite: "le copain",
    adresseDomicile: { ville: "Tunis", pays: "Tunisie", region: "", arrondissement: "" },
    sansProfession: false,
    profession: undefined,
    complementDeclarant: undefined
  },
  formuleFinale: {
    identiteDemandeur: "PARENT_1",
    pieceProduite: "COPIE",
    modeDepot: "TRANSMISE",
    identiteTransmetteur: "LE_REQUERANT",
    nomDemandeur: "nom formule finale",
    prenomDemandeur: "Rachid,Antoine",
    qualiteDemandeur: undefined,
    legalisation: undefined,
    autresPieces: undefined,
    nomTransmetteur: undefined
  },
  acteEtranger: {
    typeActeEtranger: "ACTE_DRESSE",
    cadreNaissance: "NE_DANS_LE_MARIAGE",
    texteEnonciations: undefined,
    adresseEnregistrement: {
      region: ""
    },
    redacteur: "redacteur acte",
    reference: "referenceComplement acte",
    complement: undefined,
    mentions: undefined
  },
  visibiliteArchiviste: "",
  mentions: []
};

export const projetActeNaissancePostDto: IProjetActeTranscritPostDto = {
  acteEtranger: {
    texteEnonciations: "tewt tewxt",
    typeActeEtranger: "ACTE_DRESSE",
    infoTypeActe: undefined,
    cadreNaissance: "NE_DANS_LE_MARIAGE",
    jourEnregistrement: "15",
    moisEnregistrement: "12",
    anneeEnregistrement: "2024",
    adresseEnregistrement: { ville: "Pekin", region: "china", pays: "Chine" },
    redacteur: "Ambassador",
    reference: "ref.2024.12.pek",
    complement: "ref.2024.12.pek",
    mentions: "il est fait mention de..."
  },
  formuleFinale: {
    identiteDemandeur: "PARENT_1",
    nomDemandeur: undefined,
    prenomDemandeur: undefined,
    qualiteDemandeur: undefined,
    pieceProduite: "COPIES",
    legalisation: "LEGALISATION",
    autresPieces: "passeport",
    modeDepot: "REMISE",
    identiteTransmetteur: "LE_REQUERANT",
    nomTransmetteur: undefined
  },
  declarant: declarantTranscritDtoVide,
  titulaires: [
    {
      filiations: [
        {
          age: undefined,
          domicile: {
            pays: "France",
            arrondissement: "13",
            ville: "Marseille",
            region: "departement",
            voie: "11 place du boulodrôme"
          },
          lienParente: LienParente.PARENT,
          naissance: {
            annee: 2000,
            arrondissement: undefined,
            departement: undefined,
            heure: undefined,
            jour: 10,
            minute: undefined,
            mois: 10,
            pays: undefined,
            voie: undefined,
            region: undefined,
            ville: undefined
          },
          nom: "Greenwald",
          ordre: 1,
          prenoms: ["cassandra"],
          profession: undefined,
          sansProfession: true,
          sexe: "MASCULIN",
          domicileCommun: undefined
        },
        {
          age: 34,
          domicile: undefined,
          domicileCommun: true,
          lienParente: LienParente.PARENT,
          naissance: {
            annee: 1966,
            departement: "loire atlantique",
            heure: undefined,
            jour: undefined,
            minute: undefined,
            mois: undefined,
            pays: "France",
            arrondissement: undefined,
            voie: "hopital chu nantes",
            region: "loire atlantique",
            ville: "Nantes"
          },
          nom: "Xi Phun Bin",
          ordre: 2,
          prenoms: ["Maman"],
          profession: "Artiste",
          sansProfession: false,
          sexe: "FEMININ"
        }
      ],
      naissance: {
        annee: 2024,
        heure: undefined,
        jour: 3,
        minute: undefined,
        mois: 12,
        neDansLeMariage: true,
        pays: "Chine",
        voie: "Place du riz",
        region: "China",
        ville: "Bejin"
      },
      nom: "Xi phun bin",
      nomActeEtranger: "Xi-phun bin",
      nomPartie1: "Xi",
      nomPartie2: "phun bin",
      ordre: 1,
      pasDePrenom: false,
      prenoms: ["lao", "xiar", "sehoo"],
      sexe: "FEMININ"
    }
  ],
  visibiliteArchiviste: "NON",
  modeCreation: ETypeRedactionActe.TRANSCRIT,
  nature: "NAISSANCE",
  evenement: {
    annee: 2024,
    heure: undefined,
    jour: 3,
    minute: undefined,
    mois: 12,
    neDansLeMariage: true,
    pays: "Chine",
    voie: "Place du riz",
    region: "China",
    ville: "Bejin"
  },
  analyseMarginales: [],
  mentions: []
};

export const projetActeNaissancePatchDto: IProjetActeTranscritPatchDto = {
  id: "6190b304-18dc-43e5-a53a-02612dbadeae",
  type: "TEXTE",
  acteEtranger: {
    texteEnonciations: "tewt tewxt",
    typeActeEtranger: "ACTE_DRESSE",
    infoTypeActe: undefined,
    cadreNaissance: "NE_DANS_LE_MARIAGE",
    jourEnregistrement: "15",
    moisEnregistrement: "12",
    anneeEnregistrement: "2024",
    adresseEnregistrement: { ville: "Pekin", region: "china", pays: "Chine" },
    redacteur: "Ambassador",
    reference: "ref.2024.12.pek",
    complement: "ref.2024.12.pek",
    mentions: "il est fait mention de..."
  },
  formuleFinale: {
    identiteDemandeur: "PARENT_1",
    nomDemandeur: undefined,
    prenomDemandeur: undefined,
    qualiteDemandeur: undefined,
    pieceProduite: "COPIES",
    legalisation: "LEGALISATION",
    autresPieces: "passeport",
    modeDepot: "REMISE",
    identiteTransmetteur: "LE_REQUERANT",
    nomTransmetteur: undefined
  },
  declarant: declarantTranscritDtoVide,
  titulaires: [
    {
      filiations: [
        {
          age: undefined,
          domicile: {
            pays: "France",
            arrondissement: "13",
            ville: "Marseille",
            region: "departement",
            voie: "11 place du boulodrôme"
          },
          domicileCommun: undefined,
          lienParente: LienParente.PARENT,
          naissance: {
            annee: 2000,
            departement: undefined,
            heure: undefined,
            jour: 10,
            minute: undefined,
            mois: 10,
            pays: undefined,
            arrondissement: undefined,
            voie: undefined,
            region: undefined,
            ville: undefined
          },
          nom: "Greenwald",
          ordre: 1,
          prenoms: ["cassandra"],
          profession: undefined,
          sansProfession: true,
          sexe: "MASCULIN"
        },
        {
          age: 34,
          domicile: undefined,
          domicileCommun: true,
          lienParente: LienParente.PARENT,
          naissance: {
            annee: 1966,
            departement: "loire atlantique",
            heure: undefined,
            jour: undefined,
            minute: undefined,
            mois: undefined,
            pays: "France",
            arrondissement: undefined,
            voie: "hopital chu nantes",
            region: "loire atlantique",
            ville: "Nantes"
          },
          nom: "Xi Phun Bin",
          ordre: 2,
          prenoms: ["Maman"],
          profession: "Artiste",
          sansProfession: false,
          sexe: "FEMININ"
        }
      ],
      naissance: {
        annee: 2024,
        heure: undefined,
        jour: 3,
        minute: undefined,
        mois: 12,
        neDansLeMariage: true,
        pays: "Chine",
        voie: "Place du riz",
        region: "China",
        ville: "Bejin"
      },
      nom: "Xi phun bin",
      nomActeEtranger: "Xi-phun bin",
      nomPartie1: "Xi",
      nomPartie2: "phun bin",
      ordre: 1,
      pasDePrenom: false,
      prenoms: ["lao", "xiar", "sehoo"],
      sexe: "FEMININ"
    }
  ],
  visibiliteArchiviste: "NON",
  modeCreation: ETypeRedactionActe.TRANSCRIT,
  nature: "NAISSANCE",
  evenement: {
    id: "61905dd2-5451-4360-94de-17fada9685c8",
    annee: 2024,
    heure: undefined,
    jour: 3,
    minute: undefined,
    mois: 12,
    neDansLeMariage: true,
    pays: "Chine",
    voie: "Place du riz",
    region: "China",
    ville: "Bejin"
  },
  analyseMarginales: [
    {
      dateDebut: 120000,
      dateFin: undefined,
      estValide: false,
      id: "6190e7cf-2745-42ed-9109-d86db3f5469d",
      titulaires: [
        {
          nom: "Xi phun bin",
          ordre: 1,
          prenoms: ["lao", "xiar", "sehoo"]
        }
      ]
    }
  ],
  mentions: [],
  statut: "BROUILLON"
};

export const projetActe = ProjetActeTranscrit.depuisDto(projetActeNaissanceDto);
