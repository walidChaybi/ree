import LieuForm, { ILieuProps } from "@composant/formulaire/LieuForm";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  INomForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../ressources/Regex";
import {
  ARRONDISSEMENT_NAISSANCE,
  DEPARTEMENT_NAISSANCE,
  LIEU_DE_NAISSANCE,
  PAYS_NAISSANCE,
  REGION_NAISSANCE,
  VILLE_NAISSANCE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";
import "./scss/EvenementForm.scss";

export const EvenementParentsFormDefaultValues = {
  [LIEU_DE_NAISSANCE]: "",
  [VILLE_NAISSANCE]: "",
  [ARRONDISSEMENT_NAISSANCE]: "",
  [DEPARTEMENT_NAISSANCE]: "",
  [REGION_NAISSANCE]: "",
  [PAYS_NAISSANCE]: ""
};

export const EvenementParentsFormValidationSchema = Yup.object().shape({
  [VILLE_NAISSANCE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [REGION_NAISSANCE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [DEPARTEMENT_NAISSANCE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  ),
  [PAYS_NAISSANCE]: Yup.string().matches(
    CaracteresAutorises,
    CARACTERES_AUTORISES_MESSAGE
  )
});
const EvenementParentsForm: React.FC<SubFormProps> = props => {
  const lieuNamespace = withNamespace(props.nom, LIEU_DE_NAISSANCE);
  const villeNamespace = withNamespace(props.nom, VILLE_NAISSANCE);
  const arrondissementNamespace = withNamespace(
    props.nom,
    ARRONDISSEMENT_NAISSANCE
  );
  const departementNamespace = withNamespace(props.nom, DEPARTEMENT_NAISSANCE);
  const regionNamespace = withNamespace(props.nom, REGION_NAISSANCE);
  const paysNamespace = withNamespace(props.nom, PAYS_NAISSANCE);

  const lieuElements: ILieuProps = {
    lieu: (
      <RadioField
        name={lieuNamespace}
        label={getLibelle("Lieu de naissance")}
        values={EtrangerFrance.getAllEnumsAsOptions()}
      />
    ),
    ville: (
      <InputField
        name={villeNamespace}
        label={getLibelle("Ville de naissance")}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          sortieChampPremiereLettreEnMajuscule(e, props.formik, villeNamespace)
        }
      />
    ),
    arrondissement: (
      <SelectField
        name={arrondissementNamespace}
        label={getLibelle("Arrondissement de naissance")}
        options={LieuxUtils.getOptionsArrondissement(
          props.formik.getFieldProps(villeNamespace).value
        )}
      />
    ),
    departement: (
      <InputField
        name={departementNamespace}
        label={getLibelle("Département de naissance")}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          sortieChampPremiereLettreEnMajuscule(
            e,
            props.formik,
            departementNamespace
          )
        }
      />
    ),
    region: (
      <InputField
        name={regionNamespace}
        label={getLibelle("Région/état de naissance")}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          sortieChampPremiereLettreEnMajuscule(e, props.formik, regionNamespace)
        }
      />
    ),
    pays: (
      <InputField
        name={paysNamespace}
        label={getLibelle(`Pays de naissance`)}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          sortieChampPremiereLettreEnMajuscule(e, props.formik, paysNamespace)
        }
      />
    )
  };

  return (
    <LieuForm
      elements={lieuElements}
      afficherArrondissement={LieuxUtils.estVilleAvecArrondissement(
        props.formik.getFieldProps(villeNamespace).value
      )}
      afficherDepartement={true}
    ></LieuForm>
  );
};

export default connect<INomForm>(EvenementParentsForm);
