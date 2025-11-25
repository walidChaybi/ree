import { creerPlageDeNombres, QUINZE, UN, ZERO } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { CARACTERES_AUTORISES_MESSAGE, CHAMP_OBLIGATOIRE } from "@widget/formulaire/FormulaireMessages";
import { IGNORER_TABULATION, INomForm, NB_CARACT_MAX_SAISIE, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../ressources/Regex";
import "./scss/PrenomsForm.scss";

const MAX_PRENOMS = QUINZE;
export interface IPrenomsFormProps {
  nbPrenoms?: number;
  nbPrenomsAffiche?: number;
  prenom1Obligatoire?: boolean;
  onNbPrenomChange?: (prenomAjoute: boolean) => void;
  onPrenomChange?: () => void;
  onPrenomBlur?: (indexPrenomAPartirDeUn: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

enum TypeDeValeursParDefaut {
  UNDEFINED = "UNDEFINED",
  VIDE = "VIDE"
}

export const genererDefaultValuesPrenoms = (typeDeValeurParDefaut?: string) => {
  const prenomsObj: any = {};
  for (let i = 1; i <= MAX_PRENOMS; i++) {
    prenomsObj[`prenom${i}`] = typeDeValeurParDefaut === TypeDeValeursParDefaut.UNDEFINED ? undefined : "";
  }
  return prenomsObj;
};

export const creerValidationSchemaPrenom = () => {
  const schemaValidation: { [key: string]: any } = {};
  for (let i = UN; i <= MAX_PRENOMS; i++) {
    schemaValidation[`prenom${i}`] = Yup.string().nullable().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE);
    if (i !== MAX_PRENOMS) {
      schemaValidation[`prenom${i}`] = schemaValidation[`prenom${i}`].when(`prenom${i + UN}`, (prenomSuivant: string, schema: any) => {
        return prenomSuivant ? schema.required(`La saisie du Prénom ${i} est obligatoire`) : schema;
      });
    }
  }

  return Yup.object(schemaValidation);
};

export const creerValidationSchemaPrenomParent = () => {
  const schemaValidation: { [key: string]: any } = {};
  for (let i = UN; i <= MAX_PRENOMS; i++) {
    const prenomClef = `prenom${i}`;
    schemaValidation[`prenom${i}`] = Yup.string().nullable().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE);
    if (i !== MAX_PRENOMS) {
      schemaValidation[prenomClef] = schemaValidation[prenomClef].when(`prenom${i + UN}`, (prenomSuivant: string, schema: any) => {
        return schema;
      });
    }
  }

  return Yup.object(schemaValidation);
};

type PrenomFormProps = IPrenomsFormProps & SubFormProps;

const PrenomsForm: React.FC<PrenomFormProps> = props => {
  const [nbPrenoms, setNbPrenoms] = useState(1);
  const [nbPrenomEnregistre, setNbPrenomEnregistre] = useState(0);

  useEffect(() => {
    if (props.nbPrenoms != null) {
      if (props.nbPrenomsAffiche != null && props.nbPrenomsAffiche > props.nbPrenoms) {
        setNbPrenoms(props.nbPrenomsAffiche);
      } else if (props.nbPrenoms > ZERO) {
        setNbPrenoms(props.nbPrenoms);
      }
      setNbPrenomEnregistre(props.nbPrenoms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nbPrenoms, props.nbPrenomsAffiche]);

  const handleAjouterPrenom = () => {
    if (nbPrenoms < MAX_PRENOMS) {
      setNbPrenoms(nbPrenoms + 1);
      if (props.onNbPrenomChange) {
        props.onNbPrenomChange(true);
      }
    }
  };

  const handleAnnulerSaisie = (champ: string) => {
    if (nbPrenoms > nbPrenomEnregistre || !props.disabled) {
      setNbPrenoms(nbPrenoms - 1);
      props.formik.setFieldValue(champ, "");
      if (props.onNbPrenomChange) {
        props.onNbPrenomChange(false);
      }
    }
  };

  const construireNomChamp = (index: number) => {
    const prenom = `prenom${index + 1}`;
    return withNamespace(props.nom, prenom);
  };

  const plageDeNombres = creerPlageDeNombres(nbPrenoms);

  return (
    <>
      {plageDeNombres.map((v: any, index: number) => (
        <div
          key={index}
          className="PrenomsForm"
        >
          <InputField
            label={nbPrenoms === 1 ? "Prénom" : `Prénom ${index + 1}`}
            maxLength={NB_CARACT_MAX_SAISIE}
            name={construireNomChamp(index)}
            onChange={(e: any) => props.formik.handleChange(e)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => props.onPrenomBlur && props.onPrenomBlur(Number(`${index + 1}`), e)}
            disabled={index + 1 > nbPrenomEnregistre ? false : props.disabled}
            validate={(value: string) => {
              return !value && props.prenom1Obligatoire === true ? CHAMP_OBLIGATOIRE : undefined;
            }}
          />
          <div className="BoutonsConteneur">
            {index === nbPrenoms - 1 && nbPrenoms < MAX_PRENOMS && (
              <button
                type="button"
                onClick={handleAjouterPrenom}
              >
                {"Ajouter prénom"}
              </button>
            )}
            {index === nbPrenoms - 1 && nbPrenoms > 1 && (
              <button
                type="button"
                tabIndex={IGNORER_TABULATION}
                className="BoutonDanger"
                onClick={() => handleAnnulerSaisie(construireNomChamp(index))}
              >
                {"Annuler saisie"}
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default connect<IPrenomsFormProps & INomForm>(PrenomsForm);
