import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

const useRMCBlocActe = (familleRegistreSelectionnee: keyof typeof EFamilleRegistre) => {
  const { values, setFieldValue } = useFormikContext<IRMCActeInscriptionForm>();

  const [champsDesactives, setChampsDesactives] = useState<string[]>([]);

  useEffect(() => {
    switch (familleRegistreSelectionnee) {
      case "CSL":
      case "DEP":
      case "AR2":
      case "AR3":
      case "MAR":
      case "JUG":
        setChampsDesactives(["supportDeux"]);
        setFieldValue("registreRepertoire.registre.registreSupport.supportDeux", "");
        break;
      case "OP2":
      case "OP3":
        setChampsDesactives(["pocopa", "anneeRegistre", "supportDeux"]);
        setFieldValue(
          "registreRepertoire.registre",
          structuredClone({
            ...values.registreRepertoire.registre,
            pocopa: "",
            anneeRegistre: "",
            registreSupport: { ...values.registreRepertoire.registre.registreSupport, supportDeux: "" }
          })
        );
        break;
      case "CPN":
        setChampsDesactives(["pocopa", "supportUn", "supportDeux", "numeroBisTer", "natureActe"]);
        setFieldValue(
          "registreRepertoire.registre",
          structuredClone({
            ...values.registreRepertoire.registre,
            pocopa: "",
            natureActe: "",
            numeroActe: { ...values.registreRepertoire.registre.numeroActe, numeroBisTer: "" },
            registreSupport: { supportUn: "", supportDeux: "" }
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
