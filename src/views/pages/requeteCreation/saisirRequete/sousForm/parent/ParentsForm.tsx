import {
  IDENTIFIANT,
  NAISSANCE,
  NATIONALITES,
  NOM,
  PARENTS,
  PRENOMS,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import {
  creerValidationSchemaPrenom,
  genererDefaultValuesPrenoms
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { DOUZE, getLibelle } from "@util/Utils";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import {
  NationalitesFormDefaultValues,
  NationalitesFormValidationSchema
} from "@widget/formulaire/nationalites/NationalitesForm";
import {
  FormikComponentProps,
  INomForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { FormikProps, FormikValues, connect } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../ressources/Regex";
import {
  DATE_NAISSANCE,
  MARIAGE,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU,
  PAYS_ORIGINE,
  PAYS_STATUT_REFUGIE,
  RECONNAISSANCE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import { limitesParents } from "../../SaisirRCTCPage";
import EvenementMariageParentsForm from "../evenement/EvenementMariageParentsForm";
import {
  EvenementParentsFormDefaultValues,
  EvenementParentsFormValidationSchema
} from "../evenement/EvenementParentsForm";
import EvenementReconnaissanceTitulaireForm from "../evenement/EvenementReconnaissanceTitulaireForm";
import IdentiteParentForm from "./IdentiteParentForm";
import "./scss/ParentsForm.scss";

export const ParentFormDefaultValues = {
  [IDENTIFIANT]: "",
  [PAS_DE_NOM_CONNU]: "false",
  [NOM]: "",
  [PAS_DE_PRENOM_CONNU]: "false",
  [PRENOMS]: genererDefaultValuesPrenoms(),
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementParentsFormDefaultValues,
  [NATIONALITES]: NationalitesFormDefaultValues,
  [PAYS_STATUT_REFUGIE]: "",
  [PAYS_ORIGINE]: ""
};

// Schéma de validation des champs
export const ParentFormValidationSchema = Yup.object()
  .shape({
    [NOM]: Yup.string(),
    [PRENOMS]: creerValidationSchemaPrenom(),
    [SEXE]: Yup.string(),
    [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
    [NAISSANCE]: EvenementParentsFormValidationSchema,
    [NATIONALITES]: NationalitesFormValidationSchema,
    [PAYS_STATUT_REFUGIE]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [PAYS_ORIGINE]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    )
  })
  .test("parent.pasDePrenomConnu", function (value, error) {
    const prenom1 = value[PRENOMS].prenom1 as string;
    const pasDePrenomConnuCoche = value[PAS_DE_PRENOM_CONNU];

    const paramsError = {
      path: `${error.path}.prenoms.prenom1`,
      message: getLibelle("La saisie d'un prénom est obligatoire")
    };
    return pasDePrenomConnuCoche === "false" && !prenom1
      ? this.createError(paramsError)
      : true;
  })
  .test("pasDeNom", function (value, error) {
    const nom = value[NOM] as string;
    const pasDeNomConnuCoche = value[PAS_DE_NOM_CONNU];

    const paramsError = {
      path: `${error.path}.nom`,
      message: getLibelle("La saisie d'un nom est obligatoire")
    };
    return pasDeNomConnuCoche === "false" && !nom
      ? this.createError(paramsError)
      : true;
  });

interface ComponentParentsFormProps {
  parents?: ITitulaireRequeteCreation[];
}

export type ParentSubFormProps = SubFormProps & ComponentParentsFormProps;

const ParentsForm: React.FC<
  ParentSubFormProps & FormikComponentProps
> = props => {
  const [parents, setParents] = useState<ITitulaireRequeteCreation[]>([
    {} as ITitulaireRequeteCreation
  ]);

  useEffect(() => {
    if (props.parents) {
      setParents(props.parents);
    }
  }, [props.parents]);

  const boutonAjouterParent = useMemo(() => {
    const libelle = getLibelle("Ajouter un parent");
    return parents.length < limitesParents.MAX ? 
        <button
          aria-label={libelle}
          type="button"
          onClick={() => onAjoutParent(props.formik)}
        >
          {libelle}
        </button>
     : <></>;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents.length]);

  const boutonSupprimerParent = useMemo(() => {
    const libelle = getLibelle("Retirer un parent");
    return parents.length > limitesParents.MIN ? (
      <button
          className="BoutonDanger"
          aria-label={libelle}
          type="button"
          onClick={() => onRetraitParent(props.formik)}
        >
          {libelle}
        </button>
    ) : <></>;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents.length]);

  const onAjoutParent = (formik: FormikProps<FormikValues>) => {
    const nomParent2 = withNamespace(PARENTS, "parent2");
    formik.setFieldValue(nomParent2, {
      ...ParentFormDefaultValues,
      [PRENOMS]: { ...genererDefaultValuesPrenoms() }
    });
    setParents([...parents, {} as ITitulaireRequeteCreation]);
  };

  const onRetraitParent = (formik: FormikProps<FormikValues>) => {
    const nomParent2 = withNamespace(PARENTS, "parent2");
    setParents(parents.slice(0, -1));
    formik.setFieldValue(nomParent2, {});
  };

  return (
    <>
      <div className="ParentsForm">
        {parents.map((parent, index) => (
          <IdentiteParentForm
            parent={parent}
            key={index}
            nom={withNamespace(props.nom, `parent${index + 1}`)}
            titre={`Parent ${index + 1}`}
            maxPrenoms={DOUZE}
          />
        ))}
        <div className="conteneurBoutons">
          {boutonAjouterParent}
          {boutonSupprimerParent}
        </div>
        <EvenementMariageParentsForm nom={withNamespace(props.nom, MARIAGE)} />
        <EvenementReconnaissanceTitulaireForm
          nom={withNamespace(props.nom, RECONNAISSANCE)}
        />
      </div>
    </>
  );
};

export default connect<ComponentParentsFormProps & INomForm>(ParentsForm);
