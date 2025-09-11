import { useFormikContext } from "formik";
import { useContext, useMemo } from "react";
import { RMCContext } from "../../../../contexts/RMCContextProvider";
import { ITypeDonneesStockees, StockageLocal } from "../../../../utils/StockageLocal";
import Bouton from "../../../commun/bouton/Bouton";

interface BoutonsRMCProps<TTypeRMC extends keyof ITypeDonneesStockees> {
  typeRMC: TTypeRMC;
}

const BoutonsRMC = <TTypeRMC extends keyof ITypeDonneesStockees>({ typeRMC }: BoutonsRMCProps<TTypeRMC>) => {
  const { resetForm, setValues, isSubmitting } = useFormikContext<ITypeDonneesStockees[TTypeRMC]>();
  const { blocsRenseignes } = useContext(RMCContext);

  const derniersCriteresUtilises = useMemo(() => StockageLocal.recuperer(typeRMC), [isSubmitting]);

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
