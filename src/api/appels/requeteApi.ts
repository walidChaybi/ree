import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { IFiltreServiceRequeteCreationDto } from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import { IFiltreServiceRequeteDelivranceDto } from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IEchange } from "@model/requete/IEchange";
import {
  IFiltreServiceRequeteInformationDto,
  IFiltresServiceRequeteInformationFormValues
} from "@model/requete/IFiltreServiceRequeteInformation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { SortOrder } from "@widget/tableau/TableUtils";
import { HttpMethod } from "../ApiManager";
import { URL_MENTION } from "./etatcivilApi";

const URL_REQUETES_DELIVRANCE_SERVICE = "/requetes/requetes-service";
const URL_REQUETES_INFO_SERVICE = "/requetes/information/requetes-de-mon-service";
const URL_REQUETES_CREATION_SERVICE = "/requetes/creation/requetes-service";
const URL_REQUETES = "/requetes";
const URL_MES_REQUETES_DELIVRANCE = "/requetes/mesrequetes";
const URL_MES_REQUETES_CREATION = "/requetes/creation/mes-requetes";
const URL_CREATION = "/requetes/creation/";
const URL_SAUVEGARDER_REPONSE_REQINFO = "/requetes/information/reponse";
export const URL_REQUETES_COUNT = "/requetes/count";
const URL_NOMENCLATURE = "/nomenclature";
const URL_REQUETES_DELIVRANCE = "/requetes/delivrance";
const URL_REQUETES_CREATION = "/requetes/creation";
const URL_CHOIX_DELIVRANCE = "/choixdelivrance";
const URL_COURRIER = "/courrier";
const URL_DOCUMENT_REPONSE = "/documentsreponses";
const URL_PIECES_COMPLEMENT_INFORMATION = "/piecescomplementinformations";
const URL_PIECE_COMPLEMENT_INFORMATION = "/piececomplementinformation";
const URL_PIECES_JUSTIFICATIVES = "/piecesjustificatives";
const URL_PIECE_JUSTIFICATIVE = "/piecejustificative";
const URL_FICHIER_PIECE_JUSTIFICATIVE = "/requetes/fichierpiecejustificative/";
const URL_LIBELLE = "/libelle";
const URL_ACTION = "/requetes/action";
const URL_RETOUR_VALIDEUR = "/requetes/action/retourValideur";
const URL_OBSERVATION = "/requetes/observation";
const URL_IGNORER = "/requetes/action/ignorer";
const URL_OPTION_COURRIER = "/optioncourrier";
const URL_REPONSE_REQ_INFO = "/reponse";
const URL_ECHANGE_STATUT = "/requetes/action/retourSdanf";
const URL_DOCUMENT_COMPLEMENTAIRE = "/documentsreponses/documentComplementaire";
const URL_SAUVEGARDE_PERSONNE_ACTE_RMC = "/requetes/creation/sauvegardeDetailsRMC";
const URL_MISE_A_JOUR_SUIVI_DOSSIER = "/requetes/creation/suiviDossier";
const URL_AVANCEMENT_PROJET = "/avancement";
const URL_PIECE_JUSTIFICATIVES_CREATION = "/pieceJustificative";
const URL_SUIVI_DOSSIER = "/suivi-dossier";
const URL_METTRE_AJOUR_STATUT_APRES_SIGNATURE = "/mettre-a-jour-statut-apres-signature";
const URL_PRENDRE_EN_CHARGE_REQUETE_SUIVANTE = "/requetes/creation/requete-a-prendre-en-charge";

export enum TypeAppelRequete {
  REQUETE_DELIVRANCE_SERVICE = "requeteService",
  REQUETE_INFO_SERVICE = "requeteInfoService",
  REQUETE_CREATION_SERVICE = "requeteCreationService",
  MES_REQUETES_DELIVRANCE = "mesRequetes",
  MES_REQUETES_INFO = "mesRequetesInfo",
  MES_REQUETES_CREATION = "mesRequetesCreation"
}

export interface IQueryParametersPourRequetes {
  statuts: string[];
  tri: string;
  sens: SortOrder;
  range?: string;
  sousTypes?: string[];
}

const getApiManager = async () => {
  const { ApiManager } = await import("../ApiManager");
  return ApiManager.getInstance("rece-requete-api", "v2");
};

////////////////////////
/*** API REQUETE V2 ***/
////////////////////////
export const getTableauRequetesDelivrance = (listeStatuts: string, queryParameters: IQueryParametersPourRequetes): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: URL_MES_REQUETES_DELIVRANCE,
      parameters: {
        statuts: listeStatuts,
        tri: queryParameters.tri !== "prioriteRequete" ? queryParameters.tri : "dateStatut",
        sens: queryParameters.sens,
        range: queryParameters.range
      }
    })
  );
};

export const postTableauRequetesDelivranceService = (
  queryParameters: IQueryParametersPourRequetes,
  filtresReq: IFiltreServiceRequeteDelivranceDto
): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: URL_REQUETES_DELIVRANCE_SERVICE,
      parameters: {
        tri: queryParameters.tri !== "prioriteRequete" ? queryParameters.tri : "dateStatut",
        sens: queryParameters.sens,
        range: queryParameters.range
      },
      data: filtresReq
    })
  );
};

export const getRequetesCreation = (listeStatuts: string, queryParameters: IQueryParametersPourRequetes): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: URL_MES_REQUETES_CREATION,
      parameters: {
        statuts: listeStatuts,
        tri: queryParameters.tri !== "prioriteRequete" ? queryParameters.tri : "dateStatut",
        sens: queryParameters.sens,
        range: queryParameters.range,
        sousTypes: queryParameters.sousTypes
      }
    })
  );
};

/* v8 ignore start */
export const postRequetesInformation = (
  queryParameters: IQueryParametersPourRequetes,
  filtresRequetes: IFiltresServiceRequeteInformationFormValues
) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: URL_REQUETES_INFO_SERVICE,
      parameters: {
        tri: queryParameters.tri,
        sens: queryParameters.sens,
        range: queryParameters.range
      },
      data: nettoyerAttributsDto<IFiltreServiceRequeteInformationDto>({
        sousType: filtresRequetes.sousType,
        objet: filtresRequetes.objet,
        idAgent: filtresRequetes.agent?.cle ?? "",
        idService: filtresRequetes.service?.cle ?? "",
        typeRequerant: filtresRequetes.typeRequerant,
        statuts: filtresRequetes.statut ? [filtresRequetes.statut] : queryParameters.statuts
      })
    })
  );
};
/* v8 ignore stop */

export const postRequetesServiceCreation = (
  queryParameters: IQueryParametersPourRequetes,
  filtresReq: IFiltreServiceRequeteCreationDto
): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: URL_REQUETES_CREATION_SERVICE,
      parameters: {
        tri: queryParameters.tri !== "prioriteRequete" ? queryParameters.tri : "dateStatut",
        sens: queryParameters.sens,
        range: queryParameters.range
      },
      data: filtresReq
    })
  );
};

export const getDetailRequete = (idRequete: string, estConsultationHistoriqueAction = false): Promise<any> => {
  let config: any = {
    method: HttpMethod.GET,
    uri: `${URL_REQUETES}/${idRequete}`
  };
  if (estConsultationHistoriqueAction) {
    config = {
      ...config,
      parameters: {
        isConsultationHistoriqueAction: estConsultationHistoriqueAction
      }
    };
  }
  return getApiManager().then(api => api.fetch(config));
};

export const creationRequeteDelivrance = async ({
  requete,
  futurStatut,
  refus = false
}: {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_REQUETES_DELIVRANCE}`,
      data: requete,
      parameters: {
        refus,
        futurStatut: StatutRequete.getKey(futurStatut)
      }
    })
  );
};

export const updateRequeteDelivrance = ({
  idRequete,
  requete,
  futurStatut,
  refus = false
}: {
  idRequete: string;
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}`,
      data: requete,
      parameters: {
        refus,
        futurStatut: StatutRequete.getKey(futurStatut)
      }
    })
  );
};

export const updateChoixDelivrance = async (idRequete: string, choixDelivrance: string | null) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_CHOIX_DELIVRANCE}`,
      parameters: { choixDelivrance }
    })
  );
};

export const mettreAJourStatutApresSignature = async (idRequete: string, idSuiviDossier: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_REQUETES_CREATION}/${idRequete}${URL_SUIVI_DOSSIER}/${idSuiviDossier}${URL_METTRE_AJOUR_STATUT_APRES_SIGNATURE}`
    })
  );
};

export const postSauvCourrierCreerActionMajStatutRequete = async (
  idRequete: string,
  statutRequete: StatutRequete,
  requete: Object,
  libelleAction?: string
) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_REQUETES_DELIVRANCE}/${idRequete}${URL_COURRIER}`,
      parameters: {
        idRequete,
        libelleAction,
        statutRequete: StatutRequete.getKey(statutRequete)
      },
      data: requete
    })
  );
};

export const postSauvegarderDocument = async (idRequete: string, documents: IDocumentReponse[]) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_DOCUMENT_REPONSE}/update/${idRequete}`,
      data: documents
    })
  );
};

export const deleteDocumentsReponseApi = (idRequete: string) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.DELETE,
      uri: `${URL_DOCUMENT_REPONSE}/${idRequete}`
    })
  );
};

export const postDocumentReponseApi = (idRequete: string, documentsReponse: IDocumentReponse[]) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_DOCUMENT_REPONSE}`,
      data: {
        idRequete,
        documentsReponse
      }
    })
  );
};
export const getPieceComplementInformationById = (idPiece: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_REQUETES}${URL_PIECES_COMPLEMENT_INFORMATION}/${idPiece}`
    })
  );
};

export const postPieceComplementInformationApi = (idRequete: string, pieceComplementInformation: any) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_REQUETES}/${idRequete}${URL_PIECE_COMPLEMENT_INFORMATION}`,
      data: pieceComplementInformation
    })
  );
};

export const getPieceJustificativeById = (idPiece: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: `${URL_REQUETES}${URL_PIECES_JUSTIFICATIVES}/${idPiece}`
    })
  );
};

export const postPieceJustificative = (idRequete: string, pieceJustificative: IPieceJustificative) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_REQUETES}/${idRequete}${URL_PIECE_JUSTIFICATIVE}`,
      data: pieceJustificative
    })
  );
};

export const postCreationAction = (idRequete: string, libelleAction: string) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ACTION}`,
      parameters: {
        idRequete,
        libelleAction
      }
    })
  );
};

export const postRetourValideur = (idRequete: string, statutDemande: string, libelleAction: string, texteObservation: string) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_RETOUR_VALIDEUR}`,
      data: {
        idRequete,
        statutDemande,
        libelleAction,
        texteObservation
      }
    })
  );
};

export const postIgnorerRequete = (idRequete: string, texteObservation: string) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: URL_IGNORER,
      parameters: {
        idRequete,
        texteObservation
      }
    })
  );
};

export const getPrendreEnChargeRequeteSuivante = (): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.GET,
      uri: URL_PRENDRE_EN_CHARGE_REQUETE_SUIVANTE
    })
  );
};

export const getOptionsCourriers = async (): Promise<any> => {
  return getApiManager().then(api =>
    api.fetchCache({
      method: HttpMethod.GET,
      uri: `${URL_NOMENCLATURE}${URL_OPTION_COURRIER}`
    })
  );
};

export const getReponsesReqInfo = async (): Promise<any> => {
  return getApiManager().then(api =>
    api.fetchCache({
      method: HttpMethod.GET,
      uri: `${URL_NOMENCLATURE}${URL_REPONSE_REQ_INFO}`
    })
  );
};

export const sauvegarderReponseReqInfo = async (idRequete: string, corpsMailReponse: string, idReponse?: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_SAUVEGARDER_REPONSE_REQINFO}/${idRequete}`,
      data: { corpsMail: corpsMailReponse, idReponse }
    })
  );
};

export const postObservation = (idRequete: string, texteObservation: string, idObservation?: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: URL_OBSERVATION,
      parameters: {
        idRequete,
        texteObservation,
        idObservation
      }
    })
  );
};

export const deleteObservation = (idObservation: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.DELETE,
      uri: URL_OBSERVATION,
      parameters: {
        idObservation
      }
    })
  );
};

export const updateDocumentMention = (id: string, mentionsRetirees?: string[]): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_DOCUMENT_REPONSE}/${id}${URL_MENTION}`,
      data: mentionsRetirees ?? []
    })
  );
};

export const deleteDocumentComplementaire = (idDocumentReponse: string, idRequete: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.DELETE,
      uri: `${URL_DOCUMENT_COMPLEMENTAIRE}/${idDocumentReponse}`,
      parameters: {
        idRequete
      }
    })
  );
};

export const postMessageRetourSDANFEtUpdateStatutRequete = (idRequete: string, message: IEchange) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_ECHANGE_STATUT}`,
      parameters: {
        idRequete
      },
      data: message
    })
  );
};

export const patchMiseAJourLibellePJ = (idPJ: string, nouveauLibelle: string): Promise<any> =>
  getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_FICHIER_PIECE_JUSTIFICATIVE}${idPJ}${URL_LIBELLE}`,
      parameters: {
        nouveauLibelle
      }
    })
  );

export const postSauvegardePersonneEtActeSelectionne = (id: string, data: any): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_SAUVEGARDE_PERSONNE_ACTE_RMC}/${id}`,
      data: data
    })
  );
};

export const patchModificationAvancementProjet = (id: string, data: any): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_MISE_A_JOUR_SUIVI_DOSSIER}/${id}${URL_AVANCEMENT_PROJET}`,
      parameters: {
        avancement: data
      }
    })
  );
};

export const postAjoutPieceJustificativeAUneRequeteCreation = (idRequete: string, data: any): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_CREATION}${idRequete}${URL_PIECE_JUSTIFICATIVES_CREATION}`,
      data
    })
  );
};

export const patchMiseAJourIdSuiviDossier = (idSuiviDossier: string, idActe: string): Promise<any> => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.PATCH,
      uri: `${URL_MISE_A_JOUR_SUIVI_DOSSIER}/${idSuiviDossier}/acte/${idActe}`,
      data: {
        idSuiviDossier,
        idActe
      }
    })
  );
};

export const postValiderProjetActe = (idRequete: string, idSuiviDossier: string) => {
  return getApiManager().then(api =>
    api.fetch({
      method: HttpMethod.POST,
      uri: `${URL_CREATION}${idRequete}${URL_SUIVI_DOSSIER}/${idSuiviDossier}/valider-projet`
    })
  );
};
