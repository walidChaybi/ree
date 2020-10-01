import { NatureActe } from "../../../../../model/requete/NatureActe";
import { QualiteRequerant } from "../../../../../model/requete/QualiteRequerant";
import { SousQualiteRequerant } from "../../../../../model/requete/SousQualiteRequerant";
import { Canal } from "../../../../../model/Canal";
import { TypeDocument } from "../../../../../model/requete/TypeDocument";
import { TypeRequete } from "../../../../../model/requete/TypeRequete";
import { MotifRequete } from "../../../../../model/requete/MotifRequete";

export default {
  idRequete: "204b8563-c7f8-4748-9daa-f26558985894",
  idSagaDila: 11982,
  idRequeteInitiale: 11900,
  sousTypeRequete: "RDC",
  typeRequete: TypeRequete.Delivrance,
  provenance: "DILA",
  natureActe: NatureActe.Naissance,
  dateCreation: "01/01/2020",
  dateDerniereMaj: "04/01/2020",
  dateStatut: "02/01/2020",
  statut: "A_SIGNER",
  prioriteRequete: "",
  villeEvenement: "fez",
  paysEvenement: "maroc",
  officierEtatCivil: "Garisson Juliette",
  document: TypeDocument.CopieIntegrale,
  canal: Canal.Internet,
  motifRequete: MotifRequete.PapiersIdentitePasseport,
  piecesJustificatives: [],
  nomOec: "nomOec",
  typeActe: "",
  anneeEvenement: 0,
  jourEvenement: 0,
  moisEvenement: 0,
  nbExemplaire: 0,
  requerant: {
    idRequerant: "f275d357-14ec-42ac-a219-d481cbcbbc61",
    typeRequerant: SousQualiteRequerant.Titulaire,
    qualiteRequerant: QualiteRequerant.Particulier,
    identite: "",
    raisonSociale: "",
    nomInstitutionnel: "",
    nomUsage: "",
    nomFamille: "aubin",
    prenom: "nicolas",
    libelleRequerant: "nicolas aubin",
    telephone: "0777327569",
    mail: "",
    adresse: null,
    requete: null
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
