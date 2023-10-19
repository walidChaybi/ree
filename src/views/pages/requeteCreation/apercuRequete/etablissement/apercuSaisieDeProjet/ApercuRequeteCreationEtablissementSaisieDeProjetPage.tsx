import { RECEContext } from "@core/body/RECEContext";
import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { IUuidSuiviDossierParams } from "@model/params/IUuidSuiviDossierParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { ZERO, checkDirty, getLibelle } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";
import { OngletsApercuCreationEtablissementSaisieProjet } from "./contenu/OngletsApercuCreationEtablissementSaisieProjet";
import { SaisiePostulantForm } from "./contenu/saisiePostulantForm/SaisiePostulantForm";

interface ApercuRequeteCreationEtablissementSaisieDeProjetPageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteCreationEtablissementSaisieDeProjetPage: React.FC<
  ApercuRequeteCreationEtablissementSaisieDeProjetPageProps
> = props => {
  const { idRequeteParam } = useParams<IUuidSuiviDossierParams>();
  const history = useHistory();

  const { isDirty, setIsDirty } = useContext(RECEContext);
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [ongletSelectionne, setOngletSelectionne] = useState(ZERO);
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
    rechargerLaRequete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idRequeteAAfficher, history.location.pathname, idRequeteParam]);

  function rechargerLaRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: history.location.pathname.includes(URL_RECHERCHE_REQUETE)
    });
  }

  function onRenommePieceJustificativeSaisieProjet(
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

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    checkDirty(isDirty, setIsDirty) && setOngletSelectionne(parseInt(newValue));
  };

  return (
    <div className="ApercuReqCreationEtablissementSaisieProjetPage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete, true)}

          <OngletsApercuCreationEtablissementSaisieProjet
            requete={requete}
            onRenommePieceJustificative={
              onRenommePieceJustificativeSaisieProjet
            }
            resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
            dataActesInscriptionsSelectionnes={
              dataActesInscriptionsSelectionnes
            }
            setDataActesInscriptionsSelectionnes={
              setDataActesInscriptionsSelectionnes
            }
            tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
            setRmcAutoPersonneParams={setRmcAutoPersonneParams}
            rechargerRequete={rechargerLaRequete}
          />
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={getOnglets(requete)}
              ongletSelectionne={ongletSelectionne}
              handleChange={handleChange}
            />
          </div>
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};

function getOnglets(
  requeteCreation: IRequeteCreationEtablissement
): ItemListe[] {
  return [
    {
      titre: getLibelle("Postulant"),
      component: (
        <SaisiePostulantForm
          titulaires={requeteCreation.titulaires || []}
          nature={requeteCreation.nature}
        />
      ),
      index: 0
    },
    {
      titre: getLibelle("Echanges"),
      component: <Echanges />,
      index: 1
    }
  ];
}
