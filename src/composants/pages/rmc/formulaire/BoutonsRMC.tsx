import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { useFormikContext } from "formik";
import { useMemo } from "react";
import { StockageLocal } from "../../../../utils/StockageLocal";
import Bouton from "../../../commun/bouton/Bouton";

const BoutonsRMC: React.FC = () => {
  const { isValid, dirty, resetForm, setValues, isSubmitting } = useFormikContext<IRMCActeInscriptionForm>();

  const derniersCriteresUtilises = useMemo(() => StockageLocal.recuperer("CRITERES_RMC_ACTE_INSCRIPTION"), [isSubmitting]);

  return (
    <>
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
          disabled={!dirty}
          type="reset"
          onClick={() => resetForm()}
        >
          {"Réinitialiser les critères"}
        </Bouton>
        <Bouton
          disabled={!isValid || !dirty}
          type="submit"
        >
          {"Rechercher"}
        </Bouton>
      </div>
    </>
  );
};

export default BoutonsRMC;
