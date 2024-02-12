import { RECEContext } from "@core/body/RECEContext";
import {
  IRecupererRegistrePapierParIdActeParams,
  useRecupererRegistrePapierParIdActeApiHook
} from "@hook/acte/RecupererRegistrePapierParIdActeApiHook";
import { useValiderProjetActeApiHook } from "@hook/acte/ValiderProjetActeApiHook";
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
import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
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
import {
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
  URL_RECHERCHE_REQUETE
} from "@router/ReceUrls";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { DEUX, getLibelle, UN } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { PopinSignatureCreationEtablissement } from "@widget/signature/PopinSignatureCreationEtablissement";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import { FormikHelpers } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  annulerModificationBulletinIdentification,
  estModificationsDonneesBIAAnnuler,
  estOuvertRegistrePapier,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteEtablissementUtils";
import { BoutonsApercuCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";
import { useProjetActeHook } from "./contenu/saisiePostulantForm/hook/ProjetActeHook";
import { mappingSaisieProjetPostulantFormVersProjetActe } from "./contenu/saisiePostulantForm/mapping/mappingFormulaireSaisiePostulantVersProjetActe";
import { mappingProjetActeVersFormulairePostulant } from "./contenu/saisiePostulantForm/mapping/mappingProjetActeVersFormulairePostulant";
import { mappingProjetActeVersProjetActeComposition } from "./contenu/saisiePostulantForm/mapping/mappingProjetActeVersProjetActeComposition";
import { mappingTitulairesVersFormulairePostulant } from "./contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import { SaisiePostulantForm } from "./contenu/saisiePostulantForm/SaisiePostulantForm";

interface ApercuRequeteEtablissementSaisieDeProjetPageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteEtablissementSaisieDeProjetPage: React.FC<
  ApercuRequeteEtablissementSaisieDeProjetPageProps
> = props => {
  const { idRequeteParam, idSuiviDossierParam } =
    useParams<TUuidSuiviDossierParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDirty, setIsDirty } = useContext(RECEContext);
  const [rafraichirForm, setRafraichirForm] = useState<
    (() => void) | undefined
  >();
  const [titulaireProjetActe, setTitulaireProjetActe] =
    useState<ITitulaireRequeteCreation>();
  const [dossierProjetActe, setDossierProjetActe] = useState<ISuiviDossier>();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [estProjetExistant, setEstProjetExistant] = useState<boolean>(false);
  const [estOuvertPopinSignature, setEstOuvertPopinSignature] =
    useState<boolean>(false);

  const [ongletSelectionne, setOngletSelectionne] = useState(UN);

  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
  const [modifierAvancementProjetParams, setModifierAvancementProjetParams] =
    useState<IModifierAvancementProjetActeParams>();

  const [compositionProjetActeParams, setCompositionProjetActeParams] =
    useState<ICompositionProjetActeParams>();

  const [validerProjetActeParams, setValiderProjetActeParams] = useState<{
    idRequete: string;
    idSuiviDossier: string;
  }>();

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
    idSuiviDossierParam,
    dossierProjetActe?.avancement,
    dossierProjetActe?.idActe,
    requete?.provenanceNatali?.numeroDossierNational
  );

  const [
    recupererRegistrePapierParIdProjetActeParams,
    setRecupererRegistrePapierParIdProjetActeParams
  ] = useState<IRecupererRegistrePapierParIdActeParams>();
  const registrePapier = useRecupererRegistrePapierParIdActeApiHook(
    recupererRegistrePapierParIdProjetActeParams
  );

  const { projetEstValide } = useValiderProjetActeApiHook(
    validerProjetActeParams
  );

  const validerProjetActe = (idRequete: string, idSuiviDossier: string) => {
    setValiderProjetActeParams({ idRequete, idSuiviDossier });
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
    if (projetEstValide) {
      navigate(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          idRequeteParam || ""
        ),
        // TODO: passage du state non fonctionnel ==> reussir a passer l'idSuiviDossier & le location.pathname a l'apercu suivi dossier
        { state: { idSuiviDossier: idSuiviDossierParam } }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetEstValide]);

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
      setRecupererRegistrePapierParIdProjetActeParams({
        idActe: dossier?.idActe
      });
    }
  }, [requete?.titulaires, idSuiviDossierParam]);

  useEffect(() => {
    if (projetActe) {
      if (dossierProjetActe && idSuiviDossierParam && !estProjetExistant) {
        setModifierAvancementProjetParams({
          idSuiviDossier: idSuiviDossierParam,
          avancement: AvancementProjetActe.estAVerifier(
            dossierProjetActe.avancement
          )
            ? AvancementProjetActe.VERIFIE
            : AvancementProjetActe.EN_COURS
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
      if (rafraichirForm) {
        rafraichirForm();
        setRafraichirForm(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetActe]);

  useEffect(() => {
    rechargerRequete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idRequeteAAfficher, location.pathname, idRequeteParam]);

  function rechargerRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE)
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

  function navigueEtAffichePdfProjetActe(): void {
    setOngletSelectionne(DEUX);
    setIsDirty(false);
  }
  const getValeursPostulantForm = (
    postulant: ITitulaireRequeteCreation
  ): ISaisieProjetPostulantForm => {
    return estProjetExistant
      ? mappingProjetActeVersFormulairePostulant(postulant, projetActe)
      : mappingTitulairesVersFormulairePostulant(
          postulant,
          parentMasculinEtOuPositionUn,
          parentFemininEtOuPositionDeux,
          requete?.nature
        );
  };

  function onSubmitSaisieProjetForm(
    valeurs: ISaisieProjetPostulantForm,
    formikHelpers?: FormikHelpers<ISaisieProjetPostulantForm>
  ): void {
    if (
      dossierProjetActe &&
      projetActe &&
      formikHelpers &&
      estModificationsDonneesBIAAnnuler(
        dossierProjetActe?.avancement,
        projetActe,
        valeurs
      )
    ) {
      annulerModificationBulletinIdentification(formikHelpers, projetActe);
    } else {
      onClickActualiserProjet(valeurs);
      navigueEtAffichePdfProjetActe();
      setRafraichirForm(() => formikHelpers?.resetForm);
    }
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
      component: <ApercuProjet documentAAfficher={documentComposer} />,
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
      <PopinSignatureCreationEtablissement
        idActe={dossierProjetActe?.idActe}
        estOuvert={estOuvertPopinSignature}
        setEstOuvert={setEstOuvertPopinSignature}
      />
      {requete ? (
        <>
          {getConteneurResumeRequete(requete, true)}
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={listeOngletsGauche}
              ongletSelectionne={ongletSelectionne}
              handleChange={handleChange}
            />
            <BoutonsApercuCreationEtablissement
              requete={requete}
              conditionAffichageBoutonsApercuActe={
                ongletSelectionne === DEUX && Boolean(documentComposer)
              }
              avancement={dossierProjetActe?.avancement}
              estRegistreOuvert={estOuvertRegistrePapier(
                projetActe?.titulaires.find(titulaire => titulaire.ordre === UN)
                  ?.decretNaturalisation,
                registrePapier
              )}
              estFormulaireModifie={isDirty}
              validerProjetActe={validerProjetActe}
              setEstOuvertPopinSignature={setEstOuvertPopinSignature}
            />
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
