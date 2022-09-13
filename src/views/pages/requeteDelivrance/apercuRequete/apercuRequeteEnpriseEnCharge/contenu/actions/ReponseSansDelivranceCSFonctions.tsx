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
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import messageManager from "@util/messageManager";

const ERREUR_PAS_DE_REQUERENT =
  "Erreur inattendue: Pas de requérant pour la requête";

/** REQUETE_INCOMPLETE_ILLISIBLE */
export const createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete =
  async (requete?: IRequeteDelivrance) => {
    let reponseSansDelivranceCS =
      {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
    if (requete && requete.requerant) {
      reponseSansDelivranceCS =
        ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(
          requete.requerant,
          requete.canal,
          requete.numero
        );
    } else {
      messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
    }

    return reponseSansDelivranceCS;
  };

/** ACTION_RESSORTISSANT_FRANCAIS */
export const createReponseSansDelivranceCSPourCompositionApiFrancais = async (
  requete: IRequeteDelivrance
) => {
  let reponseSansDelivranceCS =
    {} as IReponseSansDelivranceCSFrancaisComposition;
  if (requete && requete.requerant) {
    reponseSansDelivranceCS =
      ReponseSansDelivranceCSFrancaisComposition.creerReponseSansDelivranceCS(
        requete
      );
  } else {
    messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
  }

  return reponseSansDelivranceCS;
};

/** TRACE_MARIAGE_ACTIF */
export const createReponseSansDelivranceCSPourCompositionApiMariage = async (
  requete: IRequeteDelivrance,
  acte: IResultatRMCActe | undefined
) => {
  let reponseSansDelivranceCS =
    {} as IReponseSansDelivranceCSMariageComposition;
  if (requete && requete.requerant && acte) {
    const infoActe = await getInformationsFicheActe(acte.idActe);
    reponseSansDelivranceCS =
      ReponseSansDelivranceCSMariageComposition.creerReponseSansDelivranceCS(
        requete,
        mapActe(infoActe.body.data)
      );
  } else {
    messageManager.showErrorAndClose(ERREUR_PAS_DE_REQUERENT);
  }

  return reponseSansDelivranceCS;
};

export function estSeulementActeMariage(
  requete: IRequeteDelivrance,
  actes: IResultatRMCActe[] | undefined,
  inscriptions: IResultatRMCInscription[] | undefined
): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const sousType: string = requete?.sousType?.nom;
    return (
      (SousTypeDelivrance.RDCSC.nom === sousType ||
        SousTypeDelivrance.RDCSD.nom === sousType) &&
      (inscriptions?.length === undefined || inscriptions?.length === 0) &&
      estSeulementActeMariageSelectionne(actes)
    );
  }
  return true;
}

function estSeulementActeMariageSelectionne(
  actes: IResultatRMCActe[] | undefined
): boolean {
  return actes?.length === 1 && actes[0].nature === NatureActe.MARIAGE.libelle;
}
