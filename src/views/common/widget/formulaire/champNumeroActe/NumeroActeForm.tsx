import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { connect, Field } from "formik";
import { digitSeulement, traiteCarAutorises } from "../utils/ControlesUtil";
import { ComponentFiltreProps, FormikComponentProps, onBlurChampNumero, withNamespace } from "../utils/FormUtil";

const NUMERO_ACTE = "numeroActe";
const NUMERO_BIS_TER = "numeroBisTer";
const A_PARTIR_DE = "aPartirDe";

export const NumeroActeDefaultValues = {
  [NUMERO_ACTE]: "",
  [NUMERO_BIS_TER]: "",
  [A_PARTIR_DE]: false
};

interface INumeroActeFormProps {
  estInactifChampNumeroBisTer: boolean;
}

type NumeroActeFormProps = INumeroActeFormProps & ComponentFiltreProps;

const NumeroActeForm: React.FC<NumeroActeFormProps & FormikComponentProps> = props => {
  const nomChampNumeroActeOuOrdre = withNamespace(props.nomFiltre, NUMERO_ACTE);
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
      inputProps={{ "aria-label": "A partir de" }}
      name={nomChampAPartirDe}
      checked={props.formik.getFieldProps(nomChampAPartirDe).value}
      disabled={!props.formik.getFieldProps(nomChampNumeroActeOuOrdre).value}
      onChange={props.formik.handleChange}
    />
  );

  return (
    <div className="InputField">
      <div className="BlockInput TroisInputs">
        <label htmlFor={nomChampNumeroActeOuOrdre}>{"N° d'acte / N° d'ordre"}</label>
        <Field
          component="input"
          name={nomChampNumeroActeOuOrdre}
          id={nomChampNumeroActeOuOrdre}
          aria-label={"Numéro d'acte ou d'ordre"}
          placeholder={"N° d'acte ou d'ordre"}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => onBlurChampNumero(e, props.formik)}
          onInput={onInputNumeroActeOuOrdre}
        />
        <Field
          component="input"
          name={nomChampNumeroBisTer}
          id={nomChampNumeroBisTer}
          aria-label={"Numéro BisTer"}
          placeholder={"N° BisTer"}
          disabled={props.estInactifChampNumeroBisTer}
        />
        <FormControlLabel
          control={caseACocherAPartirDe}
          label={"À partir de"}
        />
      </div>
    </div>
  );
};

export default connect(NumeroActeForm);
