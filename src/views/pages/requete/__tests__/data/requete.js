import { NatureActe } from "../../../../../model/requete/NatureActe";
import { QualiteRequerant } from "../../../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../../../model/requete/SousQualiteRequerant";
import { Canal } from "../../../../../model/Canal";

export default {
  idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
  idSagaDila: 11982,
  sousTypeRequete: "DELIVRANCE_COURRIER",
  provenance: "DILA",
  natureActe: NatureActe.Naissance,
  dateCreation: "01/01/2020",
  dateStatut: "02/01/2020",
  statut: "A_SIGNER",
  prioriteRequete: "",
  villeEvenement: "fez",
  paysEvenement: "maroc",
  canal: Canal.Internet,
  piecesJustificatives: [],
  requerant: {
    adresse: "",
    idRequerant: "f275d357-14ec-42ac-a219-d481cbcbbc61",
    nomOuRaisonSociale: "aubin",
    nomUsage: "",
    prenomUsage: "nicolas",
    qualiteRequerant: QualiteRequerant.PARTICULIER,
    requete: "",
    typeRequerant: SousQualiteRequerant.Titulaire,
    telephone: "0777327569"
  },
  titulaires: [
    {
      idTitulaire: "31a63e6a-b4de-4e4f-8bd4-2a53835a417b",
      position: 1,
      nomNaissance: "Tabalouga",
      nomUsage: "",
      prenom1: "Le dragon",
      prenom2: "",
      prenom3: "",
      jourNaissance: 25,
      moisNaissance: 3,
      anneeNaissance: 1983,
      villeNaissance: "fez",
      paysNaissance: "maroc",
      parent1: "",
      parent2: "",
      requete: ""
    },
    {
      idTitulaire: "tutulaire2",
      position: 2,
      nomNaissance: "jean",
      nomUsage: "",
      prenom1: "jacques",
      prenom2: "",
      prenom3: "",
      jourNaissance: 25,
      moisNaissance: 3,
      anneeNaissance: 1983,
      villeNaissance: "nantes",
      paysNaissance: "france",
      parent1: "",
      parent2: "",
      requete: ""
    }
  ],
  reponse: {
    idReponse: "1d189cd9-0df0-45dc-a4cf-0174eb62cbbc",
    dateTraitementDemat: 1583831941.329563,
    dateDelivrance: 1583831941.329563,
    natureActe: NatureActe.NAISSANCE,
    jourEvenement: 25,
    moisEvenement: 3,
    anneeEvenement: 2010,
    villeEvenement: "fez",
    paysEvenement: "maroc",
    nomOec: "Garisson",
    prenomOec: "Juliette",
    commentaire: "",
    documentsDelivres: [],
    requete: ""
  }
};
