import { SousTypeRequeteUtil } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import { Options } from "@util/Type";
import { estRenseigne, getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { CARACTERES_ALPHANUMERIQUE } from "@widget/formulaire/FormulaireMessages";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  onBlurChampNumero,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect, getIn } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CaracteresAlphanumeriques } from "../../../../../ressources/Regex";

// Noms des champs
export const NUMERO_REQUETE = "numeroRequete";
export const NUMERO_TELEDOSSIER = "numeroTeledossier";
export const NUMERO_DOSSIER_NATIONAL = "numeroDossierNational";
export const TYPE_REQUETE = "typeRequete";
export const SOUS_TYPE_REQUETE = "sousTypeRequete";
export const STATUT_REQUETE = "statutRequete";

// Valeurs par défaut des champs
export const RequeteDefaultValues = {
  [NUMERO_REQUETE]: "",
  [NUMERO_TELEDOSSIER]: "",
  [NUMERO_DOSSIER_NATIONAL]: "",
  [TYPE_REQUETE]: "",
  [SOUS_TYPE_REQUETE]: "",
  [STATUT_REQUETE]: ""
};

// Schéma de validation des champs
export const RequeteValidationSchema = Yup.object({
  [NUMERO_REQUETE]: Yup.string().matches(
    CaracteresAlphanumeriques,
    CARACTERES_ALPHANUMERIQUE
  ),
  [NUMERO_TELEDOSSIER]: Yup.string(),
  [NUMERO_DOSSIER_NATIONAL]: Yup.string(),
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
  const numeroTeledossierWithNamespace = withNamespace(
    props.nomFiltre,
    NUMERO_TELEDOSSIER
  );
  const numeroSDANFWithNamespace = withNamespace(
    props.nomFiltre,
    NUMERO_DOSSIER_NATIONAL
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

  const [sousTypeRequeteInactif, setSousTypeRequeteInactif] =
    useState<boolean>(true);

  const [statutRequeteInactif, setStatutRequeteInactif] =
    useState<boolean>(true);

  const [sousTypeRequeteOptions, setSousTypeRequeteOptions] = useState<Options>(
    []
  );

  const [statutRequeteOptions, setStatutRequeteOptions] = useState<Options>([]);

  const gestionTypeRequeteOptions = (type: string) => {
    if (type) {
      setSousTypeRequeteOptions(
        SousTypeRequeteUtil.getOptionsAPartirTypeRequete(
          TypeRequete.getEnumFor(type)
        )
      );
    }
  };

  const gestionStatutRequeteOptions = (type: string) => {
    if (type) {
      setStatutRequeteOptions(
        StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.getEnumFor(type))
      );
    }
  };

  const onChangeTypeRequete = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.formik.setFieldValue(sousTypeRequeteWithNamespace, "");
    gestionTypeRequeteOptions(e.target.value);
    gestionStatutRequeteOptions(e.target.value);
    props.formik.handleChange(e);
  };

  useEffect(() => {
    setSousTypeRequeteInactif(
      !estTypeRequeteDirty(props.formik.values as IRMCRequete)
    );

    setStatutRequeteInactif(
      !esSousTypeRequeteDirty(props.formik.values as IRMCRequete)
    );

    const type = getIn(
      props.formik.values,
      withNamespace(props.nomFiltre, TYPE_REQUETE)
    );
    gestionTypeRequeteOptions(type);
    gestionStatutRequeteOptions(type);
  }, [props.formik.dirty, props.formik.values, props.nomFiltre]);

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre requête")}>
        <div className="FormFiltre">
          <InputField
            name={numeroRequeteWithNamespace}
            label={getLibelle("N° Requête")}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBlurChampNumero(e, props.formik)
            }
          />
          <InputField
            name={numeroTeledossierWithNamespace}
            label={getLibelle("N° Télédossier")}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBlurChampNumero(e, props.formik)
            }
          />
          <InputField
            name={numeroSDANFWithNamespace}
            label={getLibelle("N° SDANF")}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBlurChampNumero(e, props.formik)
            }
          />
          <SelectField
            name={typeRequeteWithNamespace}
            label={getLibelle("Type de requête")}
            options={TypeRequete.getAllEnumsAsOptions()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            options={statutRequeteOptions}
            disabled={statutRequeteInactif}
          />
        </div>
      </Fieldset>
    </div>
  );
};

function estTypeRequeteDirty(values: IRMCRequete) {
  return values.requete?.typeRequete !== "";
}

function esSousTypeRequeteDirty(values: IRMCRequete): boolean {
  return estRenseigne(values.requete?.sousTypeRequete);
}

export default connect(RequeteFiltre);
