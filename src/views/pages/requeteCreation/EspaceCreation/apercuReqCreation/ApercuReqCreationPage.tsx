import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import React from "react";
import { useHistory, useParams } from "react-router";
import { useDetailRequeteApiHook } from "../../../requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import ResumeRequeteCreation from "./components/ResumeRequeteCreation";
import { VoletPieceJustificativesEtActions } from "./components/VoletPieceJusticativesEtActions";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";
import "./scss/ApercuReqCreationPage.scss";

const ApercuReqCreationPage: React.FC = () => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  return (
    <div className="ApercuReqCreationPage">
      {detailRequeteState && (
        <>
          <ResumeRequeteCreation
            {...mappingIRequeteCreationVersResumeRequeteCreationProps(
              detailRequeteState as IRequeteCreation
            )}
          />

          <VoletPieceJustificativesEtActions
            requete={detailRequeteState as IRequeteCreation}
          />
        </>
      )}
    </div>
  );
};

export default ApercuReqCreationPage;
