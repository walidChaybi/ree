import {
  DATE_NAISSANCE_OU_AGE_DE,
  LIEU_EVENEMENT
} from "@composant/formulaire/ConstantesNomsForm";
import DateNaissanceOuAgeDeForm from "@composant/formulaire/DateNaissanceOuAgeDeForm";
import LieuEvenementForm from "@composant/formulaire/LieuEvenementForm";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import { getLabels } from "./LabelsUtil";
interface IEvenementNaissanceAgeDeFormPops {
  nom: string;
  naissance?: IEvenement;
  age?: number;
  gestionEtrangerFrance: boolean;
  etrangerParDefaut: boolean;
}
export const EvenementNaissanceAgeDeForm: React.FC<
  IEvenementNaissanceAgeDeFormPops
> = props => {
  return (
    <>
      <DateNaissanceOuAgeDeForm
        nom={withNamespace(props.nom, DATE_NAISSANCE_OU_AGE_DE)}
        naissance={props.naissance}
        age={props.age}
      />

      <LieuEvenementForm
        nom={withNamespace(props.nom, LIEU_EVENEMENT)}
        label={getLabels(NatureActe.NAISSANCE).lieuEvenement}
        evenement={props.naissance}
        validation={true}
        gestionEtrangerFrance={props.gestionEtrangerFrance}
        etrangerParDefaut={props.etrangerParDefaut}
      />
    </>
  );
};
