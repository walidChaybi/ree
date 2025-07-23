import { DOCUMENT } from "@composant/formulaire/ConstantesNomsForm";
import { CreationRequeteRDCSC, SaisieRequeteRDCSC, UpdateRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { DEUX } from "@util/Utils";
import React, { useEffect, useRef, useState } from "react";
import { ITitulairesState } from "../SaisirRDCSCPage";
import { IdentiteSubFormProps } from "../sousFormulaires/identite/IdentiteForm";
import { IComplementCreationUpdateRequete } from "./../../../../../model/form/delivrance/ISaisirRDCSCPageForm";
import { useCreationRequeteDelivranceRDCSC } from "./CreerRDCSCApiHook";
import { useUpdateRequeteDelivranceRDCSC } from "./UpdateRDCSCApiHook";

export interface ICreationOuMiseAJourRDCSCResultat {
  requete: IRequeteDelivrance;
  futurStatut: StatutRequete;
  refus?: boolean;
}

export const useSoumissionFormulaireRDCSCHook = (
  setSaisieRequeteRDCSC: React.Dispatch<React.SetStateAction<SaisieRequeteRDCSC | undefined>>,
  setSaisieIncomplete: React.Dispatch<React.SetStateAction<boolean>>,
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  titulairesState: ITitulairesState,
  saisieRequeteRDCSC?: SaisieRequeteRDCSC,
  idRequete?: string
) => {
  // States
  const [estBrouillon, setEstBrouillon] = useState<boolean>(false);
  const [creationRDCSCParams, setCreationRDCSCParams] = useState<CreationRequeteRDCSC & IComplementCreationUpdateRequete>();
  const [miseAJourRDCSCParams, setMiseAJourRDCSCParams] = useState<UpdateRequeteRDCSC & IComplementCreationUpdateRequete>();
  const [requeteRDCSCResultat, setRequeteRDCSCResultat] = useState<ICreationOuMiseAJourRDCSCResultat>();

  // Hooks
  const creationRDCSCResultat = useCreationRequeteDelivranceRDCSC(creationRDCSCParams);
  const miseAJourRDCSCResultat = useUpdateRequeteDelivranceRDCSC(miseAJourRDCSCParams);

  const prevRDCSC = useRef({ saisieRequeteRDCSC }).current;
  useEffect(() => {
    if (miseAJourRDCSCResultat) {
      setRequeteRDCSCResultat(miseAJourRDCSCResultat);
    } else if (creationRDCSCResultat) {
      setRequeteRDCSCResultat(creationRDCSCResultat);
    }
  }, [creationRDCSCResultat, miseAJourRDCSCResultat]);

  // Update la valeure préédente du formulaire si elle a changée
  useEffect(() => {
    if (prevRDCSC.saisieRequeteRDCSC !== saisieRequeteRDCSC) {
      prevRDCSC.saisieRequeteRDCSC = saisieRequeteRDCSC;
    }
  }, [saisieRequeteRDCSC]);

  const setCreationOuMiseAJourRequeteRDCSC = (
    requeteRDCSC: (CreationRequeteRDCSC | UpdateRequeteRDCSC) & IComplementCreationUpdateRequete
  ): void => {
    idRequete
      ? setMiseAJourRDCSCParams({
          idRequete,
          ...requeteRDCSC
        })
      : setCreationRDCSCParams(requeteRDCSC);
  };

  const onSubmitSaisieRequeteRDCSC = (valeurs: SaisieRequeteRDCSC): void => {
    setSaisieRequeteRDCSC(valeurs);
    if (champManquantTitulaire(valeurs, titulairesState.titulaires) || estBrouillon) {
      setSaisieIncomplete(true);
      // Vérifie que les valeurs du formulaires ont changés afin de pas submit 2 fois
    } else if (valeurs && prevRDCSC.saisieRequeteRDCSC !== valeurs) {
      setOperationEnCours(true);
      setCreationOuMiseAJourRequeteRDCSC({
        saisie: valeurs,
        refus: false,
        futurStatut: StatutRequete.BROUILLON,
        statutFinal: estBrouillon ? StatutRequete.BROUILLON : StatutRequete.PRISE_EN_CHARGE
      });
    }
  };

  const validerRefus = (refus: boolean) => {
    // Après validation ou non du refus, le stockage de la requête s'effectue au statut BROUILON (futurSatut),
    //  lorsque les pièces jointes auront été stockées sans erreur alors la requête passera au "statutFinal"
    if (saisieRequeteRDCSC) {
      setOperationEnCours(true);
      setCreationOuMiseAJourRequeteRDCSC({
        saisie: saisieRequeteRDCSC,
        refus,
        futurStatut: StatutRequete.BROUILLON,
        statutFinal: refus ? StatutRequete.A_TRAITER : StatutRequete.PRISE_EN_CHARGE
      });
    }
  };

  return {
    creationRDCSCParams,
    miseAJourRDCSCParams,
    requeteRDCSCResultat,
    onSubmitSaisieRequeteRDCSC,
    validerRefus,
    setEstBrouillon
  };
};

function champManquantTitulaire(values: SaisieRequeteRDCSC, titulaires: IdentiteSubFormProps[]) {
  const villeNaissance = values.titulaires.titulaire1.naissance.villeEvenement;
  const paysNaissance = values.titulaires.titulaire1.naissance.paysEvenement;
  const anneeNaissance = values.titulaires.titulaire1.naissance.dateEvenement.annee;
  const villeNaissance2 = values.titulaires.titulaire2.naissance.villeEvenement;
  const paysNaissance2 = values.titulaires.titulaire2.naissance.paysEvenement;
  const anneeNaissance2 = values.titulaires.titulaire2.naissance.dateEvenement.annee;
  return (
    villeNaissance === "" ||
    paysNaissance === "" ||
    anneeNaissance === "" ||
    (DocumentDelivrance.estAttestationPacs(values[DOCUMENT]) &&
      titulaires.length === DEUX &&
      (villeNaissance2 === "" || paysNaissance2 === "" || anneeNaissance2 === ""))
  );
}
