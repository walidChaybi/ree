import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import RMCBoutonRappelCriteres from "@pages/rechercheMultiCriteres/boutons/RMCBoutonRappelCriteres";
import { useFormikContext } from "formik";
import Bouton from "../../../commun/bouton/Bouton";

const BoutonsRMC: React.FC = () => {
  const { isValid, dirty, resetForm } = useFormikContext<IRMCActeInscriptionForm>();

  return (
    <>
      <div className="mt-12 flex w-full justify-end gap-4">
        <Bouton
          styleBouton="secondaire"
          disabled={!isValid || !dirty}
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
      <div className="BoutonsRechercheMulti">
        <div className="rappelEtReinitialiser">
          <RMCBoutonRappelCriteres />
        </div>
      </div>
    </>
  );
};

export default BoutonsRMC;
