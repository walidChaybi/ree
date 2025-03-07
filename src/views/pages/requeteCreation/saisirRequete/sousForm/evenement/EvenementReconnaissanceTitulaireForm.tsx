import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { OuiNon } from "@model/etatcivil/enum/OuiNon";
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
  DATE_RECONNAISSANCE,
  DEPARTEMENT_RECONNAISSANCE,
  LIEU_ACTE_RECONNAISSANCE,
  PAYS_RECONNAISSANCE,
  REGION_ETAT_RECONNAISSANCE,
  TITULAIRE_RECONNU,
  VILLE_RECONNAISSANCE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";

export const EvenementReconnaissanceTitulaireFormDefaultValues = {
  [TITULAIRE_RECONNU]: "NON",
  [DATE_RECONNAISSANCE]: DateDefaultValues,
  [LIEU_ACTE_RECONNAISSANCE]: "INCONNU",
  [VILLE_RECONNAISSANCE]: "",
  [REGION_ETAT_RECONNAISSANCE]: "",
  [DEPARTEMENT_RECONNAISSANCE]: "",
  [PAYS_RECONNAISSANCE]: ""
};

export const EvenementReconnaissanceTitulaireFormValidationSchema = Yup.object().shape({
  [TITULAIRE_RECONNU]: Yup.string(),
  [DATE_RECONNAISSANCE]: DateValidationSchemaSansTestFormat,
  [VILLE_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [REGION_ETAT_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [DEPARTEMENT_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PAYS_RECONNAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
});
const OUI = "OUI";

export type EvenementReconnaissanceTitulaireSubFormProps = SubFormProps;
const EvenementReconnaissanceTitulaireForm: React.FC<EvenementReconnaissanceTitulaireSubFormProps> = props => {
  const lieuReconnaissanceWithNamespace = withNamespace(props.nom, LIEU_ACTE_RECONNAISSANCE);
  const villeReconnaissanceWithNamespace = withNamespace(props.nom, VILLE_RECONNAISSANCE);
  const regionReconnaissanceWithNamespace = withNamespace(props.nom, REGION_ETAT_RECONNAISSANCE);
  const paysReconnaissanceWithNamespace = withNamespace(props.nom, PAYS_RECONNAISSANCE);
  const departementReconnaissanceWithNamespace = withNamespace(props.nom, DEPARTEMENT_RECONNAISSANCE);

  const boutonRadioTitulaireReconnuForm = props.formik.getFieldProps(withNamespace(props.nom, TITULAIRE_RECONNU)).value;

  const lieuReconnaissanceForm = props.formik.getFieldProps(lieuReconnaissanceWithNamespace).value;

  const [lieuReconnaissance, setLieuReconnaissance] = useState<EtrangerFrance>(EtrangerFrance.INCONNU);
  const [titulaireReconnu, setTitulaireReconnu] = useState(false);

  useEffect(() => {
    if (lieuReconnaissanceForm !== EtrangerFrance.getEnumFor("INCONNU")) {
      setLieuReconnaissance(EtrangerFrance.getEnumFor(lieuReconnaissanceForm));
    }
  }, [lieuReconnaissanceForm]);

  useEffect(() => {
    if (boutonRadioTitulaireReconnuForm && boutonRadioTitulaireReconnuForm === OUI) {
      setTitulaireReconnu(true);
    }
  }, [boutonRadioTitulaireReconnuForm]);

  function rendreComposantEnFonctionDuLieuDeReconnaissance(nationaliteSelectionne: EtrangerFrance): JSX.Element {
    let composantLieuReconnaissance: JSX.Element = <></>;
    switch (nationaliteSelectionne) {
      case EtrangerFrance.ETRANGER:
        composantLieuReconnaissance = getFormulaireReconnaissanceEtrangere();
        break;
      case EtrangerFrance.FRANCE:
        composantLieuReconnaissance = getFormulaireReconnaissanceFrancaise();
        break;
      default:
        break;
    }

    return composantLieuReconnaissance;
  }

  function getFormulaireReconnaissanceEtrangere(): JSX.Element {
    return (
      <div className="space-y-4">
        <ChampTexte
          name={villeReconnaissanceWithNamespace}
          libelle={"Ville de la reconnaissance"}
          optionFormatage="PREMIER_MAJUSCULE"
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, villeReconnaissanceWithNamespace)}
        />

        <ChampTexte
          name={regionReconnaissanceWithNamespace}
          libelle={"Région/état de la reconnaissance"}
          optionFormatage="PREMIER_MAJUSCULE"
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, regionReconnaissanceWithNamespace)}
        />

        <ChampTexte
          name={paysReconnaissanceWithNamespace}
          libelle={"Pays de la reconnaissance"}
          optionFormatage="PREMIER_MAJUSCULE"
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, paysReconnaissanceWithNamespace)}
        />
      </div>
    );
  }

  function getFormulaireReconnaissanceFrancaise(): JSX.Element {
    return (
      <div className="space-y-4">
        <ChampTexte
          name={withNamespace(props.nom, VILLE_RECONNAISSANCE)}
          libelle={"Ville de la reconnaissance"}
          optionFormatage="PREMIER_MAJUSCULE"
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, villeReconnaissanceWithNamespace)}
        />

        <ChampTexte
          name={departementReconnaissanceWithNamespace}
          libelle={"Département de la reconnaissance"}
          optionFormatage="PREMIER_MAJUSCULE"
          onBlur={e => sortieChampPremiereLettreEnMajuscule(e, props.formik, departementReconnaissanceWithNamespace)}
        />
      </div>
    );
  }

  function onChangeLieuReconnaissance(e: React.ChangeEvent<HTMLInputElement>) {
    setLieuReconnaissance(EtrangerFrance.getEnumFor(e.target.value));
    props.formik.handleChange(e);
  }

  function handleChangeTitulaireReconnu(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "OUI") {
      setTitulaireReconnu(true);
    } else {
      setTitulaireReconnu(false);
    }
    props.formik.handleChange(e);
  }

  return (
    <div className="space-y-4">
      <ChampsRadio
        name={withNamespace(props.nom, TITULAIRE_RECONNU)}
        libelle={"Le titulaire a t-il été reconnu ?"}
        options={OuiNon.getAllEnumsAsOptions()}
        onChange={handleChangeTitulaireReconnu}
      />

      {titulaireReconnu && (
        <div className="space-y-4">
          <ChampDate
            name={withNamespace(props.nom, DATE_RECONNAISSANCE)}
            libelle={"Date de reconnaissance"}
          />

          <ChampsRadio
            name={withNamespace(props.nom, LIEU_ACTE_RECONNAISSANCE)}
            libelle={"Lieu de l'acte de reconnaissance"}
            options={EtrangerFrance.getAllEnumsAsOptions()}
            onChange={onChangeLieuReconnaissance}
          />

          {rendreComposantEnFonctionDuLieuDeReconnaissance(lieuReconnaissance)}
        </div>
      )}
    </div>
  );
};

export default connect<INomForm>(EvenementReconnaissanceTitulaireForm);
