import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurPieceJustificative,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "./ApercuReqCreationEtablissementUtils";
import { OngletsApercuCreationEtablissementSimple } from "./composants/OngletsApercuCreationEtablissementSimple";

interface ApercuReqCreationEtablissementSimplePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationEtablissementSimplePage: React.FC<
  ApercuReqCreationEtablissementSimplePageProps
> = props => {
  // Params & History
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();

  // States
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(
    props.idRequeteAAfficher ?? idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationEtablissement);
    }
  }, [detailRequeteState]);

  function onRenommePieceJustificativeSimple(
    idPieceJustificative: string,
    nouveauLibelle: string,
    idDocumentPJ?: string
  ) {
    onRenommePieceJustificativeEtablissement(
      requete,
      setRequete,
      idPieceJustificative,
      nouveauLibelle,
      idDocumentPJ
    );
  }

  return (
    <div className="ApercuReqCreationEtablissementSimplePage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}

          <OngletsApercuCreationEtablissementSimple
            requete={requete}
            modeConsultation={props.idRequeteAAfficher !== undefined}
            onRenommePieceJustificative={onRenommePieceJustificativeSimple}
          />

          {getConteneurPieceJustificative(
            requete,
            onRenommePieceJustificativeSimple
          )}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
