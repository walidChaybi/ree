import Autocomplete from "@mui/material/Autocomplete";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { Option, Options } from "@util/Type";
import { ErrorMessage, Field, connect } from "formik";
import React from "react";
import { IconeCroix } from "../../icones/IconeCroix";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import { FormikComponentProps } from "../utils/FormUtil";
import "./scss/ChampRecherche.scss";

interface ChampRechercheProps {
  componentName: string;
  options: Options;
  disabled?: boolean;
  noOptionsText?: string;
  onInput?: (value: string | null) => void;
  onChange?: (option?: Option) => void;
  value?: any;
  onClickClear?: (e: any) => void;
  filterOptions?: (options: Options, state: FilterOptionsState<Option>) => Options;
  disabledPortal?: boolean;
  optionsValidesNonAffichees?: Options;
}

export const ChampRecherche: React.FC<ChampRechercheProps> = props => {
  return (
    <Autocomplete
      autoHighlight={true}
      data-testid="autocomplete"
      disablePortal={props.disabledPortal ? props.disabledPortal : false}
      className="Autocomplete"
      disabled={props.disabled}
      filterOptions={props.filterOptions}
      noOptionsText={
        props.noOptionsText ? props.noOptionsText : "Aucun résultats" // TOREFACTO : Orthographe ?
      }
      getOptionLabel={(option: Option) => option.libelle || ""}
      isOptionEqualToValue={(option, val) => {
        return (
          option.cle === val.cle || props.optionsValidesNonAffichees?.some(optionNonAffichee => optionNonAffichee.cle === val.cle) || false
        );
      }}
      options={props.options}
      value={props.value}
      onChange={(event, newValue) => {
        if (newValue != null) {
          if (props.onChange) {
            props.onChange(newValue);
          }
        } else {
          if (props.onChange) {
            props.onChange(undefined);
          }
        }
      }}
      onInputChange={(event, newInputValue) => {
        if (props.onInput) {
          props.onInput(newInputValue || null);
        }
      }}
      renderInput={params => (
        <div ref={params.InputProps.ref}>
          <input type="text" placeholder={"Recherche..."} {...params.inputProps} aria-label={props.componentName} />
          {!props.disabled && <IconeCroix onClick={props.onClickClear} title={"Vider le champ"} />}
        </div>
      )}
      renderOption={(renderProps, option: Option, { inputValue, selected }) => {
        return (
          <li {...renderProps} key={option.cle}>
            {option.libelle}
          </li>
        );
      }}
    />
  );
};

// Connexion du composant ChampRecherche à Formik
//////////////////////////////////////////////////////////
interface ComponentProps {
  name: string;
  label: string;
  onInput?: (value: string | null) => void;
  onChange?: (option?: Option) => void;
}

export type ChampRechercheFieldProps = ComponentProps &
  ChampRechercheProps &
  FormikComponentProps;

const _ChampRechercheField: React.FC<ChampRechercheFieldProps> = ({
  name,
  label,
  options,
  disabled,
  onInput,
  onChange,
  noOptionsText,
  formik,
  disabledPortal,
  optionsValidesNonAffichees
}) => {
  return (
    <div className="BlockInput ChampRecherche">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="FieldContainer">
        <Field
          name={name}
          componentName={name}
          onInput={(newInputValue: string | null) => {
            if (onInput) {
              onInput(newInputValue);
            }
            if (!newInputValue) {
              formik.setFieldValue(name, null);
            }
          }}
          onChange={(newValue?: Option) => {
            if (onChange) {
              onChange(newValue);
            }
            if (newValue != null) {
              formik.setFieldValue(name, newValue);
            } else {
              formik.setFieldValue(name, null);
            }
          }}
          onClickClear={function videChamp(e: any) {
            e.preventDefault();
            formik.setFieldValue(name, null);
          }}
          options={options}
          component={ChampRecherche}
          disabled={disabled}
          noOptionsText={noOptionsText}
          value={formik.getFieldProps(name).value}
          disabledPortal={disabledPortal}
          optionsValidesNonAffichees={optionsValidesNonAffichees}
        />
        <div className="BlockErreur">
          <ErrorMessage component={IconErrorMessage} name={name} />
        </div>
      </div>
    </div>
  );
};

export const ChampRechercheField = connect<
  ChampRechercheProps & ComponentProps
>(_ChampRechercheField);
