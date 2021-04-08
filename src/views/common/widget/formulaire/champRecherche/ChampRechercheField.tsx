import React from "react";
import { makeStyles } from "@material-ui/core";
import "./sass/ChampRecherche.scss";
import { Autocomplete } from "@material-ui/lab";
import { Option } from "../../../util/Type";
import { Field, connect } from "formik";
import { getLibelle } from "../../Text";
import { IconeCroix } from "../../icones/IconeCroix";
import { FormikComponentProps } from "../utils/FormUtil";

interface ChampRechercheProps {
  componentName: string;
  options: Option[];
  disabled?: boolean;
  noOptionsText?: string;
  onInput?: (value: string | null) => void;
  onChange?: (option?: Option) => void;
  getValue: () => Option;
  onClickClear: (e: any) => void;
}

const useStyles = makeStyles(theme => ({
  option: {
    fontSize: "14.7px",
    fontFamily: "'NotoSansUI-Regular', sans-serif",
    '&[data-focus="true"]': {
      backgroundColor: "#0579be78"
    }
  }
}));

export const ChampRecherche: React.FC<ChampRechercheProps> = props => {
  const classes = useStyles();
  return (
    <Autocomplete
      data-testid="autocomplete"
      classes={{
        option: classes.option
      }}
      className="Autocomplete"
      disabled={props.disabled}
      noOptionsText={
        props.noOptionsText
          ? props.noOptionsText
          : getLibelle("Aucun résultats")
      }
      getOptionLabel={(option: Option) => option.str}
      getOptionSelected={(option, val) => {
        return option.value === val.value;
      }}
      options={props.options}
      value={props.getValue()}
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
          props.onInput(newInputValue ? newInputValue : null);
        }
      }}
      renderInput={params => (
        <div ref={params.InputProps.ref}>
          <input
            type="text"
            placeholder={"Recherche..."}
            {...params.inputProps}
            aria-label={props.componentName}
          />
          <IconeCroix
            onClick={props.onClickClear}
            title={getLibelle("Vider le champ")}
          />
        </div>
      )}
      renderOption={option => {
        return <span key={option.value}>{option.str}</span>;
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
  formik
}) => {
  return (
    <div className="BlockInput">
      {label && <label htmlFor={name}>{label}</label>}
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
        getValue={() => {
          return formik.getFieldProps(name).value;
        }}
      />
    </div>
  );
};

export const ChampRechercheField = connect(_ChampRechercheField);
