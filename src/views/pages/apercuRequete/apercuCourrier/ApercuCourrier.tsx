import React from "react";
import { useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { DocumentsReponses } from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import { Courrier } from "./contenu/Courrier";

interface IdRequeteParams {
  idRequete: string;
}

export const ApercuCourrier: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

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
              />
            </div>
            <div className="side right">
              <Courrier requete={detailRequeteState as IRequeteDelivrance} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
