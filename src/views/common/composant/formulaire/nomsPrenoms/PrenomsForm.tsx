import { creerPlageDeNombres, getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  CARATERES_AUTORISES_MESSAGE,
  CHAMP_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import {
  IGNORER_TABULATION,
  INomForm,
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../ressources/Regex";
import "./scss/PrenomsForm.scss";

const MAX_PRENOMS = 12;
interface IPrenomsFormProps {
  nbPrenoms?: number;
  prenom1Obligatoire?: boolean;
  onPrenomChange?: () => void;
  onPrenomBlur?: (
    indexPrenomAPartirDeUn: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export function genererDefaultValuesPrenoms() {
  const prenomsObj: any = {};
  for (let i = 1; i <= MAX_PRENOMS; i++) {
    prenomsObj[`prenom${i}`] = "";
  }
  return prenomsObj;
}

export function creerValidationSchemaPrenom() {
  const schemaValidation: { [key: string]: any } = {};
  for (let i = 1; i <= MAX_PRENOMS; i++) {
    schemaValidation[`prenom${i}`] = Yup.string()
      .nullable()
      .matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE);
    if (i !== MAX_PRENOMS) {
      schemaValidation[`prenom${i}`] = schemaValidation[`prenom${i}`].when(
        `prenom${i + 1}`,
        (prenomSuivant: string, schema: any) => {
          return prenomSuivant
            ? schema.required(`La saisie du Prénom ${i} est obligatoire`)
            : schema;
        }
      );
    }
  }

  return Yup.object(schemaValidation);
}

export type PrenomFormProps = IPrenomsFormProps & SubFormProps;

const PrenomsForm: React.FC<PrenomFormProps> = props => {
  const [nbPrenoms, setNbPrenoms] = useState(1);
  const [nbPrenomInitialise, setNbPrenomInitialise] = useState<boolean>(false);

  useEffect(() => {
    if (!nbPrenomInitialise && props.nbPrenoms) {
      setNbPrenoms(props.nbPrenoms);
      setNbPrenomInitialise(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nbPrenoms]);

  const handleAjouterPrenom = () => {
    if (nbPrenoms < MAX_PRENOMS) {
      setNbPrenoms(nbPrenoms + 1);
    }
  };

  const handleAnnulerSaisie = (champ: string) => {
    setNbPrenoms(nbPrenoms - 1);
    props.formik.setFieldValue(champ, "");
  };

  function construireNomChamp(index: number) {
    const prenom = `prenom${index + 1}`;
    return withNamespace(props.nom, prenom);
  }

  const plageDeNombres = creerPlageDeNombres(nbPrenoms);

  return (
    <>
      {plageDeNombres.map((v: any, index: number) => (
        <div key={index} className="PrenomsForm">
          <InputField
            label={getLibelle(`Prénom ${index + 1}`)}
            maxLength={NB_CARACT_MAX_SAISIE}
            name={construireNomChamp(index)}
            onChange={e => props.formik.handleChange(e)}
            onBlur={e =>
              props.onPrenomBlur &&
              props.onPrenomBlur(Number(`${index + 1}`), e)
            }
            disabled={props.disabled}
            validate={(value: string) => {
              return !value && props.prenom1Obligatoire === true
                ? CHAMP_OBLIGATOIRE
                : undefined;
            }}
          />
          {!props.disabled && (
            <div className="BoutonsConteneur">
              {index === nbPrenoms - 1 && nbPrenoms < MAX_PRENOMS && (
                <button type="button" onClick={handleAjouterPrenom}>
                  {getLibelle("Ajouter prénom")}
                </button>
              )}
              {index === nbPrenoms - 1 && nbPrenoms > 1 && (
                <button
                  type="button"
                  tabIndex={IGNORER_TABULATION}
                  className="BoutonDanger"
                  onClick={() => handleAnnulerSaisie(construireNomChamp(index))}
                >
                  {getLibelle("Annuler saisie")}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default connect<IPrenomsFormProps & INomForm>(PrenomsForm);
