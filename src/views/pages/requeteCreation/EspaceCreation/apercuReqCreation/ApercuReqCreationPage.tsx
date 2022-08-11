import React from "react";
import { useParams } from "react-router";
import { IUuidRequeteParams } from "../../../../../model/params/IUuidRequeteParams";
import { IRequeteCreation } from "../../../../../model/requete/IRequeteCreation";
import { useDetailRequeteApiHook } from "../../../requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import ResumeRequeteCreation from "./components/ResumeRequeteCreation";
import { VoletPieceJustificativesEtActions } from "./components/VoletPieceJusticativesEtActions";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";
import "./scss/ApercuReqCreationPage.scss";

const ApercuReqCreationPage: React.FC = () => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequeteParam);

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
