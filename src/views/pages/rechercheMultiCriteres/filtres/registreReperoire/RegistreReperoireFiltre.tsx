import React from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import {
  RegistreActeFiltre,
  RegistreActeDefaultValues,
  RegistreActeValidationSchema
} from "./RegistreActeFiltre";
import { getLibelle } from "../../../../common/widget/Text";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";

// Noms des champs
export const REGISTRE_ACTE = "registre";

// Valeurs par défaut des champs
export const RegistreRepertoireDefaultValues = {
  [REGISTRE_ACTE]: RegistreActeDefaultValues
};

// Schéma de validation des champs
export const RegistreRepertoireValidationSchema = Yup.object({
  [REGISTRE_ACTE]: RegistreActeValidationSchema
});

export const RegistreRepertoireFiltre: React.FC<ComponentFiltreProps> = props => {
  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre registre et répertoire")}>
        <div className="FormFiltre">
          <RegistreActeFiltre
            nomFiltre={withNamespace(props.nomFiltre, REGISTRE_ACTE)}
          />
        </div>
      </Fieldset>
    </div>
  );
};
