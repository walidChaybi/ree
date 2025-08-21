import { IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { IRMCContextProps, RMCContext } from "../../../../contexts/RMCContextProvider";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import BlocActe from "./BlocActe";
import BlocEvenement from "./BlocEvenement";
import BlocRcRcaPacs from "./BlocRcRcaPacs";
import BlocTitulaire from "./BlocTitulaire";
import BoutonsRMC from "./BoutonsRMC";
import GestionBlocsRMC from "./GestionBlocsRMC";

const titreForm = "Critères de recherche d'un acte et d'une inscription";

const VALEURS_INITIALES = RMCActeInscriptionForm.valeursInitiales();

interface RMCActeInscriptionProps {
  onSubmit: (valeursFormulaire: IRMCActeInscriptionForm) => void;
}

const RMCActeInscription: React.FC<RMCActeInscriptionProps> = ({ onSubmit }) => {
  const { blocsRenseignes } = useContext<IRMCContextProps>(RMCContext);

  return (
    <Formik<IRMCActeInscriptionForm>
      initialValues={VALEURS_INITIALES}
      validationSchema={RMCActeInscriptionForm.schemaValidation(blocsRenseignes)}
      onSubmit={onSubmit}
    >
      <Form>
        <ConteneurAvecBordure
          titreEnTete={titreForm}
          className="mt-8"
        >
          <GestionBlocsRMC>
            <div className="grid grid-cols-2">
              <div>
                <BlocTitulaire />
                <BlocEvenement />
              </div>
              <div>
                <BlocActe />
                <BlocRcRcaPacs />
              </div>
            </div>
            <BoutonsRMC />
          </GestionBlocsRMC>
        </ConteneurAvecBordure>
      </Form>
    </Formik>
  );
};

export default RMCActeInscription;
