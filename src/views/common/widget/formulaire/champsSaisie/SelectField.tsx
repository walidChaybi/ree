import { ErrorMessage, Field } from "formik";
import React from "react";
import { Options } from "../../../util/Type";

interface SelectFiledProps {
  name: string;
  label: string;
  ariaLabel?: string;
  description?: string;
  options: Options;
  disabled?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const SelectField: React.FC<SelectFiledProps> = ({
  name,
  label,
  ariaLabel,
  description,
  options,
  disabled,
  onInput,
  onChange
}) => {
  const otherProps = {} as any;
  if (onInput) {
    otherProps.onInput = onInput;
  }
  if (onChange) {
    otherProps.onChange = onChange;
  }

  return (
    <div className="InputField">
      <div className="BlockInput">
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          aria-label={`${ariaLabel ? ariaLabel : name}`}
          as="select"
          disabled={disabled}
          {...otherProps}
        >
          <option defaultValue={""}>{description ? description : ""}</option>
          {options.map(({ value, str }) => (
            <option key={value} value={value}>
              {str}
            </option>
          ))}
        </Field>
      </div>
      <div className="BlockErreur">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};
