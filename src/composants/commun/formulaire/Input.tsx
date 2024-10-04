import FieldProps from "@model/form/FieldProps";
import { ErrorMessage, Field, FieldAttributes, useField } from "formik";
import "./Form.scss";

export type InputProps = FieldProps & FieldAttributes<any>;

const Input = ({ name, ...props }: InputProps) => {
  const [field, meta] = useField<string>(name);

  return (
    <>
      <Field
        {...props}
        {...field}
        state={meta.error && meta.touched ? "error" : "default"}
        nativeinputprops={{ ...props.nativeInputProps }}
      />
      {meta.error && (
        <div className="message-erreur-field">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default Input;
