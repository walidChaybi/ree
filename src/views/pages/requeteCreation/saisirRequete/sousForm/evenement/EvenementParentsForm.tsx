import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  INomForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import {
  ARRONDISSEMENT_NAISSANCE,
  DEPARTEMENT_NAISSANCE,
  LIEU_DE_NAISSANCE,
  PAYS_NAISSANCE,
  REGION_NAISSANCE,
  VILLE_NAISSANCE
} from "../../modelForm/ISaisirRCTCPageModel";
import EvenementEtrangerForm from "./EvenementEtranger";
import "./scss/EvenementForm.scss";

export const EvenementParentsFormDefaultValues = {
  [LIEU_DE_NAISSANCE]: "INCONNU",
  [VILLE_NAISSANCE]: "",
  [ARRONDISSEMENT_NAISSANCE]: "",
  [REGION_NAISSANCE]: "",
  [PAYS_NAISSANCE]: ""
};

export const EvenementParentsFormValidationSchema = Yup.object().shape({
  [LIEU_DE_NAISSANCE]: Yup.boolean(),
  [VILLE_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [REGION_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [PAYS_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  )
});
const EvenementParentsForm: React.FC<SubFormProps> = props => {
  const villeWithNamespace = withNamespace(props.nom, VILLE_NAISSANCE);

  const [nationalite, setNationalite] = useState<EtrangerFrance>(
    EtrangerFrance.INCONNU
  );

  function onChangeNationalite(e: React.ChangeEvent<HTMLInputElement>) {
    setNationalite(EtrangerFrance.getEnumFor(e.target.value));
  }

  function getFormulaireNaissanceParentEtranger(): JSX.Element {
    return <EvenementEtrangerForm nom={props.nom} />;
  }

  function getFormulaireNaissanceParentFrance(): JSX.Element {
    return (
      <>
        <InputField
          name={withNamespace(props.nom, VILLE_NAISSANCE)}
          label={getLibelle("Ville de naissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              villeWithNamespace
            )
          }
        />

        {LieuxUtils.estVilleAvecArrondissement(
          props.formik.getFieldProps(villeWithNamespace).value
        ) && (
          <SelectField
            name={withNamespace(props.nom, ARRONDISSEMENT_NAISSANCE)}
            label={getLibelle("Arrondissement de naissance")}
            options={LieuxUtils.getOptionsArrondissement(
              props.formik.getFieldProps(villeWithNamespace).value
            )}
          />
        )}

        <InputField
          name={withNamespace(props.nom, DEPARTEMENT_NAISSANCE)}
          label={getLibelle("Département de naissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              villeWithNamespace
            )
          }
        />
      </>
    );
  }

  function rendreComposantEnFonctionDuLieuDeNaissance(
    lieuNaissanceSelectionne: EtrangerFrance
  ): JSX.Element {
    let composantLieuNaissance: JSX.Element = <></>;
    switch (lieuNaissanceSelectionne) {
      case EtrangerFrance.ETRANGER:
        composantLieuNaissance = getFormulaireNaissanceParentEtranger();
        break;
      case EtrangerFrance.FRANCE:
        composantLieuNaissance = getFormulaireNaissanceParentFrance();
        break;
      default:
        break;
    }

    return composantLieuNaissance;
  }

  return (
    <div className="EvenementParentsForm">
      <div className="lieuNaissance">
        <RadioField
          name={withNamespace(props.nom, LIEU_DE_NAISSANCE)}
          label={getLibelle("Lieu de naissance")}
          values={EtrangerFrance.getAllEnumsAsOptions()}
          onChange={onChangeNationalite}
        />

        {rendreComposantEnFonctionDuLieuDeNaissance(nationalite)}
      </div>
    </div>
  );
};

export default connect<INomForm>(EvenementParentsForm);
