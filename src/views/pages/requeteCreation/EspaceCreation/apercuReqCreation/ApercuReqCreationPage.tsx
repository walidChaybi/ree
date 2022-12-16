import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ConteneurRetractable from "../../../../common/widget/conteneurRetractable/ConteneurRetractable";
import { useDetailRequeteApiHook } from "../../../requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { OngletPiecesJustificatives } from "./components/OngletPiecesJustificatives";
import ResumeRequeteCreation from "./components/ResumeRequeteCreation";
import { VoletPieceJustificativesEtActions } from "./components/VoletPieceJusticativesEtActions";
import Labels from "./Labels";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";
import "./scss/ApercuReqCreationPage.scss";

export const ApercuReqCreationPageContext = React.createContext({
  setRequete: (requete: IRequeteCreation) => {}
});

const ApercuReqCreationPage: React.FC = () => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreation>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreation);
    }
  }, [detailRequeteState]);

  return (
    <div className="ApercuReqCreationPage">
      {requete && (
        <ApercuReqCreationPageContext.Provider value={{ setRequete }}>
          <ConteneurRetractable
            titre={Labels.resume.requete.description}
            className="ResumeRequeteCreation"
            initConteneurFerme={false}
            estADroite={false}
          >
            <ResumeRequeteCreation
              {...mappingIRequeteCreationVersResumeRequeteCreationProps(
                requete
              )}
            />
          </ConteneurRetractable>

          <VoletPieceJustificativesEtActions requete={requete} />

          <ConteneurRetractable
            titre="Pièces justificatives"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives requete={requete} />
          </ConteneurRetractable>
        </ApercuReqCreationPageContext.Provider>
      )}
    </div>
  );
};

export default ApercuReqCreationPage;
