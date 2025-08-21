import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { useFormikContext } from "formik";
import { ReactNode, useContext, useEffect } from "react";
import { EBlocsRMC, RMCContext } from "../../../../contexts/RMCContextProvider";
import { estChampRenseigne, getValeursRenseigneesFormulaire } from "../../../../utils/SchemaValidation";

const GestionBlocsRMC: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setBlocsRenseignes } = useContext(RMCContext);
  const { values } = useFormikContext<IRMCActeInscriptionForm>();

  useEffect(() => {
    if (!setBlocsRenseignes) return;
    const blocsRenseignes: (keyof typeof EBlocsRMC)[] = [];

    if (getValeursRenseigneesFormulaire(values.registreRepertoire.evenement, []).filter(estChampRenseigne).length)
      blocsRenseignes.push("EVENEMENT");

    if (getValeursRenseigneesFormulaire(values.registreRepertoire.repertoire, []).filter(estChampRenseigne).length)
      blocsRenseignes.push("RCRCAPACS");

    if (getValeursRenseigneesFormulaire(values.registreRepertoire.registre, ["typeReference"]).filter(estChampRenseigne).length)
      blocsRenseignes.push("ACTE");

    if (getValeursRenseigneesFormulaire(values.titulaire, []).filter(estChampRenseigne).length) blocsRenseignes.push("TITULAIRE");

    setBlocsRenseignes(blocsRenseignes);
  }, [values.registreRepertoire, values.titulaire]);

  return <>{children}</>;
};

export default GestionBlocsRMC;
