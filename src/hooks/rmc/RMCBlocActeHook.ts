import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";
import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

const useRMCBlocActe = (familleRegistreSelectionnee: keyof typeof EFamilleRegistre) => {
  const { values, setFieldValue } = useFormikContext<ICriteresRMC>();

  const [champsDesactives, setChampsDesactives] = useState<string[]>([]);

  useEffect(() => {
    switch (familleRegistreSelectionnee) {
      case "CSL":
      case "DEP":
      case "AR2":
      case "AR3":
      case "MAR":
      case "JUG":
        setChampsDesactives(["support2"]);
        setFieldValue("acte.registreSupport.support2", "");
        break;
      case "OP2":
      case "OP3":
        setChampsDesactives(["pocopa", "anneeRegistre", "support2"]);
        setFieldValue(
          "acte",
          structuredClone({
            ...values.acte,
            pocopa: "",
            anneeRegistre: "",
            registreSupport: { ...values.acte?.registreSupport, support2: "" }
          })
        );
        break;
      case "CPN":
        setChampsDesactives(["pocopa", "support1", "support2", "numeroBisTer", "natureActe"]);
        setFieldValue(
          "acte",
          structuredClone({
            ...values.acte,
            pocopa: "",
            natureActe: "",
            numeroActe: { ...values.acte?.numeroActe, numeroBisTer: "" },
            registreSupport: { support1: "", support2: "" }
          })
        );
        break;
      default:
        setChampsDesactives([]);
        break;
    }
  }, [familleRegistreSelectionnee]);

  return champsDesactives;
};

export default useRMCBlocActe;
