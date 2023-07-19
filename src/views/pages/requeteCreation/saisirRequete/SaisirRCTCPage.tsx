import {
  MARIAGE,
  PARENTS,
  PIECES_JOINTES,
  RECONNAISSANCE,
  REQUERANT,
  REQUETE,
  TITULAIRE
} from "@composant/formulaire/ConstantesNomsForm";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import {
  IUpdateRequeteCreationParams,
  useUpdateRequeteCreation
} from "@hook/requete/UpdateRequeteCreationApiHook";
import { ISaisieRequeteRCTC } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { PATH_MODIFIER_RCTC, receUrl } from "@router/ReceUrls";
import { getPiecesJointesNonVides, PieceJointe } from "@util/FileUtils";
import { getUrlCourante, replaceUrl } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { FormikValues } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import SaisirRequeteBoutons from "../../../common/composant/formulaire/boutons/SaisirRequeteBoutons";
import {
  ICreationRequeteCreationParams,
  useCreationRequeteCreation
} from "../../../common/hook/requete/CreationRequeteCreationApiHook";
import {
  getParentsForm,
  getPiecesJointesForm,
  getRequerantForm,
  getRequeteForm,
  getTitulaireForm
} from "./contenu/SaisirRCTCPageForms";
import { mappingSaisieRequeteRCTCVersRequetesAEnvoyer } from "./mapping/mappingFormulaireSaisirRCTCVersRequeteTranscription";
import { mappingRequeteTranscriptionVersForumlaireRCTC } from "./mapping/mappingRequeteTranscriptionVersFormulaireRCTC";
import "./scss/SaisirRCTCPage.scss";
import {
  EvenementMariageParentsFormDefaultValues,
  EvenementMariageParentsFormValidationSchema
} from "./sousForm/evenement/EvenementMariageParentsForm";
import {
  EvenementReconnaissanceTitulaireFormDefaultValues,
  EvenementReconnaissanceTitulaireFormValidationSchema
} from "./sousForm/evenement/EvenementReconnaissanceTitulaireForm";
import {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousForm/identite/IdentiteTitulaireForm";
import {
  ParentFormDefaultValues,
  ParentFormValidationSchema
} from "./sousForm/parent/ParentsForm";
import {
  RequerantFormDefaultValue,
  RequerantFormValidationSchema
} from "./sousForm/requerant/RequerantForm";
import {
  RequeteFormDefaultValues,
  RequeteFormValidationSchema
} from "./sousForm/requete/RequeteForm";
import TransmissionPopin from "./sousForm/transmissionPopin/TransmissionPopin";

export const enum limitesParents {
  MIN = 1,
  MAX = 2
}

const TITRE_FORMULAIRE = SousTypeCreation.RCTC.libelle;
export const ValeursRequeteCreationRCTCParDefaut = {
  [REQUETE]: RequeteFormDefaultValues,
  [TITULAIRE]: IdentiteFormDefaultValues,
  [PARENTS]: {
    parent1: ParentFormDefaultValues,
    parent2: {},
    [MARIAGE]: EvenementMariageParentsFormDefaultValues,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormDefaultValues
  },
  [REQUERANT]: RequerantFormDefaultValue
};

const ValidationSchemaSaisirRCTC = Yup.object({
  [REQUETE]: RequeteFormValidationSchema,
  [TITULAIRE]: IdentiteFormValidationSchema,
  [PARENTS]: Yup.object({
    parent1: ParentFormValidationSchema,
    parent2: ParentFormValidationSchema,
    [MARIAGE]: EvenementMariageParentsFormValidationSchema,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormValidationSchema
  }),
  [REQUERANT]: RequerantFormValidationSchema
});

export const SaisirRCTCPage: React.FC = () => {
  const history = useHistory();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();

  //States
  //////////////////////////////////////////////////////////////////////////
  const [idRequete, setIdRequete] = useState<string>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [modeModification, setModeModification] = useState(false);
  const [transmissionPopinOuverte, setTransmissionPopinOuverte] =
    useState(false);
  const [creationRequeteRCTCParams, setCreationRequeteRCTCParams] =
    useState<ICreationRequeteCreationParams>();
  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] =
    useState<PieceJointe[]>();
  const [saisieRequeteRCTC, setSaisieRequeteRCTC] =
    useState<ISaisieRequeteRCTC>();
  const [requeteForm, setRequeteForm] = useState<ISaisieRequeteRCTC>();
  const [idRequeteCreerEtTransmise, setIdRequeteCreerEtTransmise] =
    useState<string>();
  const [updateRequeteCreation, setUpdateRequeteCreation] =
    useState<IUpdateRequeteCreationParams>();

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
  const idRequeteCreee = useCreationRequeteCreation(creationRequeteRCTCParams);
  const idRequeteUpdate = useUpdateRequeteCreation(
    idRequete,
    updateRequeteCreation
  );

  const getIdRequeteCreee = useCallback(() => {
    if (idRequeteUpdate) {
      return idRequeteUpdate;
    } else if (idRequeteCreee) {
      return idRequeteCreee;
    } else if (idRequeteCreerEtTransmise) {
      return idRequeteCreerEtTransmise;
    }
    return undefined;
  }, [idRequeteCreerEtTransmise, idRequeteCreee, idRequeteUpdate]);

  const postPiecesJointesApiResultat = usePostPiecesJointesApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    getIdRequeteCreee(),
    piecesjointesAMettreAJour
  );

  // Effects
  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setIdRequete(idRequeteParam);
  }, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      const requeteFormMap = mappingRequeteTranscriptionVersForumlaireRCTC(
        detailRequeteState as IRequeteCreation
      );
      setRequeteForm(requeteFormMap);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (uneRequeteAEteCreeeOuTransmiseOuUpdate() && saisieRequeteRCTC) {
      // On ne prend que les pjs dont le contenu est renseigné,
      //   en effet si le contenu est vide c'est qu'il a été écrasé par la requête lors de la sauvegarde (la requête ramène ses pièces jointes mais sans le contenu)
      const pjAMettreAjour = getPiecesJointesNonVides(
        saisieRequeteRCTC?.[PIECES_JOINTES]
      );
      if (pjAMettreAjour && pjAMettreAjour.length > 0) {
        setPiecesjointesAMettreAJour(pjAMettreAjour);
      } else {
        finEtRedirection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idRequeteCreee,
    saisieRequeteRCTC,
    idRequeteCreerEtTransmise,
    idRequeteUpdate
  ]);

  useEffect(() => {
    // Une fois les pièces jointes mises à jour, la maj du bon statut de la requête puis la redirection sont effectuées
    if (postPiecesJointesApiResultat && !postPiecesJointesApiResultat.erreur) {
      finEtRedirection();
    } else if (postPiecesJointesApiResultat?.erreur) {
      setOperationEnCours(false);
      // Permet de gérer le cas où un plantage arrive sur la maj des PJs alors que la requête a été enregistrée
      // TODO lorsque le mode update sera activé (cf. SaisirRDCPage) => setOperationEnCours(false);
      // TODO lorsque le mode update sera activé (cf. SaisirRDCPage) => setIdRequete(creationRequeteDelivranceRDCResultat?.requete.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPiecesJointesApiResultat]);

  useEffect(() => {
    if (history) {
      const url = getUrlCourante(history);
      setModeModification(url.includes(PATH_MODIFIER_RCTC));
    }
  }, [history]);

  // Evenements & fonctions
  //////////////////////////////////////////////////////////////////////////
  function onSubmitSaisirRequete(values: ISaisieRequeteRCTC) {
    setOperationEnCours(true);
    setSaisieRequeteRCTC(values);
    const requeteMap = mappingSaisieRequeteRCTCVersRequetesAEnvoyer(values);
    if (idRequete) {
      setUpdateRequeteCreation({ requete: requeteMap });
    } else {
      setCreationRequeteRCTCParams({ requete: requeteMap });
    }
  }

  function fermePopin() {
    setTransmissionPopinOuverte(false);
  }

  // Formulaire
  //////////////////////////////////////////////////////////////////////////
  const blocsForm: JSX.Element[] = [
    getRequeteForm(),
    getTitulaireForm(
      TitulaireRequeteCreation.getTitulairesTries(
        detailRequeteState?.titulaires
      )?.[0]
    ),
    getParentsForm(
      TitulaireRequeteCreation.getParentsTries(detailRequeteState?.titulaires)
    ),
    getRequerantForm(),
    getPiecesJointesForm()
  ];

  useTitreDeLaFenetre(TITRE_FORMULAIRE);

  return (
    <div className="SaisirRCTCPage">
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <Formulaire
        titre={TITRE_FORMULAIRE}
        formDefaultValues={requeteForm ?? ValeursRequeteCreationRCTCParDefaut}
        formValidationSchema={ValidationSchemaSaisirRCTC}
        onSubmit={onSubmitSaisirRequete}
        className="FormulaireSaisirRCTC"
      >
        <div>{blocsForm}</div>
        <TransmissionPopin
          ouverte={transmissionPopinOuverte}
          onTransmissionEffectuee={(
            idRequeteApresCreationEtTransmission: string,
            formikValues: FormikValues
          ) => {
            fermePopin();
            setSaisieRequeteRCTC(formikValues as ISaisieRequeteRCTC);
            setIdRequeteCreerEtTransmise(idRequeteApresCreationEtTransmission);
          }}
          onCancel={fermePopin}
          onErrors={fermePopin}
          onTransmissionEnCours={() => {
            setOperationEnCours(true);
          }}
        />

        <SaisirRequeteBoutons
          modeModification={modeModification}
          onTransferer={() => setTransmissionPopinOuverte(true)}
        />
      </Formulaire>
    </div>
  );

  // Fonctions utilitaires
  /////////////////////////////////////////////////////////////////////////
  function uneRequeteAEteCreeeOuTransmiseOuUpdate() {
    return idRequeteCreee || idRequeteCreerEtTransmise || idRequeteUpdate;
  }

  function finEtRedirection() {
    setOperationEnCours(false);
    if (idRequeteCreee || idRequeteUpdate) {
      const url =
        receUrl.getUrlApercuPriseEnChargeCreationTranscriptionAPartirDe({
          url: history.location.pathname,
          idRequete: idRequeteCreee || idRequeteUpdate
        });
      replaceUrl(history, url);
    } else if (idRequeteCreerEtTransmise) {
      history.goBack();
    }
  }
};



