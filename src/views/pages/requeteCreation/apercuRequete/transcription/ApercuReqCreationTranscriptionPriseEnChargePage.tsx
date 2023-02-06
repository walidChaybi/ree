import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useRMCAutoPersonneApiHook } from "@pages/rechercheMultiCriteres/autoPersonne/hook/RMCAutoPersonneApiHook";
import { AnalyseDuDossier } from "@pages/requeteCreation/commun/composants/AnalyseDuDossier";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/OngletRMCPersonne";
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
import { onRenommePieceJustificative } from "./ApercuReqCreationTranscriptionUtil";

interface ApercuReqCreationTranscriptionPriseEnChargeProps {}

export const ApercuReqCreationTranscriptionPriseEnChargePage: React.FC<
  ApercuReqCreationTranscriptionPriseEnChargeProps
> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const history = useHistory();
  const { resultatRMCAutoPersonne } = useRMCAutoPersonneApiHook(requete);
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  function onRenommePieceJustificativeApercuPriseEnCharge(
    idPieceJustificative: string,
    nouveauLibelle: string
  ) {
    onRenommePieceJustificative(
      idPieceJustificative,
      nouveauLibelle,
      requete,
      setRequete
    );
  }

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
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuPriseEnCharge
                }
              />
            ),
            index: 0
          },
          {
            titre: "RMC",
            component: (
              <OngletRMCPersonne
                rmcAutoPersonneResultat={resultatRMCAutoPersonne}
              />
            ),
            index: 1
          },
          {
            titre: "Analyse du dossier",
            component: <AnalyseDuDossier />,
            index: 2
          }
        ]
      : [];
  }

  return (
    <div className="ApercuReqCreationTranscriptionPriseEnChargePage">
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
            titre="Pièces justificatives"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives
              requete={requete}
              onRenommePieceJustificative={
                onRenommePieceJustificativeApercuPriseEnCharge
              }
            />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
