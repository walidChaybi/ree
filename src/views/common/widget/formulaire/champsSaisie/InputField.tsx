import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  name: string;
  label?: string;
  ariaLabel?: string;
  maxLength?: string;
  title?: string;
  disabled?: boolean;
  noErrorMessage?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  ariaLabel,
  maxLength,
  title,
  disabled,
  noErrorMessage,
  onInput,
  onBlur,
  onChange
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
    <>
      <div className="BlockInput">
        {label && <label htmlFor={name}>{label}</label>}
        <Field
          aria-label={`${ariaLabel ? ariaLabel : name}`}
          component="input"
          name={name}
          id={name}
          disabled={disabled}
          title={title}
          {...otherProps}
        />
      </div>
      {!noErrorMessage && (
        <div className="BlockErreur">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};
