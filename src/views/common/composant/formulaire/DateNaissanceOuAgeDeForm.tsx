import { connect } from "formik";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  Evenement,
  IEvenement
} from "../../../../model/etatcivil/acte/IEvenement";
import { estRenseigne, getLibelle } from "../../util/Utils";
import DateComposeForm, {
  ChampDateModifie,
  IDateComposeForm
} from "../../widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchema } from "../../widget/formulaire/champsDate/DateComposeFormValidation";
import { InputField } from "../../widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "../../widget/formulaire/utils/FormUtil";
import { AGE, ANNEE, DATE, JOUR, MOIS } from "./ConstantesNomsForm";

export const DateNaissanceOuAgeDeValidationSchema = Yup.object({
  [DATE]: DateValidationSchema
});

interface ComponentProps {
  nom: string;
  age?: number;
  naissance?: IEvenement;
}

type DateNaissanceOuAgeDeFormProps = ComponentProps & FormikComponentProps;

const DateNaissanceOuAgeDeForm: React.FC<
  DateNaissanceOuAgeDeFormProps
> = props => {
  const [disabledAgeDe, setDisabledAgeDe] = useState<boolean>(
    estRenseigne(props.age)
  );

  const [disabledDate, setDisabledDate] = useState<boolean>(
    Evenement.estRenseigne(props.naissance)
  );

  const onChangeDate = useCallback(
    (date: IDateComposeForm, type?: ChampDateModifie) => {
      if (type === ChampDateModifie.ANNEE) {
        setDisabledAgeDe(estRenseigne(date.annee));
        if (date.annee) {
          props.formik.setFieldValue(withNamespace(props.nom, AGE), "");
        }
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
    <div>
      {
        <DateComposeForm
          nomDate={withNamespace(props.nom, DATE)}
          labelDate="Date de naissance"
          disabled={disabledDate}
          onChange={onChangeDate}
          showCroixSuppression={false}
        />
      }
      {
        <InputField
          label={getLibelle("Agé(e) de")}
          name={withNamespace(props.nom, AGE)}
          disabled={disabledAgeDe}
          onChange={onChangeAge}
        />
      }
    </div>
  );
};

export default connect<ComponentProps>(DateNaissanceOuAgeDeForm);
