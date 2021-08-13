import { Nationalite } from "../../model/etatcivil/enum/Nationalite";
import { DocumentDelivrance } from "../../model/requete/v2/enum/DocumentDelivrance";
import { MotifDelivrance } from "../../model/requete/v2/enum/MotifDelivrance";
import { Provenance } from "../../model/requete/v2/enum/Provenance";
import { Qualite } from "../../model/requete/v2/enum/Qualite";
import { SousTypeDelivrance } from "../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../model/requete/v2/enum/StatutRequete";
import { TypeCanal } from "../../model/requete/v2/enum/TypeCanal";
import { TypeInstitutionnel } from "../../model/requete/v2/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "../../model/requete/v2/enum/TypeMandataireReq";
import { TypePieceJustificative } from "../../model/requete/v2/enum/TypePieceJustificative";
import { TypeRequete } from "../../model/requete/v2/enum/TypeRequete";
import { IProvenancePlanete } from "../../model/requete/v2/IProvenancePlanete";
import { IProvenanceRece } from "../../model/requete/v2/IProvenanceRece";
import { IRequeteDelivrance } from "../../model/requete/v2/IRequeteDelivrance";

const requeteDelivrance: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    libelle: "Certificat de situation au rca",
    libelleCourt: "DOCUMENT_DELIVRANCE",
    nom: "CERTIFICAT_SITUATION_RCA"
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
      ligne2: "61 avenue Foch",
      ligne3: "Appartement 258",
      ligne4: "",
      ligne5: "",
      codePostal: "310 GL24",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: ""
    },
    courriel: "ldubois@wanadoo.fr",
    dateCreation: new Date("1624615266000"),
    id: "313a3fdf-889c-4da1-8f7f-660805fdb0df",
    lienRequerant: undefined,
    nomFamille: "DUBOIS",
    prenom: "Léonard",
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
  type: TypeRequete.DELIVRANCE
};

export const requeteDelivranceInstitutionnel: IRequeteDelivrance = {
  actions: [],
  canal: TypeCanal.COURRIER,
  complementMotif: "",
  dateCreation: 1624603295000,
  documentDemande: {
    libelle: "Certificat de situation au rca",
    libelleCourt: "DOCUMENT_DELIVRANCE",
    nom: "CERTIFICAT_SITUATION_RCA"
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
      ligne2: "61 avenue Foch",
      ligne3: "Appartement 258",
      ligne4: "",
      ligne5: "",
      codePostal: "310 GL24",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: ""
    },
    courriel: "ldubois@wanadoo.fr",
    dateCreation: new Date("1624615266000"),
    id: "313a3fdf-889c-4da1-8f7f-660805fdb0df",
    lienRequerant: undefined,
    nomFamille: "DUBOIS",
    prenom: "Léonard",
    qualiteRequerant: {
      autreProfessionnel: undefined,
      institutionnel: { type: TypeInstitutionnel.AMBASSADE },
      mandataireHabilite: { type: TypeMandataireReq.AUTRE },
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
  type: TypeRequete.DELIVRANCE
};

export default requeteDelivrance;
