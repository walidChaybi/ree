import { Option } from "@util/Type";
import {
  connect,
  ErrorMessage,
  Field,
  FormikProps,
  FormikValues
} from "formik";
import React, { useEffect, useRef, useState } from "react";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import { FormikComponentProps } from "../utils/FormUtil";
import "./scss/SelectField.scss";

export enum OptionVide {
  NON_PRESENTE,
  NON_SELECTIONNABLE,
  SELECTIONNABLE
}

interface SelectProps {
  componentName?: string;
  options: Option[];
  disabled?: boolean;
  value?: any;
  placeholder?: string;
  onChange?: (e: any, formik?: FormikProps<FormikValues>) => void;
  ariaLabel?: string;
  optionVide?: OptionVide;
  onBlur?: (e: any) => void;
}

export const SelectRece: React.FC<SelectProps> = props => {
  const ref = useRef<HTMLSelectElement>(null);
  const [value, setValue] = useState();
  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
      if (ref.current) {
        ref.current.value = e.target;
        ref.current.style.color = "black";
      }
    }
  };

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  return (
    <div className="SelectField">
      <select
        ref={ref}
        value={value}
        onChange={handleChange}
        name={props.componentName}
        disabled={props.disabled}
        onBlur={props.onBlur}
        aria-label={props.ariaLabel}
        data-testid={props.componentName}
        style={props.placeholder ? { color: "gray" } : undefined}
      >
        {props.optionVide !== OptionVide.NON_PRESENTE && (
          <option
            value={""}
            disabled={props.optionVide !== OptionVide.SELECTIONNABLE}
          >
            {props.placeholder ? props.placeholder : ""}
          </option>
        )}
        {props.options.map((option, index) => (
          <option key={index} value={option.cle} style={{ color: "black" }}>
            {option.libelle}
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
  optionVide,
  placeholder
}) => {
  return (
    <div className="InputField">
      <div className="BlockInput">
        {label !== undefined && (
          <label className="label" htmlFor={name}>
            {label}
          </label>
        )}
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
          optionVide={optionVide}
          placeholder={placeholder}
        />
      </div>
      <div className="BlockErreur">
        <ErrorMessage component={IconErrorMessage} name={name} />
      </div>
    </div>
  );
};

export const SelectField = connect<ComponentProps & SelectProps>(_SelectField);
