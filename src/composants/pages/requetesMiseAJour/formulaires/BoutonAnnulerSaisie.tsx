import { useFormikContext } from "formik";
import Bouton from "../../../commun/bouton/Bouton";

const BoutonAnnulerSaisie: React.FC = () => {
  const { dirty, resetForm } = useFormikContext();

  return (
    <Bouton
      type="button"
      title="Annuler la saisie en cours"
      disabled={!dirty}
      onClick={() => {
        resetForm();
      }}
    >
      {"Annuler la saisie en cours"}
    </Bouton>
  );
};

export default BoutonAnnulerSaisie;
