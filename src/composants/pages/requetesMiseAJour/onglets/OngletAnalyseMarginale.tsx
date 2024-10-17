import { useDerniereAnalyseMarginaleApiHook } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { useContext } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";
import FormulaireAnalyseMarginale from "../formulaires/FormulaireAnalyseMarginale";

interface IMiseAJourAnalyseMarginaleForm {
  estActif: boolean;
}

const OngletAnalyseMarginale: React.FC<IMiseAJourAnalyseMarginaleForm> = ({ estActif }) => {
  const { idActe } = useContext(EditionMiseAJourContext.Valeurs);
  // TOREFACTO avec useFetchApi
  const derniereAnalyseMarginale = useDerniereAnalyseMarginaleApiHook(idActe);

  return (
    <OngletsContenu estActif={estActif}>
      {derniereAnalyseMarginale && <FormulaireAnalyseMarginale derniereAnalyseMarginale={derniereAnalyseMarginale} />}
    </OngletsContenu>
  );
};

export default OngletAnalyseMarginale;
