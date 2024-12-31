import {
  IMiseAJourAnalyseMarginaleValeursForm,
  MiseAJourAnalyseMarginaleValeursForm,
  SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE
} from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { FormikProps, FormikValues } from "formik";
import { useContext, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import ChampsFormulaireAnalyseMarginale from "./ChampsFormulaireAnalyseMarginale";
import "./FormulaireAnalyseMarginale.scss";

interface IFormulaireAnalyseMarginaleProps {
  derniereAnalyseMarginale: IDerniereAnalyseMarginalResultat;
  refFormulaire?: React.MutableRefObject<FormikProps<FormikValues> | null>;
}

const FormulaireAnalyseMarginale: React.FC<IFormulaireAnalyseMarginaleProps> = ({ derniereAnalyseMarginale, refFormulaire }) => {
  const { listeMentions } = useContext(EditionMiseAJourContext.Valeurs);

  const [valeursParDefaut, setValeursParDefaut] = useState<IMiseAJourAnalyseMarginaleValeursForm>(
    MiseAJourAnalyseMarginaleValeursForm.valeurParDefaut(derniereAnalyseMarginale, listeMentions)
  );

  const onSubmit = (valeurs: IMiseAJourAnalyseMarginaleValeursForm) => {
    setValeursParDefaut(valeurs);
  };

  return (
    <Formulaire
      formDefaultValues={valeursParDefaut}
      formValidationSchema={SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE}
      refFormulaire={refFormulaire}
      onSubmit={valeurs => onSubmit(valeurs as unknown as IMiseAJourAnalyseMarginaleValeursForm)}
    >
      <ChampsFormulaireAnalyseMarginale />
    </Formulaire>
  );
};

export default FormulaireAnalyseMarginale;
