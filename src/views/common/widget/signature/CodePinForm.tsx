import { ITypeErreurSignature } from "@model/signature/ITypeErreurSignature";
import TextField from "@mui/material/TextField";
import { getLibelle, HUIT, QUATRE } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { useFormik } from "formik";
import React from "react";
import "./scss/FormPinCode.scss";

interface ICodePinFormProps {
  // FIXME: Les arguments de onClose ne sont nécessaire que pour la signature de délivrance.
  // On peut potentiellment les supprimer une fois qu'on aura refacto ce morceau de code.
  onClose: (isOpen: boolean, changePage: boolean) => void;
  onSubmit: (valeurs: CodePinFormValues) => void;
  erreurSignature?: ITypeErreurSignature;
}

export interface CodePinFormValues {
  codePin?: string;
}

interface FormValuesErrors {
  codePin?: string;
}

export const CodePinForm: React.FC<ICodePinFormProps> = ({
  onClose,
  onSubmit,
  erreurSignature
}) => {
  const validate = (values: CodePinFormValues) => {
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
    onSubmit
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
        <Bouton onClick={() => onClose(false, false)}>
          {getLibelle("Annuler")}
        </Bouton>
      </div>
    </form>
  );
};
