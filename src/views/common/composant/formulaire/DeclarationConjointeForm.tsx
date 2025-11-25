import ETypeDeclarationConjointe from "@model/etatcivil/enum/ETypeDeclarationConjointe";
import { Option } from "@util/Type";
import { enumVersOptions, estRenseigne, premiereLettreEnMajuscule } from "@util/Utils";
import DateComposeForm, { DateComposeFormProps } from "@widget/formulaire/champsDate/DateComposeForm";
import { OptionVide, SelectField, SelectFieldProps } from "@widget/formulaire/champsSaisie/SelectField";
import { FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { ANNEE, DATE, JOUR, MOIS, TYPE } from "./ConstantesNomsForm";

interface ComponentFormProps {
  nom: string;
  type: keyof typeof ETypeDeclarationConjointe | null;
  date?: Date;
  origineTitulaireActe: boolean | null;
  saisieVerrouillee: boolean;
}

type DeclarationConjointeFormProps = ComponentFormProps & FormikComponentProps;

const DeclarationConjointeForm: React.FC<DeclarationConjointeFormProps> = props => {
  const [typeSelectionne, setTypeSelectionne] = useState<keyof typeof ETypeDeclarationConjointe | null>(props.type);

  const onTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const typeDeclaration: keyof typeof ETypeDeclarationConjointe = e.target.value as keyof typeof ETypeDeclarationConjointe;

      setTypeSelectionne(typeDeclaration);
      if (["ABSENCE_DECLARATION_VALIDEE", "ABSENCE_DECLARATION"].includes(typeDeclaration)) {
        initDateDeclaration(props);
      }
      props.formik.handleChange(e);
    },
    [props]
  );

  const selectFieldProps = {
    name: withNamespace(props.nom, TYPE),
    label: "Déclaration conjointe",
    options: typeDeclarationConjointeVersOptions(props.type),
    disabled: estDisabled(props.type, props.origineTitulaireActe ?? false) && props.saisieVerrouillee,
    optionVide: OptionVide.NON_PRESENTE,
    onChange: onTypeChange
  } as SelectFieldProps;

  const dateComposeFormProps = {
    labelDate: "Date de déclaration",
    nomDate: withNamespace(props.nom, DATE),
    showDatePicker: false,
    disabled: estDisabled(props.type, props.origineTitulaireActe ?? false) && estRenseigne(props.date) && props.saisieVerrouillee
  } as DateComposeFormProps;

  return (
    <div>
      <SelectField {...selectFieldProps} />
      {afficheDate(typeSelectionne) && <DateComposeForm {...dateComposeFormProps} />}
    </div>
  );
};

const initDateDeclaration = (props: React.PropsWithChildren<DeclarationConjointeFormProps>) => {
  props.formik.setFieldValue(withNamespace(withNamespace(props.nom, DATE), JOUR), "");
  props.formik.setFieldValue(withNamespace(withNamespace(props.nom, DATE), MOIS), "");
  props.formik.setFieldValue(withNamespace(withNamespace(props.nom, DATE), ANNEE), "");
};

const afficheDate = (type: keyof typeof ETypeDeclarationConjointe | null): boolean => {
  return Boolean(type && !["ABSENCE_DECLARATION_VALIDEE", "ABSENCE_DECLARATION"].includes(type));
};

const estDisabled = (type: keyof typeof ETypeDeclarationConjointe | null, origineTitulaireActe = false) => {
  return type === "ABSENCE_DECLARATION_VALIDEE" || (type !== "ABSENCE_DECLARATION" && type != null && !origineTitulaireActe);
};

const typeDeclarationConjointeVersOptions = (typeDeclaration: keyof typeof ETypeDeclarationConjointe | null): Option[] => {
  switch (typeDeclaration) {
    case "ABSENCE_DECLARATION_VALIDEE":
      return [
        {
          cle: "ABSENCE_DECLARATION_VALIDEE",
          libelle: premiereLettreEnMajuscule(ETypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE)
        }
      ];

    case "ABSENCE_DECLARATION":
      return enumVersOptions(ETypeDeclarationConjointe, { clesAExclure: ["ABSENCE_DECLARATION_VALIDEE"] });

    case "ADJONCTION_NOM":
    case "CHANGEMENT_NOM":
    case "CHOIX_NOM":
    case "INDETERMINE":
      return enumVersOptions(ETypeDeclarationConjointe, { clesAExclure: ["ABSENCE_DECLARATION_VALIDEE", "ABSENCE_DECLARATION"] });

    default:
      return enumVersOptions(ETypeDeclarationConjointe);
  }
};

export default connect<ComponentFormProps>(DeclarationConjointeForm);
