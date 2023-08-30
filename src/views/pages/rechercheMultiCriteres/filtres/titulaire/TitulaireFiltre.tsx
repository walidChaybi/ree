import { ANNEE, JOUR, MOIS } from "@composant/formulaire/ConstantesNomsForm";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import SwapHoriz from "@mui/icons-material/SwapHoriz";
import IconButton from "@mui/material/IconButton";
import { getLibelle, rempliAGaucheAvecZero, UN, ZERO } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues
} from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  ASTERISQUE_MESSAGE,
  CARACTERES_AUTORISES_MESSAGE
} from "@widget/formulaire/FormulaireMessages";
import { traiteEspace } from "@widget/formulaire/utils/ControlesUtil";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  reinitialiserChamps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  AsterisqueRecherche,
  CaracteresAutorisesRecherche
} from "../../../../../ressources/Regex";
import "../scss/FiltreRMC.scss";
import { BoutonsRappelTitulaire } from "./BoutonsRappelTitulaire";

// Noms des champs
export const NOM = "nom";
export const PRENOM = "prenom";
export const DATE_NAISSANCE = "dateNaissance";
export const PAYS_NAISSANCE = "paysNaissance";

// Valeurs par défaut des champs
export const TitulaireDefaultValues = {
  [NOM]: "",
  [PRENOM]: "",
  [DATE_NAISSANCE]: DateDefaultValues,
  [PAYS_NAISSANCE]: ""
};

// Schéma de validation des champs
export const TitulaireValidationSchema = Yup.object()
  .shape({
    [NOM]: Yup.string()
      .matches(CaracteresAutorisesRecherche, CARACTERES_AUTORISES_MESSAGE)
      .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE),
    [PRENOM]: Yup.string()
      .matches(CaracteresAutorisesRecherche, CARACTERES_AUTORISES_MESSAGE)
      .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE),
    [DATE_NAISSANCE]: DateValidationSchema,
    [PAYS_NAISSANCE]: Yup.string()
      .matches(CaracteresAutorisesRecherche, CARACTERES_AUTORISES_MESSAGE)
      .matches(AsterisqueRecherche, ASTERISQUE_MESSAGE)
  })
  .test("prenomInvalide", function (value, error) {
    const nom = value[NOM] as string;
    const prenom = value[PRENOM] as string;

    const paramsError = {
      path: `${error.path}.prenom`,
      message: getLibelle(
        "L'astérisque est n'autorisé dans le prénom que si le nom est saisi (avec ou sans *)"
      )
    };

    return prenom != null && prenom?.includes("*") && nom == null
      ? this.createError(paramsError)
      : true;
  });

interface ITitulaireFiltreProps {
  titulaires?: ITitulaireRequete[];
}

export type TitulaireFiltreProps = ComponentFiltreProps &
  FormikComponentProps &
  ITitulaireFiltreProps;

const TitulaireFiltre: React.FC<TitulaireFiltreProps> = props => {
  const dateNaissanceNamespace = withNamespace(props.nomFiltre, DATE_NAISSANCE);
  const dateDebutComposeFormProps = {
    labelDate: "Date de naissance",
    nomDate: dateNaissanceNamespace
  } as DateComposeFormProps;

  function onBlurChamp(e: React.ChangeEvent<HTMLInputElement>): void {
    traiteEspace(e, props.formik.handleChange);
    props.formik.handleBlur(e);
  }

  function switchNomPrenom() {
    const nomOld = props.formik.getFieldProps(
      withNamespace(props.nomFiltre, NOM)
    ).value;
    const prenomOld = props.formik.getFieldProps(
      withNamespace(props.nomFiltre, PRENOM)
    ).value;
    props.formik.setFieldValue(withNamespace(props.nomFiltre, NOM), prenomOld);
    props.formik.setFieldValue(withNamespace(props.nomFiltre, PRENOM), nomOld);
  }

  function onClickRappelCriteresTitulaire(
    event: React.MouseEvent,
    titulaire: ITitulaireRequete
  ): void {
    event.preventDefault();
    reinitialiserChamps(
      props.nomFiltre,
      [NOM, PRENOM, PAYS_NAISSANCE],
      props.formik
    );
    reinitialiserChamps(
      dateNaissanceNamespace,
      [JOUR, MOIS, ANNEE],
      props.formik
    );

    if (titulaire.nomNaissance) {
      props.formik.setFieldValue(
        withNamespace(props.nomFiltre, NOM),
        titulaire.nomNaissance
      );
    }
    if (titulaire.prenoms && titulaire.prenoms.length > ZERO) {
      props.formik.setFieldValue(
        withNamespace(props.nomFiltre, PRENOM),
        titulaire.prenoms.find(prenom => prenom.numeroOrdre === UN)?.prenom
      );
    }
    if (titulaire.paysNaissance) {
      props.formik.setFieldValue(
        withNamespace(props.nomFiltre, PAYS_NAISSANCE),
        titulaire.paysNaissance
      );
    }
    if (titulaire.jourNaissance) {
      props.formik.setFieldValue(
        withNamespace(dateNaissanceNamespace, JOUR),
        rempliAGaucheAvecZero(titulaire.jourNaissance)
      );
    }
    if (titulaire.moisNaissance) {
      props.formik.setFieldValue(
        withNamespace(dateNaissanceNamespace, MOIS),
        rempliAGaucheAvecZero(titulaire.moisNaissance)
      );
    }
    if (titulaire.anneeNaissance) {
      props.formik.setFieldValue(
        withNamespace(dateNaissanceNamespace, ANNEE),
        titulaire.anneeNaissance
      );
    }
  }

  return (
    <div className={props.nomFiltre}>
      <Fieldset titre={getLibelle("Filtre titulaire")}>
        <div className="FormFiltre">
          <div className="nomEtPrenom">
            <InputField
              name={withNamespace(props.nomFiltre, NOM)}
              label={getLibelle("Nom")}
              onBlur={onBlurChamp}
            />

            <IconButton
              aria-label="inverser nom et prénom"
              className="BtnNomPrenom"
              onClick={switchNomPrenom}
              tabIndex={-1}
            >
              <SwapHoriz />
            </IconButton>
            <InputField
              name={withNamespace(props.nomFiltre, PRENOM)}
              label={getLibelle("Prénom")}
              onBlur={onBlurChamp}
            />
          </div>

          <DateComposeForm {...dateDebutComposeFormProps} />

          <InputField
            name={withNamespace(props.nomFiltre, PAYS_NAISSANCE)}
            label={getLibelle("Pays de naissance")}
            onBlur={onBlurChamp}
          />

          <BoutonsRappelTitulaire
            onClickRappelCriteresTitulaire={onClickRappelCriteresTitulaire}
            titulaires={props.titulaires}
          />
        </div>
      </Fieldset>
    </div>
  );
};

export default connect(TitulaireFiltre);
