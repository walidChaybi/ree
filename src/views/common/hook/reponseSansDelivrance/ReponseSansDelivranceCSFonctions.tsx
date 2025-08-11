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
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import AfficherMessage from "../../../../utils/AfficherMessage";

const ERREUR_PAS_DE_REQUERENT = "Erreur inattendue: Pas de requérant pour la requête";

/** REQUETE_INCOMPLETE_ILLISIBLE */
export const createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete = (
  requete?: IRequeteDelivrance
): IReponseSansDelivranceCSDemandeIncompleteComposition => {
  if (requete?.requerant) {
    return ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(requete);
  } else {
    AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
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
  AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
  return {} as IReponseSansDelivranceCSPACSNonInscritComposition;
};

/** ACTION_RESSORTISSANT_FRANCAIS */
export const createReponseSansDelivranceCSPourCompositionApiFrancais = (
  requete: IRequeteDelivrance
): IReponseSansDelivranceCSFrancaisComposition => {
  if (requete.requerant) {
    return ReponseSansDelivranceCSFrancaisComposition.creerReponseSansDelivranceCS(requete);
  }
  AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
  return {} as IReponseSansDelivranceCSFrancaisComposition;
};

/** TRACE_MARIAGE_ACTIF */
export const createReponseSansDelivranceCSPourCompositionApiMariage = async (
  requete: IRequeteDelivrance,
  acte: ResultatRMCActe | undefined
): Promise<IReponseSansDelivranceCSMariageComposition> => {
  if (requete?.requerant && acte) {
    const infoActe = await getInformationsFicheActe(acte.id);
    return ReponseSansDelivranceCSMariageComposition.creerReponseSansDelivranceCS(requete, mapActe(infoActe.body.data));
  }
  AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
  return {} as IReponseSansDelivranceCSMariageComposition;
};

export function estSeulementActeMariage(
  requete: IRequeteDelivrance,
  actes: ResultatRMCActe[] | undefined,
  inscriptions: TResultatRMCInscription[] | undefined
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

const estSeulementActeMariageSelectionne = (actes: ResultatRMCActe[] | undefined): boolean =>
  actes?.length === 1 && actes[0].nature === "MARIAGE";
