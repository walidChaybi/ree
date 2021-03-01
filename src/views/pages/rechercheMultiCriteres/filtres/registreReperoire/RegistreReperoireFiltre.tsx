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
import RepertoireInscriptionFiltre, {
  ComponentFiltreInscriptionProps,
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionValidationSchema
} from "./RepertoireInscriptionFiltre";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";

// Noms des champs
export const REGISTRE = "registre";
export const REPERTOIRE = "repertoire";

// Valeurs par défaut des champs
export const RegistreRepertoireDefaultValues = {
  [REGISTRE]: RegistreActeDefaultValues,
  [REPERTOIRE]: RepertoireInscriptionDefaultValues
};

// Schéma de validation des champs
export const RegistreRepertoireValidationSchema = Yup.object({
  [REGISTRE]: RegistreActeValidationSchema,
  [REPERTOIRE]: RepertoireInscriptionValidationSchema
});

export const RegistreRepertoireFiltre: React.FC<ComponentFiltreProps> = props => {
  const componentFiltreInscriptionProps = {
    nomFiltre: withNamespace(props.nomFiltre, REPERTOIRE)
  } as ComponentFiltreInscriptionProps;

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre registre et répertoire")}>
        <div className="FormFiltre">
          <RegistreActeFiltre
            nomFiltre={withNamespace(props.nomFiltre, REGISTRE)}
          />
        </div>
        <div className="FormFiltre">
          <RepertoireInscriptionFiltre {...componentFiltreInscriptionProps} />
        </div>
      </Fieldset>
    </div>
  );
};
