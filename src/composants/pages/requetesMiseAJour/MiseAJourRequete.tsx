import { useContext } from "react";
import { EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import { PartieActeRequete } from "./PartieActeRequete";
import PartieFormulaire from "./PartieFormulaire";

const MiseAJourRequete: React.FC = () => {
  const { estActeSigne } = useContext(EditionMiseAJourContext.Valeurs);

  return (
    <div className="mt-3 flex gap-4 px-2">
      <PartieActeRequete />
      {!estActeSigne && <PartieFormulaire />}
    </div>
  );
};

export default MiseAJourRequete;
