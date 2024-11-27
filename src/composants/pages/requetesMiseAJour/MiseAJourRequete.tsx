import { useContext } from "react";

import { EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import "./MiseAJourRequete.scss";
import { PartieActeRequete } from "./PartieActeRequete";
import PartieFormulaire from "./PartieFormulaire";

const MiseAJourRequete: React.FC = () => {
  const { estActeSigne } = useContext(EditionMiseAJourContext.Valeurs);

  return (
    <div className={estActeSigne ? "page-edition-requete-signee" : "page-edition-requete-mise-a-jour"}>
      <PartieActeRequete />
      {!estActeSigne && <PartieFormulaire />}
    </div>
  );
};

export default MiseAJourRequete;
