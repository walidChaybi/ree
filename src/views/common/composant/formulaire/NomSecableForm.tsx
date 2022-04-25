import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { ABSENCE_VALIDEE, estRenseigne, getLibelle } from "../../util/Utils";
import { CheckboxField } from "../../widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "../../widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "../../widget/formulaire/utils/FormUtil";
import { NOM_PARTIE1, NOM_PARTIE2, SECABLE } from "./ConstantesNomsForm";

interface ComponentFormProps {
  nom: string;
  nomPartie1?: string;
  nomPartie2?: string;
  origineTitulaireActe?: boolean;
}

type NomSecableFormProps = ComponentFormProps & FormikComponentProps;

const NomSecableForm: React.FC<NomSecableFormProps> = props => {
  const [afficheNomSecable, setAfficheNomSequable] = useState<boolean>(
    estRenseigne(props.nomPartie1)
  );
  const disabled = estDisabled(props.nomPartie1, props.origineTitulaireActe);

  const onCaseACocherNomSecableChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //Provoque un comportement inaproprié : e.preventDefault();
      setAfficheNomSequable(!afficheNomSecable);
      props.formik.setFieldValue(withNamespace(props.nom, NOM_PARTIE1), "");
      props.formik.setFieldValue(withNamespace(props.nom, NOM_PARTIE2), "");
      props.formik.handleChange(e);
    },
    [afficheNomSecable, props.formik, props.nom]
  );

  return (
    <div>
      <CheckboxField
        name={withNamespace(props.nom, SECABLE)}
        label={getLibelle("Nom sécable")}
        values={[{ str: "", value: "true" }]}
        disabled={disabled}
        onChange={onCaseACocherNomSecableChange}
      />
      {afficheNomSecable && (
        <InputField
          name={withNamespace(props.nom, NOM_PARTIE1)}
          label={getLibelle("1ère partie")}
          disabled={disabled}
        />
      )}
      {afficheNomSecable && (
        <InputField
          name={withNamespace(props.nom, NOM_PARTIE2)}
          label={getLibelle("2ème partie")}
          disabled={disabled}
        />
      )}
    </div>
  );
};

function estDisabled(nomPartie1?: string, origineTitulaireActe = false) {
  return !origineTitulaireActe || nomPartie1 === ABSENCE_VALIDEE;
}

export default connect<ComponentFormProps>(NomSecableForm);
