import { ABSENCE_VALIDEE, DEUX, getLibelle, UN, ZERO } from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { MessageAvertissement } from "@widget/formulaire/erreur/MessageAvertissement";
import { FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback } from "react";
import { NOM_PARTIE1, NOM_PARTIE2, SECABLE } from "./ConstantesNomsForm";

export interface ComponentFormProps {
  nomComposant: string;
  nomTitulaire?: string;
  origineTitulaireActe?: boolean;
  saisieVerrouillee: boolean;
  afficherAvertissementVocable?: boolean;
}

type NomSecableFormProps = ComponentFormProps & FormikComponentProps;

const NomSecableForm: React.FC<NomSecableFormProps> = ({
  formik,
  nomComposant,
  origineTitulaireActe,
  saisieVerrouillee,
  afficherAvertissementVocable,
  nomTitulaire
}) => {
  const disabled =
    estDisabled(formik.getFieldProps(withNamespace(nomComposant, NOM_PARTIE1)).value, origineTitulaireActe) && saisieVerrouillee;

  const afficherMessageAvertissement = afficherAvertissementVocable && EtatCivilUtil.getVocables(nomTitulaire).length > DEUX;

  const onCaseACocherNomSecableChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //Provoque un comportement inaproprié : e.preventDefault();

      let nomPartie1 = "";
      let nomPartie2 = "";

      // Décompositon du nom du titulaire AM lorsqu'il n'y a deux vocables dans son nom
      if (e.target.checked) {
        const vocables = EtatCivilUtil.getVocables(nomTitulaire);
        if (vocables.length > UN) {
          nomPartie1 = vocables[ZERO];
          nomPartie2 = vocables.slice(UN).join(" ");
        }
      }

      formik.setFieldValue(withNamespace(nomComposant, NOM_PARTIE1), nomPartie1);
      formik.setFieldValue(withNamespace(nomComposant, NOM_PARTIE2), nomPartie2);

      formik.handleChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik, nomComposant]
  );

  return (
    <div>
      <CheckboxField
        name={withNamespace(nomComposant, SECABLE)}
        label={getLibelle("Nom sécable")}
        values={[{ libelle: "", cle: "true" }]}
        disabled={disabled}
        onChange={onCaseACocherNomSecableChange}
      />
      {formik.getFieldProps(withNamespace(nomComposant, SECABLE)).value.length > 0 && (
        <>
          <InputField
            name={withNamespace(nomComposant, NOM_PARTIE1)}
            label={getLibelle("1re partie")}
            disabled={disabled}
          />
          <div className="AvertissementConteneur">
            <InputField
              name={withNamespace(nomComposant, NOM_PARTIE2)}
              label={getLibelle("2nde partie")}
              disabled={disabled}
            />
            <MessageAvertissement afficherMessage={afficherMessageAvertissement || false}>
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
