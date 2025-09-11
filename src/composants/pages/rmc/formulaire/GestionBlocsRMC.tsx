import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { useFormikContext } from "formik";
import { ReactNode, useContext, useEffect } from "react";
import { EBlocsRMC, RMCContext } from "../../../../contexts/RMCContextProvider";
import { estChampRenseigne, getValeursRenseigneesFormulaire } from "../../../../utils/SchemaValidation";

const champsExclusSelonBloc: Partial<Record<keyof ICriteresRMC, string[]>> = {
  acte: ["typeReference"]
};

const GestionBlocsRMC: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setBlocsRenseignes } = useContext(RMCContext);
  const { values } = useFormikContext<ICriteresRMC>();

  useEffect(() => {
    if (!setBlocsRenseignes) return;

    const blocsRenseignes: EBlocsRMC[] = [];

    Object.entries(values).forEach(([cle, valeur]) => {
      let bloc: EBlocsRMC | undefined;

      bloc = EBlocsRMC[cle.toUpperCase() as keyof typeof EBlocsRMC];

      if (!bloc || !Object.values(EBlocsRMC).includes(bloc)) return;

      const champsExclus: string[] = champsExclusSelonBloc[cle as keyof ICriteresRMC] ?? [];
      const champsRenseignes = getValeursRenseigneesFormulaire(valeur, champsExclus).filter(estChampRenseigne);

      if (champsRenseignes.length) {
        blocsRenseignes.push(bloc);
      }
    });

    setBlocsRenseignes(blocsRenseignes);
  }, [values]);

  return <>{children}</>;
};

export default GestionBlocsRMC;
