import {
  ANNEE,
  DEBUT,
  FIN,
  JOUR,
  MOIS,
  PERIODE
} from "@composant/formulaire/ConstantesNomsForm";
import { Periode } from "@model/requete/enum/Periode";
import { Options } from "@util/Type";
import { connect } from "formik";
import { useEffect, useState } from "react";
import { SelectField } from "../champsSaisie/SelectField";
import { FormikComponentProps, withNamespace } from "../utils/FormUtil";
import DateComposeForm from "./DateComposeForm";
import "./scss/DateComposeForm.scss";

interface ComponentProps {
  label: string;
  nomDate: string;
  choixPeriodes: Options;
  showDatePicker?: boolean;
  showCroixSuppression?: boolean;
  disabled?: boolean;
  anneeMin?: number;
  anneeMax?: number;
  afficheDate?: boolean;
  afficheHeure?: boolean;
}

export type DatePeriodeFormProps = ComponentProps & FormikComponentProps;

const DatePeriodeForm: React.FC<DatePeriodeFormProps> = props => {
  const [intervalle, setIntervalle] = useState(false);

  useEffect(() => {
    setChoixIntervalle(
      props.formik.getFieldProps(props.nomDate).value[PERIODE]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setChoixIntervalle = (valeur: string) => {
    const periode = Periode.getEnumFor(valeur);
    const estIntervalle = Periode.estIntervalle(periode);
    if (!estIntervalle && intervalle) {
      const dateFin = withNamespace(props.nomDate, FIN);
      props.formik.setFieldValue(withNamespace(dateFin, JOUR), "");
      props.formik.setFieldValue(withNamespace(dateFin, MOIS), "");
      props.formik.setFieldValue(withNamespace(dateFin, ANNEE), "");
    }
    setIntervalle(estIntervalle);
  };

  return (
    <div className="BlockPeriode">
      <div>
        <SelectField
          name={withNamespace(props.nomDate, PERIODE)}
          options={props.choixPeriodes}
          disabled={props.disabled}
          label={props.label}
          pasPremiereOptionVide={true}
          onChange={(e: any) => {
            setChoixIntervalle(e.target.value);
          }}
        ></SelectField>
        <div>
          <DateComposeForm
            nomDate={withNamespace(props.nomDate, DEBUT)}
            showDatePicker={props.showDatePicker}
            showCroixSuppression={props.showCroixSuppression}
            disabled={props.disabled}
            anneeMin={props.anneeMin}
            anneeMax={props.anneeMin}
            anneeObligatoire={true}
            afficheDate={props.afficheDate}
            afficheHeure={props.afficheHeure}
          ></DateComposeForm>
        </div>
      </div>
      {intervalle && (
        <div>
          <span className="TextePeriode">et</span>
          <div>
            <DateComposeForm
              nomDate={withNamespace(props.nomDate, FIN)}
              showDatePicker={props.showDatePicker}
              showCroixSuppression={props.showCroixSuppression}
              disabled={props.disabled}
              anneeMin={props.anneeMin}
              anneeMax={props.anneeMin}
              anneeObligatoire={true}
              afficheDate={props.afficheDate}
              afficheHeure={props.afficheHeure}
            ></DateComposeForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect<ComponentProps>(DatePeriodeForm);
