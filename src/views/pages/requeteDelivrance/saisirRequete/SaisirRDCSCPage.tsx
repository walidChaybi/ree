import { ADRESSE, DOCUMENT, PIECES_JOINTES, REQUERANT, TITULAIRES } from "@composant/formulaire/ConstantesNomsForm";
import { RECEContextData } from "@core/contexts/RECEContext";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { useReponseSansDelivranceCS } from "@hook/reponseSansDelivrance/ChoixReponseSansDelivranceCSHook";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { SaisieRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { PATH_MODIFIER_RDCSC } from "@router/ReceUrls";
import { PieceJointe } from "@util/FileUtils";
import messageManager from "@util/messageManager";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import { goBack } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "@widget/formulaire/FormulaireMessages";
import { AdresseFormDefaultValues, AdresseFormValidationSchema } from "@widget/formulaire/adresse/AdresseForm";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SaisirRequeteBoutons from "../../../common/composant/formulaire/boutons/SaisirRequeteBoutons";
import {
  creerTitulaire,
  getMaxTitulaires,
  getMessagesPopin,
  getPiecesJointesAMettreAJour,
  initialiserTitulaires
} from "./contenu/SaisirRDCSCPageFonctions";
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

export const titreForm = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

export type TitulairesStateType = {
  titulaires: IdentiteSubFormProps[];
  maxTitulaires: number;
};

export const enum limitesTitulaires {
  MIN = 1,
  MAX = 2
}

export const SaisirRDCSCPage: React.FC = () => {
  /** Parametres */
  useTitreDeLaFenetre(titreForm);
  const location = useLocation();
  const navigate = useNavigate();
  const { idRequeteParam } = useParams<TUuidRequeteParams>();

  /** Informations de la requête */
  const [idRequete, setIdRequete] = useState<string>();
  const [saisieRequeteRDCSC, setSaisieRequeteRDCSC] = useState<SaisieRequeteRDCSC>();
  const { detailRequeteState } = useDetailRequeteApiHook({ idRequete });

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [modeModification, setModeModification] = useState(false);
  const [saisieIncomplete, setSaisieIncomplete] = React.useState<boolean>(false);
  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] = useState<IReponseSansDelivranceCS>();

  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] = useState<PieceJointe[]>();

  const [titulairesState, setTitulairesState] = useState<TitulairesStateType>({
    titulaires: [creerTitulaire()],
    maxTitulaires: limitesTitulaires.MIN // Le nb max de titulaires autorisés à l'instant T, en fonction du type de document demandé
  });

  const { decrets } = useContext(RECEContextData);

  const { creationRDCSCParams, miseAJourRDCSCParams, requeteRDCSCResultat, onSubmitSaisieRequeteRDCSC, validerRefus, setEstBrouillon } =
    useSoumissionFormulaireRDCSCHook(
      setSaisieRequeteRDCSC,
      setSaisieIncomplete,
      setOperationEnCours,
      titulairesState,
      saisieRequeteRDCSC,
      idRequete
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
    idRequete
  );

  useEffect(() => {
    if (location) {
      const url = location.pathname;
      setModeModification(url.includes(PATH_MODIFIER_RDCSC));
    }
  }, [location]);

  useEffect(() => {
    if (detailRequeteState) {
      setSaisieRequeteRDCSC(mappingRequeteDelivranceVersFormulaireRDCSC(detailRequeteState as IRequeteDelivrance));

      // ↴ Initialiser titulairesState lorsque detailRequeteState a été rempli par l'API
      if (detailRequeteState.titulaires) {
        const { titulaires, documentDemande } = detailRequeteState as IRequeteDelivrance;

        setTitulairesState({
          titulaires: initialiserTitulaires(titulaires?.length),
          maxTitulaires: getMaxTitulaires(documentDemande)
        });
      }
    }
  }, [detailRequeteState]);

  useEffect(() => {
    setIdRequete(idRequeteParam);
  }, [idRequeteParam]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requeteRDCSCResultat]);

  useEffect(() => {
    // Une fois les pièces jointes mises à jour, la maj du bon statut de la requête puis la redirection sont effectuées
    if (postPiecesJointesApiResultat && !postPiecesJointesApiResultat.erreur) {
      if (modeModification) {
        miseAJourActionPuisRedirection();
      } else {
        miseAJourStatutRequetePuisRedirection();
      }
    } else if (postPiecesJointesApiResultat?.erreur) {
      setOperationEnCours(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPiecesJointesApiResultat]);

  useEffect(() => {
    if (resultatReponseSansDelivranceCS) {
      messageManager.showSuccessAndClose("Le refus a bien été enregistré");

      goBack(navigate);
    }
  }, [resultatReponseSansDelivranceCS, navigate]);

  const onChangeTitulaires = (titulaires: IdentiteSubFormProps[], formik: FormikProps<FormikValues>) => {
    formik.setFieldValue(withNamespace(TITULAIRES, "titulaire2"), DefaultValuesSaisirRDCSC[TITULAIRES].titulaire2);
    if (formik.getFieldProps(withNamespace(REQUERANT, "typeRequerant")).value === "TITULAIRE2") {
      formik.setFieldValue(withNamespace(REQUERANT, "typeRequerant"), DefaultValuesSaisirRDCSC[REQUERANT].typeRequerant);
    }

    setTitulairesState(precTitulaires => ({
      ...precTitulaires,
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

  // Eléments du formulaire:
  const blocForms = [
    getDocumentDemandeForm(onChangeMaxTitulaires),
    getTitulairesForm(titulairesState, onAjoutTitulaire, onRetraitTitulaire, detailRequeteState),
    getRequerantForm(titulairesState.titulaires.length, detailRequeteState),
    getAdresseForm(),
    getPiecesJointesForm()
  ];

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
      {getFormulaireRDCSC(blocForms, onSubmitSaisieRequeteRDCSC, setEstBrouillon, modeModification, saisieRequeteRDCSC)}
      <ConfirmationPopin
        estOuvert={saisieIncomplete}
        messages={getMessagesPopin()}
        boutons={getBoutonsPopin(validerRefus, setSaisieIncomplete)}
      />
    </ProtectionApercu>
  );
};

const getFormulaireRDCSC = (
  blocForms: JSX.Element[],
  onSubmitSaisieRequeteRDCSC: (valeurs: SaisieRequeteRDCSC) => void,
  setEstBrouillon: React.Dispatch<React.SetStateAction<boolean>>,
  modeModification: boolean,
  saisieRequeteRDCSC?: SaisieRequeteRDCSC
): JSX.Element => {
  return (
    <Formulaire
      titre={titreForm}
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
  );
};
