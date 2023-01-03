import {
  InscriptionRcUtil,
  TypeInscriptionRc
} from "@model/etatcivil/enum/TypeInscriptionRc";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import {
  CODE_ATTESTATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA
} from "@model/requete/enum/DocumentDelivranceConstante";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "@model/requete/IActionOption";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { getLibelle } from "@util/Utils";

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

export function getListeDocumentsAutorise(
  listeDocumentDemandeUn: string[],
  listeDocumentDemandeDeux?: string[]
) {
  if (listeDocumentDemandeDeux) {
    return listeDocumentDemandeUn.concat(listeDocumentDemandeDeux);
  } else {
    return listeDocumentDemandeUn;
  }
}

export const listeDocumentsDemandeAutreQueAttestationPACS = [
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA
];

export const documentsDemandeAttestationPACS = [CODE_ATTESTATION_PACS];

export const menuSansDelivranceActions: IActionOption[] = [
  {
    value:
      INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.REQUETE_INCOMPLETE_ILLISIBLE,
    label: getLibelle("Requête incomplète ou difficilement lisible"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      listeDocumentsDemandeAutreQueAttestationPACS,
      documentsDemandeAttestationPACS
    )
  },
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.PACS_NON_INSCRIT,
    label: getLibelle("PACS non inscrit"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      documentsDemandeAttestationPACS
    )
  },
  {
    value:
      INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.MARIAGE_EN_COURS_DE_VALIDITE,
    label: getLibelle("Mariage en cours de validité"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      listeDocumentsDemandeAutreQueAttestationPACS
    )
  },
  {
    value:
      INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.NATIONALITE_OU_NAISSANCE_FRANCAIS,
    label: getLibelle("Nationalité française ou naissance en France"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      listeDocumentsDemandeAutreQueAttestationPACS,
      documentsDemandeAttestationPACS
    )
  },
  {
    value: INDEX_CHOIX_ACTION_REPONSE_SANS_DELIVRANCE.IGNORER_REQUETE,
    label: getLibelle("Ignorer la requête"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      listeDocumentsDemandeAutreQueAttestationPACS,
      documentsDemandeAttestationPACS
    )
  }
];

export function filtrerListeActionsParDocumentDemande(
  listeActions: IActionOption[],
  requete: IRequeteDelivrance
): IActionOption[] {
  const listeActionAutorise: IActionOption[] = [];
  const documentDemandeRequeteCode = requete.documentDemande.code;

  listeActions.forEach(action => {
    const documentDemandeEstPresentDansListeAction =
      action.listeDocumentsDemandeAutorise?.find((documentDemande: string) => {
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
    label: getLibelle("Certificat de situation"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      listeDocumentsDemandeAutreQueAttestationPACS
    )
  },
  {
    value: INDEX_CHOIX_ACTION_MENU_DELIVRER.ATTESTATION_PACS,
    label: getLibelle("Attestation PACS"),
    sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
    listeDocumentsDemandeAutorise: getListeDocumentsAutorise(
      documentsDemandeAttestationPACS
    )
  }
];

export const estMemeNombreDeRCModificationEtRadiation = (
  inscriptionTypeRadiation?: IInscriptionRc[],
  inscriptionTypeModification?: IInscriptionRc[]
): boolean => {
  return (
    inscriptionTypeRadiation?.length === inscriptionTypeModification?.length
  );
};

export function getInscriptionsRCDeTypeRadiation(
  inscriptionsRC?: IInscriptionRc[]
): IInscriptionRc[] {
  let inscriptionRC: IInscriptionRc[] = [];
  if (inscriptionsRC) {
    inscriptionRC = inscriptionsRC.filter(inscription => {
      return inscription.typeInscription === TypeInscriptionRc.RADIATION;
    });
  }

  return inscriptionRC;
}

export function getInscriptionsRCDeTypeModification(
  inscriptionsRC?: IInscriptionRc[]
): IInscriptionRc[] {
  let inscriptionRC: IInscriptionRc[] = [];
  if (inscriptionsRC) {
    inscriptionRC = inscriptionsRC.filter(inscription => {
      return inscription.typeInscription === TypeInscriptionRc.MODIFICATION;
    });
  }

  return inscriptionRC;
}

export const estPresentRcTypeModification = (
  inscriptions?: IResultatRMCInscription[]
): IResultatRMCInscription | undefined => {
  if (inscriptions) {
    return inscriptions.find(inscription =>
      InscriptionRcUtil.estDeTypeModificationViaLibelle(
        inscription.typeInscription
      )
    );
  }
};

export function getInscriptionsDeTypeModificationEtRadiation(
  inscriptionsRC?: IInscriptionRc[]
) {
  const inscrptionsRCModification =
    getInscriptionsRCDeTypeModification(inscriptionsRC);
  const inscriptionsRCRadiation =
    getInscriptionsRCDeTypeRadiation(inscriptionsRC);

  return { inscrptionsRCModification, inscriptionsRCRadiation };
}

export function triTableauRCRadiationParDate(
  inscriptionsRC?: IInscriptionRc[]
): IInscriptionRc[] {
  let inscriptionsRcTriees: IInscriptionRc[] = [];

  if (inscriptionsRC) {
    inscriptionsRcTriees = [...inscriptionsRC];
    inscriptionsRcTriees?.sort((inscriptionRc1, inscriptionRc2) => {
      return (
        inscriptionRc1.dateInscription.getTime() -
        inscriptionRc2.dateInscription.getTime()
      );
    });
  }

  return inscriptionsRcTriees;
}
