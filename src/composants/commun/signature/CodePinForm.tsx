import { Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import Bouton from "../bouton/Bouton";
import ChampsTexte from "../champs/ChampsTexte";

interface ICodePinFormProps {
  onSubmit: (codePin: string) => void;
  fermerModale: () => void;
  erreurPin: boolean;
}

const SchemaValidation = Yup.object().shape({
  pin: Yup.string()
    .required("Le code pin de la carte doit être fourni")
    .min(4, "Le code pin doit être d'au moins 4 caractères")
    .max(8, "Le code pin ne doit pas dépasser 8 caractères")
    .matches(/^\d+$/, "Le code pin doit être un nombre")
});

const CodePinForm: React.FC<ICodePinFormProps> = ({ onSubmit, fermerModale, erreurPin }) => {
  const refFormulaire = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (refFormulaire.current?.querySelector('[name="pin"]') as undefined | HTMLInputElement)?.focus();
  }, [refFormulaire.current]);

  return (
    <div ref={refFormulaire}>
      <Formik
        initialValues={{ pin: "" }}
        validationSchema={SchemaValidation}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => onSubmit(values.pin)}
        {...(erreurPin ? { initialErrors: { pin: "Le code pin est incorrect" }, initialTouched: { pin: true } } : {})}
      >
        <Form>
          <ChampsTexte
            name="pin"
            type="password"
            libelle={"Code pin"}
            autoComplete="off"
          />

          <div className="mt-10 flex flex-nowrap justify-center gap-4">
            <Bouton
              title="Valider"
              type="submit"
              styleBouton="principal"
            >
              {"Valider"}
            </Bouton>

            <Bouton
              title="Annuler"
              type="button"
              styleBouton="secondaire"
              onClick={fermerModale}
            >
              {"Annuler"}
            </Bouton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CodePinForm;
