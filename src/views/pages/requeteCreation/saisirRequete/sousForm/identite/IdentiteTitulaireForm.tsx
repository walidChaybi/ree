import {
  DATE_NAISSANCE,
  IDENTIFIANT,
  LIEN_REQUERANT,
  NAISSANCE,
  NOM,
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  PRENOMS,
  REQUERANT,
  REQUETE,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import { creerValidationSchemaPrenom } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaAnneeObligatoire } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import ChampDate from "../../../../../../composants/commun/champs/ChampDate";
import ChampTexte from "../../../../../../composants/commun/champs/ChampTexte";
import ChampsPrenoms from "../../../../../../composants/commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../../../composants/commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
import { CaracteresAutorises } from "../../../../../../ressources/Regex";
import EvenementEtrangerForm, {
  EvenementEtrangerFormDefaultValues,
  EvenementEtrangerFormValidationSchema
} from "../evenement/EvenementEtranger";

// Définir les valeurs par défaut directement ici
export const IdentiteFormDefaultValues = {
  [IDENTIFIANT]: "",
  [NOM_ACTE_ETRANGER]: "",
  [NOM_SOUHAITE_ACTE_FR]: "",
  [PRENOMS]: { prenom1: "" },
  [SEXE]: "INCONNU",
  [DATE_NAISSANCE]: DateDefaultValues,
  [NAISSANCE]: EvenementEtrangerFormDefaultValues
};

// Schéma de validation des champs intégré
export const IdentiteFormValidationSchema = Yup.object().shape({
  [NOM_ACTE_ETRANGER]: Yup.string()
    .required("La saisie d'un nom est obligatoire")
    .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [NOM_SOUHAITE_ACTE_FR]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOMS]: creerValidationSchemaPrenom(),
  [SEXE]: Yup.string(),
  [DATE_NAISSANCE]: DateValidationSchemaAnneeObligatoire,
  [NAISSANCE]: EvenementEtrangerFormValidationSchema
});

interface ComponentFormProps {
  titulaire?: ITitulaireRequeteCreation;
}

const IdentiteTitulaireForm: React.FC<SubFormProps & ComponentFormProps> = props => {
  function getLienRequerant(): TypeLienRequerantCreation {
    return TypeLienRequerantCreation.getEnumFor(props.formik.getFieldProps(withNamespace(REQUETE, LIEN_REQUERANT)).value);
  }

  function handleNomActeEtranger(e: React.ChangeEvent<HTMLInputElement>) {
    const lienRequerant = getLienRequerant();

    if (TypeLienRequerantCreation.estTitulaireActeOuTitulaireActeMineureEmancipe(lienRequerant)) {
      const nomTitulaire = props.formik.getFieldProps(withNamespace(props.nom, NOM_ACTE_ETRANGER)).value;
      props.formik.setFieldValue(withNamespace(REQUERANT, NOM), nomTitulaire);
    }

    props.formik.handleChange(e);
  }

  const nomSurActeWithNamespace = withNamespace(props.nom, NOM_ACTE_ETRANGER);
  const nomSouhaiteWithNamespace = withNamespace(props.nom, NOM_SOUHAITE_ACTE_FR);

  return (
    <ConteneurAvecBordure
      className="py-6"
      titreEnTete={"TITULAIRE"}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ChampTexte
            name={nomSurActeWithNamespace}
            libelle="Nom sur l'acte étranger"
            estObligatoire
            onBlur={handleNomActeEtranger}
          />
          <ChampTexte
            name={nomSouhaiteWithNamespace}
            libelle="Nom souhaité sur l'acte français"
          />
        </div>

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
            estObligatoire="année"
          />
        </div>
        <EvenementEtrangerForm nom={withNamespace(props.nom, NAISSANCE)} />
      </div>
    </ConteneurAvecBordure>
  );
};

export default connect<ISubForm & ComponentFormProps>(IdentiteTitulaireForm);
