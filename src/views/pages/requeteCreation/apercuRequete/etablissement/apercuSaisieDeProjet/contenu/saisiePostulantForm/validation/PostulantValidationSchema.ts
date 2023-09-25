import {
  ACQUISITION,
  ADRESSE,
  ANALYSE_MARGINALE,
  ARRONDISSEMENT,
  ARRONDISSEMENT_NAISSANCE,
  AUTRES,
  AUTRE_DECLARANT,
  DATE,
  DATE_NAISSANCE,
  DECLARANT,
  DEPARTEMENT,
  DEPARTEMENT_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  LIEU_DE_NAISSANCE,
  LIEU_NAISSANCE,
  NATURE,
  NE_DANS_MARIAGE,
  NOM,
  NOM_SECABLE,
  PARENTS,
  PAYS,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  RECONNAISSANCE,
  SEXE,
  TITULAIRE,
  VILLE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { PrenomsConnusValidationSchema } from "@composant/formulaire/nomsPrenoms/PrenomsConnusForm";
import { creerValidationSchemaPrenom } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { NomSecableStrictFormValidation } from "@composant/formulaire/validation/NomSecableFormValidation";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../../../../ressources/Regex";

export const PostulantValidationSchema = Yup.object({
  [TITULAIRE]: validationSchemaPostulant(),
  [PARENTS]: Yup.object({
    parent1: validationSchemaParent(),
    parent2: validationSchemaParent()
  }),
  [AUTRES]: validationSchemaAutres(),
  [ACQUISITION]: validationSchemaAcquisition()
});

function validationSchemaPostulant() {
  return Yup.object({
    [NOM]: Yup.string()
      .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
      .required("La saisie du nom est obligatoire"),
    [NOM_SECABLE]: NomSecableStrictFormValidation,
    [PRENOMS]: PrenomsConnusValidationSchema,
    [ANALYSE_MARGINALE]: Yup.object().shape({
      [NOM]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      ),
      [PRENOMS]: creerValidationSchemaPrenom()
    }),
    [SEXE]: Yup.string().required("La saisie du sexe est obligatoire"),
    [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
    [LIEU_DE_NAISSANCE]: Yup.object().shape({
      [VILLE_NAISSANCE]: Yup.string()
        .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
        .required("La saisie de la ville est obligatoire"),
      [ETAT_CANTON_PROVINCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      ),
      [PAYS_NAISSANCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      ),
      [NE_DANS_MARIAGE]: Yup.string().required(
        "La saisie né dans le mariage est obligatoire"
      )
    })
  });
}

function validationSchemaParent() {
  return Yup.object({
    [NOM]: Yup.string()
      .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
      .required("La saisie du nom est obligatoire"),
    [PRENOM]: PrenomsConnusValidationSchema,
    [SEXE]: Yup.string().required("La saisie du sexe est obligatoire"),
    [DATE_NAISSANCE]: DateValidationSchemaSansTestFormat,
    [LIEU_DE_NAISSANCE]: Yup.object().shape({
      [LIEU_DE_NAISSANCE]: Yup.string(),
      [VILLE_NAISSANCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      ),
      [ETAT_CANTON_PROVINCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      ),
      [DEPARTEMENT_NAISSANCE]: Yup.string()
        .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
        .when([LIEU_NAISSANCE, VILLE_NAISSANCE], {
          is: (adresse: string, ville: string) =>
            EtrangerFrance.getEnumFor(adresse) === EtrangerFrance.FRANCE &&
            !LieuxUtils.estVilleParis(ville),
          then: Yup.string().required(
            "La saisie du département est obligatoire"
          )
        }),
      [ARRONDISSEMENT_NAISSANCE]: Yup.string()
        .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
        .when([LIEU_DE_NAISSANCE, VILLE_NAISSANCE], {
          is: (lieuNaissance: string, ville: string) =>
            EtrangerFrance.getEnumFor(lieuNaissance) ===
              EtrangerFrance.FRANCE && LieuxUtils.estVilleMarseilleLyon(ville),
          then: Yup.string().required(
            "La saisie de l'arrondissement est obligatoire"
          )
        }),

      [PAYS_NAISSANCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      )
    })
  });
}
function validationSchemaAutres() {
  return Yup.object({
    [ADRESSE]: Yup.string().required("La saisie de l'adresse est obligatoire"),
    [VILLE]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [ARRONDISSEMENT]: Yup.string()
      .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
      .when([ADRESSE, VILLE], {
        is: (adresse: string, ville: string) =>
          EtrangerFrance.getEnumFor(adresse) === EtrangerFrance.FRANCE &&
          LieuxUtils.estVilleParis(ville),
        then: Yup.string().required(
          "La saisie de l'arrondissement est obligatoire"
        )
      }),
    [DEPARTEMENT]: Yup.string()
      .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
      .when([ADRESSE, VILLE], {
        is: (adresse: string, ville: string) =>
          EtrangerFrance.getEnumFor(adresse) === EtrangerFrance.FRANCE &&
          !LieuxUtils.estVilleParis(ville),
        then: Yup.string().required("La saisie du département est obligatoire")
      }),
    [ETAT_CANTON_PROVINCE]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [PAYS]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [RECONNAISSANCE]: Yup.string(),
    [DECLARANT]: Yup.string(),
    [AUTRE_DECLARANT]: Yup.string().when([DECLARANT], {
      is: (declarant: string) => TypeDeclarant.estAutre(declarant),
      then: Yup.string().required("La saisie autre déclarant est obligatoire")
    })
  });
}

function validationSchemaAcquisition() {
  return Yup.object({
    [NATURE]: Yup.string(),
    [DATE]: DateValidationSchemaSansTestFormat
  });
}
