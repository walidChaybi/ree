import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { IUuidActeParams } from "@model/params/IUuidActeParams";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { DEUX, getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";

interface ApercuRequeteCreationEtablissementActeRegistreProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteCreationEtablissementActeRegistre: React.FC<
  ApercuRequeteCreationEtablissementActeRegistreProps
> = props => {
  const { idRequeteParam, idActeParam } = useParams<IUuidActeParams>();
  const history = useHistory();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  const {
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes,
    setRmcAutoPersonneParams,
    resultatRMCAutoPersonne,
    rmcAutoPersonneEnChargement
  } = useDataTableauxOngletRMCPersonne(requete);

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

  function onRenommePieceJustificativeActeRegistre(
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

  const listeOngletsGauche: ItemListe[] = [
    {
      titre: getLibelle("RMC"),
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
          sousTypeRequete={requete?.sousType}
          listeTitulaires={requete?.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(requete?.nature)}
          tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
          tableauActesInscriptionsSelectionnesEnChargement={
            !dataActesInscriptionsSelectionnes
          }
          dataActesInscriptionsSelectionnes={
            dataActesInscriptionsSelectionnes || []
          }
          setDataActesInscriptionsSelectionnes={
            setDataActesInscriptionsSelectionnes
          }
          setRmcAutoPersonneParams={setRmcAutoPersonneParams}
        />
      ),
      index: ZERO
    },
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={rechargerRequete}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={onRenommePieceJustificativeActeRegistre}
        />
      ),
      index: UN
    },
    {
      titre: getLibelle("Acte Registre"),
      component: <ActeRegistre idActeAAfficher={idActeParam} />,
      index: DEUX
    }
  ];

  return (
    <div className="ApercuReqCreationEtablissementSaisieProjetPage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={listeOngletsGauche}
              ongletParDefault={DEUX}
            />
          </div>
          {/* TODO: remettre onglet "Echange" une fois que celui ci sera developpé (on le retire car vide donc inutile) */}
          {/* <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet liste={listeOngletsDroit} checkDirty={true} />
          </div> */}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
