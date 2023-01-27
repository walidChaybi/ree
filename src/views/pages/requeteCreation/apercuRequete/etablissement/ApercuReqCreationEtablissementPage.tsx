import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ConteneurRetractable from "../../../../common/widget/conteneurRetractable/ConteneurRetractable";
import { useDetailRequeteApiHook } from "../../../requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import ResumeRequeteCreation from "./composants/ResumeRequeteCreation";
import { VoletPieceJustificativesEtActions } from "./composants/VoletPieceJusticativesEtActions";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";

export const ApercuReqCreationPageContext = React.createContext({
  setRequete: (requete: IRequeteCreationEtablissement) => {}
});

export const ApercuReqCreationEtablissementPage: React.FC = () => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationEtablissement);
    }
  }, [detailRequeteState]);

  return (
    <div className="ApercuReqCreationEtablissementPage">
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
