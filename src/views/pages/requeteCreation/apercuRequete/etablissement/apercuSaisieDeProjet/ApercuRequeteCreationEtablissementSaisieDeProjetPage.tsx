import { ICompositionDto } from "@api/appels/compositionApi";
import { RECEContext } from "@core/body/RECEContext";
import {
  ICompositionProjetActeParams,
  useCompositionProjetActeApiHook
} from "@hook/composition/CompositionProjetActeApiHook";
import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import {
  IModifierAvancementProjetActeParams,
  useModifierAvancementSuiviDossierApiHook
} from "@hook/requete/ModifierAvancementSuiviDossierApiHook";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ISaisieProjetPostulantForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { IUuidSuiviDossierParams } from "@model/params/IUuidSuiviDossierParams";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ISuiviDossier } from "@model/requete/ISuiviDossier";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { DEUX, getLibelle, UN } from "@util/Utils";
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
import { useProjetActeHook } from "./contenu/saisiePostulantForm/hook/ProjetActeHook";
import { mappingSaisieProjetPostulantFormVersProjetActe } from "./contenu/saisiePostulantForm/mapping/mappingFormulaireSaisiePostulantVersProjetActe";
import { mappingProjetActeVersFormulairePostulant } from "./contenu/saisiePostulantForm/mapping/mappingProjetActeVersFormulairePostulant";
import { mappingProjetActeVersProjetActeComposition } from "./contenu/saisiePostulantForm/mapping/mappingProjetActeVersProjetActeComposition";
import { mappingTitulairesVersFormulairePostulant } from "./contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
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
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<IUuidSuiviDossierParams>();
  const history = useHistory();
  const [pdfFromComposition, setPdfFromComposition] = useState<ICompositionDto>(
    {} as ICompositionDto
  );
  const { isDirty, setIsDirty } = useContext(RECEContext);
  const [titulaireProjetActe, setTitulaireProjetActe] =
    useState<ITitulaireRequeteCreation>();
  const [dossierProjetActe, setDossierProjetActe] = useState<ISuiviDossier>();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [estProjetExistant, setEstProjetExistant] = useState<boolean>(false);
  const [ongletSelectionne, setOngletSelectionne] = useState(UN);

  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
  const [modifierAvancementProjetParams, setModifierAvancementProjetParams] =
    useState<IModifierAvancementProjetActeParams>();

  const [compositionProjetActeParams, setCompositionProjetActeParams] =
    useState<ICompositionProjetActeParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);
  useModifierAvancementSuiviDossierApiHook(modifierAvancementProjetParams);
  const { documentComposer } = useCompositionProjetActeApiHook(
    compositionProjetActeParams
  );

  const parentMasculinEtOuPositionUn =
    TitulaireRequeteCreation.getParentParSexeEtOuParPosition(
      Sexe.MASCULIN,
      UN,
      requete?.titulaires
    );
  const parentFemininEtOuPositionDeux =
    TitulaireRequeteCreation.getParentParSexeEtOuParPosition(
      Sexe.FEMININ,
      DEUX,
      requete?.titulaires
    );

  const { projetActe, onClickActualiserProjet } = useProjetActeHook(
    mappingSaisieProjetPostulantFormVersProjetActe,
    dossierProjetActe?.idSuiviDossier,
    dossierProjetActe?.avancement,
    dossierProjetActe?.idActe,
    requete?.provenanceNatali?.numeroDossierNational
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

  useEffect(() => {
    if (documentComposer) {
      setPdfFromComposition(documentComposer);
    }
  }, [documentComposer]);

  useEffect(() => {
    if (requete?.titulaires && idSuiviDossierParam) {
      const getSuiviDossierParId = (suiviDossier: ISuiviDossier) =>
        suiviDossier.idSuiviDossier === idSuiviDossierParam;
      const titulaire = requete.titulaires.find(titulaireCourant =>
        titulaireCourant.suiviDossiers?.some(getSuiviDossierParId)
      );
      const dossier = titulaire?.suiviDossiers?.find(getSuiviDossierParId);
      dossier &&
        setEstProjetExistant(
          !AvancementProjetActe.estASaisir(dossier.avancement)
        );
      setTitulaireProjetActe(titulaire);
      setDossierProjetActe(dossier);
    }
  }, [requete?.titulaires, idSuiviDossierParam]);

  useEffect(() => {
    if (projetActe) {
      if (dossierProjetActe && !estProjetExistant) {
        setModifierAvancementProjetParams({
          idSuiviDossier: dossierProjetActe.idSuiviDossier,
          avancement: AvancementProjetActe.EN_COURS
        });
        setDossierProjetActe({
          ...dossierProjetActe,
          avancement: AvancementProjetActe.EN_COURS
        });
        setEstProjetExistant(!estProjetExistant);
      }

      setCompositionProjetActeParams({
        projetActeComposition:
          mappingProjetActeVersProjetActeComposition(projetActe)
      });

      setIsDirty(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetActe]);

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
  const getValeursPostulantForm = (
    postulant: ITitulaireRequeteCreation
  ): ISaisieProjetPostulantForm => {
    return estProjetExistant
      ? mappingProjetActeVersFormulairePostulant(
          postulant,
          dossierProjetActe
            ? AvancementProjetActe.estASigner(dossierProjetActe.avancement)
            : false,
          projetActe,
          requete?.nature
        )
      : mappingTitulairesVersFormulairePostulant(
          postulant,
          parentMasculinEtOuPositionUn,
          parentFemininEtOuPositionDeux,
          requete?.nature
        );
  };

  function onSubmitSaisieProjetForm(valeurs: ISaisieProjetPostulantForm): void {
    onClickActualiserProjet(valeurs);
    navigueEtAffichePdfProjetActe(documentComposer);
  }

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

  const listeOngletsDroit: ItemListe[] = [
    {
      titre: getLibelle("Postulant"),
      component: (
        <>
          {titulaireProjetActe && (
            <SaisiePostulantForm
              postulant={titulaireProjetActe}
              estProjetExistant={estProjetExistant}
              valeursForm={getValeursPostulantForm(titulaireProjetActe)}
              avancementProjet={dossierProjetActe?.avancement}
              onSubmitSaisieProjetForm={onSubmitSaisieProjetForm}
            />
          )}
        </>
      ),
      index: 0
    },
    {
      titre: getLibelle("Echanges"),
      component: <Echanges />,
      index: 1
    }
  ];

  const handleChange = (newValue: number) => {
    setOngletSelectionne(newValue);
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
