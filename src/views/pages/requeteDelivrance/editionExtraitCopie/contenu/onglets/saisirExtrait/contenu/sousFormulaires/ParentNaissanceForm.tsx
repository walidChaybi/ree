import React from "react";
import {
  Filiation,
  IFiliation
} from "../../../../../../../../../model/etatcivil/acte/IFiliation";
import { Sexe } from "../../../../../../../../../model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes } from "../../../../../../../../../model/requete/IPrenomOrdonnes";
import {
  DATE_NAISSANCE_OU_AGE_DE,
  LIEU_NAISSANCE,
  NOM_NAISSANCE,
  SEXE
} from "../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import DateNaissanceOuAgeDeForm from "../../../../../../../../common/composant/formulaire/DateNaissanceOuAgeDeForm";
import LieuEvenementForm from "../../../../../../../../common/composant/formulaire/LieuEvenementForm";
import {
  estRenseigne,
  getLibelle
} from "../../../../../../../../common/util/Utils";
import { InputField } from "../../../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { RadioField } from "../../../../../../../../common/widget/formulaire/champsSaisie/RadioField";
import { withNamespace } from "../../../../../../../../common/widget/formulaire/utils/FormUtil";
import { PRENOMS } from "../../../../../../saisirRequete/modelForm/ISaisirRequetePageModel";
import PrenomsForm from "../../../../../../saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import "./scss/ParentNaissanceForm.scss";

interface ParentNaissanceFormProps {
  nom: string;
  parent: IFiliation;
}

export const ParentNaissanceForm: React.FC<
  ParentNaissanceFormProps
> = props => {
  const prenoms: IPrenomOrdonnes[] = Filiation.mapPrenomsVersPrenomsOrdonnes(
    props.parent
  );

  return (
    <div className="ParentNaissanceForm">
      <InputField
        label={getLibelle("Nom de naissance")}
        name={withNamespace(props.nom, NOM_NAISSANCE)}
        disabled={estRenseigne(props.parent.nom)}
      />
      <PrenomsForm
        nom={withNamespace(props.nom, PRENOMS)}
        disabled={estRenseigne(props.parent.prenoms)}
        prenoms={prenoms}
      />

      <RadioField
        name={withNamespace(props.nom, SEXE)}
        label={getLibelle("Sexe")}
        values={Sexe.getAllEnumsAsOptionsSansInconnu()}
        disabled={
          estRenseigne(props.parent.sexe) && props.parent.sexe !== Sexe.INCONNU
        }
      />

      <DateNaissanceOuAgeDeForm
        nom={withNamespace(props.nom, DATE_NAISSANCE_OU_AGE_DE)}
        naissance={props.parent.naissance}
        age={props.parent.age}
      />

      <LieuEvenementForm
        nom={withNamespace(props.nom, LIEU_NAISSANCE)}
        label={getLibelle("Lieu de naissance")}
        evenement={props.parent.naissance}
        gestionEtrangerFrance={true}
        etrangerParDefaut={false}
      />
    </div>
  );
};
