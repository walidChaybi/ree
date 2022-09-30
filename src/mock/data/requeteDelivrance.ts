import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IProvenancePlanete } from "@model/requete/IProvenancePlanete";
import { IProvenanceRece } from "@model/requete/IProvenanceRece";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { documentReponseCourrier117 } from "./DocumentReponse";
import { TYPE_PIECE_JUSTIFICATIVE } from "./NomenclatureTypePieceJustificative";

const requeteDelivrance: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    libelle: "Certificat de situation au rca",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RCA"
  } as DocumentDelivrance,
  documentsReponses: [documentReponseCourrier117],
  evenement: {
    id: "755e30c2-2586-4a32-b2a4-8d52d4ed32e0",
    natureActe: NatureActeRequete.MARIAGE
  },
  id: "0ad85c1f-57cf-45cc-ab66-6a17f31247df",
  idEntite: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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

export const requeteDelivranceInstitutionnel: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    libelle: "Certificat de situation au rca",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RCA"
  } as DocumentDelivrance,
  documentsReponses: [],
  evenement: undefined,
  id: "0ad85c1f-57cf-45cc-ab66-6a17f31247df",
  idEntite: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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
      typePieceJustificative: "Carte" as unknown as TypePieceJustificative
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
      pays: "Rwanda"
    },
    courriel: "ldubois@wanadoo.fr",
    dateCreation: new Date("1624615266000"),
    id: "313a3fdf-889c-4da1-8f7f-660805fdb0df",
    lienRequerant: undefined,
    nomFamille: "Ruiz",
    prenom: "Paul",
    qualiteRequerant: {
      autreProfessionnel: undefined,
      institutionnel: {
        type: TypeInstitutionnel.AMBASSADE,
        nomInstitution: "Ambassade du Rwanda"
      },
      mandataireHabilite: undefined,
      particulier: undefined,
      qualite: Qualite.INSTITUTIONNEL,
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
      id: "0b7dfdd9-9672-409e-b4f1-46e6f001bcfc",
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
      id: "0b7dfdd9-9672-409e-b4f1-46e6f001bcfb",
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
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE
};

export default requeteDelivrance;

const requerant: IRequerant = {
  id: "0ad81071-9733-47fb-9e46-d6cdbea1c6f3",
  dateCreation: new Date(),
  nomFamille: "Dubois",
  prenom: "Alice",
  courriel: "dubois.alice@gmail.com",
  telephone: "123456793",
  adresse: {
    id: "8ef11f43-caac-47d3-a28a-c4e1f1d29c77",
    ligne2: "Appartement 258",
    ligne3: "Batiment Z",
    ligne4: "61 avenue Foch",
    ligne5: "lieu dit la martinière",
    codePostal: "310 GL24",
    ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
    pays: "France"
  },
  lienRequerant: undefined
} as IRequerant;

export const idRequeteRDCSC = "d19650ed-012b-41ec-b7be-9e6ea9101eaa";
export const requeteRDCSC = {
  id: idRequeteRDCSC,
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDCSC,
  documentDemande: {
    code: "ATTESTATION_PACS",
    libelle: "Attestation PACS",
    categorie: "categorie"
  },
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE
  },
  requerant,
  titulaires: [
    {
      id: "8ef12021-61df-421b-9b3d-ab6b4344df88",
      position: 1,
      nomNaissance: "Brown",
      nomUsage: "",
      anneeNaissance: 1993,
      moisNaissance: 10,
      jourNaissance: 14,
      villeNaissance: "Sydney",
      paysNaissance: "Australie",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "8ef12d35-0d01-4ed1-b026-0038f901a13e",
          numeroOrdre: 1,
          prenom: "Alphonse"
        }
      ],
      parentsTitulaire: []
    }
  ]
} as any as IRequeteDelivrance;


export const idRequeteRDCSCCertificatSituationRCA =
  "d19650ed-012b-41ec-b7be-9e6ea2101eae";
export const requeteRDCSCCertificatSituationRCA = {
  ...requeteRDCSC,
  id: idRequeteRDCSCCertificatSituationRCA,
  documentDemande: {
    code: "CERTIFICAT_SITUATION_RCA",
    libelle: "Certificat situation RCA",
    categorie: "categorie"
  }
} as any as IRequeteDelivrance;

export const idRequeteRDC = "d19650ed-012b-41ec-b7be-9e6ea9101eaa";

export const requeteDelivranceRDC: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    libelle: "Certificat de situation au rca",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RCA"
  } as DocumentDelivrance,
  documentsReponses: [documentReponseCourrier117],
  evenement: {
    id: "755e30c2-2586-4a32-b2a4-8d52d4ed32e0",
    natureActe: NatureActeRequete.MARIAGE
  },
  id: "0ad85c1f-57cf-45cc-ab66-6a17f31247df",
  idEntite: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
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

export const requeteRDC = {
  id: idRequeteRDC,
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE
  },
  requerant,
  titulaires: [
    {
      id: "8ef12021-61df-421b-9b3d-ab6b4344df88",
      position: 1,
      nomNaissance: "Brown",
      nomUsage: "",
      anneeNaissance: 1993,
      moisNaissance: 10,
      jourNaissance: 14,
      villeNaissance: "Sydney",
      paysNaissance: "Australie",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "8ef12d35-0d01-4ed1-b026-0038f901a13e",
          numeroOrdre: 1,
          prenom: "Alphonse"
        }
      ],
      parentsTitulaire: []
    }
  ]
} as any as IRequeteDelivrance;

export const requeteRDD = {
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE
  }
} as IRequeteDelivrance;
