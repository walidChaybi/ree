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

// Noms des champs
export const REGISTRE_ACTE = "registreActe";

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
    <div className={`Filtre ${props.nomFiltre}`}>
      <div className="TitreFiltre">
        <span>{getLibelle("Filtre registre et répertoire")}</span>
      </div>
      <div className="FormFiltre">
        <RegistreActeFiltre
          nomFiltre={withNamespace(props.nomFiltre, REGISTRE_ACTE)}
        />
      </div>
    </div>
  );
};
