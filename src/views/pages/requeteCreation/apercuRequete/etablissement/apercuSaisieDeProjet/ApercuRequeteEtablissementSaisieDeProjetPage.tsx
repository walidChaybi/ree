import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import {
  IRecupererRegistrePapierParIdActeParams,
  useRecupererRegistrePapierParIdActeApiHook
} from "@hook/acte/RecupererRegistrePapierParIdActeApiHook";
import { useValiderProjetActeApiHook } from "@hook/acte/ValiderProjetActeApiHook";
import { ICompositionProjetActeParams, useCompositionProjetActeApiHook } from "@hook/composition/CompositionProjetActeApiHook";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import {
  IModifierAvancementProjetActeParams,
  useModifierAvancementSuiviDossierApiHook
} from "@hook/requete/ModifierAvancementSuiviDossierApiHook";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ISaisieProjetPostulantForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ISuiviDossier } from "@model/requete/ISuiviDossier";
import { ITitulaireRequeteCreation, TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
  URL_RECHERCHE_REQUETE
} from "@router/ReceUrls";
import { DEUX, UN } from "@util/Utils";
import messageManager from "@util/messageManager";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { PopinSignatureCreationEtablissement } from "@widget/signature/PopinSignatureCreationEtablissement";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import { FormikHelpers } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  annulerModificationBulletinIdentification,
  estModificationsDonneesBIAAnnuler,
  estOuvertRegistrePapier,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteEtablissementUtils";
import { BoutonsApercuRequeteCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";
import { SaisiePostulantForm } from "./contenu/saisiePostulantForm/SaisiePostulantForm";
import { useProjetActeHook } from "./contenu/saisiePostulantForm/hook/ProjetActeHook";
import { mappingSaisieProjetPostulantFormVersProjetActe } from "./contenu/saisiePostulantForm/mapping/mappingFormulaireSaisiePostulantVersProjetActe";
import { mappingProjetActeVersFormulairePostulant } from "./contenu/saisiePostulantForm/mapping/mappingProjetActeVersFormulairePostulant";
import { mappingProjetActeVersProjetActeComposition } from "./contenu/saisiePostulantForm/mapping/mappingProjetActeVersProjetActeComposition";
import { mappingTitulairesVersFormulairePostulant } from "./contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";

interface ApercuRequeteEtablissementSaisieDeProjetPageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteEtablissementSaisieDeProjetPage: React.FC<ApercuRequeteEtablissementSaisieDeProjetPageProps> = props => {
  const { idRequeteParam, idSuiviDossierParam } = useParams<TUuidSuiviDossierParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDirty, utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const [rafraichirForm, setRafraichirForm] = useState<(() => void) | undefined>();
  const [titulaireProjetActe, setTitulaireProjetActe] = useState<ITitulaireRequeteCreation>();
  const [dossierProjetActe, setDossierProjetActe] = useState<ISuiviDossier>();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [estProjetExistant, setEstProjetExistant] = useState<boolean>(false);
  const [estOuvertPopinSignature, setEstOuvertPopinSignature] = useState<boolean>(false);

  const [ongletSelectionne, setOngletSelectionne] = useState(UN);
  const [estPopinValiderProjetOuverte, setEstPopinValiderProjetOuverte] = useState<boolean>(false);

  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>();
  const [modifierAvancementProjetParams, setModifierAvancementProjetParams] = useState<IModifierAvancementProjetActeParams>();

  const [compositionProjetActeParams, setCompositionProjetActeParams] = useState<ICompositionProjetActeParams>();

  const [validerProjetActeParams, setValiderProjetActeParams] = useState<{
    idRequete: string;
    idSuiviDossier: string;
  }>();

  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);
  useModifierAvancementSuiviDossierApiHook(modifierAvancementProjetParams);
  const { documentComposer } = useCompositionProjetActeApiHook(compositionProjetActeParams);

  const parentMasculinEtOuPositionUn = TitulaireRequeteCreation.getParentParSexeEtOuParPosition(Sexe.MASCULIN, UN, requete?.titulaires);
  const parentFemininEtOuPositionDeux = TitulaireRequeteCreation.getParentParSexeEtOuParPosition(Sexe.FEMININ, DEUX, requete?.titulaires);

  const { projetActe, onClickActualiserProjet } = useProjetActeHook(
    mappingSaisieProjetPostulantFormVersProjetActe,
    idSuiviDossierParam,
    dossierProjetActe?.avancement,
    dossierProjetActe?.idActe,
    requete?.provenanceNatali?.numeroDossierNational
  );

  const [recupererRegistrePapierParIdProjetActeParams, setRecupererRegistrePapierParIdProjetActeParams] =
    useState<IRecupererRegistrePapierParIdActeParams>();
  const registrePapier = useRecupererRegistrePapierParIdActeApiHook(recupererRegistrePapierParIdProjetActeParams);

  const { projetEstValide } = useValiderProjetActeApiHook(validerProjetActeParams);

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
      if (utilisateurConnecte.id !== detailRequeteState.idUtilisateur) {
        const url = getApercuSimpleUrl(location.pathname, detailRequeteState.id);
        navigate(url);
        messageManager.showWarningAndClose("Ouverture impossible. Vous n'êtes pas en charge de ce dossier");
        return;
      }
      setRequete(detailRequeteState as IRequeteCreationEtablissement);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (projetEstValide) {
      navigate(
        getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID, idRequeteParam || ""),
        // TODO: passage du state non fonctionnel ==> reussir a passer l'idSuiviDossier & le location.pathname a l'apercu suivi dossier
        { state: { idSuiviDossier: idSuiviDossierParam } }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetEstValide]);

  useEffect(() => {
    if (requete?.titulaires && idSuiviDossierParam) {
      const getSuiviDossierParId = (suiviDossier: ISuiviDossier) => suiviDossier.idSuiviDossier === idSuiviDossierParam;
      const titulaire = requete.titulaires.find(titulaireCourant => titulaireCourant.suiviDossiers?.some(getSuiviDossierParId));
      const dossier = titulaire?.suiviDossiers?.find(getSuiviDossierParId);
      dossier && setEstProjetExistant(!AvancementProjetActe.estASaisir(dossier.avancement));
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
          avancement: AvancementProjetActe.estAVerifier(dossierProjetActe.avancement)
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
        projetActeComposition: mappingProjetActeVersProjetActeComposition(projetActe)
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
      estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE),
      estConsultationHistoriqueAction: true
    });
  }

  function onRenommePieceJustificativeSaisieProjet(idPieceJustificative: string, nouveauLibelle: string, idDocumentPJ?: string) {
    onRenommePieceJustificativeEtablissement(requete, setRequete, idPieceJustificative, nouveauLibelle, idDocumentPJ);
  }

  function navigueEtAffichePdfProjetActe(): void {
    setOngletSelectionne(DEUX);
    setIsDirty(false);
  }
  const getValeursPostulantForm = (postulant: ITitulaireRequeteCreation): ISaisieProjetPostulantForm => {
    return estProjetExistant
      ? mappingProjetActeVersFormulairePostulant(postulant, projetActe)
      : mappingTitulairesVersFormulairePostulant(postulant, parentMasculinEtOuPositionUn, parentFemininEtOuPositionDeux, requete?.nature);
  };

  function onSubmitSaisieProjetForm(valeurs: ISaisieProjetPostulantForm, formikHelpers?: FormikHelpers<ISaisieProjetPostulantForm>): void {
    if (
      dossierProjetActe &&
      projetActe &&
      formikHelpers &&
      estModificationsDonneesBIAAnnuler(dossierProjetActe?.avancement, projetActe, valeurs)
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
      titre: "RMC",
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
          sousTypeRequete={requete?.sousType}
          listeTitulaires={requete?.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(requete?.nature ?? "")}
          tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
          tableauActesInscriptionsSelectionnesEnChargement={!dataActesInscriptionsSelectionnes}
          dataActesInscriptionsSelectionnes={dataActesInscriptionsSelectionnes || []}
          setDataActesInscriptionsSelectionnes={setDataActesInscriptionsSelectionnes}
          setRmcAutoPersonneParams={setRmcAutoPersonneParams}
        />
      ),
      index: 0
    },
    {
      titre: "Pièces justificatives / Annexes",
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
      titre: "Apercu du projet",
      component: <ApercuProjet documentAAfficher={documentComposer} />,
      index: 2
    }
  ];

  const listeOngletsDroit: ItemListe[] = [
    {
      titre: "Postulant",
      component: (
        <>
          {titulaireProjetActe && (
            <SaisiePostulantForm
              postulant={titulaireProjetActe}
              estProjetExistant={estProjetExistant}
              valeursForm={getValeursPostulantForm(titulaireProjetActe)}
              avancementProjet={dossierProjetActe?.avancement}
              onSubmitSaisieProjetForm={onSubmitSaisieProjetForm}
              affichageActualiserEtVisualiser={utilisateurConnecte.id === requete?.idUtilisateur}
            />
          )}
        </>
      ),
      index: 0
    },
    {
      titre: "Echanges",
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
            <BoutonsApercuRequeteCreationEtablissement
              requete={requete}
              conditionAffichageBoutonsApercuActe={
                ongletSelectionne === DEUX && Boolean(documentComposer) && utilisateurConnecte.id === requete?.idUtilisateur
              }
              avancement={dossierProjetActe?.avancement}
              estRegistreOuvert={estOuvertRegistrePapier(
                projetActe?.titulaires.find(titulaire => titulaire.ordre === UN)?.decretNaturalisation,
                registrePapier
              )}
              estFormulaireModifie={isDirty}
              validerProjetActe={() => setEstPopinValiderProjetOuverte(true)}
              setEstOuvertPopinSignature={setEstOuvertPopinSignature}
            />
            <ConfirmationPopin
              boutons={[
                {
                  label: "OK",
                  action: () => {
                    !isDirty && idRequeteParam && idSuiviDossierParam
                      ? validerProjetActe(idRequeteParam, idSuiviDossierParam)
                      : setEstPopinValiderProjetOuverte(false);
                  }
                },
                ...(!isDirty && idRequeteParam && idSuiviDossierParam
                  ? [
                      {
                        label: "Annuler",
                        action: () => {
                          setEstPopinValiderProjetOuverte(false);
                        }
                      }
                    ]
                  : [])
              ]}
              estOuvert={estPopinValiderProjetOuverte}
              messages={
                isDirty
                  ? [
                      `Des modifications du projet d'acte ne sont pas enregistrées.`,
                      `Veuillez actualiser le projet d'acte avant sa validation.`
                    ]
                  : [`Confirmez-vous la validation du projet pour envoi du BI à la SDANF ?`]
              }
            />
          </div>
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={listeOngletsDroit}
              checkDirty={true}
            />
          </div>
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};

const getApercuSimpleUrl = (pathname: string, idRequete: string): string => {
  return `${pathname.split(PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET)[0]}${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/${idRequete}`;
};
