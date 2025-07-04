import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { ICreationActionMiseAjourStatutEtRedirectionParams } from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { autorisePrendreEnChargeReqTableauDelivrance, indexParamsReq } from "@util/RequetesUtils";
import { DEUX, UN, ZERO } from "@util/Utils";
import { SortOrder } from "@widget/tableau/TableUtils";

export const goToLinkRequete = (link: string, separator: string): IQueryParametersPourRequetes | undefined => {
  let queryParameters: IQueryParametersPourRequetes | undefined = undefined;
  if (link.indexOf("range") > 0) {
    let params = [];
    const estRequeteService = separator === "requetesService";
    params = link.split(`${separator}?`)[1].split("&");
    queryParameters = {
      statuts: estRequeteService ? [] : [StatutRequete.getEnumFor(params[indexParamsReq.Statut].split("=")[1])],

      tri: params[estRequeteService ? ZERO : indexParamsReq.Tri].split("=")[1],
      sens: params[estRequeteService ? UN : indexParamsReq.Sens].split("=")[1] as SortOrder,
      range: params[estRequeteService ? DEUX : indexParamsReq.Range].split("=")[1]
    };
  }
  return queryParameters;
};

/* v8 ignore start */
export const miseAjourOuRedirection = (
  requeteSelect: IRequeteTableauDelivrance,
  setParamsMiseAJour: React.Dispatch<React.SetStateAction<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>>,
  setNavigationApercuDelivranceParams: (requete: IRequeteTableauDelivrance, urlWithParam: string) => void,
  idRequete: string,
  data: IRequeteTableauDelivrance[],
  idx: number,
  url: string,
  utilisateurConnecte: UtilisateurConnecte
) => {
  const aPrendreEnCharge = autorisePrendreEnChargeReqTableauDelivrance(utilisateurConnecte, requeteSelect);
  const statutARevoir = requeteSelect.statut === StatutRequete.A_REVOIR.libelle;
  const aDocumentASigner = requeteSelect.documentsReponses?.some(document => document.avecCtv);

  if (aPrendreEnCharge || statutARevoir) {
    const statutFutur = (() => {
      switch (true) {
        case aPrendreEnCharge:
          return StatutRequete.PRISE_EN_CHARGE;
        case aDocumentASigner:
          return StatutRequete.A_SIGNER;
        default:
          return StatutRequete.A_VALIDER;
      }
    })();

    setParamsMiseAJour({
      libelleAction: statutFutur.libelle,
      statutRequete: statutFutur,
      requete: requeteSelect,
      urlCourante: url,
      typeRequete: TypeRequete.DELIVRANCE
    });
  } else {
    setNavigationApercuDelivranceParams(data[idx], url);
  }
};
/* v8 ignore end */
