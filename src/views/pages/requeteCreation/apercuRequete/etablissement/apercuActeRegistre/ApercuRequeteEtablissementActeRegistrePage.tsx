import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { DEUX, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import { getConteneurResumeRequete, onRenommePieceJustificativeEtablissement } from "../commun/ApercuRequeteEtablissementUtils";
import { BoutonsApercuRequeteCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteEtablissementActeRegistrePage: React.FC = () => {
  const { idRequeteParam, idActeParam } = useParams<TUuidActeParams>();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});

  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  const tousLesProjetsActesSontSignes = () => {
    return requete?.titulaires?.every(titulaire => {
      return titulaire?.suiviDossiers?.every(suiviDossier => AvancementProjetActe.estSigne(suiviDossier.avancement));
    });
  };

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
  }, [idRequeteParam]);

  function rechargerRequete() {
    if (idRequeteParam) {
      setDetailRequeteParams({
        idRequete: idRequeteParam,
        estConsultationHistoriqueAction: true
      });
    }
  }

  function onRenommePieceJustificativeActeRegistre(idPieceJustificative: string, nouveauLibelle: string, idDocumentPJ?: string) {
    onRenommePieceJustificativeEtablissement(requete, setRequete, idPieceJustificative, nouveauLibelle, idDocumentPJ);
  }

  const listeOngletsGauche: ItemListe[] = [
    {
      titre: "RMC",
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
          sousTypeRequete={requete?.sousType}
          listeTitulaires={requete?.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(requete?.nature)}
          tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
          tableauActesInscriptionsSelectionnesEnChargement={!dataActesInscriptionsSelectionnes}
          dataActesInscriptionsSelectionnes={dataActesInscriptionsSelectionnes || []}
          setDataActesInscriptionsSelectionnes={setDataActesInscriptionsSelectionnes}
          setRmcAutoPersonneParams={setRmcAutoPersonneParams}
        />
      ),
      index: ZERO
    },
    {
      titre: "Pièces justificatives / Annexes",
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
      titre: "Acte Registre",
      component: (
        <ActeRegistre
          idActeAAfficher={idActeParam}
          affichageApresSignature={true}
        />
      ),
      index: DEUX
    }
  ];

  return (
    <div className="ApercuReqCreationEtablissementSaisieProjetPage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete, true)}
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={listeOngletsGauche}
              ongletParDefault={DEUX}
            />
            <BoutonsApercuRequeteCreationEtablissement
              requete={requete}
              tousLesProjetsSontSignes={tousLesProjetsActesSontSignes()}
            />
          </div>
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
