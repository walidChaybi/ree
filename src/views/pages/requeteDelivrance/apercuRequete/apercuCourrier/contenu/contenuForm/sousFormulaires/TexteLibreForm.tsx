import { connect } from "formik";
import React from "react";
import { InputField } from "../../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SousFormulaire } from "../../../../../../../common/widget/formulaire/SousFormulaire";
import {
  SubFormProps,
  withNamespace
} from "../../../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../../../common/widget/Text";
import { TEXTE } from "../../modelForm/ISaisiePageModel";
import "./scss/TexteLibreForm.scss";

const TexteLibreForm: React.FC<SubFormProps> = props => {
  return (
    <SousFormulaire titre={props.titre}>
      <div className="TexteLibreForm">
        <InputField
          name={withNamespace(props.nom, TEXTE)}
          label={getLibelle("Texte libre")}
          component={"textarea"}
        />
      </div>
    </SousFormulaire>
  );
};

export default connect(TexteLibreForm);
