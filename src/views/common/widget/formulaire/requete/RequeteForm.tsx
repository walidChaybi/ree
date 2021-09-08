import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  DocumentDemande,
  LISTE_DOCUMENT_DEMANDE_DECES
} from "../../../../../model/requete/v2/enum/DocumentDemande";
import { MotifDelivrance } from "../../../../../model/requete/v2/enum/MotifDelivrance";
import { TypeNatureActe } from "../../../../../model/requete/v2/enum/TypeNatureActe";
import {
  COMPLEMENT_MOTIF,
  DOCUMENT_DEMANDE,
  MOTIF,
  NATURE_ACTE,
  NB_EXEMPLAIRE
} from "../../../../pages/saisirRequete/modelForm/ISaisirRequetePageModel";
import { Options } from "../../../util/Type";
import { getLibelle } from "../../Text";
import { InputField } from "../champsSaisie/InputField";
import { SelectField } from "../champsSaisie/SelectField";
import {
  DOCUMENT_DEMANDE_OBLIGATOIRE,
  NATURE_ACTE_OBLIGATOIRE,
  NB_EXEMPLAIRE_MAXIMUM,
  NB_EXEMPLAIRE_MINIMUM,
  NB_EXEMPLAIRE_OBLIGATOIRE
} from "../FormulaireMessages";
import { SousFormulaire } from "../SousFormulaire";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../utils/FormUtil";
import "./scss/RequeteForm.scss";

// Valeurs par défaut des champs
export const RequeteFormDefaultValues = {
  [NATURE_ACTE]: "",
  [DOCUMENT_DEMANDE]: "",
  [NB_EXEMPLAIRE]: "1",
  [MOTIF]: "",
  [COMPLEMENT_MOTIF]: ""
};

const NB_EXEMPLAIRE_MAX = 5;

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
      message: getLibelle(
        'La saisie d\'un complement motif est obligatoire pour un motif "Autre"'
      )
    };
    return motif === "AUTRE" && complementMotif == null
      ? this.createError(paramsError)
      : true;
  });

const RequeteForm: React.FC<SubFormProps> = props => {
  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    DocumentDemande.getAllEnumsAsOptions()
  );

  const [complementMotifInactif, setComplementMotifInactif] =
    useState<boolean>(true);

  const onChangeTypeNatureActe = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    props.formik.setFieldValue(
      withNamespace(props.nom, NATURE_ACTE),
      e.target.value
    );
    if (e.target.value === "DECES") {
      setDocumentDemandeOptions(
        DocumentDemande.getListEnumsAsOptions(LISTE_DOCUMENT_DEMANDE_DECES)
      );
    } else {
      setDocumentDemandeOptions(DocumentDemande.getAllEnumsAsOptions());
    }
  };

  const onChangeMotif = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplementMotifInactif(e.target.value !== "AUTRE");
    if (e.target.value !== "AUTRE") {
      props.formik.setFieldValue(
        withNamespace(props.nom, MOTIF),
        RequeteFormDefaultValues[MOTIF]
      );
    }
    props.formik.handleChange(e);
  };

  return (
    <>
      <SousFormulaire titre={props.titre}>
        <div className="RequeteForm">
          {!props.formulaireReduit && (
            <>
              <SelectField
                name={withNamespace(props.nom, NATURE_ACTE)}
                label={getLibelle("Nature d'acte concerné")}
                options={TypeNatureActe.getAllEnumsAsOptions()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeTypeNatureActe(e);
                }}
              />
              <SelectField
                name={withNamespace(props.nom, DOCUMENT_DEMANDE)}
                label={getLibelle("Document demandé")}
                options={documentDemandeOptions}
              />
            </>
          )}
          <InputField
            name={withNamespace(props.nom, NB_EXEMPLAIRE)}
            label={getLibelle("Nombre d'exemplaires")}
            typeInput={{ type: "number", min: 1, max: 5 }}
          />
          <SelectField
            name={withNamespace(props.nom, MOTIF)}
            label={getLibelle("Motif")}
            options={MotifDelivrance.getAllEnumsAsOptions()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChangeMotif(e);
            }}
            pasPremiereOptionVide={props.formulaireReduit}
          />
          {!complementMotifInactif && (
            <InputField
              name={withNamespace(props.nom, COMPLEMENT_MOTIF)}
              label={getLibelle("Complément motif")}
              maxLength={NB_CARACT_MAX_SAISIE}
              disabled={complementMotifInactif}
            />
          )}
        </div>
      </SousFormulaire>
    </>
  );
};

export default connect(RequeteForm);
