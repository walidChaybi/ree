import { getPocopasAgent } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { Option } from "@util/Type";
import { formatMajusculesMinusculesMotCompose } from "@util/Utils";
import { useEffect, useState } from "react";

export function formatPocopasVersOptions(pocopas: string[]): Option[] {
  return pocopas.map(pocopa => {
    return {
      cle: pocopa,
      libelle: formatMajusculesMinusculesMotCompose(pocopa)
    } as Option;
  });
}

export function useMesPocopasApiHook() {
  const [pocopas, setPocopas] = useState<Option[]>([]);

  useEffect(() => {
    getPocopasAgent()
      .then((result: any) => {
        setPocopas(formatPocopasVersOptions(result.body.data));
      })
      .catch((error: any) => {
        logError({
          messageUtilisateur: "Impossible de récupérer les registres",
          error
        });
      });
  }, []);

  return pocopas;
}
