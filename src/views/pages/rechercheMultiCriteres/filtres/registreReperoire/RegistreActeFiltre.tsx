import RecherchePocopas from "@composant/recherchePocopas/RecherchePocopas";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import {
  MAX_ANNEE_MESSAGE,
  MIN_LENGTH_ANNEE_MESSAGE
} from "@widget/formulaire/FormulaireMessages";
import {
  digitSeulement,
  traiteCarAutorises,
  traiteEspace
} from "@widget/formulaire/utils/ControlesUtil";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

// Noms des champs
export const NATURE_ACTE = "natureActe";
export const FAMILLE_REGISTRE = "familleRegistre";
export const POCOPA = "pocopa";
export const NUMERO_ACTE = "numeroActe";
export const ANNEE = "anneeRegistre";

// Valeurs par défaut des champs
export const RegistreActeDefaultValues = {
  [NATURE_ACTE]: "",
  [FAMILLE_REGISTRE]: "",
  [ANNEE]: "",
  [POCOPA]: null, // Pocopa est un objet de type Option ({value: "", str: ""})
  [NUMERO_ACTE]: ""
};

const MIN_LENGTH_ANNEE = 999;

// Schéma de validation des champs
export const RegistreActeValidationSchema = Yup.object({
  [NATURE_ACTE]: Yup.string(),
  [FAMILLE_REGISTRE]: Yup.string(),
  [ANNEE]: Yup.number()
    .min(MIN_LENGTH_ANNEE, MIN_LENGTH_ANNEE_MESSAGE)
    .max(new Date().getFullYear(), MAX_ANNEE_MESSAGE),
  [NUMERO_ACTE]: Yup.string()
});

export type RegistreActeFiltreProps = ComponentFiltreProps &
  FormikComponentProps;

const NOMBRE_RESULTAT_MAX = 15;
const RegistreActeFiltre: React.FC<RegistreActeFiltreProps> = props => {
  const [familleRegistre, setFamilleRegistre] = useState("");
  // Namespace des composants formik
  const pocopaWithNamespace = withNamespace(props.nomFiltre, POCOPA);
  const numeroActeWithNamespace = withNamespace(props.nomFiltre, NUMERO_ACTE);
  const familleRegistreWithNamespace = withNamespace(
    props.nomFiltre,
    FAMILLE_REGISTRE
  );
  const natureActeWithNamespace = withNamespace(props.nomFiltre, NATURE_ACTE);

  // Evennement
  function numeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
  }

  const onBlurNumero = (e: any) => {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  };

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
  }

  const onFamilleRegistreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Réinitialisation du POCOPA si la famille change
    setFamilleRegistre(e.target.value);
    props.formik.setFieldValue(pocopaWithNamespace, null);
    props.formik.handleChange(e);
  };

  return (
    <Fieldset titre={getLibelle("Filtre registre")}>
      <div className="FormFiltre">
        <SelectField
          name={natureActeWithNamespace}
          label={getLibelle("Nature de l'acte")}
          options={NatureActe.getAllEnumsAsOptions()}
          disabled={props.filtreInactif}
        />
        <SelectField
          name={familleRegistreWithNamespace}
          label={getLibelle("Famille de registre")}
          options={TypeFamille.getAllEnumsAsOptions()}
          disabled={props.filtreInactif}
          onChange={onFamilleRegistreChange}
        />

        <InputField
          name={withNamespace(props.nomFiltre, ANNEE)}
          label={getLibelle("Année de registre")}
          ariaLabel={`${props.nomFiltre}.annee`}
          maxLength="4"
          onInput={anneeChange}
          disabled={props.filtreInactif}
        />

        <RecherchePocopas
          nom={pocopaWithNamespace}
          label={"Poste Commune Pays"}
          nombreResultatsMax={NOMBRE_RESULTAT_MAX}
          familleRegistre={familleRegistre}
          estOuvert={undefined}
        />

        <InputField
          name={numeroActeWithNamespace}
          label={getLibelle("N° de l'acte")}
          disabled={props.filtreInactif}
          onBlur={onBlurNumero}
          onInput={numeroChange}
        />
      </div>
    </Fieldset>
  );
};

export default connect(RegistreActeFiltre);
