import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { COURRIER, DELIVRANCE } from "../../modelForm/ISaisiePageModel";
import "./scss/ChoixCourrierForm.scss";

interface ChoixCourrierFormProps {
  typesCourrier: Options;
}

export type ChoixCourrierSubFormProps = SubFormProps & ChoixCourrierFormProps;

// Schéma de validation en sortie de champs
export const ValidationSchemaChoixCourrier = Yup.object().shape({
  [DELIVRANCE]: Yup.string(),
  [COURRIER]: Yup.string()
});

const ChoixCourrierForm: React.FC<ChoixCourrierSubFormProps> = props => {
  const onChangeTypeCourrier = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    props.formik.setFieldValue(
      withNamespace(props.nom, COURRIER),
      e.target.value
    );
  };

  return (
    <SousFormulaire>
      <div className="ChoixCourrierForm">
        <InputField
          name={withNamespace(props.nom, DELIVRANCE)}
          label={getLibelle("Choix délivrance")}
          maxLength={NB_CARACT_MAX_SAISIE}
          disabled={true}
        />
        <SelectField
          name={withNamespace(props.nom, COURRIER)}
          label={getLibelle("Courrier")}
          options={props.typesCourrier}
          pasPremiereOptionVide={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeTypeCourrier(e);
          }}
        />
      </div>
    </SousFormulaire>
  );
};

export default connect(ChoixCourrierForm);
