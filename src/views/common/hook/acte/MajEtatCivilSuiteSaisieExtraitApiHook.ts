import { majEtatCivilSuiteSaisieExtrait } from "@api/appels/etatcivilApi";
import { IDetailMariage } from "@model/etatcivil/acte/IDetailMariage";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IExtraitSaisiAEnvoyer {
  evenementActe: IEvenement;
  titulaire1: ITitulaireActe;
  titulaire2?: ITitulaireActe;
  titulaireOrigine1: ITitulaireActe;
  titulaireOrigine2?: ITitulaireActe;
  natureActe: string;
  idAnalyseMarginale: string;
  detailMariage: IDetailMariage;
}

export interface IMajEtatCivilSuiteSaisieExtraitParams {
  idActe: string;
  extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer;
}

interface IMajEtatCivilSuiteSaisieExtraitResultat {
  data: any;
}

export function useMajEtatCivilSuiteSaisieExtrait(params?: IMajEtatCivilSuiteSaisieExtraitParams) {
  const [resultat, setResultat] = useState<IMajEtatCivilSuiteSaisieExtraitResultat>();

  useEffect(() => {
    if (params) {
      majEtatCivilSuiteSaisieExtrait(params.idActe, params.extraitSaisiAEnvoyer)
        .then((result: any) => {
          setResultat({ data: result.body.data });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible d'enregistrer la saisie de l'extrait", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return resultat;
}
