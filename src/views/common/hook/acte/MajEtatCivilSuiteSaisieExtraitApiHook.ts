import { majEtatCivilSuiteSaisieExtrait } from "@api/appels/etatcivilApi";
import { IDetailMariageDto } from "@model/etatcivil/acte/DetailMariage";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ITitulaireActeDto } from "@model/etatcivil/acte/TitulaireActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IExtraitSaisiAEnvoyer {
  evenementActe: IEvenement;
  titulaire1: ITitulaireActeDto;
  titulaire2?: ITitulaireActeDto;
  titulaireOrigine1: ITitulaireActeDto;
  titulaireOrigine2?: ITitulaireActeDto;
  natureActe: string;
  idAnalyseMarginale: string;
  detailMariage: IDetailMariageDto;
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
