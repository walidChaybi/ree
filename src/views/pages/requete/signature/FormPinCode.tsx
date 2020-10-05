import React from "react";
import { useFormik } from "formik";

import { TextField } from "@material-ui/core";
import { Button } from "reakit/Button";

import "./sass/FormPinCode.scss";
import { getText } from "../../../common/widget/Text";

interface FormPinCodePros {
  onClose: (isOpen: boolean, changePage: boolean) => void;
  setPinCode: (pinCode?: number) => void;
}

interface FormValues {
  pinCode?: number;
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
    } else if (isNaN(values.pinCode)) {
      errors.pinCode = getText("signature.validate.isNaN");
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {},
    validate,
    onSubmit: (values: FormValues) => {
      setPinCode(values.pinCode);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="pinCode"
        name="pinCode"
        label="Code pin"
        type="password"
        variant="filled"
        onChange={formik.handleChange}
        autoFocus
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
