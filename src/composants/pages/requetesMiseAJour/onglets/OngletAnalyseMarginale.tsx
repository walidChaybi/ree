import { useDerniereAnalyseMarginaleApiHook } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { FormikProps, FormikValues } from "formik";
import { useContext } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";
import FormulaireAnalyseMarginale from "../formulaires/analyseMarginale/FormulaireAnalyseMarginale";

interface IMiseAJourAnalyseMarginaleForm {
  estActif: boolean;
  refFormulaire?: React.MutableRefObject<FormikProps<FormikValues> | null>;
}

const OngletAnalyseMarginale: React.FC<IMiseAJourAnalyseMarginaleForm> = ({ estActif, refFormulaire }) => {
  const { idActe } = useContext(EditionMiseAJourContext.Valeurs);
  // TOREFACTO avec useFetchApi
  const derniereAnalyseMarginale = useDerniereAnalyseMarginaleApiHook(idActe);

  return (
    <OngletsContenu estActif={estActif}>
      {derniereAnalyseMarginale && (
        <FormulaireAnalyseMarginale
          derniereAnalyseMarginale={derniereAnalyseMarginale}
          refFormulaire={refFormulaire}
        />
      )}
    </OngletsContenu>
  );
};

export default OngletAnalyseMarginale;
