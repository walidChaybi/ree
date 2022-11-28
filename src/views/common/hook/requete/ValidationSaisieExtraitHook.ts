import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { useEffect, useState } from "react";
import {
  IExtraitSaisiAEnvoyer,
  IMajEtatCivilSuiteSaisieExtraitParams,
  useMajEtatCivilSuiteSaisieExtrait
} from "../acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import {
  IRegenerationDocumentsParams,
  useRegenerationDocumentsHook
} from "./RegenerationDocumentsHook";

export interface ISauvegardeValidationSaisieExtraitParams {
  requete: IRequeteDelivrance;
  acte: IFicheActe;
  extraitSaisiAEnvoyer: IExtraitSaisiAEnvoyer;
  callBack?: () => void;
  problemePlurilingue?: boolean;
}

export function useSauvegardeValidationSaisieExtrait(
  params?: ISauvegardeValidationSaisieExtraitParams
) {
  const [regenerationDocumentsParams, setRegenerationDocumentsParams] =
    useState<IRegenerationDocumentsParams>();

  const [
    majEtatCivilSuiteSaisieExtraitParams,
    setMajEtatCivilSuiteSaisieExtraitParams
  ] = useState<IMajEtatCivilSuiteSaisieExtraitParams>();

  useRegenerationDocumentsHook(regenerationDocumentsParams);

  const resultatMajEtatCivilSuiteSaisieExtrait =
    useMajEtatCivilSuiteSaisieExtrait(majEtatCivilSuiteSaisieExtraitParams);

  // 1 - Sauvegarde des données de l'acte
  useEffect(() => {
    if (params) {
      setMajEtatCivilSuiteSaisieExtraitParams({
        idActe: params.acte.id,
        extraitSaisiAEnvoyer: params.extraitSaisiAEnvoyer
      });
    }
  }, [params]);

  // 2 - Regénérer tous les fichiers
  useEffect(() => {
    if (resultatMajEtatCivilSuiteSaisieExtrait && params) {
      setRegenerationDocumentsParams({
        requete: params.requete,
        regenererCourrier: false,
        callBack: params.callBack,
        problemePlurilingue: params.problemePlurilingue
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatMajEtatCivilSuiteSaisieExtrait]);
}

