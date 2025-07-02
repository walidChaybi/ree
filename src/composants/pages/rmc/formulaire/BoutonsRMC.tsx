/* v8 ignore start SERA TESTEE LORSQUE LA RMC ACTE INSCRIPTION SERA SORTIE DE VIEWS*/
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import RMCBoutonRappelCriteres from "@pages/rechercheMultiCriteres/boutons/RMCBoutonRappelCriteres";
import { useFormikContext } from "formik";
import Bouton from "../../../commun/bouton/Bouton";

const BoutonsRMC: React.FC = () => {
  const { isValid, dirty, resetForm } = useFormikContext<IRMCActeInscriptionForm>();

  return (
    <>
      <div className="flex-end flex w-full flex-col items-end">
        <Bouton
          className="mr-8 mt-6"
          disabled={!isValid || !dirty}
          type="submit"
        >
          {"Rechercher"}
        </Bouton>
      </div>
      <div className="BoutonsRechercheMulti">
        <div className="rappelEtReinitialiser">
          <RMCBoutonRappelCriteres />

          <button
            type="reset"
            onClick={() => resetForm()}
          >
            {"Réinitialiser les critères"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BoutonsRMC;
/* v8 ignore stop */
