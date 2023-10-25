import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurPieceJustificative,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import { BoutonsApercuCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";

interface ApercuRequeteCreationEtablissementSimplePageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteCreationEtablissementSimplePage: React.FC<
  ApercuRequeteCreationEtablissementSimplePageProps
> = props => {
  // Params & History
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();

  // States
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationEtablissement);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    rechargerRequete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idRequeteAAfficher, history.location.pathname, idRequeteParam]);

  function rechargerRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: history.location.pathname.includes(URL_RECHERCHE_REQUETE)
    });
  }

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

  const liste: ItemListe[] = [
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={rechargerRequete}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={onRenommePieceJustificativeSimple}
        />
      ),
      index: 0
    }
  ];

  return (
    <div className="ApercuReqCreationEtablissementSimplePage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}

          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet liste={liste} />
            <BoutonsApercuCreationEtablissement requete={requete} />
          </div>

          {getConteneurPieceJustificative(
            requete,
            onRenommePieceJustificativeSimple,
            rechargerRequete
          )}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
