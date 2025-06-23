/* v8 ignore start SERA TESTEE LORSQUE LA RMC ACTE INSCRIPTION SERA SORTIE DE VIEWS*/
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import RMCBoutonRappelCriteres, { RMCBoutonRappelCriteresProps } from "@pages/rechercheMultiCriteres/boutons/RMCBoutonRappelCriteres";
import { useFormikContext } from "formik";
import Bouton from "../../../commun/bouton/Bouton";

export interface IRMCBoutonsProps {
  rappelCriteres?: () => any;
}

const BoutonsRMC: React.FC<IRMCBoutonsProps> = ({ rappelCriteres }) => {
  const { isValid, dirty, resetForm } = useFormikContext<IRMCActeInscriptionForm>();

  const rmcBoutonRappelCriteresProps = {
    rappelCriteres: rappelCriteres
  } as RMCBoutonRappelCriteresProps;

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
          {rappelCriteres && <RMCBoutonRappelCriteres {...rmcBoutonRappelCriteresProps} />}

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
