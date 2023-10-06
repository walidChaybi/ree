import { Evenement, IEvenement } from "@model/etatcivil/acte/IEvenement";
import { estRenseigne, getLibelle } from "@util/Utils";
import DateComposeForm, {
  ChampDateModifie
} from "@widget/formulaire/champsDate/DateComposeForm";
import { IDateComposeForm } from "@widget/formulaire/champsDate/DateComposeFormUtil";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { AGE, ANNEE, DATE, JOUR, MOIS } from "./ConstantesNomsForm";

interface ComponentProps {
  nom: string;
  age?: number;
  naissance?: IEvenement;
  saisieVerrouillee: boolean;
}

type DateNaissanceOuAgeDeFormProps = ComponentProps & FormikComponentProps;

const DateNaissanceOuAgeDeForm: React.FC<
  DateNaissanceOuAgeDeFormProps
> = props => {
  const getDateNaissanceSaisie = () => {
    return props.formik.getFieldProps(withNamespace(props.nom, DATE)).value;
  };

  const getAgeSaisi = () => {
    return props.formik.getFieldProps(withNamespace(props.nom, AGE)).value;
  };

  const [disabledAgeDe, setDisabledAgeDe] = useState<boolean>(
    Evenement.estPartiellementRenseigne(getDateNaissanceSaisie()) ||
      estRenseigne(getAgeSaisi())
  );

  const [disabledDate, setDisabledDate] = useState<boolean>(
    Evenement.estTotalementRenseigne(getDateNaissanceSaisie()) ||
      (Evenement.estNonRenseigne(getDateNaissanceSaisie()) &&
        estRenseigne(getAgeSaisi()))
  );

  const onChangeDate = useCallback(
    (date: IDateComposeForm, type?: ChampDateModifie) => {
      const unDesChampsDateEstRenseigne =
        estRenseigne(date.jour) ||
        estRenseigne(date.mois) ||
        estRenseigne(date.annee);
      setDisabledAgeDe(unDesChampsDateEstRenseigne);
      if (unDesChampsDateEstRenseigne) {
        props.formik.setFieldValue(withNamespace(props.nom, AGE), "");
      }
    },
    [props.formik, props.nom]
  );

  const onChangeAge = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const age = e.target.value;
      setDisabledDate(estRenseigne(age));
      if (age) {
        props.formik.setFieldValue(
          withNamespace(withNamespace(props.nom, DATE), JOUR),
          ""
        );
        props.formik.setFieldValue(
          withNamespace(withNamespace(props.nom, DATE), MOIS),
          ""
        );
        props.formik.setFieldValue(
          withNamespace(withNamespace(props.nom, DATE), ANNEE),
          ""
        );
      }
      props.formik.handleChange(e);
    },
    [props.formik, props.nom]
  );

  return (
    <div className="DateComposeFormContainer">
      {
        <DateComposeForm
          nomDate={withNamespace(props.nom, DATE)}
          labelDate="Date de naissance"
          disabled={
            (props.saisieVerrouillee ||
              (Evenement.estNonRenseigne(getDateNaissanceSaisie()) &&
                estRenseigne(getAgeSaisi()))) &&
            disabledDate
          }
          onChange={onChangeDate}
          showCroixSuppression={false}
        />
      }
      {
        <InputField
          label={getLibelle("Agé(e) de")}
          name={withNamespace(props.nom, AGE)}
          disabled={
            (props.saisieVerrouillee ||
              Evenement.estPartiellementRenseigne(getDateNaissanceSaisie())) &&
            disabledAgeDe
          }
          onChange={onChangeAge}
        />
      }
    </div>
  );
};

export default connect<ComponentProps>(DateNaissanceOuAgeDeForm);
