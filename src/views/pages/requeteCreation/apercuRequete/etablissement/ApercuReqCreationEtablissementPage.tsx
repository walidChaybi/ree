import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDetailRequeteApiHook } from "../../../../common/hook/requete/DetailRequeteHook";
import ConteneurRetractable from "../../../../common/widget/conteneurRetractable/ConteneurRetractable";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import ResumeRequeteCreation from "./composants/ResumeRequeteCreation";
import { VoletPieceJustificativesEtActions } from "./composants/VoletPieceJusticativesEtActions";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";

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

  function onRenommePieceJustificative(
    idPieceJustificative: string,
    nouveauLibelle: string,
    idDocumentPJ?: string
  ) {
    const pjARenommer = RequeteCreationEtablissement.getPieceJustificative(
      requete,
      idDocumentPJ,
      idPieceJustificative
    );
    if (pjARenommer) {
      pjARenommer.libelle = nouveauLibelle;
      setRequete({ ...requete } as IRequeteCreationEtablissement);
    }
  }

  return (
    <div className="ApercuReqCreationEtablissementPage">
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

          <VoletPieceJustificativesEtActions
            requete={requete}
            onRenommePieceJustificative={onRenommePieceJustificative}
          />

          <ConteneurRetractable
            titre="Pièces justificatives"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives
              requete={requete}
              onRenommePieceJustificative={onRenommePieceJustificative}
            />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
