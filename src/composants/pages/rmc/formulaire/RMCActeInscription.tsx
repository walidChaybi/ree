import { IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { Form, Formik } from "formik";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import BlocActe from "./BlocActe";
import BlocEvenement from "./BlocEvenement";
import BlocRepertoire from "./BlocRepertoire";
import BlocTitulaire from "./BlocTitulaire";
import BoutonsRMC from "./BoutonsRMC";

const titreForm = "Critères de recherche d'un acte et d'une inscription";

interface RMCActeInscriptionProps {
  onSubmit: (valeursFormulaire: IRMCActeInscriptionForm) => void;
}

export const RMCActeInscription: React.FC<RMCActeInscriptionProps> = ({ onSubmit }) => {
  useTitreDeLaFenetre(titreForm);

  return (
    <Formik<IRMCActeInscriptionForm>
      initialValues={RMCActeInscriptionForm.valeursInitiales()}
      validationSchema={RMCActeInscriptionForm.schemaValidation()}
      onSubmit={onSubmit}
    >
      <Form>
        <ConteneurAvecBordure
          titreEnTete={titreForm}
          className="mt-8"
        >
          <div className="grid grid-cols-2">
            <div>
              <BlocTitulaire />
              <BlocEvenement />
              <BlocRepertoire />
            </div>
            <div>
              <BlocActe />
            </div>
          </div>
          <BoutonsRMC />
        </ConteneurAvecBordure>
      </Form>
    </Formik>
  );
};
