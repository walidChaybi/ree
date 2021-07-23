import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/v2/IRequeteDelivrance";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { VisionneuseDocument } from "../../../common/widget/document/VisionneuseDocument";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import "./scss/ApercuRequeteTraitementPage.scss";
interface IdRequeteParams {
  idRequete: string;
}

export const ApercuRequeteTraitementPage: React.FC = () => {
  const history = useHistory();
  const { idRequete } = useParams<IdRequeteParams>();
  const [dataHistory] = useState<any>(history.location.state);

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const contenuDocument = useGetDocumentReponseApi(
    getIdDocumentReponseAAfficher(detailRequeteState)
  );

  return (
    <div className="ApercuRequeteTraitement">
      <title>{getLibelle("Aperçu du traitement de la requête")}</title>
      {detailRequeteState && (
        <>
          <BandeauRequete detailRequete={detailRequeteState} />
          <div className="contenu-requete">
            <div className="side left">
              <ResumeRequeteV2 requete={detailRequeteState}></ResumeRequeteV2>
              <SuiviActionsRequete
                actions={detailRequeteState?.actions}
              ></SuiviActionsRequete>
              <SuiviObservationsRequete
                observations={detailRequeteState?.observations}
              />
            </div>
            <div className="side right">
              {dataHistory && dataHistory.info && (
                <div className="MessageInfo">{dataHistory.info}</div>
              )}
              <VisionneuseDocument
                titre={getLibelle("Aperçu des documents")}
                contenu={contenuDocument?.contenu}
                typeMime={contenuDocument?.mimeType}
              />

              <BoutonRetour message={getLibelle("<< Retour")} />
            </div>
          </div>
        </>
      )}
    </div>
  );

  function getIdDocumentReponseAAfficher(requete?: TRequete) {
    let idDocumentAAfficher;
    if (requete?.type === TypeRequete.DELIVRANCE) {
      const requeteDelivrance = requete as IRequeteDelivrance;

      const documentsDeDelivrance = RequeteDelivrance.getDocumentsDeDelivrance(
        requeteDelivrance
      );
      if (documentsDeDelivrance.length > 0) {
        idDocumentAAfficher = documentsDeDelivrance[0].id;
      } else if (requeteDelivrance.documentsReponses.length > 0) {
        idDocumentAAfficher = requeteDelivrance.documentsReponses[0].id;
      }
    }
    return idDocumentAAfficher;
  }
};
