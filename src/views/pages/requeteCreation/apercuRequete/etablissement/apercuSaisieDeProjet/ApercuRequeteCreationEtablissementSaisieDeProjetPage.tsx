import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidEtatCivilParams } from "@model/params/IUuidEtatCivilParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { getLibelle, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
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
  const { idRequeteParam } = useParams<IUuidEtatCivilParams>();
  const history = useHistory();

  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [ongletSelectionne, setOngletSelectionne] = useState(ZERO);

  const { detailRequeteState } = useDetailRequeteApiHook(
    props.idRequeteAAfficher ?? idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

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

  const liste: ItemListe[] = [
    {
      titre: getLibelle("Postulant"),
      component: <SaisiePostulantForm titulaires={requete?.titulaires || []} />,
      index: 0
    },
    {
      titre: getLibelle("Echanges"),
      component: <Echanges />,
      index: 1
    }
  ];

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
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
          />
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={liste}
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
