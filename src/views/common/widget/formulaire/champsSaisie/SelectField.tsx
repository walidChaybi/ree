import { FormControl, Select } from "@material-ui/core";
import { connect, ErrorMessage, Field } from "formik";
import React, { useEffect } from "react";
import { Option } from "../../../util/Type";
import { FormikComponentProps } from "../utils/FormUtil";
import "./scss/SelectField.scss";

interface SelectProps {
  componentName?: string;
  label: string;
  options: Option[];
  disabled?: boolean;
  value?: any;
  description?: string;
  onChange?: (e: any) => void;
  ariaLabel?: string;
  pasPremiereOptionVide?: boolean;
  placeholder?: string;
  onBlur?: (e: any) => void;
}

export const SelectRece: React.FC<SelectProps> = props => {
  const handleChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // Obligatoire pour les styles qui sont chargés dynamiquement lorsque le select est dans une fenetre externe
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    window.top.dispatchEvent(event);
  }, [props]);

  return (
    <FormControl variant="outlined">
      <Select
        value={props.value}
        onChange={handleChange}
        name={props.componentName}
        className="SelectField"
        disabled={props.disabled}
        native={true}
        onBlur={props.onBlur}
        arial-label={props.ariaLabel}
        data-testid={props.componentName}
        placeholder={props.placeholder ? props.placeholder : props.label}
      >
        {!props.pasPremiereOptionVide && (
          <option defaultValue={""}>
            {props.description ? props.description : ""}
          </option>
        )}
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.str}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

// Connexion du composant SelectField à Formik
//////////////////////////////////////////////////////////
interface ComponentProps {
  name: string;
  label: string;
  onChange?: (e: any) => void;
}

export type SelectFieldProps = ComponentProps &
  SelectProps &
  FormikComponentProps;

const _SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  disabled,
  ariaLabel,
  formik,
  onChange,
  onBlur
}) => {
  return (
    <div className="InputField">
      <div className="BlockInput">
        {label && <label htmlFor={name}>{label}</label>}
        <Field
          name={name}
          options={options}
          component={SelectRece}
          disabled={disabled}
          value={formik.getFieldProps(name).value}
          ariaLabel={`${ariaLabel ? ariaLabel : label}`}
          componentName={name}
          onBlur={onBlur}
          onChange={(e?: any) => {
            if (onChange) {
              onChange(e);
            }
            if (e.target.value != null) {
              formik.setFieldValue(name, e.target.value);
            } else {
              formik.setFieldValue(name, "");
            }
          }}
        />
      </div>
      <div className="BlockErreur">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export const SelectField = connect(_SelectField);
