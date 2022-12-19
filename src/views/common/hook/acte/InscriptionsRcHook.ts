import { getInscriptionsRC } from "@api/appels/etatcivilApi";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface GetInscriptionsRCHookParameters {
  id?: string;
}

export function useGetInscriptionsRCApiHook(id?: string): IInscriptionRc[] {
  const [inscriptionsRC, setInscriptionsRC] = useState<IInscriptionRc[]>([]);
  useEffect(() => {
    if (id) {
      getInscriptionsRC(id)
        .then((result: any) => {
          setInscriptionsRC(mappingInscriptionsRC(result?.body));
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les inscriptions liées à une personne",
            error
          });
        });
    }
  }, [id]);
  return inscriptionsRC;
}

export function mappingInscriptionsRC(data: any): IInscriptionRc[] {
  return data?.map((inscription: any) => {
    return {
      idInscription: inscription?.id,
      nature: NatureRc.getEnumFor(inscription?.nature.id),
      typeInscription: inscription?.typeInscription,
      dateInscription: new Date(inscription?.dateInscription)
    };
  });
}
