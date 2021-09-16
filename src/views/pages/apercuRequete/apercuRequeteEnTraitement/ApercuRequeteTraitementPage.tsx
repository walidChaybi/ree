import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { getIdDocumentReponseAAfficher } from "../../../common/util/RequetesUtils";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { BoutonModifierTraitement } from "../contenu/BoutonModifierTraitement";
import { BoutonSignerValider } from "../contenu/BoutonSignerValider";
import {
  DocumentsReponses,
  InfoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import "./scss/ApercuRequeteTraitementPage.scss";
import { VisionneuseApercuTraitement } from "./VisionneuseApercuTraitement";
interface IdRequeteParams {
  idRequete: string;
}

export const ApercuRequeteTraitementPage: React.FC = () => {
  const history = useHistory();
  const { idRequete } = useParams<IdRequeteParams>();
  const [dataHistory] = useState<any>(history.location.state);
  const [documentAffiche, setDocumentAffiche] = useState<InfoDocumentAffiche>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
  const contenuDocument = useGetDocumentReponseApi(documentAffiche?.id);

  useEffect(() => {
    if (detailRequeteState) {
      setDocumentAffiche({
        id: getIdDocumentReponseAAfficher(detailRequeteState)
      });
    }
  }, [detailRequeteState]);

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
              <DocumentsReponses
                documents={
                  (detailRequeteState as IRequeteDelivrance).documentsReponses
                }
                setDocumentAffiche={setDocumentAffiche}
              />
            </div>
            <div className="side right">
              {dataHistory && dataHistory.info && (
                <div className="MessageInfo">{dataHistory.info}</div>
              )}
              <VisionneuseApercuTraitement
                requete={detailRequeteState}
                contenu={contenuDocument?.contenu}
                typeMime={contenuDocument?.mimeType}
              />
              <BoutonModifierTraitement
                requete={detailRequeteState}
                dataHistory={dataHistory}
              />
              <BoutonSignerValider requete={detailRequeteState} />
              <BoutonRetour message={getLibelle("<< Retour")} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
