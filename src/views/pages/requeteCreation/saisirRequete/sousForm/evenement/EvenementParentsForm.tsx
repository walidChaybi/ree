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
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import {
  ARRONDISSEMENT_NAISSANCE,
  DEPARTEMENT_NAISSANCE,
  LIEU_DE_NAISSANCE,
  PAYS_NAISSANCE,
  REGION_NAISSANCE,
  VILLE_NAISSANCE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import EvenementEtrangerForm from "./EvenementEtranger";
import "./scss/EvenementForm.scss";

export const EvenementParentsFormDefaultValues = {
  [LIEU_DE_NAISSANCE]: "INCONNU",
  [VILLE_NAISSANCE]: "",
  [ARRONDISSEMENT_NAISSANCE]: "",
  [DEPARTEMENT_NAISSANCE]: "",
  [REGION_NAISSANCE]: "",
  [PAYS_NAISSANCE]: ""
};

export const EvenementParentsFormValidationSchema = Yup.object().shape({
  [VILLE_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [REGION_NAISSANCE]: Yup.string().matches(
    CarateresAutorise,
    CARATERES_AUTORISES_MESSAGE
  ),
  [DEPARTEMENT_NAISSANCE]: Yup.string().matches(
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
  const departementWithspace = withNamespace(props.nom, DEPARTEMENT_NAISSANCE);

  const lieuNaissanceWithNamespace = withNamespace(
    props.nom,
    LIEU_DE_NAISSANCE
  );

  const lieuNaissanceForm = props.formik.getFieldProps(
    lieuNaissanceWithNamespace
  ).value;

  const [naissance, setNaissance] = useState<EtrangerFrance>(
    EtrangerFrance.INCONNU
  );

  useEffect(() => {
    if (lieuNaissanceForm !== EtrangerFrance.getEnumFor("INCONNU")) {
      setNaissance(EtrangerFrance.getEnumFor(lieuNaissanceForm));
    }
  }, [lieuNaissanceForm]);

  function onChangeLieuNaissance(e: React.ChangeEvent<HTMLInputElement>) {
    setNaissance(EtrangerFrance.getEnumFor(e.target.value));
    props.formik.handleChange(e);
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
              departementWithspace
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
          onChange={onChangeLieuNaissance}
        />

        {rendreComposantEnFonctionDuLieuDeNaissance(naissance)}
      </div>
    </div>
  );
};

export default connect<INomForm>(EvenementParentsForm);
