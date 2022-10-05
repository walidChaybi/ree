import {
  DATE_NAISSANCE_OU_AGE_DE,
  LIEU_NAISSANCE,
  NOM_NAISSANCE,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import DateNaissanceOuAgeDeForm from "@composant/formulaire/DateNaissanceOuAgeDeForm";
import LieuEvenementForm from "@composant/formulaire/LieuEvenementForm";
import { Filiation, IFiliation } from "@model/etatcivil/acte/IFiliation";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { estRenseigne, getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import { PRENOMS } from "../../../../../../saisirRequete/modelForm/ISaisirRequetePageModel";
import PrenomsForm from "../../../../../../saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import "./scss/ParentNaissanceForm.scss";

interface ParentNaissanceFormProps {
  nom: string;
  parent: IFiliation;
  sansDateAgeEtLieuNaissance?: boolean;
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
      {!props.sansDateAgeEtLieuNaissance && (
        <>
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
        </>
      )}
    </div>
  );
};
