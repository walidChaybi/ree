import { getLibelle } from "@util/Utils";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import {
  INomForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { PAS_DE_PRENOM_CONNU, PRENOMS } from "../ConstantesNomsForm";
import PrenomsForm, {
  creerValidationSchemaPrenom,
  genererDefaultValuesPrenoms,
  IPrenomsFormProps
} from "./PrenomsForm";

export const PrenomsConnusValidationSchema = Yup.object()
  .shape({
    [PRENOMS]: creerValidationSchemaPrenom()
  })
  .test("prenom1ConnuObligatoire", function (value, error) {
    const prenom1 = value[PRENOMS].prenom1 as string;
    const pasDePrenomConnuCoche = value[PAS_DE_PRENOM_CONNU] !== "false";

    const paramsError = {
      path: `${error.path}.prenoms.prenom1`,
      message: getLibelle("La saisie d'un prénom est obligatoire")
    };
    return !pasDePrenomConnuCoche && !prenom1
      ? this.createError(paramsError)
      : true;
  });

interface IPrenomsConnusFormProps {
  libelleAucunPrenom: string;
  pasDePrenomConnu: boolean;
}

type PrenomsConnusFormProps = IPrenomsConnusFormProps &
  IPrenomsFormProps &
  SubFormProps;

const PrenomsConnusForm: React.FC<PrenomsConnusFormProps> = props => {
  const [pasDePrenomConnu, setPasDePrenomConnu] = useState<boolean>(false);
  const [nbPrenoms, setNbPrenoms] = useState<number | undefined>(
    props.nbPrenoms
  );

  useEffect(() => {
    setPasDePrenomConnu(props.pasDePrenomConnu);
  }, [props.pasDePrenomConnu]);

  function onChangePasDePrenomConnu(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPasDePrenomConnu(true);
      reinitialiserPrenoms();
      props.formik.handleChange(e);
    } else {
      setPasDePrenomConnu(false);
      props.formik.handleChange(e);
      props.formik.setFieldValue(
        withNamespace(props.nom, PAS_DE_PRENOM_CONNU),
        "false"
      );
    }
  }

  function reinitialiserPrenoms() {
    const pathPrenomsAReinitialiser = withNamespace(props.nom, PRENOMS);
    props.formik.setFieldValue(
      pathPrenomsAReinitialiser,
      genererDefaultValuesPrenoms()
    );
    setNbPrenoms(0);
  }

  return (
    <>
      <CheckboxField
        name={withNamespace(props.nom, PAS_DE_PRENOM_CONNU)}
        label={props.libelleAucunPrenom}
        values={[{ libelle: "", cle: PAS_DE_PRENOM_CONNU }]}
        disabled={props.disabled}
        onChange={onChangePasDePrenomConnu}
      />
      {!pasDePrenomConnu && (
        <PrenomsForm
          nom={withNamespace(props.nom, PRENOMS)}
          disabled={props.disabled}
          nbPrenoms={nbPrenoms}
          nbPrenomsAffiche={props.nbPrenomsAffiche}
          prenom1Obligatoire={props.prenom1Obligatoire}
          onNbPrenomChange={props.onNbPrenomChange}
          onPrenomChange={props.onPrenomChange}
          onPrenomBlur={props.onPrenomBlur}
        />
      )}
    </>
  );
};

export default connect<IPrenomsConnusFormProps & IPrenomsFormProps & INomForm>(
  PrenomsConnusForm
);
