import { TEXTE } from "@composant/formulaire/ConstantesNomsForm";
import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SousFormulaire } from "@widget/formulaire/SousFormulaire";
import { SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
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
