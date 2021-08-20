import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { getIdDocumentReponseAAfficher } from "../../../common/util/RequetesUtils";
import { VisionneuseDocument } from "../../../common/widget/document/VisionneuseDocument";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { BoutonPrendreEnCharge } from "../contenu/BoutonPrendreEnCharge";
import {
  DocumentsReponses,
  infoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
interface IdRequeteParams {
  idRequete: string;
}

export const ApercuRequetePageV2: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();
  const [documentAffiche, setDocumentAffiche] = useState<infoDocumentAffiche>();

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
    <div className="ApercuRequete">
      <title>{getLibelle("Aperçu de la requête")}</title>
      {detailRequeteState && (
        <>
          <BandeauRequete detailRequete={detailRequeteState} />
          <div className="contenu-requete">
            <div className="side left">
              <ResumeRequeteV2 requete={detailRequeteState}></ResumeRequeteV2>
              <SuiviActionsRequete
                actions={detailRequeteState.actions}
              ></SuiviActionsRequete>
              <SuiviObservationsRequete
                observations={detailRequeteState?.observations}
              ></SuiviObservationsRequete>
              <DocumentsReponses
                documents={
                  (detailRequeteState as IRequeteDelivrance).documentsReponses
                }
                setDocumentAffiche={setDocumentAffiche}
              />
            </div>
            <div className="side right">
              <VisionneuseDocument
                titre={getLibelle("Aperçu des documents")}
                contenu={contenuDocument ? contenuDocument.contenu : ""}
                typeMime={contenuDocument?.mimeType}
              />
              <BoutonPrendreEnCharge
                requete={detailRequeteState}
              ></BoutonPrendreEnCharge>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
