import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { useFormikContext } from "formik";
import { useContext, useMemo } from "react";
import { RMCContext } from "../../../../contexts/RMCContextProvider";
import { StockageLocal } from "../../../../utils/StockageLocal";
import Bouton from "../../../commun/bouton/Bouton";

const BoutonsRMC: React.FC = () => {
  const { resetForm, setValues, isSubmitting } = useFormikContext<IRMCActeInscriptionForm>();
  const { blocsRenseignes } = useContext(RMCContext);

  const derniersCriteresUtilises = useMemo(() => StockageLocal.recuperer("CRITERES_RMC_ACTE_INSCRIPTION"), [isSubmitting]);

  return (
    <div className="mt-12 flex w-full justify-end gap-4">
      <Bouton
        styleBouton="secondaire"
        type="button"
        disabled={!derniersCriteresUtilises}
        onClick={() => derniersCriteresUtilises && setValues(derniersCriteresUtilises)}
      >
        {"Rappel critères"}
      </Bouton>
      <Bouton
        styleBouton="secondaire"
        disabled={!blocsRenseignes.length}
        type="reset"
        onClick={() => resetForm()}
      >
        {"Réinitialiser les critères"}
      </Bouton>
      <Bouton
        disabled={!blocsRenseignes.length}
        type="submit"
      >
        {"Rechercher"}
      </Bouton>
    </div>
  );
};

export default BoutonsRMC;
