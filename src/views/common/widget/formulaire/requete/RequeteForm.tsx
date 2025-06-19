import { COMPLEMENT_MOTIF, DOCUMENT_DEMANDE, MOTIF, NATURE_ACTE, NB_EXEMPLAIRE } from "@composant/formulaire/ConstantesNomsForm";
import { CodesExtraitCopie, DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Options } from "@util/Type";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  DOCUMENT_DEMANDE_OBLIGATOIRE,
  NATURE_ACTE_OBLIGATOIRE,
  NB_EXEMPLAIRE_MAXIMUM,
  NB_EXEMPLAIRE_MINIMUM,
  NB_EXEMPLAIRE_OBLIGATOIRE
} from "../FormulaireMessages";
import { SousFormulaire } from "../SousFormulaire";
import { InputField } from "../champsSaisie/InputField";
import { OptionVide, SelectField } from "../champsSaisie/SelectField";
import { NB_CARACT_MAX_SAISIE, SubFormProps, withNamespace } from "../utils/FormUtil";
import "./scss/RequeteForm.scss";

// Valeurs par défaut des champs
export const RequeteFormDefaultValues = {
  [NATURE_ACTE]: "NAISSANCE",
  [DOCUMENT_DEMANDE]: "",
  [NB_EXEMPLAIRE]: "1",
  [MOTIF]: MotifDelivrance.getKey(MotifDelivrance.NON_PRECISE_PAR_REQUERANT),
  [COMPLEMENT_MOTIF]: ""
};

const NB_EXEMPLAIRE_MAX = 5;

const LISTE_DOCUMENT_DEMANDE_DECES = [ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE, ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE];

// Schéma de validation des champs
export const RequeteFormValidationSchema = Yup.object()
  .shape({
    [NATURE_ACTE]: Yup.string().required(NATURE_ACTE_OBLIGATOIRE),
    [DOCUMENT_DEMANDE]: Yup.string().required(DOCUMENT_DEMANDE_OBLIGATOIRE),
    [NB_EXEMPLAIRE]: Yup.number()
      .min(1, NB_EXEMPLAIRE_MINIMUM)
      .max(NB_EXEMPLAIRE_MAX, NB_EXEMPLAIRE_MAXIMUM)
      .required(NB_EXEMPLAIRE_OBLIGATOIRE),
    [MOTIF]: Yup.string().notRequired(),
    [COMPLEMENT_MOTIF]: Yup.string()
  })
  .test("complementMotifObligatoire", function (value, error) {
    const motif = value[MOTIF] as string;
    const complementMotif = value[COMPLEMENT_MOTIF] as string;

    const paramsError = {
      path: `${error.path}.complementMotif`,
      message: 'La saisie d\'un complement motif est obligatoire pour un motif "Autre"'
    };
    return motif === "AUTRE" && complementMotif == null ? this.createError(paramsError) : true;
  });

const RequeteForm: React.FC<SubFormProps & { champDocumentDemandeCharge: boolean }> = props => {
  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    DocumentDelivrance.versOptionsDepuisCodes(CodesExtraitCopie)
  );

  const [complementMotifInactif, setComplementMotifInactif] = useState<boolean>(true);

  const onChangeNatureActeRequete = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    props.formik.setFieldValue(withNamespace(props.nom, NATURE_ACTE), e.target.value);
    if (e.target.value === "DECES") {
      setDocumentDemandeOptions(DocumentDelivrance.versOptionsDepuisCodes(LISTE_DOCUMENT_DEMANDE_DECES));
    } else {
      setDocumentDemandeOptions(DocumentDelivrance.versOptionsDepuisCodes(CodesExtraitCopie));
    }
  };

  const onChangeMotif = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplementMotifInactif(e.target.value !== "AUTRE");
    if (e.target.value !== "AUTRE") {
      props.formik.setFieldValue(withNamespace(props.nom, MOTIF), RequeteFormDefaultValues[MOTIF]);
    }
    props.formik.handleChange(e);
  };

  // initialiser dynamiquement le document demandé par défaut
  useEffect(() => {
    if (!props.champDocumentDemandeCharge)
      props.formik.setFieldValue(withNamespace(props.nom, DOCUMENT_DEMANDE), DocumentDelivrance.getCopieIntegraleUUID());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SousFormulaire titre={props.titre}>
      <div className="RequeteForm">
        {!props.formulaireReduit && (
          <>
            <SelectField
              name={withNamespace(props.nom, NATURE_ACTE)}
              label={"Nature d'acte concerné"}
              options={NatureActeRequete.getAllEnumsAsOptions()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChangeNatureActeRequete(e);
              }}
              optionVide={OptionVide.NON_PRESENTE}
            />
            <SelectField
              name={withNamespace(props.nom, DOCUMENT_DEMANDE)}
              label={"Document demandé"}
              options={documentDemandeOptions}
              optionVide={OptionVide.NON_PRESENTE}
            />
          </>
        )}
        <InputField
          name={withNamespace(props.nom, NB_EXEMPLAIRE)}
          label={"Nombre d'exemplaires"}
          typeInput={{ type: "number", min: 1, max: 5 }}
        />
        <SelectField
          name={withNamespace(props.nom, MOTIF)}
          label={"Motif"}
          options={MotifDelivrance.getAllEnumsAsOptions()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeMotif(e);
          }}
          optionVide={OptionVide.NON_PRESENTE}
        />
        {!complementMotifInactif && (
          <InputField
            name={withNamespace(props.nom, COMPLEMENT_MOTIF)}
            label={"Complément motif"}
            maxLength={NB_CARACT_MAX_SAISIE}
            disabled={complementMotifInactif}
          />
        )}
      </div>
    </SousFormulaire>
  );
};

export default connect(RequeteForm);
