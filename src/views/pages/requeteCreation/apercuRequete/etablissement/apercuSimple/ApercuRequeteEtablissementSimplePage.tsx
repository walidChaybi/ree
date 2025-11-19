import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "../../../../../common/hook/requete/DetailRequeteHook";
import { OngletPiecesJustificatives } from "../../../commun/composants/OngletPiecesJustificatives";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import { SuiviDossier } from "../apercuPriseEnCharge/contenu/SuiviDossier";
import {
  getConteneurPieceJustificative,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteEtablissementUtils";
import { BoutonsApercuRequeteCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";

interface ApercuRequeteEtablissementSimplePageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteEtablissementSimplePage: React.FC<ApercuRequeteEtablissementSimplePageProps> = props => {
  // Params & History
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const location = useLocation();

  // States
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});

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
  }, [props.idRequeteAAfficher, location.pathname, idRequeteParam]);

  function rechargerRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultationHistoriqueAction: true
    });
  }

  function onRenommePieceJustificativeSimple(idPieceJustificative: string, nouveauLibelle: string, idDocumentPJ?: string) {
    onRenommePieceJustificativeEtablissement(requete, setRequete, idPieceJustificative, nouveauLibelle, idDocumentPJ);
  }

  const liste: ItemListe[] = [
    {
      titre: "Pièces justificatives / Annexes",
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={rechargerRequete}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={onRenommePieceJustificativeSimple}
        />
      ),
      index: 0
    },
    {
      titre: "Suivi dossier",
      component: (
        <SuiviDossier
          echanges={requete?.provenanceNatali?.echanges}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          modeConsultation={props.idRequeteAAfficher !== undefined}
        />
      ),
      index: 1
    }
  ];

  return (
    <div className="ApercuReqCreationEtablissementSimplePage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}

          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet liste={liste} />
            <BoutonsApercuRequeteCreationEtablissement requete={requete} />
          </div>

          {getConteneurPieceJustificative(requete, onRenommePieceJustificativeSimple, rechargerRequete)}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
