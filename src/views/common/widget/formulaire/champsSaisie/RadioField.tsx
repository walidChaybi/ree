import { Option, Options } from "@util/Type";
import { ErrorMessage, Field } from "formik";
import React from "react";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";

interface RadioFieldProps {
  type?: "checkbox" | "radio";
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
  className?: string;
}
export const RadioField: React.FC<RadioFieldProps> = ({
  type,
  name,
  label,
  values,
  ariaLabel,
  title,
  disabled,
  noErrorMessage,
  onInput,
  onBlur,
  onChange,
  className
}) => {
  type = type || "radio";
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
    <div className={`InputField ${className}`}>
      <div className="BlockInput">
        <label htmlFor={name}>{label}</label>
        <div id={name} aria-label={name} className="RadioInput">
          {values.map((option: Option) => {
            const nomValeur = `${name}.${option.cle}`
              .trim()
              .toLocaleLowerCase();
            return (
              <span key={nomValeur}>
                <Field
                  type={type}
                  id={nomValeur}
                  value={option.cle}
                  name={name}
                  aria-label={nomValeur}
                  disabled={disabled}
                  title={title}
                  {...otherProps}
                />
                <label htmlFor={nomValeur}>{option.libelle}</label>
              </span>
            );
          })}
        </div>
      </div>
      {!noErrorMessage && (
        <div className="BlockErreur">
          <ErrorMessage component={IconErrorMessage} name={name} />
        </div>
      )}
    </div>
  );
};
