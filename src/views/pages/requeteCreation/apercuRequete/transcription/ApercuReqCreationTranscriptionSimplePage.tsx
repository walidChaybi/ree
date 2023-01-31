import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { useDetailRequeteApiHook } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import ResumeRequeteCreation from "../etablissement/composants/ResumeRequeteCreation";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "../etablissement/mappingIRequeteCreationVersResumeRequeteCreationProps";

interface ApercuReqCreationTranscriptionSimplePageProps {}

export const ApercuReqCreationTranscriptionSimplePage: React.FC<
  ApercuReqCreationTranscriptionSimplePageProps
> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

  function getListeOnglets(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Pièces justificatives / Annexes",
            component: (
              <OngletPiecesJustificatives
                requete={requete}
                autoriseOuvertureFenetreExt={true}
              />
            ),

            index: 1
          }
        ]
      : [];
  }

  return (
    <div className="ApercuReqCreationTranscriptionSimplePage">
      {requete && (
        <>
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

          <VoletAvecOnglet
            liste={getListeOnglets()}
            ongletSelectionne={ongletSelectionne}
            handleChange={handleChange}
          />

          <ConteneurRetractable
            titre="Pièces justificatives / Annexes"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives requete={requete} />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
