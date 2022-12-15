import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { enMajuscule } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import {
  InputField,
  InputFieldProps
} from "@widget/formulaire/champsSaisie/InputField";
import { sortieChampSupprimerEspacesInutiles } from "@widget/formulaire/utils/ControlesUtil";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "./scss/InputFieldAvecBoutonMajuscule.scss";

type InputFieldAvecBoutonMajusculeProps = InputFieldProps & {
  boutons?: JSX.Element | false;
};

type BoutonChampEnMajusculeProps = FormikComponentProps &
  Pick<InputFieldProps, "name">;

const BoutonChampEnMajuscule: React.FC<BoutonChampEnMajusculeProps> = props => {
  const champEnMajuscule = () => {
    const valeurChamp = props.formik.getFieldProps(props.name).value;

    props.formik.setFieldValue(props.name, enMajuscule(valeurChamp));
  };

  return (
    <Bouton
      data-testid="BoutonChampEnMajuscule"
      onClick={champEnMajuscule}
      aria-label="Bouton passer le champ en majuscule"
    >
      <FontAwesomeIcon icon={faTextHeight} />
    </Bouton>
  );
};

const InputFieldAvecBoutonMajuscule: React.FC<
  InputFieldAvecBoutonMajusculeProps & FormikComponentProps
> = props => {
  return (
    <div className="InputFieldMajuscule">
      <InputField
        {...props}
        onBlur={e =>
          sortieChampSupprimerEspacesInutiles(e, props.formik, props.name)
        }
      />
      <div className="BoutonsConteneur">
        <BoutonChampEnMajuscule {...props} />
      </div>
    </div>
  );
};

export default connect<InputFieldAvecBoutonMajusculeProps>(
  InputFieldAvecBoutonMajuscule
);
