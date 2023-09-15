import { ErrorMessage, Field } from "formik";
import React from "react";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";

const NB_LIGNE = 5;
export interface InputFieldProps {
  name: string;
  label?: string;
  ariaLabel?: string;
  maxLength?: string;
  title?: string;
  disabled?: boolean;
  noErrorMessage?: boolean;
  placeholder?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeInput?: TypeInput;
  component?: "input" | "select" | "textarea";
  rows?: number;
  className?: string;
  validate?: any;
}

interface TypeInput {
  type: string;
  min: number;
  max: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  ariaLabel,
  maxLength,
  title,
  disabled,
  noErrorMessage,
  placeholder,
  onInput,
  onBlur,
  onChange,
  typeInput,
  component = "input",
  rows = NB_LIGNE,
  className,
  validate
}) => {
  const otherProps = {} as any;
  if (maxLength) {
    otherProps.maxLength = maxLength;
  }
  if (onInput) {
    otherProps.onInput = onInput;
  }
  if (onBlur) {
    otherProps.onBlur = onBlur;
  }
  if (onChange) {
    otherProps.onChange = onChange;
  }

  return (
    <div className="InputField">
      <div className="BlockInput">
        {label && <label htmlFor={name}>{label}</label>}
        <Field
          aria-label={`${ariaLabel || name}`}
          component={component}
          name={name}
          id={name}
          disabled={disabled}
          title={title}
          {...otherProps}
          type={typeInput?.type}
          min={typeInput?.min}
          max={typeInput?.max}
          placeholder={placeholder || label}
          {...(component === "textarea" ? { rows } : {})}
          className={className}
          validate={validate}
        />
      </div>
      {!noErrorMessage && (
        <div className="BlockErreur">
          <ErrorMessage component={IconErrorMessage} name={name} />
        </div>
      )}
    </div>
  );
};
