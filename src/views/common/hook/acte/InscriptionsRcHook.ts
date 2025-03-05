import { getInscriptionsRC } from "@api/appels/etatcivilApi";
import { ETypeInscriptionRcRca } from "@model/etatcivil/enum/ETypeInscriptionRcRca";
import { INatureRc, NatureRc } from "@model/etatcivil/enum/NatureRc";
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
            messageUtilisateur: "Impossible de récupérer les inscriptions liées à une personne",
            error
          });
        });
    }
  }, [id]);
  return inscriptionsRC;
}

export function mappingInscriptionsRC(data: any): IInscriptionRc[] {
  return data?.map((inscription: any): IInscriptionRc => {
    return {
      idInscription: inscription?.id,
      nature: NatureRc.depuisId(inscription?.nature.id) as INatureRc,
      typeInscription: ETypeInscriptionRcRca[inscription?.typeInscription as keyof typeof ETypeInscriptionRcRca],
      dateInscription: new Date(inscription?.dateInscription)
    };
  });
}
