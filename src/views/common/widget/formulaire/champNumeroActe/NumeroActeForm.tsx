import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getLibelle } from "@util/Utils";
import { connect, Field } from "formik";
import * as Yup from "yup";
import { digitSeulement, traiteCarAutorises } from "../utils/ControlesUtil";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  onBlurChampNumero,
  withNamespace
} from "../utils/FormUtil";

const NUMERO_ACTE_OU_ORDRE = "numeroActeOuOrdre";
export const NUMERO_BIS_TER = "numeroBisTer";
const A_PARTIR_DE = "aPartirDe";

export const NumeroActeDefaultValues = {
  [NUMERO_ACTE_OU_ORDRE]: "",
  [NUMERO_BIS_TER]: "",
  [A_PARTIR_DE]: false
};

export const NumeroActeValidationSchema = Yup.object({
  [NUMERO_ACTE_OU_ORDRE]: Yup.string()
});

interface INumeroActeFormProps {
  estInactifChampNumeroBisTer: boolean;
}

export type NumeroActeFormProps = INumeroActeFormProps & ComponentFiltreProps;

const NumeroActeForm: React.FC<
  NumeroActeFormProps & FormikComponentProps
> = props => {
  const nomChampNumeroActeOuOrdre = withNamespace(
    props.nomFiltre,
    NUMERO_ACTE_OU_ORDRE
  );
  const nomChampNumeroBisTer = withNamespace(props.nomFiltre, NUMERO_BIS_TER);
  const nomChampAPartirDe = withNamespace(props.nomFiltre, A_PARTIR_DE);

  const onInputNumeroActeOuOrdre = (e: React.ChangeEvent<HTMLInputElement>) => {
    traiteCarAutorises(e.target, digitSeulement);
    if (!e.target.value) {
      props.formik.setFieldValue(nomChampAPartirDe, false);
    }
  };

  const caseACocherAPartirDe = (
    <Checkbox
      inputProps={{ "aria-label": getLibelle("A partir de") }}
      name={nomChampAPartirDe}
      checked={props.formik.getFieldProps(nomChampAPartirDe).value}
      disabled={!props.formik.getFieldProps(nomChampNumeroActeOuOrdre).value}
      onChange={props.formik.handleChange}
    />
  );

  return (
    <div className="InputField">
      <div className="BlockInput TroisInputs">
        <label htmlFor={nomChampNumeroActeOuOrdre}>
          {getLibelle("N° d'acte / N° d'ordre")}
        </label>
        <Field
          component="input"
          name={nomChampNumeroActeOuOrdre}
          id={nomChampNumeroActeOuOrdre}
          aria-label={getLibelle("Numero d'acte ou d'ordre")}
          placeholder={getLibelle("N° d'acte ou d'ordre")}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
            onBlurChampNumero(e, props.formik)
          }
          onInput={onInputNumeroActeOuOrdre}
        />
        <Field
          component="input"
          name={nomChampNumeroBisTer}
          id={nomChampNumeroBisTer}
          aria-label={getLibelle("Numero BisTer")}
          placeholder={getLibelle("N° BisTer")}
          disabled={props.estInactifChampNumeroBisTer}
        />
        <FormControlLabel
          control={caseACocherAPartirDe}
          label={getLibelle("A partir de")}
        />
      </div>
    </div>
  );
};

export default connect(NumeroActeForm);
