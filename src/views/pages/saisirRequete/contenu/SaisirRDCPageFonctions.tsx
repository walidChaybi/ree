import { TypeNatureActe } from "../../../../model/requete/v2/enum/TypeNatureActe";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getLibelle } from "../../../common/widget/Text";
import {
  URL_MES_REQUETES_SAISIR_RDC,
  URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDC,
  URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE
} from "../../../router/ReceUrls";
import { SaisieRequeteRDC } from "../modelForm/ISaisirRDCPageModel";

/** Elements Popin "Confirmation" */
export function getMessagesPopin() {
  return [
    getLibelle(
      "Des données obligatoires du motif ou de l'événement sont manquantes."
    ),
    getLibelle("Voulez-vous continuer ?")
  ];
}

export function verifierDonneesObligatoires(values: SaisieRequeteRDC) {
  const motif = values.requete.motif;

  if (
    TypeNatureActe.NAISSANCE ===
    TypeNatureActe.getEnumFor(values.requete.natureActe)
  ) {
    const titulaire1 = values.titulaire1;
    return (
      titulaire1.naissance.dateEvenement.annee !== "" &&
      titulaire1.naissance.villeEvenement !== "" &&
      titulaire1.naissance.paysEvenement !== "" &&
      motif !== ""
    );
  }

  return (
    values.evenement.dateEvenement.annee !== "" &&
    values.evenement.villeEvenement !== "" &&
    values.evenement.paysEvenement !== "" &&
    motif !== ""
  );
}

export function getRedirectionVersApercuRequete(
  pathname: string,
  idRequeteSauvegardee: string
) {
  let url = "";
  if (pathname.startsWith(URL_MES_REQUETES_SAISIR_RDC)) {
    url = getUrlWithParam(
      URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE,
      idRequeteSauvegardee
    );
  }
  if (pathname.startsWith(URL_REQUETES_SERVICE_SAISIR_RDC)) {
    url = getUrlWithParam(
      URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE,
      idRequeteSauvegardee
    );
  }
  return url;
}
