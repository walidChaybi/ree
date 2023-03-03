import {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { IParent } from "@model/requete/IParents";
import { getLibelle } from "@util/Utils";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import {
  NationalitesFormDefaultValues,
  NationalitesFormValidationSchema
} from "@widget/formulaire/nationalites/Nationalites";
import {
  FormikComponentProps,
  INomForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect, FormikProps, FormikValues } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import {
  DATE_NAISSANCE,
  MARIAGE,
  NAISSANCE,
  NATIONALITES,
  NOM,
  PARENTS,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU,
  PAYS_ORIGINE_REGUGIE,
  PAYS_STATUT_REGUGIE,
  PRENOMS,
  RECONNAISSANCE,
  SEXE
} from "../../modelForm/ISaisirRCTCPageModel";
import {
  limitesParents,
  ValeursRequeteCreationRCTCParDefaut
} from "../../SaisirRCTCPage";
import {
  EvenementEtrangerFormDefaultValues,
  EvenementEtrangerFormValidationSchema
} from "../evenement/EvenementEtranger";
import EvenementMariageParentsForm from "../evenement/EvenementMariageParentsForm";
import EvenementReconnaissanceTitulaireForm from "../evenement/EvenementReconnaissanceTitulaireForm";
import IdentiteParentForm from "./IdentiteParentForm";
import "./scss/ParentsForm.scss";

export const ParentFormDefaultValues = {
  [PAS_DE_NOM_CONNU]: "false",
  [NOM]: "",
  [PAS_DE_PRENOM_CONNU]: "false",
  [PRENOMS]: PrenomsFormDefaultValues,
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementEtrangerFormDefaultValues,
  [NATIONALITES]: NationalitesFormDefaultValues,
  [PAYS_STATUT_REGUGIE]: "",
  [PAYS_ORIGINE_REGUGIE]: ""
};

// Schéma de validation des champs
export const ParentFormValidationSchema = Yup.object().shape({
  [NOM]: Yup.string(),
  [PRENOMS]: PrenomsFormValidationSchema,
  [SEXE]: Yup.string(),
  [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
  [NAISSANCE]: EvenementEtrangerFormValidationSchema,
  [NATIONALITES]: NationalitesFormValidationSchema,
  [PAYS_STATUT_REGUGIE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PAYS_ORIGINE_REGUGIE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  )
});

type BoutonParentProps = {
  label: string;
  visible?: boolean;
  onClick: () => void;
} & JSX.IntrinsicElements["button"];

interface ComponentParentsFormProps {
  parents?: IParent[];
}

export type ParentSubFormProps = SubFormProps & ComponentParentsFormProps;

const ParentsForm: React.FC<
  ParentSubFormProps & FormikComponentProps
> = props => {
  const [parents, setParents] = useState<IParent[]>([{} as IParent]);

  useEffect(() => {
    if (props.parents) {
      setParents(props.parents);
    }
  }, [props.parents]);

  const BoutonParent = ({
    label,
    visible = true,
    className,
    onClick
  }: BoutonParentProps) => (
    <>
      {visible && (
        <button
          aria-label={getLibelle(label)}
          type="button"
          className={className}
          onClick={onClick}
        >
          {getLibelle(label)}
        </button>
      )}
    </>
  );

  const onAjoutParent = (formik: FormikProps<FormikValues>) => {
    setParents([...parents, {} as IParent]);
  };

  const onRetraitParent = (formik: FormikProps<FormikValues>) => {
    const nomParent2 = withNamespace(PARENTS, "parent2");
    const defautParent2 = ValeursRequeteCreationRCTCParDefaut[PARENTS].parent2;
    setParents(parents.slice(0, -1));
    formik.setFieldValue(nomParent2, defautParent2);
  };

  return (
    <>
      <div className="ParentsForm">
        {parents.map((parentForm, index) => (
          <IdentiteParentForm
            key={index}
            nom={`${withNamespace(props.nom, "parent" + (index + 1))}`}
            titre={`Parent ${index + 1}`}
          />
        ))}

        <div className="conteneurBoutons">
          <BoutonParent
            label={getLibelle("Ajouter un parent")}
            onClick={() => onAjoutParent(props.formik)}
            visible={parents.length < limitesParents.MAX}
          />
          <BoutonParent
            label={getLibelle("Retirer un parent")}
            className="BoutonDanger"
            onClick={() => onRetraitParent(props.formik)}
            visible={parents.length > limitesParents.MIN}
          />
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
