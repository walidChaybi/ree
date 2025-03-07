import { NAISSANCE, NATIONALITES, NOM, PRENOMS, SEXE } from "@composant/formulaire/ConstantesNomsForm";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import NationalitesForm, { PropsFormulaireNationalites } from "@widget/formulaire/nationalites/NationalitesForm";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import ChampDate from "../../../../../../composants/commun/champs/ChampDate";
import ChampTexte from "../../../../../../composants/commun/champs/ChampTexte";
import FormulaireAdresse from "../../../../../../composants/commun/champs/ChampsAddresse";
import ChampsPrenoms from "../../../../../../composants/commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../../../composants/commun/champs/ChampsRadio";
import { DATE_NAISSANCE } from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import "./scss/ParentsForm.scss";

interface ComponentFormProps {
  parent?: ITitulaireRequeteCreation;
  maxPrenoms: number;
}

export type ParentSubFormProps = SubFormProps & ComponentFormProps;

const IdentiteParentForm: React.FC<ParentSubFormProps> = props => {
  const nationaliteFormProps = {
    nom: withNamespace(props.nom, NATIONALITES),
    nationalites: props.parent?.nationalites || undefined
  } as PropsFormulaireNationalites;

  return (
    <div className="grid grid-cols-1 gap-6">
      <ChampTexte
        name={withNamespace(props.nom, NOM)}
        libelle="Nom"
      />
      <ChampsPrenoms
        cheminPrenoms={withNamespace(props.nom, PRENOMS)}
        prefixePrenom="prenom"
      />

      <div className="grid grid-cols-2 gap-4">
        <ChampsRadio
          name={withNamespace(props.nom, SEXE)}
          libelle="Sexe"
          options={Sexe.getMasculinFemininAsOptions()}
        />
        <ChampDate
          name={withNamespace(props.nom, DATE_NAISSANCE)}
          libelle="Date de naissance"
        />
        <div className="col-span-2">
          <FormulaireAdresse
            prefix={withNamespace(props.nom, NAISSANCE)}
            libelle="Lieu de naissance"
            afficherAdresse={false}
          />
        </div>
        <div className="col-span-2">
          <NationalitesForm {...nationaliteFormProps} />
        </div>
      </div>
    </div>
  );
};

export default connect<ComponentFormProps & ISubForm>(IdentiteParentForm);
