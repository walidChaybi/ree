import { getInformationsFicheActe } from "@api/appels/etatcivilApi";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import {
  IReponseSansDelivranceCSFrancaisComposition,
  ReponseSansDelivranceCSFrancaisComposition
} from "@model/composition/IReponseSansDelivranceCSFrancaisComposition";
import {
  IReponseSansDelivranceCSMariageComposition,
  ReponseSansDelivranceCSMariageComposition
} from "@model/composition/IReponseSansDelivranceCSMariageComposition";
import {
  IReponseSansDelivranceCSPACSNonInscritComposition,
  ReponseSansDelivranceCSPACSNonInscritComposition
} from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import messageManager from "@util/messageManager";

const ERREUR_PAS_DE_REQUERENT = "Erreur inattendue: Pas de requérant pour la requête";

/** REQUETE_INCOMPLETE_ILLISIBLE */
export const createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete = (
  requete?: IRequeteDelivrance
): IReponseSansDelivranceCSDemandeIncompleteComposition => {
  if (requete?.requerant) {
    return ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(requete);
  } else {
    messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
    return {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  }
};

/** PACS_NON_INSCRIT */
export const createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit = (
  requete: IRequeteDelivrance
): IReponseSansDelivranceCSPACSNonInscritComposition => {
  if (requete?.requerant) {
    return ReponseSansDelivranceCSPACSNonInscritComposition.creerReponseSansDelivranceCS(requete, requete.canal);
  }
  messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
  return {} as IReponseSansDelivranceCSPACSNonInscritComposition;
};

/** ACTION_RESSORTISSANT_FRANCAIS */
export const createReponseSansDelivranceCSPourCompositionApiFrancais = (
  requete: IRequeteDelivrance
): IReponseSansDelivranceCSFrancaisComposition => {
  if (requete.requerant) {
    return ReponseSansDelivranceCSFrancaisComposition.creerReponseSansDelivranceCS(requete);
  }
  messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
  return {} as IReponseSansDelivranceCSFrancaisComposition;
};

/** TRACE_MARIAGE_ACTIF */
export const createReponseSansDelivranceCSPourCompositionApiMariage = async (
  requete: IRequeteDelivrance,
  acte: IResultatRMCActe | undefined
): Promise<IReponseSansDelivranceCSMariageComposition> => {
  if (requete?.requerant && acte) {
    const infoActe = await getInformationsFicheActe(acte.idActe);
    return ReponseSansDelivranceCSMariageComposition.creerReponseSansDelivranceCS(requete, mapActe(infoActe.body.data));
  }
  messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
  return {} as IReponseSansDelivranceCSMariageComposition;
};

export function estSeulementActeMariage(
  requete: IRequeteDelivrance,
  actes: IResultatRMCActe[] | undefined,
  inscriptions: IResultatRMCInscription[] | undefined
): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const sousType: string = requete?.sousType?.nom;
    return (
      (SousTypeDelivrance.RDCSC.nom === sousType || SousTypeDelivrance.RDCSD.nom === sousType) &&
      (inscriptions?.length === undefined || inscriptions?.length === 0) &&
      estSeulementActeMariageSelectionne(actes)
    );
  }
  return true;
}

const estSeulementActeMariageSelectionne = (actes: IResultatRMCActe[] | undefined): boolean =>
  actes?.length === 1 && actes[0].nature === NatureActe.MARIAGE.libelle;
