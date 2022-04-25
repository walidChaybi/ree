import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { TypeDeclarationConjointe } from "../../../../model/etatcivil/enum/TypeDeclarationConjointe";
import { getLibelle } from "../../util/Utils";
import DateComposeForm, {
  DateComposeFormProps
} from "../../widget/formulaire/champsDate/DateComposeForm";
import {
  SelectField,
  SelectFieldProps
} from "../../widget/formulaire/champsSaisie/SelectField";
import {
  FormikComponentProps,
  withNamespace
} from "../../widget/formulaire/utils/FormUtil";
import { DATE, TYPE } from "./ConstantesNomsForm";

interface ComponentFormProps {
  nom: string;
  type?: TypeDeclarationConjointe;
  origineTitulaireActe?: boolean;
}

type DeclarationConjointeFormProps = ComponentFormProps & FormikComponentProps;

const DeclarationConjointeForm: React.FC<
  DeclarationConjointeFormProps
> = props => {
  const [typeSelectionne, setTypeSelectionne] = useState<
    TypeDeclarationConjointe | undefined
  >(props.type);

  const onTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTypeSelectionne(TypeDeclarationConjointe.getEnumFor(e.target.value));
      props.formik.handleChange(e);
    },
    [props.formik]
  );

  const selectFieldProps = {
    name: withNamespace(props.nom, TYPE),
    label: getLibelle("Déclaration conjointe"),
    options: TypeDeclarationConjointe.getAllEnumsAsOptions(props.type),
    disabled: estDisabled(props.type, props.origineTitulaireActe),
    pasPremiereOptionVide: true,
    onChange: onTypeChange
  } as SelectFieldProps;

  const dateComposeFormProps = {
    labelDate: "Date de déclaration",
    nomDate: withNamespace(props.nom, DATE),
    showDatePicker: false,
    disabled: estDisabled(props.type, props.origineTitulaireActe)
  } as DateComposeFormProps;

  return (
    <div>
      <SelectField {...selectFieldProps} />
      {afficheDate(typeSelectionne) && (
        <DateComposeForm {...dateComposeFormProps} />
      )}
    </div>
  );
};

function afficheDate(type?: TypeDeclarationConjointe) {
  return (
    type != null &&
    type !== TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE &&
    type !== TypeDeclarationConjointe.ABSENCE_DECLARATION
  );
}

function estDisabled(
  type?: TypeDeclarationConjointe,
  origineTitulaireActe = false
) {
  return (
    type === TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE ||
    (type !== TypeDeclarationConjointe.ABSENCE_DECLARATION &&
      type != null &&
      !origineTitulaireActe)
  );
}

export default connect<ComponentFormProps>(DeclarationConjointeForm);
