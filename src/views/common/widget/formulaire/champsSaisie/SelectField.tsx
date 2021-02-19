import React from "react";
import { Field, ErrorMessage } from "formik";
import { Options } from "../../../util/Type";

interface SelectFiledProps {
  name: string;
  label: string;
  ariaLabel?: string;
  description?: string;
  options: Options;
}
export const SelectField: React.FC<SelectFiledProps> = ({
  name,
  label,
  ariaLabel,
  description,
  options
}) => {
  return (
    <div className="InputField">
      <div className="BlockInput">
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          aria-label={`${ariaLabel ? ariaLabel : name}`}
          as="select"
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
