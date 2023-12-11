import { TextField } from "@mui/material";
import { getLibelle, HUIT, QUATRE } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { useFormik } from "formik";
import React from "react";
import { Button } from "reakit/Button";
import "./scss/FormPinCode.scss";

interface FormPinCodePros {
  onClose: (isOpen: boolean, changePage: boolean) => void;
  setCodePin: (codePin?: string) => void;
}

interface FormValues {
  codePin?: string;
}

interface FormValuesErrors {
  codePin?: string;
}

export const CodePinForm: React.FC<FormPinCodePros> = ({
  onClose,
  setCodePin
}) => {
  const validate = (values: FormValues) => {
    const errors: FormValuesErrors = {};
    if (!values.codePin) {
      errors.codePin = getLibelle("Le code pin de la carte doit être fourni");
    } else if (isNaN(Number(values.codePin))) {
      errors.codePin = getLibelle("Le code pin doit être un nombre");
    } else if (formik.isSubmitting && values.codePin.length < QUATRE) {
      errors.codePin = getLibelle(
        "Le code pin doit être d'au moins 4 caractères"
      );
    } else if (values.codePin.length > HUIT) {
      errors.codePin = getLibelle(
        "Le code pin ne doit pas dépasser 8 caractères"
      );
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {},
    validate,
    onSubmit: (values: FormValues) => {
      setCodePin(values.codePin);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="codePin"
        name="codePin"
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
      {formik.errors.codePin ? (
        <div className={"ErrorField"}>{formik.errors.codePin}</div>
      ) : null}
      <div className="PopinSignaturePinCodeActions">
        <Bouton
          color="primary"
          type="submit"
          name={"validate"}
          disabled={formik.errors.codePin !== undefined}
          onClick={() => {
            formik.setSubmitting(true);
          }}
        >
          {getLibelle("Valider")}
        </Bouton>
        <Button onClick={() => onClose(false, false)}>
          {getLibelle("Annuler")}
        </Button>
      </div>
    </form>
  );
};
