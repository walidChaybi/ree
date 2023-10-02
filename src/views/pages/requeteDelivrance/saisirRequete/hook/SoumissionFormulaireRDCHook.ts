import {
  CreationRequeteRDC,
  IComplementCreationUpdateRequete,
  SaisieRequeteRDC,
  UpdateRequeteRDC
} from "@model/form/delivrance/ISaisirRDCPageForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { useEffect, useState } from "react";
import { verifierDonneesObligatoires } from "../contenu/SaisirRDCPageFonctions";
import { useCreationRequeteDelivranceRDC } from "./CreerRDCApiHook";
import { useUpdateRequeteDelivranceRDC } from "./UpdateRDCApiHook";

export interface ICreationOuMiseAJourRDCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export const useSoumissionFormulaireRDCHook = (
  setSaisieRequeteRDC: React.Dispatch<
    React.SetStateAction<SaisieRequeteRDC | undefined>
  >,
  setSaisieIncomplete: React.Dispatch<React.SetStateAction<boolean>>,
  saisieRequeteRDC?: SaisieRequeteRDC,
  idRequete?: string
) => {
  // States
  const [estBrouillon, setEstBrouillon] = useState<boolean>(false);
  const [creationRDCParams, setCreationRDCParams] = useState<
    CreationRequeteRDC & IComplementCreationUpdateRequete
  >();
  const [miseAJourRDCParams, setMiseAJourRDCParams] = useState<
    UpdateRequeteRDC & IComplementCreationUpdateRequete
  >();
  const [requeteRDCResultat, setRequeteRDCResultat] =
    useState<ICreationOuMiseAJourRDCResultat>();

  // Hooks
  const creationRDCResultat =
    useCreationRequeteDelivranceRDC(creationRDCParams);
  const miseAJourRDCResultat =
    useUpdateRequeteDelivranceRDC(miseAJourRDCParams);

  useEffect(() => {
    if (miseAJourRDCResultat) {
      setRequeteRDCResultat(miseAJourRDCResultat);
    } else if (creationRDCResultat) {
      setRequeteRDCResultat(creationRDCResultat);
    }
  }, [creationRDCResultat, miseAJourRDCResultat]);

  const setCreationOuMiseAJourRequeteRDC = (
    requeteRDC: CreationRequeteRDC | UpdateRequeteRDC
  ): void => {
    idRequete
      ? setMiseAJourRDCParams({
          idRequete,
          ...requeteRDC
        })
      : setCreationRDCParams(requeteRDC);
  };

  const onSubmitSaisieRequeteRDC = (valeurs: SaisieRequeteRDC): void => {
    setSaisieRequeteRDC(valeurs);
    if (verifierDonneesObligatoires(valeurs)) {
      setCreationOuMiseAJourRequeteRDC({
        saisie: valeurs,
        refus: false,
        futurStatut: estBrouillon
          ? StatutRequete.BROUILLON
          : StatutRequete.PRISE_EN_CHARGE
      });
    } else {
      setSaisieIncomplete(true);
    }
  };

  const validerSaisie = (): void => {
    saisieRequeteRDC &&
      setCreationOuMiseAJourRequeteRDC({
        saisie: saisieRequeteRDC,
        futurStatut: StatutRequete.PRISE_EN_CHARGE
      });
  };

  return {
    creationRDCParams,
    miseAJourRDCParams,
    requeteRDCResultat,
    onSubmitSaisieRequeteRDC,
    validerSaisie,
    setEstBrouillon
  };
};
