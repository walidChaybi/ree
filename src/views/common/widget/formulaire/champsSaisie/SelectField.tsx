import { Option } from "@util/Type";
import {
  connect,
  ErrorMessage,
  Field,
  FormikProps,
  FormikValues
} from "formik";
import React from "react";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import { FormikComponentProps } from "../utils/FormUtil";
import "./scss/SelectField.scss";

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

  return (
    <div className="SelectField">
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
      {
        <svg
          className="flecheExpansionSelect"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="grey"
        >
          <path d="M7 10l5 5 5-5H7z" />
          <path d="M0 0h24v24H0V0z" fill="none" />
        </svg>
      }
    </div>
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
