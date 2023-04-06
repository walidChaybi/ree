import { REGISTRE } from "@composant/formulaire/ConstantesNomsForm";
import { useMesPocopasApiHook } from "@hook/requete/creation/VillesRegistreApiHook";
import { getLibelle } from "@util/Utils";
import { connect } from "formik";
import React from "react";
import { SelectField } from "../../../widget/formulaire/champsSaisie/SelectField";
import {
  ISubForm,
  SubFormProps,
  withNamespace
} from "../../../widget/formulaire/utils/FormUtil";

const ChoixPocopas: React.FC<SubFormProps> = props => {
  const pocopas = useMesPocopasApiHook();

  return (
    <>
      <div className="VilleRegistreForm">
        <SelectField
          name={withNamespace(props.nom, REGISTRE)}
          label={getLibelle("Registre")}
          options={pocopas}
        />
      </div>
    </>
  );
};

export default connect<ISubForm>(ChoixPocopas);
