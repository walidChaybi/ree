import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { OuiNon } from "@model/etatcivil/enum/OuiNon";
import { getLibelle } from "@util/Utils";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import { INomForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ChampDate from "../../../../../../composants/commun/champs/ChampDate";
import ChampTexte from "../../../../../../composants/commun/champs/ChampTexte";
import ChampsRadio from "../../../../../../composants/commun/champs/ChampsRadio";
import { CaracteresAutorises } from "../../../../../../ressources/Regex";
import {
  DATE_MARIAGE,
  LIEU_DE_MARIAGE,
  PARENTS_MARIES,
  PAYS_DU_MARIAGE,
  VILLE_DE_MARIAGE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import "./scss/EvenementMariageParentsForm.scss";

export const EvenementMariageParentsFormDefaultValues = {
  [PARENTS_MARIES]: "NON",
  [DATE_MARIAGE]: DateDefaultValues,
  [LIEU_DE_MARIAGE]: "INCONNU",
  [VILLE_DE_MARIAGE]: "",
  [PAYS_DU_MARIAGE]: ""
};

export const EvenementMariageParentsFormValidationSchema = Yup.object().shape({
  [PARENTS_MARIES]: Yup.string(),
  [DATE_MARIAGE]: DateValidationSchemaSansTestFormat,
  [VILLE_DE_MARIAGE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_DU_MARIAGE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});

const OUI = "OUI";

const EvenementMariageParentsForm: React.FC<SubFormProps> = props => {
  // Variable Formik
  const villeMariageWithNamespace = withNamespace(props.nom, VILLE_DE_MARIAGE);
  const paysMariageWithNamespace = withNamespace(props.nom, PAYS_DU_MARIAGE);
  const lieuMariageWithNamespace = withNamespace(props.nom, LIEU_DE_MARIAGE);
  const lieuMariageForm = props.formik.getFieldProps(lieuMariageWithNamespace).value;

  const boutonRadioParentMariesForm = props.formik.getFieldProps(withNamespace(props.nom, PARENTS_MARIES)).value;

  // State
  const [parentsMaries, setParentsMaries] = useState<boolean>(false);
  const [lieuMariage, setLieuMariage] = useState<EtrangerFrance>(EtrangerFrance.INCONNU);

  useEffect(() => {
    if (lieuMariageForm !== EtrangerFrance.getEnumFor("INCONNU")) {
      setLieuMariage(EtrangerFrance.getEnumFor(lieuMariageForm));
    }
  }, [lieuMariageForm]);

  useEffect(() => {
    if (boutonRadioParentMariesForm && boutonRadioParentMariesForm === OUI) {
      setParentsMaries(true);
    }
  }, [boutonRadioParentMariesForm]);

  function rendreComposantEnFonctionDuLieuDuMariage(lieuMariageSelectionne: EtrangerFrance): JSX.Element {
    let composantLieuNaissance: JSX.Element = <></>;
    switch (lieuMariageSelectionne) {
      case EtrangerFrance.ETRANGER:
        composantLieuNaissance = getFormulaireMariageParentEtranger();
        break;
      case EtrangerFrance.FRANCE:
        composantLieuNaissance = getFormulaireMariageParentFrance();
        break;
      default:
        break;
    }

    return composantLieuNaissance;
  }

  function getFormulaireMariageParentEtranger(): JSX.Element {
    return (
      <div className="space-y-4">
        <ChampTexte
          name={withNamespace(props.nom, VILLE_DE_MARIAGE)}
          libelle={"Ville du mariage"}
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, villeMariageWithNamespace)}
        />

        <ChampTexte
          name={withNamespace(props.nom, PAYS_DU_MARIAGE)}
          libelle={"Pays du mariage"}
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, paysMariageWithNamespace)}
        />
      </div>
    );
  }

  function getFormulaireMariageParentFrance(): JSX.Element {
    return (
      <>
        <ChampTexte
          name={withNamespace(props.nom, VILLE_DE_MARIAGE)}
          libelle={getLibelle("Ville du mariage")}
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, villeMariageWithNamespace)}
        />
      </>
    );
  }

  function onChangeLieuMariage(e: React.ChangeEvent<HTMLInputElement>) {
    setLieuMariage(EtrangerFrance.getEnumFor(e.target.value));
    props.formik.handleChange(e);
  }

  function handleChangeParentsMaries(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "OUI") {
      setParentsMaries(true);
    } else {
      setParentsMaries(false);
    }
    props.formik.handleChange(e);
  }

  return (
    <div className="space-y-4">
      <ChampsRadio
        name={withNamespace(props.nom, PARENTS_MARIES)}
        libelle={getLibelle("Les parents sont mariés")}
        options={OuiNon.getAllEnumsAsOptions()}
        onChange={handleChangeParentsMaries}
      />

      {parentsMaries && (
        <div className="space-y-4">
          <ChampDate
            name={withNamespace(props.nom, DATE_MARIAGE)}
            libelle={getLibelle("Date du mariage")}
          />

          <ChampsRadio
            name={withNamespace(props.nom, LIEU_DE_MARIAGE)}
            libelle={getLibelle("Lieu du mariage")}
            options={EtrangerFrance.getAllEnumsAsOptions()}
            onChange={onChangeLieuMariage}
          />

          {rendreComposantEnFonctionDuLieuDuMariage(lieuMariage)}
        </div>
      )}
    </div>
  );
};

export default connect<INomForm>(EvenementMariageParentsForm);
