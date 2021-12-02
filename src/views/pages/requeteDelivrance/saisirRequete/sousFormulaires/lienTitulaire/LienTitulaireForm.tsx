import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../../../common/widget/formulaire/champsSaisie/SelectField";
import { SousFormulaire } from "../../../../../common/widget/formulaire/SousFormulaire";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import { LIEN, NATURE_LIEN } from "../../modelForm/ISaisirRequetePageModel";
import "./scss/LienTitulaireForm.scss";

// Valeurs par défaut des champs
export const LienTitulaireFormDefaultValues = {
  [LIEN]: "TITULAIRE",
  [NATURE_LIEN]: ""
};

// Schéma de validation des champs
export const LienTitulaireFormValidationSchema = Yup.object()
  .shape({
    [LIEN]: Yup.string(),
    [NATURE_LIEN]: Yup.string()
  })
  .test("natureObligatoire", function (value, error) {
    const lienTitulaire = value[LIEN] as string;
    const natureLien = value[NATURE_LIEN] as string;

    const paramsError = {
      path: `${error.path}.natureLien`,
      message: getLibelle(
        'La saisie d\'une Nature du lien est obligatoire pour un Lien titulaire "Autre"'
      )
    };
    return lienTitulaire === "AUTRE" && natureLien == null
      ? this.createError(paramsError)
      : true;
  });

const LienTitulaireForm: React.FC<SubFormProps> = props => {
  const [lienInactif, setLienInactif] = useState<boolean>(false);
  const [natureInactif, setNatureInactif] = useState<boolean>(true);

  const onChangeLienTitulaire = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNatureInactif(e.target.value !== "AUTRE");
    if (e.target.value !== "AUTRE") {
      props.formik.setFieldValue(
        withNamespace(props.nom, NATURE_LIEN),
        LienTitulaireFormDefaultValues[NATURE_LIEN]
      );
    }
    props.formik.handleChange(e);
  };

  useEffect(() => {
    if (props.reset) {
      props.formik.setFieldValue(props.nom, LienTitulaireFormDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset]);

  useEffect(() => {
    const seulementTitulaire =
      props.options.length === 1 && props.options[0].value === "TITULAIRE";
    if (seulementTitulaire) {
      props.formik.setFieldValue(
        withNamespace(props.nom, LIEN),
        LienTitulaireFormDefaultValues[LIEN]
      );
    }
    setLienInactif(seulementTitulaire);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options]);

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="LienTitulaireForm">
          <SelectField
            name={withNamespace(props.nom, LIEN)}
            label={getLibelle("Lien avec le titulaire")}
            options={props.options}
            onChange={e => {
              onChangeLienTitulaire(e);
            }}
            disabled={lienInactif}
          />
          {!natureInactif && (
            <InputField
              name={withNamespace(props.nom, NATURE_LIEN)}
              label={getLibelle("Nature du lien")}
              maxLength={NB_CARACT_MAX_SAISIE}
              disabled={natureInactif}
            />
          )}
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(LienTitulaireForm);
