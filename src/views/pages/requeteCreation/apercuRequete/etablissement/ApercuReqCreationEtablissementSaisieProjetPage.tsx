import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidEtatCivilParams } from "@model/params/IUuidEtatCivilParams";
import { ILienEtatCivil } from "@model/requete/ILienEtatCivil";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "./ApercuReqCreationEtablissementUtils";
import { OngletsApercuCreationEtablissementSaisieProjet } from "./composants/OngletsApercuCreationEtablissementSaisieProjet";
import { OngletsEtablissementSaisieProjetNaissancePostulant } from "./composants/OngletsEtablissementSaisieProjet";

interface ApercuReqCreationEtablissementSaisieProjetPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationEtablissementSaisieProjetPage: React.FC<
  ApercuReqCreationEtablissementSaisieProjetPageProps
> = props => {
  const { idRequeteParam, idEtatCivilParam } =
    useParams<IUuidEtatCivilParams>();
  const history = useHistory();

  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [titulaire, lienEtatCivil] = useMemo(() => {
    let lienEtatCivilTitulaire;
    if (requete && requete.titulaires) {
      for (const titulaireRequete of requete.titulaires) {
        lienEtatCivilTitulaire = titulaireRequete.lienEtatCivil?.find(
          etatCivil => etatCivil.id === idEtatCivilParam
        );
        if (lienEtatCivilTitulaire) {
          return [titulaireRequete, lienEtatCivilTitulaire];
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
          {getOngletsEtablissementSaisieProjet(titulaire, lienEtatCivil)}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};

function getOngletsEtablissementSaisieProjet(
  titulaire?: ITitulaireRequeteCreation,
  lienEtatCivil?: ILienEtatCivil
): JSX.Element | undefined {
  let onglets;
  if (
    titulaire &&
    lienEtatCivil &&
    estProjetNaissancePostulant(titulaire, lienEtatCivil)
  ) {
    onglets = (
      <OngletsEtablissementSaisieProjetNaissancePostulant
        titulaire={titulaire}
      />
    );
  }
  return onglets;
}

function estProjetNaissancePostulant(
  titulaire: ITitulaireRequeteCreation,
  lienEtatCivil: ILienEtatCivil
) {
  const estPostulant = QualiteFamille.estPostulant(
    QualiteFamille.getEnumFromTitulaire(titulaire)
  );
  const estNaissance = NatureProjetEtablissement.estNaissance(
    NatureProjetEtablissement.getEnumFor(lienEtatCivil.natureProjet)
  );
  return estPostulant && estNaissance;
}
