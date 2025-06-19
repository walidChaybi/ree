import { ComponentFiltreProps, FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import EvenementFiltre, {
  EvenementDefaultValues,
  EvenementFiltreProps,
  EvenementValidationSchema
} from "../registreReperoire/EvenementFiltre";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeFiltreProps,
  RegistreActeValidationSchema
} from "../registreReperoire/RegistreActeFiltre";

// Noms des champs
const REGISTRE = "registre";
const EVENEMENT = "evenement";

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

export type RegistreArchiveFiltreProps = ComponentFiltreProps & FormikComponentProps;

const RegistreArchiveFiltre: React.FC<RegistreArchiveFiltreProps> = props => {
  const registreActeFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REGISTRE)
  } as RegistreActeFiltreProps;

  const evenementFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, EVENEMENT)
  } as EvenementFiltreProps;

  return (
    <div className={props.nomFiltre}>
      <RegistreActeFiltre
        filtreInactif={false}
        {...registreActeFiltreProps}
      />
      <EvenementFiltre
        filtreInactif={false}
        {...evenementFiltreProps}
      />
    </div>
  );
};

export default connect(RegistreArchiveFiltre);
