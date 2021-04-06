import React from "react";
import { Field, ErrorMessage } from "formik";
import { Option, Options } from "../../../../../views/common/util/Type";

interface RadioFieldProps {
  name: string;
  label: string;
  values: Options;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  noErrorMessage?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RadioField: React.FC<RadioFieldProps> = ({
  name,
  label,
  values,
  ariaLabel,
  title,
  disabled,
  noErrorMessage,
  onInput,
  onBlur,
  onChange
}) => {
  const otherProps = {} as any;
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
        <label htmlFor={name}>{label}</label>
        <div id={name} aria-label={name} className="RadioInput">
          {values.map((option: Option) => {
            const nameValue = `${name}.${option.value}`
              .trim()
              .toLocaleLowerCase();
            return (
              <span key={nameValue}>
                <Field
                  type="radio"
                  id={nameValue}
                  value={option.value}
                  name={name}
                  aria-label={nameValue}
                  disabled={disabled}
                  title={title}
                  {...otherProps}
                />
                <label htmlFor={nameValue}>{option.str}</label>
              </span>
            );
          })}
        </div>
      </div>
      {!noErrorMessage && (
        <div className="BlockErreur">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};
