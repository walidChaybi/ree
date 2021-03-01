import React, { useState } from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  withNamespace,
  IOnFieldChangeParam
} from "../../../../common/widget/formulaire/utils/FormUtil";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeValidationSchema,
  RegistreActeFiltreProps
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
  const [filtreActeInactif, setFiltreActeInactif] = useState<
    boolean | undefined
  >(false);
  const [filtreInscriptionInactif, setFiltreInscriptionInactif] = useState<
    boolean | undefined
  >(false);

  function onFiltreActeChange(param: IOnFieldChangeParam) {
    setFiltreInscriptionInactif(param.filtreDirty);
  }

  function onFiltreInscriptionChange(param: IOnFieldChangeParam) {
    setFiltreActeInactif(param.filtreDirty);
  }

  const componentFiltreInscriptionProps = {
    nomFiltre: withNamespace(props.nomFiltre, REPERTOIRE),
    onFieldChange: onFiltreInscriptionChange
  } as ComponentFiltreInscriptionProps;

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
            {...componentFiltreInscriptionProps}
          />
        </div>
      </Fieldset>
    </div>
  );
};
