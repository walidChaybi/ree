import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { estRenseigne, getLibelle } from "@util/Utils";
import DateComposeForm, {
  DateComposeFormProps
} from "@widget/formulaire/champsDate/DateComposeForm";
import {
  OptionVide,
  SelectField,
  SelectFieldProps
} from "@widget/formulaire/champsSaisie/SelectField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { ANNEE, DATE, JOUR, MOIS, TYPE } from "./ConstantesNomsForm";

interface ComponentFormProps {
  nom: string;
  type?: TypeDeclarationConjointe;
  date?: Date;
  origineTitulaireActe?: boolean;
  saisieVerrouillee: boolean;
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
      const typeDeclaration = TypeDeclarationConjointe.getEnumFor(
        e.target.value
      );
      setTypeSelectionne(TypeDeclarationConjointe.getEnumFor(typeDeclaration));
      if (TypeDeclarationConjointe.estAbsenceDeclaration(typeDeclaration)) {
        initDateDeclaration(props);
      }
      props.formik.handleChange(e);
    },
    [props]
  );

  const selectFieldProps = {
    name: withNamespace(props.nom, TYPE),
    label: getLibelle("Déclaration conjointe"),
    options: TypeDeclarationConjointe.getAllEnumsAsOptions(props.type),
    disabled:
      estDisabled(props.type, props.origineTitulaireActe) &&
      props.saisieVerrouillee,
    optionVide: OptionVide.NON_PRESENTE,
    onChange: onTypeChange
  } as SelectFieldProps;

  const dateComposeFormProps = {
    labelDate: "Date de déclaration",
    nomDate: withNamespace(props.nom, DATE),
    showDatePicker: false,
    disabled:
      estDisabled(props.type, props.origineTitulaireActe) &&
      estRenseigne(props.date) &&
      props.saisieVerrouillee
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

function initDateDeclaration(
  props: React.PropsWithChildren<DeclarationConjointeFormProps>
) {
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

function afficheDate(type?: TypeDeclarationConjointe) {
  return type != null && !TypeDeclarationConjointe.estAbsenceDeclaration(type);
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
