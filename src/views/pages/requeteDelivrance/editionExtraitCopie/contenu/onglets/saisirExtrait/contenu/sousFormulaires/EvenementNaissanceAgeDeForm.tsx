import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import { DATE_NAISSANCE_OU_AGE_DE, LIEU_EVENEMENT } from "../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import DateNaissanceOuAgeDeForm from "../../../../../../../../common/composant/formulaire/DateNaissanceOuAgeDeForm";
import LieuEvenementForm from "../../../../../../../../common/composant/formulaire/LieuEvenementForm";
import { getLabels } from "./LabelsUtil";
interface IEvenementNaissanceAgeDeFormPops {
  nom: string;
  naissance?: IEvenement;
  age?: number;
  gestionEtrangerFrance: boolean;
  etrangerParDefaut: boolean;
  saisieVerrouillee: boolean;
}
export const EvenementNaissanceAgeDeForm: React.FC<IEvenementNaissanceAgeDeFormPops> = props => {
  return (
    <>
      <DateNaissanceOuAgeDeForm
        nom={withNamespace(props.nom, DATE_NAISSANCE_OU_AGE_DE)}
        naissance={props.naissance}
        age={props.age}
        saisieVerrouillee={props.saisieVerrouillee}
      />

      <LieuEvenementForm
        nom={withNamespace(props.nom, LIEU_EVENEMENT)}
        label={getLabels("NAISSANCE").lieuEvenement}
        evenement={props.naissance}
        validation={true}
        gestionEtrangerFrance={props.gestionEtrangerFrance}
        etrangerParDefaut={props.etrangerParDefaut}
      />
    </>
  );
};
