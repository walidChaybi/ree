import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../common/widget/Text";
import { InputField } from "../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../common/widget/formulaire/champsSaisie/SelectField";
import { Options } from "../../../../common/util/Type";
import { connect, getIn } from "formik";
import { TypeRequete } from "../../../../../model/requete/v2/TypeRequete";
import { StatutRequete } from "../../../../../model/requete/v2/StatutRequete";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/SousTypeDelivrance";
import { SousTypeCreation } from "../../../../../model/requete/v2/SousTypeCreation";
import { SousTypeMiseAJour } from "../../../../../model/requete/v2/SousTypeMiseAJour";
import { SousTypeInformation } from "../../../../../model/requete/v2/SousTypeInformation";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { CarateresAlphanumerique } from "../../../../../ressources/Regex";
import { CARACTERES_ALPHANUMERIQUE } from "../../../../common/widget/formulaire/FormulaireMessages";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { traiteEspace } from "../../../../common/widget/formulaire/utils/ControlesUtil";

// Noms des champs
export const NUMERO_REQUETE = "numeroRequete";
export const TYPE_REQUETE = "typeRequete";
export const SOUS_TYPE_REQUETE = "sousTypeRequete";
export const STATUT_REQUETE = "statutRequete";

// Valeurs par défaut des champs
export const RequeteDefaultValues = {
  [NUMERO_REQUETE]: "",
  [TYPE_REQUETE]: "",
  [SOUS_TYPE_REQUETE]: "",
  [STATUT_REQUETE]: ""
};

// Schéma de validation des champs
export const RequeteValidationSchema = Yup.object({
  [NUMERO_REQUETE]: Yup.string().matches(
    CarateresAlphanumerique,
    CARACTERES_ALPHANUMERIQUE
  ),
  [TYPE_REQUETE]: Yup.string(),
  [SOUS_TYPE_REQUETE]: Yup.string(),
  [STATUT_REQUETE]: Yup.string()
});

export type RequeteFiltreProps = ComponentFiltreProps & FormikComponentProps;

const RequeteFiltre: React.FC<RequeteFiltreProps> = props => {
  const numeroRequeteWithNamespace = withNamespace(
    props.nomFiltre,
    NUMERO_REQUETE
  );
  const typeRequeteWithNamespace = withNamespace(props.nomFiltre, TYPE_REQUETE);
  const sousTypeRequeteWithNamespace = withNamespace(
    props.nomFiltre,
    SOUS_TYPE_REQUETE
  );
  const statutRequeteWithNamespace = withNamespace(
    props.nomFiltre,
    STATUT_REQUETE
  );

  const [sousTypeRequeteInactif, setSousTypeRequeteInactif] = useState<boolean>(
    true
  );

  const [sousTypeRequeteOptions, setSousTypeRequeteOptions] = useState<Options>(
    []
  );

  const manageTypeRequeteOptions = (type: string) => {
    if (type === "DELIVRANCE") {
      setSousTypeRequeteOptions(SousTypeDelivrance.getAllNomsAsOptions());
    } else if (type === "CREATION_ACTE") {
      setSousTypeRequeteOptions(SousTypeCreation.getAllNomsAsOptions());
    } else if (type === "MISE_A_JOUR") {
      setSousTypeRequeteOptions(SousTypeMiseAJour.getAllNomsAsOptions());
    } else if (type === "INFORMATION") {
      setSousTypeRequeteOptions(SousTypeInformation.getAllEnumsAsOptions());
    } else {
      setSousTypeRequeteOptions([]);
    }
  };

  const onBlurNumero = (e: any) => {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  };

  const onChangeTypeRequete = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.formik.setFieldValue(sousTypeRequeteWithNamespace, "");
    manageTypeRequeteOptions(e.target.value);
    props.formik.handleChange(e);
  };

  useEffect(() => {
    setSousTypeRequeteInactif(
      !isTypeRequeteDirty(props.formik.values as IRMCRequete)
    );
    const type = getIn(
      props.formik.values,
      withNamespace(props.nomFiltre, TYPE_REQUETE)
    );
    manageTypeRequeteOptions(type);
  }, [props.formik.dirty, props.formik.values, props.nomFiltre]);

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre requête")}>
        <div className="FormFiltre">
          <InputField
            name={numeroRequeteWithNamespace}
            label={getLibelle("N° Requête")}
            onBlur={onBlurNumero}
          />
          <SelectField
            name={typeRequeteWithNamespace}
            label={getLibelle("Type de requête")}
            options={TypeRequete.getAllEnumsAsOptions()}
            onChange={e => {
              onChangeTypeRequete(e);
            }}
          />
          <SelectField
            name={sousTypeRequeteWithNamespace}
            label={getLibelle("Sous-type de requête")}
            options={sousTypeRequeteOptions}
            disabled={sousTypeRequeteInactif}
          />
          <SelectField
            name={statutRequeteWithNamespace}
            label={getLibelle("Statut de requête")}
            options={StatutRequete.getAllEnumsAsOptions()}
          />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(RequeteFiltre);

function isTypeRequeteDirty(values: IRMCRequete) {
  return values.requete?.typeRequete !== "";
}
