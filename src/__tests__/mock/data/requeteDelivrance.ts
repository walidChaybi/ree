import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IProvenancePlanete } from "@model/requete/IProvenancePlanete";
import { IProvenanceRece } from "@model/requete/IProvenanceRece";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { documentReponseCourrier117 } from "./DocumentReponse";
import { TYPE_PIECE_JUSTIFICATIVE } from "./NomenclatureTypePieceJustificative";

const requeteDelivrance: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    id: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
    libelle: "Certificat de situation au rca",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RCA"
  } as IDocumentDelivrance,
  documentsReponses: [documentReponseCourrier117],
  evenement: {
    id: "755e30c2-2586-4a32-b2a4-8d52d4ed32e0",
    natureActe: NatureActeRequete.MARIAGE
  },
  id: "0ad85c1f-57cf-45cc-ab66-6a17f31247df",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
  idSagaDila: 8701,
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
  mandant: undefined,
  motif: MotifDelivrance.MARIAGE_PACS,
  nbExemplaireImpression: 2,
  numero: "L5UG3Q",
  observations: [],
  piecesJustificatives: [
    {
      contenu: "",
      id: "salut",
      mimeType: "",
      nom: "Jérome",
      taille: 0,
      typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
    }
  ],
  provenanceRequete: {
    provenance: Provenance.SERVICE_PUBLIC,
    provenancePlanete: {} as IProvenancePlanete,
    provenanceRece: {} as IProvenanceRece,
    provenanceServicePublic: {
      referenceDila: "MEL-8701"
    }
  },

  requerant: {
    adresse: {
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      codePostal: "310 GL24",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "France"
    },
    courriel: "ldubois@wanadoo.fr",
    dateCreation: new Date("1624615266000"),
    id: "313a3fdf-889c-4da1-8f7f-660805fdb0df",
    lienRequerant: undefined,
    nomFamille: "RUIZ",
    prenom: "Paul",
    qualiteRequerant: {
      autreProfessionnel: undefined,
      institutionnel: { type: TypeInstitutionnel.AMBASSADE },
      mandataireHabilite: { type: TypeMandataireReq.AUTRE },
      particulier: undefined,
      qualite: Qualite.PARTICULIER,
      utilisateurRece: undefined
    },
    telephone: ""
  },
  sousType: SousTypeDelivrance.RDCSC,

  statutCourant: {
    dateEffet: 1624602323000,
    raisonStatut: "",
    statut: StatutRequete.PRISE_EN_CHARGE
  },
  titulaires: [
    {
      anneeNaissance: 1990,
      id: "0b7dfdd9-9672-409e-b4f1-46e6f001bcfb",
      jourNaissance: 25,
      moisNaissance: 6,
      nationalite: Nationalite.ETRANGERE,
      nomNaissance: "Prodesk",
      nomUsage: "",
      parentsTitulaire: [],
      paysNaissance: "Espagne",
      position: 1,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Elodie"
        }
      ],

      sexe: "FEMININ",
      villeNaissance: "Barcelone"
    },
    {
      anneeNaissance: 1990,
      id: "0b7dfdd9-9672-409e-b4f1-46e6f001bcfd",
      jourNaissance: 25,
      moisNaissance: 6,
      nationalite: Nationalite.ETRANGERE,
      nomNaissance: "Daniel",
      nomUsage: "",
      parentsTitulaire: [],
      paysNaissance: "Espagne",
      position: 1,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Jack"
        }
      ],

      sexe: "MASCULIN",
      villeNaissance: "Barcelone"
    }
  ],
  type: TypeRequete.DELIVRANCE,
  choixDelivrance: ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE
};

export default requeteDelivrance;

export const idRequeteRDCSC = "d19650ed-012b-41ec-b7be-9e6ea9101eaa";

export const requeteDelivranceRDC: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    libelle: "Certificat de situation au rca",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RCA"
  } as IDocumentDelivrance,
  documentsReponses: [documentReponseCourrier117],
  evenement: {
    id: "755e30c2-2586-4a32-b2a4-8d52d4ed32e0",
    natureActe: NatureActeRequete.MARIAGE
  },
  id: "0ad85c1f-57cf-45cc-ab66-6a17f31247df",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
  idSagaDila: 8701,
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
  mandant: undefined,
  motif: MotifDelivrance.MARIAGE_PACS,
  nbExemplaireImpression: 2,
  numero: "L5UG3Q",
  observations: [],
  piecesJustificatives: [
    {
      contenu: "",
      id: "salut",
      mimeType: "",
      nom: "Jérome",
      taille: 0,
      typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
    }
  ],
  provenanceRequete: {
    provenance: Provenance.SERVICE_PUBLIC,
    provenancePlanete: {} as IProvenancePlanete,
    provenanceRece: {} as IProvenanceRece,
    provenanceServicePublic: {
      referenceDila: "MEL-8701"
    }
  },

  requerant: {
    adresse: {
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      codePostal: "310 GL24",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "France"
    },
    courriel: "ldubois@wanadoo.fr",
    dateCreation: new Date("1624615266000"),
    id: "313a3fdf-889c-4da1-8f7f-660805fdb0df",
    lienRequerant: undefined,
    nomFamille: "RUIZ",
    prenom: "Paul",
    qualiteRequerant: {
      autreProfessionnel: undefined,
      institutionnel: { type: TypeInstitutionnel.AMBASSADE },
      mandataireHabilite: { type: TypeMandataireReq.AUTRE },
      particulier: undefined,
      qualite: Qualite.PARTICULIER,
      utilisateurRece: undefined
    },
    telephone: ""
  },
  sousType: SousTypeDelivrance.RDC,

  statutCourant: {
    dateEffet: 1624602323000,
    raisonStatut: "",
    statut: StatutRequete.PRISE_EN_CHARGE
  },
  titulaires: [
    {
      anneeNaissance: 1990,
      id: "0b7dfdd9-9672-409e-b4f1-46e6f001bcfb",
      jourNaissance: 25,
      moisNaissance: 6,
      nationalite: Nationalite.ETRANGERE,
      nomNaissance: "Prodesk",
      nomUsage: "",
      parentsTitulaire: [],
      paysNaissance: "Espagne",
      position: 1,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Elodie"
        }
      ],

      sexe: "FEMININ",
      villeNaissance: "Barcelone"
    },
    {
      anneeNaissance: 1990,
      id: "0b7dfdd9-9672-409e-b4f1-46e6f001bcfd",
      jourNaissance: 25,
      moisNaissance: 6,
      nationalite: Nationalite.ETRANGERE,
      nomNaissance: "Daniel",
      nomUsage: "",
      parentsTitulaire: [],
      paysNaissance: "Espagne",
      position: 1,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Jack"
        }
      ],

      sexe: "MASCULIN",
      villeNaissance: "Barcelone"
    }
  ],
  type: TypeRequete.DELIVRANCE,
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
};

export const idRequeteRDCPourModification = "9d00fe88-9d21-482e-bb02-223636f78386";
export const idRequeteRDCPourModificationMaCorbeille = "8f00fe88-9d21-482e-bb02-223636f78386";

export const requeteRDCPourModification = {
  id: "9d00fe88-9d21-482e-bb02-223636f78386",
  numeroFonctionnel: "SIE5G4",
  dateCreation: 1669647394371,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
  idService: "6737f85c-6207-4174-8825-d5f65d757e4f",
  actions: [
    {
      id: "9d00b2fb-748f-4575-b318-eef17e10462b",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 1669647394274,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
      nomUtilisateur: null,
      prenomUtilisateur: null,
      courrielUtilisateur: null
    },
    {
      id: "9d006f4d-cc7a-488d-b710-8527fe4bd19b",
      numeroOrdre: 2,
      libelle: "Prise en charge",
      dateAction: 1669647394351,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
      nomUtilisateur: null,
      prenomUtilisateur: null,
      courrielUtilisateur: null
    },
    {
      id: "9d0057b4-ed50-414e-b19c-2fb41c15f923",
      numeroOrdre: 3,
      libelle: "Requête modifiée",
      dateAction: 1669647394738,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
      nomUtilisateur: null,
      prenomUtilisateur: null,
      courrielUtilisateur: null
    }
  ],
  titulaires: [
    {
      id: "9d007c26-114f-422f-8e37-7e8c4f37c3a9",
      position: 1,
      nomNaissance: "NomRDCModifiée",
      nomUsage: null,
      anneeNaissance: 2000,
      moisNaissance: 10,
      jourNaissance: 10,
      villeNaissance: "Ville",
      codePostalNaissance: null,
      arrondissementNaissance: null,
      villeEtrangereNaissance: null,
      regionNaissance: null,
      paysNaissance: "Pays",
      sexe: "MASCULIN",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "9d00beb9-8106-4ddb-812b-c31b92dc6534",
          numeroOrdre: 1,
          prenom: "PrenomRDCModifiée",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: null
    }
  ],
  piecesJustificatives: [],
  requerant: {
    id: "9d00116e-d7f7-419d-b9e2-44d47ac8f18c",
    dateCreation: 1669647394371,
    nomFamille: "NOMRDCMODIFIEE1",
    prenom: "PrenomRDCModifiée1",
    courriel: null,
    telephone: null,
    adresse: null,
    qualite: "MANDATAIRE_HABILITE",
    detailQualiteRece: null,
    detailQualiteParticulier: null,
    detailQualiteMandataireHabilite: {
      id: "9d00d161-7fe6-4383-9f0b-5d901a8f5d0e",
      type: "GENEALOGISTE",
      raisonSociale: "raisonSocialeRDC",
      nature: null,
      crpcen: null
    },
    detailQualiteInstitutionnel: null,
    detailQualiteAutreProfessionnel: null,
    lienRequerant: {
      id: "9d009a3d-a07f-4c7d-860b-52ac64f77bb1",
      typeLienRequerant: "GRAND_PARENT",
      nature: null
    }
  },
  mandant: {
    id: "9d00c2c5-cd7d-4c2e-ab02-83d88634137f",
    typeMandant: "PERSONNE_PHYSIQUE",
    nom: "NOMRDCMODIFIEE2",
    prenom: "PrenomRDCModifiée2",
    raisonSociale: null,
    lienMandant: "GRAND_PARENT",
    natureLien: null
  },
  observations: [],
  statut: {
    id: "9d002653-710b-4a78-b651-e5c8cce92ed8",
    statutRequete: "PRISE_EN_CHARGE",
    dateEffet: 1669647394274,
    raisonStatut: null
  },
  lienRequerant: {
    id: "9d009a3d-a07f-4c7d-860b-52ac64f77bb1",
    typeLienRequerant: "GRAND_PARENT",
    nature: null
  },
  doublons: null,
  origines: null,
  numeroRequeteOrigine: null,
  sousType: "RDC",
  motif: "NON_PRECISE_PAR_REQUERANT",
  complementMotif: null,
  dateDelivranceDemat: null,
  provenance: "COURRIER",
  statutReponse: null,
  documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
  documentComplementaire: null,
  nombreExemplairesDemandes: 1,
  provenancePlanete: null,
  provenanceRece: null,
  provenanceServicePublic: null,
  documentsReponses: [],
  evenement: {
    id: "9d008794-acae-4969-b00a-77bd95988a9b",
    natureActe: "NAISSANCE",
    jour: 10,
    mois: 10,
    annee: 2000,
    ville: "Ville",
    pays: "Pays"
  },
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
} as any;
export const requeteRDCPourModificationMaCorbeille = {
  ...requeteRDCPourModification,
  id: "8f00fe88-9d21-482e-bb02-223636f78386",
  documentDemande: "5f1e909f-f74c-4b16-9c03-b3733354cxyz"
};

export const idRequeteRDDASigner = "8f00fe88-9d21-482e-bb02-223636f78385";
export const requeteRDDASigner = {
  ...requeteRDCPourModification,
  id: idRequeteRDDASigner,
  sousType: SousTypeDelivrance.RDD,
  statut: {
    id: "9d002653-710b-4a78-b651-e5c8cce92ed8",
    statutRequete: "A_SIGNER",
    dateEffet: 1669647394274,
    raisonStatut: null
  }
};
