import React from "react";
import { useFormik } from "formik";

import { TextField } from "@material-ui/core";
import { Button } from "reakit/Button";

import "./sass/FormPinCode.scss";
import { getText } from "../Text";
import { storeRece } from "../../util/storeRece";

interface FormPinCodePros {
  onClose: (isOpen: boolean, changePage: boolean) => void;
  setPinCode: (pinCode?: string) => void;
}

interface FormValues {
  pinCode?: string;
}

interface FormValuesErrors {
  pinCode?: string;
}

export const FormPinCode: React.FC<FormPinCodePros> = ({
  onClose,
  setPinCode
}) => {
  const validate = (values: FormValues) => {
    const errors: FormValuesErrors = {};
    if (!values.pinCode) {
      errors.pinCode = getText("signature.validate.require");
    } else if (isNaN(Number(values.pinCode))) {
      errors.pinCode = getText("signature.validate.isNaN");
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {},
    validate,
    onSubmit: (values: FormValues) => {
      storeRece.codePin = values.pinCode;
      setPinCode(values.pinCode);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="pinCode"
        name="pinCode"
        label="Code pin"
        variant="filled"
        type="password"
        onChange={formik.handleChange}
        autoFocus
        autoComplete="off"
        InputProps={{
          readOnly: true
        }}
        onFocus={event => {
          if (event.target != null) {
            event.target.removeAttribute("readonly");
          }
        }}
      />
      {formik.errors.pinCode ? (
        <div className={"ErrorField"}>{formik.errors.pinCode}</div>
      ) : null}
      <div className="PopinSignaturePinCodeActions">
        <Button
          color="primary"
          type="submit"
          name={"validate"}
          disabled={formik.errors.pinCode !== undefined}
        >
          {getText("signature.valider")}
        </Button>
        <Button onClick={() => onClose(false, false)}>
          {getText("signature.annuler")}
        </Button>
      </div>
    </form>
  );
};
