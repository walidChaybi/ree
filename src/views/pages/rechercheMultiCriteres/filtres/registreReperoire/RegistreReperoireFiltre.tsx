import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace,
  IOnFieldChangeParam,
  FormikComponentProps
} from "../../../../common/widget/formulaire/utils/FormUtil";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeValidationSchema,
  RegistreActeFiltreProps
} from "./RegistreActeFiltre";
import { getLibelle } from "../../../../common/widget/Text";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionValidationSchema
} from "./RepertoireInscriptionFiltre";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { connect } from "formik";

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

export type RegistreRepertoireFiltreProps = ComponentFiltreProps &
  FormikComponentProps;

const RegistreRepertoireFiltre: React.FC<RegistreRepertoireFiltreProps> = props => {
  const [filtreActeInactif, setFiltreActeInactif] = useState<
    boolean | undefined
  >(false);
  const [filtreInscriptionInactif, setFiltreInscriptionInactif] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    if (
      (filtreInscriptionInactif || filtreActeInactif) &&
      !props.formik.dirty
    ) {
      setFiltreInscriptionInactif(false);
      setFiltreActeInactif(false);
    }
  }, [
    props.formik.dirty,
    filtreInscriptionInactif,
    filtreActeInactif,
    setFiltreInscriptionInactif,
    setFiltreActeInactif
  ]);

  function onFiltreActeChange(param: IOnFieldChangeParam) {
    setFiltreInscriptionInactif(param.filtreDirty);
  }

  function onFiltreInscriptionChange(param: IOnFieldChangeParam) {
    setFiltreActeInactif(param.filtreDirty);
  }

  const registreRepertoireFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REPERTOIRE),
    onFieldChange: onFiltreInscriptionChange
  } as RegistreRepertoireFiltreProps;

  const registreActeFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REGISTRE),
    onFieldChange: onFiltreActeChange
  } as RegistreActeFiltreProps;

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre registre et répertoire")}>
        <div className="FormFiltre">
          <RegistreActeFiltre
            filtreInactif={filtreActeInactif}
            {...registreActeFiltreProps}
          />
        </div>
        <div className="FormFiltre">
          <RepertoireInscriptionFiltre
            filtreInactif={filtreInscriptionInactif}
            {...registreRepertoireFiltreProps}
          />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(RegistreRepertoireFiltre);
