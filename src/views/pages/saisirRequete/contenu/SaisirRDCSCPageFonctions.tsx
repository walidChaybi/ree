import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "../../../../model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { IRequerant } from "../../../../model/requete/v2/IRequerant";
import messageManager from "../../../common/util/messageManager";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getLibelle } from "../../../common/widget/Text";
import {
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE
} from "../../../router/ReceUrls";
import { getRequerant } from "../hook/mappingFormulaireRDCSCVersRequeteDelivrance";
import { SaisieRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";

export function getRedirectionVersApercuRequete(
  pathname: string,
  idRequeteSauvegardee: string
) {
  let url = "";
  if (pathname.startsWith(URL_MES_REQUETES_SAISIR_RDCSC)) {
    url = getUrlWithParam(
      URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE,
      idRequeteSauvegardee
    );
  }
  if (pathname.startsWith(URL_REQUETES_SERVICE_SAISIR_RDCSC)) {
    url = getUrlWithParam(
      URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE,
      idRequeteSauvegardee
    );
  }
  return url;
}

export function createReponseSansDelivranceCS(requete?: SaisieRequeteRDCSC) {
  let reponseSansDelivranceCS = {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  if (requete && requete.requerant) {
    const requerant = getRequerant(requete) as IRequerant;
    reponseSansDelivranceCS = ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(
      requerant,
      TypeCanal.COURRIER
    );
  } else {
    messageManager.showErrorAndClose(
      "Erreur inattendue: Pas de requérent pour la requête"
    );
  }

  return reponseSansDelivranceCS;
}

/** Elements Popin "Courrier de refus" */
export function getMessagesPopin() {
  return [
    getLibelle(
      "Des données obligatoires de la naissance du titulaire sont manquantes."
    ),
    getLibelle(
      "Un courrier de refus va être automatiquement envoyé au requérant (Veuillez vérifier son adresse postale)."
    ),
    getLibelle("Voulez-vous valider le refus ?")
  ];
}
