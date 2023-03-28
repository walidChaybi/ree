import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import {
  getComposantResumeRequeteEnFonctionNatureActe,
  onRenommePieceJustificative
} from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionSimplePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionSimplePage: React.FC<
  ApercuReqCreationTranscriptionSimplePageProps
> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    props.idRequeteAAfficher ?? idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

  function onRenommePieceJustificativeApercuSimple(
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

  function getListeOnglets(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Pièces justificatives / Annexes",
            component: (
              <OngletPiecesJustificatives
                requete={requete}
                autoriseOuvertureFenetreExt={true}
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuSimple
                }
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
            {getComposantResumeRequeteEnFonctionNatureActe(requete)}

            {!estModeConsultation && (
              <RMCRequetesAssocieesResultats requete={requete as IRequete} />
            )}
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
            <OngletPiecesJustificatives
              requete={requete}
              onRenommePieceJustificative={
                onRenommePieceJustificativeApercuSimple
              }
            />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
