import { majEtatCivilSuiteSaisieExtrait } from "@api/appels/etatcivilApi";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IExtraitSaisiAEnvoyer {
  evenementActe: IEvenement;
  titulaire1: ITitulaireActe;
  titulaire2: ITitulaireActe;
  natureActe: string;
  idAnalyseMarginale: string;
}

export interface IMajEtatCivilSuiteSaisieExtraitParams {
  idActe: string;
  extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer;
}

interface IMajEtatCivilSuiteSaisieExtraitResultat {
  data: any;
}

export function useMajEtatCivilSuiteSaisieExtrait(
  params?: IMajEtatCivilSuiteSaisieExtraitParams
) {
  const [resultat, setResultat] =
    useState<IMajEtatCivilSuiteSaisieExtraitResultat>();

  useEffect(() => {
    if (params) {
      majEtatCivilSuiteSaisieExtrait(params.idActe, params.extraitSaisiAEnvoyer)
        .then((result: any) => {
          setResultat({ data: result.body.data });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible d'enregistrer la saisie de l'extrait",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
