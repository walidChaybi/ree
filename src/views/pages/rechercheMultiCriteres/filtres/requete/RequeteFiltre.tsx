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
import { connect } from "formik";
import { TypeRequete } from "../../../../../model/requete/v2/TypeRequete";
import { StatutRequete } from "../../../../../model/requete/v2/StatutRequete";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/SousTypeDelivrance";
import { SousTypeCreation } from "../../../../../model/requete/v2/SousTypeCreation";
import { SousTypeMiseAJour } from "../../../../../model/requete/v2/SousTypeMiseAJour";
import { SousTypeInformation } from "../../../../../model/requete/v2/SousTypeInformation";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { CarateresAlphanumerique } from "../../../../../ressources/Regex";
import { CARACTERES_ALPHANUMERIQUE } from "../../../../common/widget/formulaire/FormulaireMessages";

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

  const [
    sousTypeRequeteDisabled,
    setSousTypeRequeteDisabled
  ] = useState<boolean>(true);

  const [sousTypeRequeteOptions, setSousTypeRequeteOptions] = useState<Options>(
    []
  );

  const manageTypeRequeteOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.formik.setFieldValue(sousTypeRequeteWithNamespace, "");
    if (e.target.value === "DELIVRANCE") {
      setSousTypeRequeteDisabled(false);
      setSousTypeRequeteOptions(SousTypeDelivrance.getAllNomsAsOptions());
    } else if (e.target.value === "CREATION_ACTE") {
      setSousTypeRequeteDisabled(false);
      setSousTypeRequeteOptions(SousTypeCreation.getAllNomsAsOptions());
    } else if (e.target.value === "MISE_A_JOUR") {
      setSousTypeRequeteDisabled(false);
      setSousTypeRequeteOptions(SousTypeMiseAJour.getAllNomsAsOptions());
    } else if (e.target.value === "INFORMATION") {
      setSousTypeRequeteDisabled(false);
      setSousTypeRequeteOptions(SousTypeInformation.getAllEnumsAsOptions());
    } else {
      setSousTypeRequeteDisabled(true);
      setSousTypeRequeteOptions([]);
    }
    props.formik.handleChange(e);
  };

  useEffect(() => {
    if (!sousTypeRequeteDisabled && !props.formik.dirty) {
      setSousTypeRequeteDisabled(true);
    }
  }, [props.formik.dirty, sousTypeRequeteDisabled]);

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre requête")}>
        <div className="FormFiltre">
          <InputField
            name={numeroRequeteWithNamespace}
            label={getLibelle("N° Requete")}
          />
          <SelectField
            name={typeRequeteWithNamespace}
            label={getLibelle("Type de requête")}
            options={TypeRequete.getAllEnumsAsOptions()}
            onChange={e => {
              manageTypeRequeteOptions(e);
            }}
          />
          <SelectField
            name={sousTypeRequeteWithNamespace}
            label={getLibelle("Sous-type de requête")}
            options={sousTypeRequeteOptions}
            disabled={sousTypeRequeteDisabled}
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
