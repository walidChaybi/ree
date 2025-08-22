import { ADRESSE, DOCUMENT, PIECES_JOINTES, REQUERANT, TITULAIRES } from "@composant/formulaire/ConstantesNomsForm";
import { useReponseSansDelivranceCS } from "@hook/reponseSansDelivrance/ChoixReponseSansDelivranceCSHook";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { SaisieRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ELibelleSousTypeDelivrance, ESousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import { goBack } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "@widget/formulaire/FormulaireMessages";
import { AdresseFormDefaultValues, AdresseFormValidationSchema } from "@widget/formulaire/adresse/AdresseForm";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER } from "../../../../router/infoPages/InfoPagesEspaceDelivrance";
import AfficherMessage from "../../../../utils/AfficherMessage";
import { PieceJointe } from "../../../../utils/FileUtils";
import SaisirRequeteBoutons from "../../../common/composant/formulaire/boutons/SaisirRequeteBoutons";
import { creerTitulaire, getMaxTitulaires, getPiecesJointesAMettreAJour, initialiserTitulaires } from "./contenu/SaisirRDCSCPageFonctions";
import {
  getAdresseForm,
  getBoutonsPopin,
  getDocumentDemandeForm,
  getPiecesJointesForm,
  getRequerantForm,
  getTitulairesForm
} from "./contenu/SaisirRDCSCPageForms";
import { useRedirectionApresSoumissionRDCSCHook } from "./hook/RedirectionApresSoumissionRDCSCHook";
import { useSoumissionFormulaireRDCSCHook } from "./hook/SoumissionFormulaireRDCSCHook";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "./hook/mappingRequeteDelivranceVersFormulaireRDCSC";
import "./scss/SaisirRequetePage.scss";
import {
  IdentiteFormDefaultValuesRDCSC,
  IdentiteFormValidationSchemaRDCSC,
  IdentiteSubFormProps
} from "./sousFormulaires/identite/IdentiteForm";
import { RequerantFormDefaultValues, RequerantFormValidationSchema } from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesSaisirRDCSC = {
  [DOCUMENT]: "",
  [TITULAIRES]: {
    titulaire1: IdentiteFormDefaultValuesRDCSC,
    titulaire2: IdentiteFormDefaultValuesRDCSC
  },
  [REQUERANT]: RequerantFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues,
  [PIECES_JOINTES]: null
};

// Schéma de validation en sortie de champs
const ValidationSchemaSaisirRDCSC = Yup.object({
  [DOCUMENT]: Yup.string().required(DOCUMENT_OBLIGATOIRE),
  [TITULAIRES]: IdentiteFormValidationSchemaRDCSC,
  [REQUERANT]: RequerantFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

export interface ITitulairesState {
  titulaires: IdentiteSubFormProps[];
  maxTitulaires: number;
}

export const enum limitesTitulaires {
  MIN = 1,
  MAX = 2
}

export const SaisirRDCSCPage: React.FC = () => {
  /** Parametres */
  const location = useLocation();
  const navigate = useNavigate();
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const { decrets } = useContext(RECEContextData);

  /** Informations de la requête */
  const [saisieRequeteRDCSC, setSaisieRequeteRDCSC] = useState<SaisieRequeteRDCSC>();

  const { detailRequeteState } = useDetailRequeteApiHook({ idRequete: idRequeteParam });

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [modeModification, setModeModification] = useState(false);
  const [saisieIncomplete, setSaisieIncomplete] = React.useState<boolean>(false);
  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<IReponseSansDelivranceCS>();

  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] = useState<PieceJointe[]>();

  const [titulairesState, setTitulairesState] = useState<ITitulairesState>({
    titulaires: [creerTitulaire()],
    maxTitulaires: limitesTitulaires.MIN // Le nb max de titulaires autorisés à l'instant T, en fonction du type de document demandé
  });

  const { creationRDCSCParams, miseAJourRDCSCParams, requeteRDCSCResultat, onSubmitSaisieRequeteRDCSC, validerRefus, setEstBrouillon } =
    useSoumissionFormulaireRDCSCHook(
      setSaisieRequeteRDCSC,
      setSaisieIncomplete,
      setOperationEnCours,
      titulairesState,
      saisieRequeteRDCSC,
      idRequeteParam
    );

  const { miseAJourStatutRequetePuisRedirection, miseAJourActionPuisRedirection } = useRedirectionApresSoumissionRDCSCHook(
    location.pathname,
    modeModification,
    setOperationEnCours,
    setReponseSansDelivranceCS,
    creationRDCSCParams,
    miseAJourRDCSCParams,
    requeteRDCSCResultat
  );

  const postPiecesJointesApiResultat = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    requeteRDCSCResultat?.requete.id,
    piecesjointesAMettreAJour
  );

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    StatutRequete.TRAITE_A_IMPRIMER.libelle,
    StatutRequete.TRAITE_A_IMPRIMER,
    reponseSansDelivranceCS,
    idRequeteParam
  );

  useEffect(() => {
    if (location) {
      const url = location.pathname;
      setModeModification(
        url.includes(
          LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url, { idRequeteParam: "" })
        )
      );
    }
  }, [location]);

  useEffect(() => {
    if (detailRequeteState) {
      setSaisieRequeteRDCSC(mappingRequeteDelivranceVersFormulaireRDCSC(detailRequeteState as IRequeteDelivrance));

      // Initialiser titulairesState lorsque detailRequeteState a été rempli par l'API
      if (detailRequeteState.titulaires) {
        const { titulaires, documentDemande } = detailRequeteState as IRequeteDelivrance;

        setTitulairesState({
          titulaires: initialiserTitulaires(titulaires?.length),
          maxTitulaires: getMaxTitulaires(documentDemande)
        });
      }
    }
  }, [detailRequeteState]);

  // Après la création ou la mise à jour de la requête, la mise à jour des pièces jointes est effectuée
  useEffect(() => {
    if (requeteRDCSCResultat?.requete) {
      // Une fois la requête créée ou mise à jour, la mise à jour des pièces jointes peut se faire
      const pjAMettreAjour = getPiecesJointesAMettreAJour(saisieRequeteRDCSC?.[PIECES_JOINTES]);
      if (pjAMettreAjour && pjAMettreAjour.length > 0) {
        setPiecesjointesAMettreAJour(pjAMettreAjour);
      } else if (modeModification) {
        miseAJourActionPuisRedirection();
      } else {
        miseAJourStatutRequetePuisRedirection();
      }
    }
  }, [requeteRDCSCResultat]);

  useEffect(() => {
    if (!postPiecesJointesApiResultat) return;

    // Une fois les pièces jointes mises à jour, la maj du bon statut de la requête puis la redirection sont effectués
    if (!postPiecesJointesApiResultat.erreur) {
      if (modeModification) {
        miseAJourActionPuisRedirection();
      } else {
        miseAJourStatutRequetePuisRedirection();
      }
    } else {
      setOperationEnCours(false);
    }
  }, [postPiecesJointesApiResultat]);

  useEffect(() => {
    if (resultatReponseSansDelivranceCS) {
      AfficherMessage.succes("Le refus a bien été enregistré", { fermetureAuto: true });

      goBack(navigate);
    }
  }, [resultatReponseSansDelivranceCS, navigate]);

  // Eléments du formulaire:
  const blocForms = useMemo(() => {
    const onChangeTitulaires = (titulaires: IdentiteSubFormProps[], formik: FormikProps<FormikValues>) => {
      formik.setFieldValue(`${TITULAIRES}.titulaire2`, DefaultValuesSaisirRDCSC[TITULAIRES].titulaire2);

      if (formik.getFieldProps(`${REQUERANT}.typeRequerant`).value === "TITULAIRE2") {
        formik.setFieldValue(`${REQUERANT}.typeRequerant`, DefaultValuesSaisirRDCSC[REQUERANT].typeRequerant);
      }

      setTitulairesState(precTitulaires => ({
        maxTitulaires: precTitulaires.maxTitulaires,
        titulaires
      }));
    };

    const onAjoutTitulaire = (formik: FormikProps<FormikValues>) => {
      onChangeTitulaires([...titulairesState.titulaires, creerTitulaire(titulairesState.titulaires.length + 1)], formik);
    };

    const onRetraitTitulaire = (formik: FormikProps<FormikValues>) => {
      onChangeTitulaires(titulairesState.titulaires.slice(0, -1), formik);
    };

    const onChangeMaxTitulaires = (maxTitulaires: number, formik: FormikProps<FormikValues>) => {
      setTitulairesState(precTitulaires => ({
        ...precTitulaires,
        maxTitulaires
      }));

      if (formik && titulairesState.titulaires.length > maxTitulaires) {
        onRetraitTitulaire(formik);
      }
    };
    return [
      getDocumentDemandeForm(onChangeMaxTitulaires),
      getTitulairesForm(titulairesState, onAjoutTitulaire, onRetraitTitulaire, detailRequeteState),
      getRequerantForm(titulairesState.titulaires.length, detailRequeteState),
      getAdresseForm(),
      getPiecesJointesForm()
    ];
  }, [setTitulairesState, titulairesState]);

  return (
    <ProtectionApercu
      statut={detailRequeteState?.statutCourant.statut}
      type={detailRequeteState?.type}
    >
      <OperationEnCours
        visible={operationEnCours || !decrets}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <Formulaire
        titre={ELibelleSousTypeDelivrance[ESousTypeDelivrance.RDCSC].long}
        formDefaultValues={saisieRequeteRDCSC || { ...DefaultValuesSaisirRDCSC }}
        formValidationSchema={ValidationSchemaSaisirRDCSC}
        onSubmit={onSubmitSaisieRequeteRDCSC}
        className="FormulaireSaisirRDCSC"
      >
        <div>{blocForms}</div>
        <SaisirRequeteBoutons
          setIsBrouillon={setEstBrouillon}
          modeModification={modeModification}
        />
      </Formulaire>
      <ConfirmationPopin
        estOuvert={saisieIncomplete}
        messages={[
          "Des données obligatoires de la naissance du titulaire sont manquantes.",
          "Un courrier de refus va être automatiquement envoyé au requérant (Veuillez vérifier son adresse postale).",
          "Voulez-vous valider le refus ?"
        ]}
        boutons={getBoutonsPopin(validerRefus, setSaisieIncomplete)}
      />
    </ProtectionApercu>
  );
};
