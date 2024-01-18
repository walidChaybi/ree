import {
  ACQUISITION,
  ADRESSE,
  AGE,
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
import {
  creerValidationSchemaPrenom,
  creerValidationSchemaPrenomParent
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { NomSecableStrictFormValidation } from "@composant/formulaire/validation/NomSecableFormValidation";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ISaisieDate } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { getPrenomsTableauStringVersPrenomsOrdonnes } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { getLibelle } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import {
  CARACTERES_AUTORISES_MESSAGE,
  DEFINITION_SEXE_OBLIGATOIRE,
  NATURE_ACTE_OBLIGATOIRE
} from "@widget/formulaire/FormulaireMessages";
import {
  DateValidationCompleteSchemaSansTestFormatRequired,
  DateValidationSchema,
  DateValidationSchemaSansTestFormat,
  DateValidationSchemaSansTestFormatRequired
} from "@widget/formulaire/champsDate/DateComposeFormValidation";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../../../../ressources/Regex";

export function getPostulantValidationSchema(
  avancement?: AvancementProjetActe
) {
  return Yup.lazy(() =>
    Yup.object({
      [TITULAIRE]: validationSchemaPostulant(),
      [PARENTS]: Yup.object({
        parent1: validationSchemaParent(),
        parent2: validationSchemaParent()
      }),
      [AUTRES]: validationSchemaAutres(),
      [ACQUISITION]: validationSchemaAcquisition(avancement)
    })
  );
}

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
    [DATE_NAISSANCE]: DateValidationSchemaSansTestFormatRequired,
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
    [NOM]: Yup.lazy(() =>
      Yup.string()
        .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
        .required("La saisie d'un nom est obligatoire")
    ),
    [PRENOM]: Yup.lazy(() =>
      Yup.object()
        .shape({
          [PRENOMS]: creerValidationSchemaPrenomParent()
        })
        .when([NOM], {
          is: (nom: string) => !nom,
          then: creerValidationSchemaPrenomParent().required(
            "La saisie d'un nom ou d'un prénom est obligatoire"
          ),
          otherwise: Yup.object().nullable()
        })
    ),
    [SEXE]: Yup.string().required(getLibelle(DEFINITION_SEXE_OBLIGATOIRE)),
    [DATE_NAISSANCE]: Yup.object().shape({
      [DATE]: Yup.lazy(() =>
        DateValidationSchema.when([AGE], {
          is: (age: string) => !age,
          then: DateValidationSchema.required(
            "La date de naissance ou l'age du parent est obligatoire"
          ),
          otherwise: DateValidationSchema.nullable()
        })
      ),
      [AGE]: Yup.lazy(() =>
        Yup.string().when([DATE], {
          is: (date: ISaisieDate | null) =>
            !date?.jour && !date?.mois && !date?.annee,
          then: Yup.string().required(
            "La date de naissance ou l'age du parent est obligatoire"
          ),
          otherwise: Yup.string().nullable()
        })
      )
    }),
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
      [ARRONDISSEMENT_NAISSANCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      ),
      [PAYS_NAISSANCE]: Yup.string().matches(
        CaracteresAutorises,
        CARACTERES_AUTORISES_MESSAGE
      )
    })
  }).test("sexeDefiniObligatoire", function (value, error) {
    const sexe = value[SEXE] as string;
    const nomOuPrenomRenseigne =
      value[NOM] ||
      getPrenomsTableauStringVersPrenomsOrdonnes(value[PRENOM][PRENOMS])
        .length > 0;

    const paramsError = {
      path: `${error?.path}.sexe`,
      message: getLibelle(DEFINITION_SEXE_OBLIGATOIRE)
    };
    return nomOuPrenomRenseigne && Sexe.estIndetermine(sexe)
      ? this.createError(paramsError)
      : true;
  });
}
function validationSchemaAutres() {
  return Yup.object({
    [ADRESSE]: Yup.string().required("La saisie de l'adresse est obligatoire"),
    [VILLE]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [ARRONDISSEMENT]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
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

function validationSchemaAcquisition(avancement?: AvancementProjetActe) {
  // TODO : Retirer le FF qui désactive la condition si le flag est faux
  const estASigner =
    avancement &&
    AvancementProjetActe.estASigner(avancement) &&
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_ACQUISITION_DECRET);
  return Yup.object({
    [NATURE]: estASigner
      ? Yup.string().required(NATURE_ACTE_OBLIGATOIRE)
      : Yup.string().notRequired(),
    [DATE]: estASigner
      ? DateValidationCompleteSchemaSansTestFormatRequired
      : DateValidationSchemaSansTestFormat
  });
}
