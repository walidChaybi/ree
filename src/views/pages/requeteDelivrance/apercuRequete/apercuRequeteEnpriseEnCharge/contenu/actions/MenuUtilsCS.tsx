import { ETypeInscriptionRcRca } from "@model/etatcivil/enum/ETypeInscriptionRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";

import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "@model/requete/IActionOption";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";

export enum INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE {
  REQUETE_INCOMPLETE_ILLISIBLE,
  PACS_NON_INSCRIT,
  MARIAGE_EN_COURS_DE_VALIDITE,
  NATIONALITE_OU_NAISSANCE_FRANCAIS,
  IGNORER_REQUETE
}

export enum INDEX_CHOIX_ACTION_MENU_DELIVRER {
  CERTIFICAT_SITUATION,
  ATTESTATION_PACS
}

export function getListeDocumentsAutorise(listeDocumentDemandeUn: string[], listeDocumentDemandeDeux?: string[]) {
  if (listeDocumentDemandeDeux) {
    return listeDocumentDemandeUn.concat(listeDocumentDemandeDeux);
  } else {
    return listeDocumentDemandeUn;
  }
}

export const listeDocumentsDemandeAutreQueAttestationPACS = [
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RCA,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RCA,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC_RCA
];

export const documentsDemandeAttestationPACS = [ECodeDocumentDelivrance.CODE_ATTESTATION_PACS];

export const menuSansDelivranceActions: IActionOption[] = [
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.REQUETE_INCOMPLETE_ILLISIBLE,
    label: "Requête incomplète ou difficilement lisible",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(listeDocumentsDemandeAutreQueAttestationPACS, documentsDemandeAttestationPACS)
  },
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.PACS_NON_INSCRIT,
    label: "PACS non inscrit",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(documentsDemandeAttestationPACS)
  },
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.MARIAGE_EN_COURS_DE_VALIDITE,
    label: "Mariage en cours de validité",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(listeDocumentsDemandeAutreQueAttestationPACS)
  },
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.NATIONALITE_OU_NAISSANCE_FRANCAIS,
    label: "Nationalité française ou naissance en France",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(listeDocumentsDemandeAutreQueAttestationPACS, documentsDemandeAttestationPACS)
  },
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.IGNORER_REQUETE,
    label: "Ignorer la requête",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(listeDocumentsDemandeAutreQueAttestationPACS, documentsDemandeAttestationPACS)
  }
];

export function filtrerListeActionsParDocumentDemande(listeActions: IActionOption[], requete: IRequeteDelivrance): IActionOption[] {
  const listeActionAutorise: IActionOption[] = [];
  const documentDemandeRequeteCode = requete.documentDemande?.code;

  listeActions.forEach(action => {
    const documentDemandeEstPresentDansListeAction = action.listeDocumentsDemandeAutorise?.find((documentDemande: string) => {
      return documentDemande === documentDemandeRequeteCode;
    });

    if (documentDemandeEstPresentDansListeAction) {
      listeActionAutorise.push(action);
    }
  });

  return listeActionAutorise;
}

export const menuDelivrerActions: IActionOption[] = [
  {
    value: INDEX_CHOIX_ACTION_MENU_DELIVRER.CERTIFICAT_SITUATION,
    label: "Certificat de situation",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(listeDocumentsDemandeAutreQueAttestationPACS)
  },
  {
    value: INDEX_CHOIX_ACTION_MENU_DELIVRER.ATTESTATION_PACS,
    label: "Attestation PACS",
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(documentsDemandeAttestationPACS)
  }
];

export const estMemeNombreDeRCModificationEtRadiation = (
  inscriptionTypeRadiation?: IInscriptionRc[],
  inscriptionTypeModification?: IInscriptionRc[]
): boolean => {
  return inscriptionTypeRadiation?.length === inscriptionTypeModification?.length;
};

export function getInscriptionsRCDeTypeRadiation(inscriptionsRC?: IInscriptionRc[]): IInscriptionRc[] {
  let inscriptionRC: IInscriptionRc[] = [];
  if (inscriptionsRC) {
    inscriptionRC = inscriptionsRC.filter(inscription => {
      return inscription.typeInscription === ETypeInscriptionRcRca.RADIATION;
    });
  }

  return inscriptionRC;
}

export function getInscriptionsRCDeTypeModification(inscriptionsRC?: IInscriptionRc[]): IInscriptionRc[] {
  let inscriptionRC: IInscriptionRc[] = [];
  if (inscriptionsRC) {
    inscriptionRC = inscriptionsRC.filter(inscription => {
      return inscription.typeInscription === ETypeInscriptionRcRca.MODIFICATION;
    });
  }

  return inscriptionRC;
}

export const estPresentRcTypeModification = (inscriptions?: IResultatRMCInscription[]): IResultatRMCInscription | undefined => {
  if (inscriptions) {
    return inscriptions.find(inscription => inscription.typeInscription === ETypeInscriptionRcRca.MODIFICATION);
  }
};

export function getInscriptionsDeTypeModificationEtRadiation(inscriptionsRC?: IInscriptionRc[]) {
  const inscrptionsRCModification = getInscriptionsRCDeTypeModification(inscriptionsRC);
  const inscriptionsRCRadiation = getInscriptionsRCDeTypeRadiation(inscriptionsRC);

  return { inscrptionsRCModification, inscriptionsRCRadiation };
}

export function triTableauRCRadiationParDate(inscriptionsRC?: IInscriptionRc[]): IInscriptionRc[] {
  let inscriptionsRcTriees: IInscriptionRc[] = [];

  if (inscriptionsRC) {
    inscriptionsRcTriees = [...inscriptionsRC];
    inscriptionsRcTriees?.sort((inscriptionRc1, inscriptionRc2) => {
      return inscriptionRc1.dateInscription.getTime() - inscriptionRc2.dateInscription.getTime();
    });
  }

  return inscriptionsRcTriees;
}
