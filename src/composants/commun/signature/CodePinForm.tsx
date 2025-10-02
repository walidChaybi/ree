import { Form, Formik } from "formik";
import * as Yup from "yup";
import Bouton from "../bouton/Bouton";
import ChampTexte from "../champs/ChampTexte";

interface ICodePinFormProps {
  onSubmit: (codePin: string) => void;
  fermerModale: () => void;
  erreurPin: boolean;
}

const SCHEMA_VALIDATION = Yup.object().shape({
  pin: Yup.string()
    .required("Le code pin de la carte doit être fourni")
    .min(4, "Le code pin doit être d'au moins 4 caractères")
    .max(8, "Le code pin ne doit pas dépasser 8 caractères")
    .matches(/^\d+$/, "Le code pin doit être un nombre")
});

const CodePinForm: React.FC<ICodePinFormProps> = ({ onSubmit, fermerModale, erreurPin }) => (
  <div>
    <Formik
      initialValues={{ pin: "" }}
      validationSchema={SCHEMA_VALIDATION}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={values => onSubmit(values.pin)}
      {...(erreurPin
        ? {
            initialErrors: { pin: "Le code pin est incorrect" },
            initialTouched: { pin: true }
          }
        : {})}
    >
      <Form>
        <ChampTexte
          name="pin"
          type="password"
          libelle={"Code pin"}
          autoComplete="off"
          maxLength={8}
          numerique
          autoFocus
        />

        <div className="mt-12 flex flex-nowrap justify-center gap-4">
            <Bouton
              title="Annuler"
              styleBouton="secondaire"
              onClick={fermerModale}
            >
              {"Annuler"}
            </Bouton>

          <Bouton
            title="Valider"
            type="submit"
            styleBouton="principal"
          >
            {"Valider"}
          </Bouton>
        </div>
      </Form>
    </Formik>
  </div>
);

export default CodePinForm;
