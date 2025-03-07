// A tester en refacto Alexande 7/03/25
/* v8 ignore start */
import {
  ADRESSE,
  ADRESSE_COURRIEL,
  ARRONDISSEMENT_NAISSANCE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  DATE_MARIAGE,
  DATE_NAISSANCE,
  DATE_RECONNAISSANCE,
  DEPARTEMENT_NAISSANCE,
  DEPARTEMENT_RECONNAISSANCE,
  IDENTIFIANT,
  LIEN_REQUERANT,
  LIEU_ACTE_RECONNAISSANCE,
  LIEU_DE_MARIAGE,
  LIEU_DE_NAISSANCE,
  LIEU_DIT,
  MARIAGE,
  NAISSANCE,
  NATIONALITES,
  NATIONALITE_1,
  NATIONALITE_2,
  NATIONALITE_3,
  NATURE_ACTE,
  NOM,
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  NOM_USAGE,
  NUMERO_TELEPHONE,
  PARENTS,
  PARENTS_MARIES,
  PAYS,
  PAYS_DU_MARIAGE,
  PAYS_NAISSANCE,
  PAYS_RECONNAISSANCE,
  PIECES_JOINTES,
  PRENOM,
  PRENOMS,
  RECONNAISSANCE,
  REGION_ETAT_RECONNAISSANCE,
  REGION_NAISSANCE,
  REGISTRE,
  REQUERANT,
  REQUETE,
  SEXE,
  TITULAIRE,
  TITULAIRE_RECONNU,
  VILLE_DE_MARIAGE,
  VILLE_NAISSANCE,
  VILLE_RECONNAISSANCE,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { creerValidationSchemaPrenom } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { RECEContextData } from "@core/contexts/RECEContext";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUpdateRequeteCreationParams, useUpdateRequeteCreation } from "@hook/requete/UpdateRequeteCreationApiHook";
import { usePostPiecesJointesApi } from "@hook/requete/piecesJointes/PostPiecesJointesHook";
import { ISaisieRequeteRCTC } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscrit } from "@model/requete/enum/NatureActeTranscrit";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { EvenementParentsFormDefaultValues } from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementParentsForm";
import { PATH_MODIFIER_RCTC, URL_RECHERCHE_REQUETE, receUrl } from "@router/ReceUrls";
import { PieceJointe, getPiecesJointesNonVides } from "@util/FileUtils";
import { UN } from "@util/Utils";
import { replaceUrl } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Formulaire } from "@widget/formulaire/Formulaire";
import {
  ADRESSE_MAIL_NON_CONFORME,
  CARACTERES_AUTORISES_MESSAGE,
  LIEN_REQUERANT_OBLIGATOIRE,
  NATURE_ACTE_OBLIGATOIRE,
  NUMERO_TELEPHONE_NON_CONFORME,
  REGISTRE_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import {
  DateValidationSchemaAnneeObligatoire,
  DateValidationSchemaSansTestFormat
} from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { NationalitesFormDefaultValues } from "@widget/formulaire/nationalites/NationalitesForm";
import { FormikValues } from "formik";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { CaracteresAutorises, NumeroTelephone } from "../../../ressources/Regex";
import SaisirRequeteBoutons from "../../../views/common/composant/formulaire/boutons/SaisirRequeteBoutons";
import {
  ICreationRequeteCreationParams,
  useCreationRequeteCreation
} from "../../../views/common/hook/requete/CreationRequeteCreationApiHook";
import {
  getParentsForm,
  getPiecesJointesForm,
  getRequerantForm,
  getRequeteForm,
  getTitulaireForm
} from "../../../views/pages/requeteCreation/saisirRequete/contenu/SaisirRCTCPageForms";
import { mappingSaisieRequeteRCTCVersRequetesAEnvoyer } from "../../../views/pages/requeteCreation/saisirRequete/mapping/mappingFormulaireSaisirRCTCVersRequeteTranscription";
import { mappingRequeteTranscriptionVersForumlaireRCTC } from "../../../views/pages/requeteCreation/saisirRequete/mapping/mappingRequeteTranscriptionVersFormulaireRCTC";
import TransmissionPopin from "../../../views/pages/requeteCreation/saisirRequete/sousForm/transmissionPopin/TransmissionPopin";
import "./scss/SaisirRCTCPage.scss";

export const enum limitesParents {
  MIN = 1,
  MAX = 2
}

const TITRE_FORMULAIRE = SousTypeCreation.RCTC.libelle;

///////////////VALEURS DEFAULTS REQUETE//////////////////

const RequeteFormDefaultValues = {
  [NATURE_ACTE]: NatureActeTranscrit.getKey(NatureActeTranscrit.NAISSANCE_MINEUR),
  [LIEN_REQUERANT]: TypeLienRequerantCreation.getKey(TypeLienRequerantCreation.PERE_MERE),
  [REGISTRE]: null
};

///////////////VALEURS DEFAULTS TITULAIRE//////////////////

const EvenementEtrangerFormDefaultValues = {
  [VILLE_NAISSANCE]: "",
  [ARRONDISSEMENT_NAISSANCE]: "",
  [REGION_NAISSANCE]: "",
  [PAYS_NAISSANCE]: ""
};

const IdentiteFormDefaultValues = {
  [IDENTIFIANT]: "",
  [NOM_ACTE_ETRANGER]: "",
  [NOM_SOUHAITE_ACTE_FR]: "",
  [PRENOMS]: { prenom1: "" },
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementEtrangerFormDefaultValues
};

///////////////VALEURS DEFAULTS PARENT//////////////////

export const ParentFormDefaultValues = {
  [IDENTIFIANT]: "",
  [NOM]: "",
  [PRENOMS]: { prenom1: "" },
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementParentsFormDefaultValues,
  [NATIONALITES]: NationalitesFormDefaultValues
};

export const EvenementMariageParentsFormDefaultValues = {
  [PARENTS_MARIES]: "NON",
  [DATE_MARIAGE]: DateDefaultValues,
  [LIEU_DE_MARIAGE]: "INCONNU",
  [VILLE_DE_MARIAGE]: "",
  [PAYS_DU_MARIAGE]: ""
};

export const EvenementReconnaissanceTitulaireFormDefaultValues = {
  [TITULAIRE_RECONNU]: "NON",
  [DATE_RECONNAISSANCE]: DateDefaultValues,
  [LIEU_ACTE_RECONNAISSANCE]: "INCONNU",
  [VILLE_RECONNAISSANCE]: "",
  [REGION_ETAT_RECONNAISSANCE]: "",
  [DEPARTEMENT_RECONNAISSANCE]: "",
  [PAYS_RECONNAISSANCE]: ""
};

///////////////VALEURS DEFAULTS REQUERANT//////////////////

const AdresseFormDefaultValues = {
  [VOIE]: "",
  [LIEU_DIT]: "",
  [COMPLEMENT_DESTINATAIRE]: "",
  [COMPLEMENT_POINT_GEO]: "",
  [CODE_POSTAL]: "",
  [COMMUNE]: "",
  [PAYS]: "",
  [ADRESSE_COURRIEL]: "",
  [NUMERO_TELEPHONE]: ""
};

const RequerantFormDefaultValue = {
  [NOM]: "",
  [PRENOM]: "",
  [NOM_USAGE]: "",
  [ADRESSE]: AdresseFormDefaultValues,
  [AUTRE_ADRESSE_COURRIEL]: "",
  [AUTRE_NUMERO_TELEPHONE]: ""
};

//////////////////////////////////////////////////////////////////
///////////////VALEURS DEFAULTS FORMULAIRE FINAL//////////////////
//////////////////////////////////////////////////////////////////

const ValeursRequeteCreationRCTCParDefaut = {
  [REQUETE]: RequeteFormDefaultValues,
  [TITULAIRE]: IdentiteFormDefaultValues,
  [PARENTS]: {
    parent1: ParentFormDefaultValues,
    [MARIAGE]: EvenementMariageParentsFormDefaultValues,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormDefaultValues
  },
  [REQUERANT]: RequerantFormDefaultValue
};

/////////////VALIDATION REQUETE////////////////

const RequeteFormValidationSchema = Yup.object().shape({
  [NATURE_ACTE]: Yup.string().required(NATURE_ACTE_OBLIGATOIRE),
  [LIEN_REQUERANT]: Yup.string().required(LIEN_REQUERANT_OBLIGATOIRE),
  [REGISTRE]: Yup.object().nullable().required(REGISTRE_OBLIGATOIRE)
});

/////////////VALIDATION IDENTITE////////////////

const EvenementEtrangerFormValidationSchema = Yup.object().shape({
  [LIEU_DE_NAISSANCE]: Yup.boolean(),
  [VILLE_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [REGION_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const IdentiteFormValidationSchema = Yup.object().shape({
  [NOM_ACTE_ETRANGER]: Yup.string()
    .required("La saisie d'un nom est obligatoire")
    .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [NOM_SOUHAITE_ACTE_FR]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string(),
  [DATE_NAISSANCE]: DateValidationSchemaAnneeObligatoire,
  [NAISSANCE]: EvenementEtrangerFormValidationSchema
});

/////////////VALIDATION PARENTS////////////////

const EvenementParentsFormValidationSchema = Yup.object().shape({
  [VILLE_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [REGION_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [DEPARTEMENT_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const EvenementMariageParentsFormValidationSchema = Yup.object().shape({
  [PARENTS_MARIES]: Yup.string(),
  [DATE_MARIAGE]: DateValidationSchemaSansTestFormat,
  [VILLE_DE_MARIAGE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_DU_MARIAGE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

export const EvenementReconnaissanceTitulaireFormValidationSchema = Yup.object().shape({
  [TITULAIRE_RECONNU]: Yup.string(),
  [DATE_RECONNAISSANCE]: DateValidationSchemaSansTestFormat,
  [VILLE_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [REGION_ETAT_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [DEPARTEMENT_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const NationalitesFormValidationSchema = Yup.object()
  .shape({
    [NATIONALITE_1]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
    [NATIONALITE_2]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
    [NATIONALITE_3]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
  })
  .test("NATIONALITEObligatoire1", function (value, error) {
    const NATIONALITE1 = value[NATIONALITE_1] as string;
    const NATIONALITE2 = value[NATIONALITE_2] as string;
    const NATIONALITE3 = value[NATIONALITE_3] as string;

    const params = {
      path: `${error.path}.NATIONALITE1`,
      message: "La saisie du Nationalité 1 est obligatoire"
    };

    return NATIONALITE1 == null && (NATIONALITE2 != null || NATIONALITE3 != null) ? this.createError(params) : true;
  })
  .test("NATIONALITEsObligatoire2", function (value, error) {
    const NATIONALITE2 = value[NATIONALITE_2] as string;
    const NATIONALITE3 = value[NATIONALITE_3] as string;

    const params = {
      path: `${error.path}.NATIONALITE2`,
      message: "La saisie du Nationalité 2 est obligatoire"
    };

    return NATIONALITE2 == null && NATIONALITE3 != null ? this.createError(params) : true;
  });

const ParentFormValidationSchema = Yup.object().shape({
  [NOM]: Yup.string().test({
    name: "nom-ou-prenom-obligatoire",
    message: "Le nom ou le prénom est obligatoire.",
    test: function (nom) {
      const prenom1 = this.parent[PRENOMS]?.prenom1;
      return nom || prenom1;
    }
  }),
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string().when([NOM, `${PRENOMS}.prenom1`], {
    is: (nom: string | undefined, prenom1: string | undefined) => nom || prenom1,
    then: Yup.string().oneOf(["MASCULIN", "FEMININ"], "Le sexe est obligatoire.").required("Le sexe est obligatoire."),
    otherwise: Yup.string()
  }),
  [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
  [NAISSANCE]: EvenementParentsFormValidationSchema,
  [NATIONALITES]: NationalitesFormValidationSchema
});

///////////////VALIDATION REQUERANT//////////////////

const AdresseFormValidationSchema = Yup.object().shape({
  [VOIE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [LIEU_DIT]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [COMPLEMENT_DESTINATAIRE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [COMPLEMENT_POINT_GEO]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [CODE_POSTAL]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [COMMUNE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [NUMERO_TELEPHONE]: Yup.string().matches(NumeroTelephone, NUMERO_TELEPHONE_NON_CONFORME)
});

const RequerantFormValidationSchema = Yup.object().shape({
  [NOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [AUTRE_ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [AUTRE_NUMERO_TELEPHONE]: Yup.string().matches(NumeroTelephone, NUMERO_TELEPHONE_NON_CONFORME),
  [ADRESSE]: AdresseFormValidationSchema
});

////////////////////////////////////////////////////////////
///////////////VALIDATION FORMULAIRE FINAL//////////////////
////////////////////////////////////////////////////////////

const ValidationSchemaSaisirRCTC = Yup.object({
  [REQUETE]: RequeteFormValidationSchema,
  [TITULAIRE]: IdentiteFormValidationSchema,
  [PARENTS]: Yup.object({
    parent1: ParentFormValidationSchema,
    parent2: Yup.lazy((value: any) => {
      if (value) {
        return ParentFormValidationSchema;
      }
      return Yup.object().nullable();
    }),
    [MARIAGE]: EvenementMariageParentsFormValidationSchema,
    [RECONNAISSANCE]: EvenementReconnaissanceTitulaireFormValidationSchema
  }),
  [REQUERANT]: RequerantFormValidationSchema
});

export const SaisirRCTCPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idRequeteParam } = useParams<TUuidRequeteParams>();

  //States
  //////////////////////////////////////////////////////////////////////////
  const [idRequete, setIdRequete] = useState<string>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [modeModification, setModeModification] = useState(false);
  const [transmissionPopinOuverte, setTransmissionPopinOuverte] = useState(false);
  const [creationRequeteRCTCParams, setCreationRequeteRCTCParams] = useState<ICreationRequeteCreationParams>();
  const [piecesjointesAMettreAJour, setPiecesjointesAMettreAJour] = useState<PieceJointe[]>();
  const [saisieRequeteRCTC, setSaisieRequeteRCTC] = useState<ISaisieRequeteRCTC>();
  const [requeteForm, setRequeteForm] = useState<ISaisieRequeteRCTC>();
  const [idRequeteCreerEtTransmise, setIdRequeteCreerEtTransmise] = useState<string>();
  const [updateRequeteCreation, setUpdateRequeteCreation] = useState<IUpdateRequeteCreationParams>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>();

  const { services } = useContext(RECEContextData);

  // Hooks
  //////////////////////////////////////////////////////////////////////////
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);
  const idRequeteCreee = useCreationRequeteCreation(creationRequeteRCTCParams);
  const idRequeteUpdate = useUpdateRequeteCreation(idRequete, updateRequeteCreation);

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
    setDetailRequeteParams({
      idRequete: idRequete ?? idRequeteParam,
      estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE)
    });
  }, [idRequete, location.pathname, idRequeteParam]);
  useEffect(() => {
    if (detailRequeteState) {
      const requeteFormMap = mappingRequeteTranscriptionVersForumlaireRCTC(detailRequeteState as IRequeteCreation);
      setRequeteForm(requeteFormMap);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (uneRequeteAEteCreeeOuTransmiseOuUpdate() && saisieRequeteRCTC) {
      // On ne prend que les pjs dont le contenu est renseigné,
      //   en effet si le contenu est vide c'est qu'il a été écrasé par la requête lors de la sauvegarde (la requête ramène ses pièces jointes mais sans le contenu)
      const pjAMettreAjour = getPiecesJointesNonVides(saisieRequeteRCTC?.[PIECES_JOINTES]);
      if (pjAMettreAjour && pjAMettreAjour.length > 0) {
        setPiecesjointesAMettreAJour(pjAMettreAjour);
      } else {
        finEtRedirection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRequeteCreee, saisieRequeteRCTC, idRequeteCreerEtTransmise, idRequeteUpdate]);

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
    if (location) {
      const url = location.pathname;
      setModeModification(url.includes(PATH_MODIFIER_RCTC));
    }
  }, [location]);

  // Evenements & fonctions
  //////////////////////////////////////////////////////////////////////////
  const onSubmitSaisirRequete = (values: ISaisieRequeteRCTC) => {
    setOperationEnCours(true);
    setSaisieRequeteRCTC(precedentEtat => ({ ...precedentEtat, ...values }));
    const requeteMap = mappingSaisieRequeteRCTCVersRequetesAEnvoyer(values);
    if (idRequete) {
      setUpdateRequeteCreation(precedentEtat => ({ ...precedentEtat, requete: requeteMap }));
    } else {
      setCreationRequeteRCTCParams(precedentEtat => ({ ...precedentEtat, requete: requeteMap }));
    }
  };

  function fermePopin() {
    setTransmissionPopinOuverte(false);
  }

  // Formulaire
  //////////////////////////////////////////////////////////////////////////
  const blocsForm: JSX.Element[] = [
    getRequeteForm(),
    getTitulaireForm(TitulaireRequeteCreation.getTitulairesTries(detailRequeteState?.titulaires)?.[0]),
    getParentsForm(TitulaireRequeteCreation.getParentsTries(detailRequeteState?.titulaires)),
    getRequerantForm(),
    getPiecesJointesForm()
  ];

  useTitreDeLaFenetre(TITRE_FORMULAIRE);

  return (
    <div className="m-auto mt-8 w-[60%]">
      <OperationEnCours
        visible={operationEnCours || !services}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />

      <Formulaire
        titre={TITRE_FORMULAIRE}
        formDefaultValues={requeteForm ?? ValeursRequeteCreationRCTCParDefaut}
        formValidationSchema={ValidationSchemaSaisirRCTC}
        onSubmit={onSubmitSaisirRequete}
        className="bg-blanc"
      >
        <div>{blocsForm}</div>
        <TransmissionPopin
          ouverte={transmissionPopinOuverte}
          onTransmissionEffectuee={(idRequeteApresCreationEtTransmission: string, formikValues: FormikValues) => {
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
      const url = receUrl.getUrlApercuPriseEnChargeCreationTranscriptionAPartirDe({
        url: location.pathname,
        idRequete: idRequeteCreee || idRequeteUpdate
      });
      replaceUrl(navigate, url);
    } else if (idRequeteCreerEtTransmise) {
      navigate(-UN);
    }
  }
};
/* v8 ignore end */
