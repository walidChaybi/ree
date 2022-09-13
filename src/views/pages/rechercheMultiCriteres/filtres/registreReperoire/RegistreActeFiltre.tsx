import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { Option, Options } from "@util/Type";
import {
  enMajuscule,
  getLibelle,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import {
  ChampRechercheField,
  ChampRechercheFieldProps
} from "@widget/formulaire/champRecherche/ChampRechercheField";
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
import React, { useCallback } from "react";
import * as Yup from "yup";
import { useRecherchePocopa } from "./hook/RecherchePocopaApiHook";

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

const nombreResultatsMax = 15;
const RegistreActeFiltre: React.FC<RegistreActeFiltreProps> = props => {
  // Namespace des composants formik
  const pocopaWithNamespace = withNamespace(props.nomFiltre, POCOPA);
  const numeroActeWithNamespace = withNamespace(props.nomFiltre, NUMERO_ACTE);
  const familleRegistreWithNamespace = withNamespace(
    props.nomFiltre,
    FAMILLE_REGISTRE
  );
  const natureActeWithNamespace = withNamespace(props.nomFiltre, NATURE_ACTE);

  // State: Gestion Autocomplete
  const [valeurChampAutocomplete, setValeurChampAutocomplete] =
    React.useState<string>("");

  // State: dernier pocopas sélectionné
  const [lastPocopaSelected, setLastPocopaSelected] = React.useState<
    string | undefined
  >(undefined);

  const familleRegistre = props.formik.getFieldProps(
    familleRegistreWithNamespace
  ).value;
  const pocopas = useRecherchePocopa(
    valeurChampAutocomplete,
    familleRegistre,
    nombreResultatsMax
  );

  // Evennement
  function numeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
  }

  const onBlurNumero = (e: any) => {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  };

  function onChampRechercheInput(value: string | null) {
    setValeurChampAutocomplete(value ? value : "");
  }

  function onChampRechercheChange(option?: Option) {
    setLastPocopaSelected(option ? option.str : undefined);
  }

  function anneeChange(e: React.ChangeEvent<HTMLInputElement>) {
    traiteCarAutorises(e.target, digitSeulement);
  }

  /**
   * Ajoute le dernier pocopa sélectionné à la liste de pocopas ramenée par l'api
   * Permet de résoudre un warning lorsque l'utilisateur commence à taper une lettre après une première sélection.
   *   Pour reproduire le warning:
   *    -choisir un pocopa ("TUNIS" par exemple)
   *    -sélectionner le pocopa choisi (cliquer dans le champs de recherche)
   *    -taper une lettre ne se trouvant pas dans la liste à la place ("x" par exemple)
   *   Exemple de warning:
   *   Material-UI: The value provided to Autocomplete is invalid.
   *   None of the options match with `{"key":"TUNIS","value":"TUNIS"}`.
   *   You can use the `getOptionSelected` prop to customize the equality test.
   */
  const getPocopasAsOptions = useCallback(() => {
    let pocopasAsOptions = [] as Options;
    if (pocopas) {
      pocopasAsOptions = pocopas.map(
        p =>
          ({
            value: enMajuscule(p),
            str: p
          } as Option)
      );
    }

    if (lastPocopaSelected && pocopas?.indexOf(lastPocopaSelected) === -1) {
      pocopasAsOptions.push({
        value: enMajuscule(lastPocopaSelected),
        str: premiereLettreEnMajusculeLeResteEnMinuscule(lastPocopaSelected)
      });
    }
    return pocopasAsOptions;
  }, [pocopas, lastPocopaSelected]);

  const onFamilleRegistreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Réinitialisation du POCOPA si la famille change
    props.formik.setFieldValue(pocopaWithNamespace, null);
    setLastPocopaSelected(undefined);
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

        <ChampRechercheField
          {...({
            name: pocopaWithNamespace,
            label: "Poste Commune Pays",
            onChange: onChampRechercheChange,
            onInput: onChampRechercheInput,
            options: getPocopasAsOptions(),
            disabled: props.filtreInactif,
            disabledPortal: true
          } as ChampRechercheFieldProps)}
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
