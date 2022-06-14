import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { RECEContext } from "../../../core/body/Body";
import { executeEnDiffere } from "../../util/Utils";
import { Fieldset } from "../fieldset/Fieldset";
import "./scss/Formulaire.scss";

interface FomulaireProps {
  titre?: string;
  formDefaultValues: any;
  formValidationSchema: any;
  onSubmit: (values: any, errors?: any) => void;
  className?: string;
  disabled?: boolean;
}

const TIMEOUT = 800;

export const Formulaire: React.FC<FomulaireProps> = ({
  children,
  titre = "",
  formDefaultValues,
  formValidationSchema,
  onSubmit,
  className,
  disabled
}) => {
  const { setIsDirty } = useContext(RECEContext);
  const form = getForm(
    onSubmit,
    formDefaultValues,
    formValidationSchema,
    disabled,
    children,
    setIsDirty
  );
  return (
    <div className={className ? `${className} Formulaire` : "Formulaire"}>
      {titre ? <Fieldset titre={titre}>{form}</Fieldset> : form}
    </div>
  );
};
function getForm(
  onSubmit: (values: any, errors?: any) => void,
  formDefaultValues: any,
  formValidationSchema: any,
  disabled = false,
  children: any,
  setIsDirty: (dirty: boolean) => void
) {
  return (
    <Formik
      onSubmit={(e: any) => {
        executeEnDiffere(() => {
          setIsDirty(false);
        }, TIMEOUT);
        onSubmit(e);
      }}
      initialValues={formDefaultValues}
      validationSchema={formValidationSchema}
      enableReinitialize={true}
      disabled={disabled}
    >
      <Form>{children}</Form>
    </Formik>
  );
}
