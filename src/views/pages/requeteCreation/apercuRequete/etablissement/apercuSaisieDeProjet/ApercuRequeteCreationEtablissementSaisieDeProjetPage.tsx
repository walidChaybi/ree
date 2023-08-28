import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidEtatCivilParams } from "@model/params/IUuidEtatCivilParams";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ISuiviDossier } from "@model/requete/ISuiviDossier";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import { OngletsApercuCreationEtablissementSaisieProjet } from "./contenu/OngletsApercuCreationEtablissementSaisieProjet";
import { OngletsEtablissementSaisieProjet } from "./contenu/OngletsEtablissementSaisieProjet";

interface ApercuRequeteCreationEtablissementSaisieDeProjetPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuRequeteCreationEtablissementSaisieDeProjetPage: React.FC<
  ApercuRequeteCreationEtablissementSaisieDeProjetPageProps
> = props => {
  const { idRequeteParam, idEtatCivilParam } =
    useParams<IUuidEtatCivilParams>();
  const history = useHistory();

  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [titulaire, suiviDossier] = useMemo(() => {
    let suiviDossierTitulaire;
    if (requete && requete.titulaires) {
      for (const titulaireRequete of requete.titulaires) {
        suiviDossierTitulaire = titulaireRequete.suiviDossiers?.find(
          etatCivil => etatCivil.id === idEtatCivilParam
        );
        if (suiviDossierTitulaire) {
          return [titulaireRequete, suiviDossierTitulaire];
        }
      }
    }
    return [undefined, undefined];
  }, [idEtatCivilParam, requete]);

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
          {getOngletsEtablissementSaisieProjet(titulaire, suiviDossier)}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};

function getOngletsEtablissementSaisieProjet(
  titulaire?: ITitulaireRequeteCreation,
  suiviDossier?: ISuiviDossier
): JSX.Element | undefined {
  let onglets;
  if (
    titulaire &&
    suiviDossier &&
    estProjetNaissancePostulant(titulaire, suiviDossier)
  ) {
    onglets = <OngletsEtablissementSaisieProjet titulaire={titulaire} />;
  }
  return onglets;
}

function estProjetNaissancePostulant(
  titulaire: ITitulaireRequeteCreation,
  suiviDossier: ISuiviDossier
) {
  const estPostulant = QualiteFamille.estPostulant(
    QualiteFamille.getEnumFromTitulaire(titulaire)
  );
  const estNaissance = NatureProjetEtablissement.estNaissance(
    NatureProjetEtablissement.getEnumFor(suiviDossier.natureProjet)
  );
  return estPostulant && estNaissance;
}
