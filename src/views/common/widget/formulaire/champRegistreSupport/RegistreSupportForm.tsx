import { getLibelle } from "@util/Utils";
import {
  ComponentFiltreProps,
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect, ErrorMessage, Field } from "formik";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";

export const SUPPORT_UN = "supportUn";
export const SUPPORT_DEUX = "supportDeux";

export const RegistreSupportDefaultValues = {
  [SUPPORT_UN]: "",
  [SUPPORT_DEUX]: ""
};

interface IRegistreSupportFormProps {
  estInactifChampSupportUn: boolean;
  estInactifChampSupportDeux: boolean;
}

export type RegistreSupportFormProps = IRegistreSupportFormProps &
  ComponentFiltreProps;

const RegistreSupportForm: React.FC<
  RegistreSupportFormProps & FormikComponentProps
> = props => {
  const nomChampSupportUn = withNamespace(props.nomFiltre, SUPPORT_UN);
  const nomChampSupportDeux = withNamespace(props.nomFiltre, SUPPORT_DEUX);

  return (
    <div className="InputField">
      <div className="BlockInput DeuxInputs">
        {
          <label htmlFor={nomChampSupportUn}>
            {getLibelle("Registre (support)")}
          </label>
        }
        <Field
          component="input"
          name={nomChampSupportUn}
          id={nomChampSupportUn}
          placeholder={getLibelle("Support 1")}
          aria-label={getLibelle("Support 1")}
          disabled={props.estInactifChampSupportUn}
        />
        <Field
          component="input"
          name={nomChampSupportDeux}
          id={nomChampSupportDeux}
          placeholder={getLibelle("Support 2")}
          aria-label={getLibelle("Support 2")}
          disabled={props.estInactifChampSupportDeux}
        />
      </div>
      <ErrorMessage component={IconErrorMessage} name={nomChampSupportUn} />
      <ErrorMessage component={IconErrorMessage} name={nomChampSupportDeux} />
    </div>
  );
};

export default connect(RegistreSupportForm);
