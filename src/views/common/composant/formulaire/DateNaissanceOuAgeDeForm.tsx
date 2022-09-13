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
}

type DateNaissanceOuAgeDeFormProps = ComponentProps & FormikComponentProps;

const DateNaissanceOuAgeDeForm: React.FC<
  DateNaissanceOuAgeDeFormProps
> = props => {
  const estRenseigneAgeOuNaissance =
    estRenseigne(props.age) || Evenement.estRenseigne(props.naissance);

  const [disabledAgeDe, setDisabledAgeDe] = useState<boolean>(
    estRenseigneAgeOuNaissance
  );

  const [disabledDate, setDisabledDate] = useState<boolean>(false);

  const onChangeDate = useCallback(
    (date: IDateComposeForm, type?: ChampDateModifie) => {
      setDisabledAgeDe(estRenseigne(date.annee));
      if (date.annee) {
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
    <div>
      {
        <DateComposeForm
          nomDate={withNamespace(props.nom, DATE)}
          labelDate="Date de naissance"
          disabledJour={
            disabledDate ||
            estRenseigne(props.age) ||
            Evenement.estJourRenseigne(props.naissance)
          }
          disabledMois={
            disabledDate ||
            estRenseigne(props.age) ||
            Evenement.estMoisRenseigne(props.naissance)
          }
          disabledAnnee={
            disabledDate ||
            estRenseigne(props.age) ||
            Evenement.estAnneeRenseignee(props.naissance)
          }
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
