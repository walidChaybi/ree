import React, { useEffect, useState } from "react";
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
} from "./RegistreActeFiltre";
import { getLibelle } from "../../../../common/widget/Text";
import RepertoireInscriptionFiltre, {
  RepertoireInscriptionDefaultValues,
  RepertoireInscriptionValidationSchema
} from "./RepertoireInscriptionFiltre";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { connect } from "formik";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

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

  // Permet de dégriser les filtres registre ou inscription apres un resetForm.
  // Ou de griser si besoin un des filtres apres un rappelCriteres
  useEffect(() => {
    setFiltreActeInactif(
      isRepertoireDirty(props.formik.values as IRMCActeInscription)
    );

    setFiltreInscriptionInactif(
      isRegistreDirty(props.formik.values as IRMCActeInscription)
    );
  }, [props.formik.dirty, props.formik.values]);

  const registreRepertoireFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REPERTOIRE)
  } as RegistreRepertoireFiltreProps;

  const registreActeFiltreProps = {
    nomFiltre: withNamespace(props.nomFiltre, REGISTRE)
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

function isRegistreDirty(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.registre;
  return (
    criteres?.familleRegistre !== "" ||
    criteres?.natureActe !== "" ||
    criteres?.numeroActe !== "" ||
    criteres?.pocopa !== ""
  );
}

function isRepertoireDirty(values: IRMCActeInscription) {
  const criteres = values.registreRepertoire?.repertoire;
  return criteres?.numeroInscription !== "" || criteres?.typeRepertoire !== "";
}
