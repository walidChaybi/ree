import React from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace,
  FormikComponentProps
} from "../../../../common/widget/formulaire/utils/FormUtil";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeValidationSchema,
  RegistreActeFiltreProps
} from "../registreReperoire/RegistreActeFiltre";
import { getLibelle } from "../../../../common/widget/Text";
import EvenementFiltre, {
  EvenementFiltreProps,
  EvenementDefaultValues,
  EvenementValidationSchema
} from "../registreReperoire/EvenementFiltre";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { connect } from "formik";

// Noms des champs
export const REGISTRE = "registre";
export const EVENEMENT = "evenement";

// Valeurs par défaut des champs
export const RegistreArchiveDefaultValues = {
  [REGISTRE]: RegistreActeDefaultValues,
  [EVENEMENT]: EvenementDefaultValues
};

// Schéma de validation des champs
export const RegistreArchiveValidationSchema = Yup.object({
  [REGISTRE]: RegistreActeValidationSchema,
  [EVENEMENT]: EvenementValidationSchema
});

export type RegistreArchiveFiltreProps = ComponentFiltreProps &
  FormikComponentProps;

const RegistreArchiveFiltre: React.FC<RegistreArchiveFiltreProps> = props => {
  const registreActeFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REGISTRE)
  } as RegistreActeFiltreProps;

  const evenementFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, EVENEMENT)
  } as EvenementFiltreProps;

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre registre")}>
        <div className="FormFiltre">
          <RegistreActeFiltre
            filtreInactif={false}
            {...registreActeFiltreProps}
          />
        </div>
        <div className="FormFiltre">
          <EvenementFiltre filtreInactif={false} {...evenementFiltreProps} />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(RegistreArchiveFiltre);
