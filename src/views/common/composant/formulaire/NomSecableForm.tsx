import { ABSENCE_VALIDEE, DEUX, getLibelle, UN, ZERO } from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { MessageAvertissement } from "@widget/formulaire/erreur/MessageAvertissement";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback } from "react";
import { NOM_PARTIE1, NOM_PARTIE2, SECABLE } from "./ConstantesNomsForm";

interface ComponentFormProps {
  nomComposant: string;
  nomTitulaire?: string;
  origineTitulaireActe?: boolean;
  saisieVerrouillee: boolean;
  afficherAvertissementVocable?: boolean;
}

type NomSecableFormProps = ComponentFormProps & FormikComponentProps;

const NomSecableForm: React.FC<NomSecableFormProps> = props => {
  const disabled =
    estDisabled(
      props.formik.getFieldProps(withNamespace(props.nomComposant, NOM_PARTIE1))
        .value,
      props.origineTitulaireActe
    ) && props.saisieVerrouillee;

  const afficherMessageAvertissement =
    props.afficherAvertissementVocable &&
    EtatCivilUtil.getVocables(props.nomTitulaire).length > DEUX;

  const onCaseACocherNomSecableChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //Provoque un comportement inaproprié : e.preventDefault();

      let nomPartie1 = "";
      let nomPartie2 = "";

      // Décompositon du nom du titulaire AM lorsqu'il n'y a deux vocables dans son nom
      if (e.target.checked) {
        const vocables = EtatCivilUtil.getVocables(props.nomTitulaire);
        if (vocables.length > UN) {
          nomPartie1 = vocables[ZERO];
          nomPartie2 = vocables.slice(UN).join(" ");
        }
      }

      props.formik.setFieldValue(
        withNamespace(props.nomComposant, NOM_PARTIE1),
        nomPartie1
      );
      props.formik.setFieldValue(
        withNamespace(props.nomComposant, NOM_PARTIE2),
        nomPartie2
      );

      props.formik.handleChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.formik, props.nomComposant]
  );

  return (
    <div>
      <CheckboxField
        name={withNamespace(props.nomComposant, SECABLE)}
        label={getLibelle("Nom sécable")}
        values={[{ libelle: "", cle: "true" }]}
        disabled={disabled}
        onChange={onCaseACocherNomSecableChange}
      />
      {props.formik.getFieldProps(withNamespace(props.nomComposant, SECABLE))
        .value.length > 0 && (
        <>
          <InputField
            name={withNamespace(props.nomComposant, NOM_PARTIE1)}
            label={getLibelle("1re partie")}
            disabled={disabled}
          />
          <div className="AvertissementConteneur">
            <InputField
              name={withNamespace(props.nomComposant, NOM_PARTIE2)}
              label={getLibelle("2nde partie")}
              disabled={disabled}
            />
            <MessageAvertissement
              afficherMessage={afficherMessageAvertissement || false}
            >
              {getLibelle("Nom avec plus de deux vocables")}
            </MessageAvertissement>
          </div>
        </>
      )}
    </div>
  );
};

function estDisabled(nomPartie1?: string, origineTitulaireActe = false) {
  return !origineTitulaireActe || nomPartie1 === ABSENCE_VALIDEE;
}

export default connect<ComponentFormProps>(NomSecableForm);
