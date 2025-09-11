import { RMCArchiveForm } from "@model/form/rmc/RMCArchiveForm";
import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { IRMCContextProps, RMCContext } from "../../../../contexts/RMCContextProvider";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import BlocActe from "./BlocActe";
import BlocEvenement from "./BlocEvenement";
import BlocTitulaire from "./BlocTitulaire";
import BoutonsRMC from "./BoutonsRMC";
import GestionBlocsRMC from "./GestionBlocsRMC";

const titreForm = "Critères de recherche d'un acte et d'une inscription ACT";

interface RMCArchiveProps {
  onSubmit: (valeursFormulaire: ICriteresRMC) => void;
}

const RMCArchive: React.FC<RMCArchiveProps> = ({ onSubmit }) => {
  const { blocsRenseignes } = useContext<IRMCContextProps>(RMCContext);

  return (
    <Formik<ICriteresRMC>
      initialValues={RMCArchiveForm.valeursInitiales()}
      validationSchema={RMCArchiveForm.schemaValidation(blocsRenseignes)}
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
              </div>
            </div>
            <BoutonsRMC typeRMC="CRITERES_RMC_ARCHIVE" />
          </GestionBlocsRMC>
        </ConteneurAvecBordure>
      </Form>
    </Formik>
  );
};

export default RMCArchive;
