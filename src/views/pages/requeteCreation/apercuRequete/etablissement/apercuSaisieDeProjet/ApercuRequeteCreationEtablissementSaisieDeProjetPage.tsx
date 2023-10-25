import { ICompositionDto } from "@api/appels/compositionApi";
import { RECEContext } from "@core/body/RECEContext";
import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { IUuidSuiviDossierParams } from "@model/params/IUuidSuiviDossierParams";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { checkDirty, DEUX, getLibelle } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import { BoutonsApercuCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";
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
  const [ongletSelectionne, setOngletSelectionne] = useState(1);
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [pdfFromComposition, setPdfFromComposition] = useState<ICompositionDto>(
    {} as ICompositionDto
  );
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);
  const { isDirty, setIsDirty } = useContext(RECEContext);

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

  function navigueEtAffichePdfProjetActe(value: ICompositionDto): void {
    setPdfFromComposition(value);
    setOngletSelectionne(DEUX);
    isDirty && setIsDirty(false);
  }

  const listeOngletsDroit: ItemListe[] = [
    {
      titre: getLibelle("Postulant"),
      component: (
        <SaisiePostulantForm
          titulaires={requete?.titulaires || []}
          nature={requete?.nature}
          setPdfFromComposition={navigueEtAffichePdfProjetActe}
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

  const listeOngletsGauche: ItemListe[] = [
    {
      titre: getLibelle("RMC"),
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
          sousTypeRequete={requete?.sousType}
          listeTitulaires={requete?.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(
            requete?.nature ?? ""
          )}
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
      index: 0
    },
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={rechargerRequete}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={onRenommePieceJustificativeSaisieProjet}
        />
      ),
      index: 1
    },
    {
      titre: getLibelle("Apercu du projet"),
      component: <ApercuProjet documentAAfficher={pdfFromComposition} />,
      index: 2
    }
  ];

  const handleChange = (newValue: number) => {
    checkDirty(isDirty, setIsDirty) && setOngletSelectionne(newValue);
  };

  return (
    <div className="ApercuReqCreationEtablissementSaisieProjetPage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete, true)}
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={listeOngletsGauche}
              ongletSelectionne={ongletSelectionne}
              handleChange={handleChange}
            />
            <BoutonsApercuCreationEtablissement requete={requete} />
          </div>
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet liste={listeOngletsDroit} checkDirty={true} />
          </div>
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
