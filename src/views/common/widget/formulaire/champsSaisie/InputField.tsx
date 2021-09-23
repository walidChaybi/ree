import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputFieldProps {
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
  rows
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

  const iconErrorMessage = ({ ...props }) => (
    <span>
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        size="xs"
        className="Warning"
      />
      {props.children}
    </span>
  );

  return (
    <div className="InputField">
      <div className="BlockInput">
        {label && <label htmlFor={name}>{label}</label>}
        <Field
          aria-label={`${ariaLabel ? ariaLabel : name}`}
          component={component}
          name={name}
          id={name}
          disabled={disabled}
          title={title}
          {...otherProps}
          type={typeInput?.type}
          min={typeInput?.min}
          max={typeInput?.max}
          placeholder={placeholder ? placeholder : label}
          {...(component === "textarea" ? { rows: rows } : {})}
        />
      </div>
      {!noErrorMessage && (
        <div className="BlockErreur">
          <ErrorMessage component={iconErrorMessage} name={name} />
        </div>
      )}
    </div>
  );
};
