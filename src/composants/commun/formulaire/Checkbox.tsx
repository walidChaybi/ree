import FieldProps from "@model/form/FieldProps";
import {
  Checkbox as CheckboxMui,
  CheckboxProps as CheckboxMuiProps
} from "@mui/material";
import { ErrorMessage, useField } from "formik";
import "./Form.scss";

export type CheckboxProps = FieldProps & Omit<CheckboxMuiProps, "name">;

const Checkbox = ({ name, ...props }: CheckboxProps) => {
  const [field, meta] = useField<string>(name);

  return (
    <>
      <CheckboxMui {...props} inputProps={{ ...props.inputProps, ...field }} />
      {meta.error && (
        <div className="message-erreur-field">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default Checkbox;
