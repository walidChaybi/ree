import { Option } from "@util/Type";
import {
  connect,
  ErrorMessage,
  Field,
  FormikProps,
  FormikValues
} from "formik";
import React, { useEffect } from "react";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import { FormikComponentProps } from "../utils/FormUtil";

interface SelectProps {
  componentName?: string;
  label: string;
  options: Option[];
  disabled?: boolean;
  value?: any;
  description?: string;
  onChange?: (e: any, formik?: FormikProps<FormikValues>) => void;
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
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  return (
    <select
      value={props.value}
      onChange={handleChange}
      name={props.componentName}
      disabled={props.disabled}
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
    </select>
  );
};

// Connexion du composant SelectField à Formik
//////////////////////////////////////////////////////////
interface ComponentProps {
  name: string;
  label: string;
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
  onBlur,
  pasPremiereOptionVide
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
              onChange(e, formik);
            }
            if (e.target.value != null) {
              formik.setFieldValue(name, e.target.value);
            } else {
              formik.setFieldValue(name, "");
            }
          }}
          pasPremiereOptionVide={pasPremiereOptionVide}
        />
      </div>
      <div className="BlockErreur">
        <ErrorMessage component={IconErrorMessage} name={name} />
      </div>
    </div>
  );
};

export const SelectField = connect<ComponentProps & SelectProps>(_SelectField);
