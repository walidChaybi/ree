import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PiecesJointes } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { useFormikContext } from "formik";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocPiecesJustificatives: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieRDCForm>();

  return (
    <ConteneurAvecBordure titreEnTete="PIÈCES JUSTIFICATIVES">
      <div className="flex gap-4 pt-4">
        <PiecesJointes
          menuItem={TypePieceJustificative.versOptions(TypeRequete.DELIVRANCE)}
          piecesJointes={values.piecesJustificatives}
          setPiecesJointes={nouvellesPiecesJustificatives => setFieldValue("piecesJustificatives", nouvellesPiecesJustificatives)}
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocPiecesJustificatives;
