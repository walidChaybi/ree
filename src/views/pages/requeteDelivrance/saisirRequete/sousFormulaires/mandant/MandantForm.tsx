import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { TypeMandant } from "../../../../../../model/requete/enum/TypeMandant";
import { getLibelle } from "../../../../../common/util/Utils";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import { RadioField } from "../../../../../common/widget/formulaire/champsSaisie/RadioField";
import { SousFormulaire } from "../../../../../common/widget/formulaire/SousFormulaire";
import {
  sortieChampEnMajuscule,
  sortieChampPremiereLettreEnMajuscule
} from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import {
  NOM,
  PRENOM,
  RAISON_SOCIALE,
  TYPE_MANDANT
} from "../../modelForm/ISaisirRequetePageModel";
import "./scss/MandantForm.scss";

// Valeurs par défaut des champs
export const MandantFormDefaultValues = {
  [TYPE_MANDANT]: "PERSONNE_PHYSIQUE",
  [RAISON_SOCIALE]: "",
  [NOM]: "",
  [PRENOM]: ""
};

// Schéma de validation des champs
export const MandantFormValidationSchema = Yup.object().shape({
  [TYPE_MANDANT]: Yup.string(),
  [RAISON_SOCIALE]: Yup.string(),
  [NOM]: Yup.string(),
  [PRENOM]: Yup.string()
});

const MandantForm: React.FC<SubFormProps> = props => {
  const typeMandantWithNamespace = withNamespace(props.nom, TYPE_MANDANT);
  const raisonSocialeWithNamespace = withNamespace(props.nom, RAISON_SOCIALE);
  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);
  const [raisonSocialeVisible, setRaisonSocialeVisible] = useState<boolean>(
    false
  );

  const onChangeRequerant = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.formik.setFieldValue(typeMandantWithNamespace, e.target.value);
    props.formik.setFieldValue(nomWithNamespace, "");
    props.formik.setFieldValue(prenomWithNamespace, "");
    props.formik.setFieldValue(raisonSocialeWithNamespace, "");
    setRaisonSocialeVisible(e.target.value === "PERSONNE_MORALE");
    props.formik.handleChange(e);
  };

  useEffect(() => {
    if (props.reset) {
      props.formik.setFieldValue(props.nom, MandantFormDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset]);

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="MandantForm">
          <RadioField
            name={typeMandantWithNamespace}
            label={getLibelle("Mandant")}
            values={TypeMandant.getAllEnumsAsOptions()}
            onChange={e => {
              onChangeRequerant(e);
            }}
          />
          {raisonSocialeVisible && (
            <InputField
              name={raisonSocialeWithNamespace}
              label={getLibelle("Raison Sociale")}
              maxLength={NB_CARACT_MAX_SAISIE}
            />
          )}
          <InputField
            name={nomWithNamespace}
            label={getLibelle("Nom")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampEnMajuscule(e, props.formik, nomWithNamespace)
            }
          />
          <InputField
            name={prenomWithNamespace}
            label={getLibelle("Prénom")}
            maxLength={NB_CARACT_MAX_SAISIE}
            onBlur={e =>
              sortieChampPremiereLettreEnMajuscule(
                e,
                props.formik,
                prenomWithNamespace
              )
            }
          />
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(MandantForm);
