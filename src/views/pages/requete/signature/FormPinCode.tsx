import React from "react";
import { useFormik } from "formik";

import { TextField } from "@material-ui/core";
import { Button } from "reakit/Button";

import "./sass/PopinSignature.scss";
import { getText } from "../../../common/widget/Text";

interface FormPinCodePros {
  onClose: (isOpen: boolean) => void;
  setPinCode: (pinCode?: number) => void;
}

interface FormValues {
  pinCode?: number;
}

export const FormPinCode: React.FC<FormPinCodePros> = ({
  onClose,
  setPinCode,
}) => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: FormValues) => {
      setPinCode(values.pinCode);
    },
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
      />
      <div className="PopinSignaturePinCodeActions">
        <Button
          color="primary"
          type="submit"
          name={"validate"}
          disabled={formik.values.pinCode === undefined}
        >
          {getText("signature.valider")}
        </Button>
        <Button onClick={() => onClose(false)}>
          {getText("signature.annuler")}
        </Button>
      </div>
    </form>
  );
};
