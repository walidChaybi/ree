import {
  DATE_NAISSANCE_OU_AGE_DE,
  NOM_NAISSANCE,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import { DateNaissanceOuAgeDeValidationSchema } from "@composant/formulaire/validation/DateNaissanceOuAgeDeFormValidation";
import { sexeObligatoireValidation } from "@composant/formulaire/validation/SexeObligatoireValidation";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import {
  auMoinsUneProprieteEstRenseigne,
  estNonRenseigne,
  getLibelle
} from "@util/Utils";
import * as Yup from "yup";
import { IParentNaissanceForm } from "../../../mapping/mappingActeVerFormulaireSaisirExtrait";

export const ParentNaissValidationSchema = Yup.object({
  [DATE_NAISSANCE_OU_AGE_DE]: DateNaissanceOuAgeDeValidationSchema,
  [SEXE]: Yup.string().required()
})
  .test("sexeObligatoireParent", function (value: any, error: any) {
    return sexeObligatoireValidation(this, value, error);
  })
  .test("nomParentObligatoire1", function (value: any, error: any) {
    return nomParentObligatoireValidation(this, value, error);
  });

export const ParentNaissSansSexeDateAgeDeValidationSchema = Yup.object().test(
  "nomParentObligatoire2",
  function (value: any, error: any) {
    return nomParentObligatoireValidation(this, value, error);
  }
);

export const ParentNaissSansDateAgeDeValidationSchema = Yup.object({
  [SEXE]: Yup.string().required()
})
  .test("sexeObligatoireParent", function (value: any, error: any) {
    return sexeObligatoireValidation(this, value, error);
  })
  .test("nomParentObligatoire3", function (value: any, error: any) {
    return nomParentObligatoireValidation(this, value, error);
  });

function nomParentObligatoireValidation(context: any, value: any, error: any) {
  let res: any = true;
  const parentNaissanceForm: IParentNaissanceForm = value;
  const parentNaissanceFormSansValeurInconnu =
    supprimeValeurInconnu(parentNaissanceForm);

  if (
    parentNaissanceFormSansValeurInconnu &&
    estNonRenseigne(parentNaissanceFormSansValeurInconnu.nomNaissance) &&
    auMoinsUneProprieteEstRenseigne(parentNaissanceFormSansValeurInconnu)
  ) {
    const paramsError = {
      path: `${error.path}.${NOM_NAISSANCE}`,
      message: getLibelle("Le nom de naissance est obligatoire")
    };
    res = context.createError(paramsError);
  }
  return res;
}

function supprimeValeurInconnu(
  parentNaissanceForm?: IParentNaissanceForm
): IParentNaissanceForm | undefined {
  let parentNaissanceFormSansValeurInconnu;
  if (parentNaissanceForm) {
    parentNaissanceFormSansValeurInconnu = { ...parentNaissanceForm };
    if (
      parentNaissanceForm.lieuNaissance?.EtrangerFrance ===
      EtrangerFrance.getKey(EtrangerFrance.INCONNU)
    ) {
      parentNaissanceFormSansValeurInconnu.lieuNaissance = {
        ...parentNaissanceForm.lieuNaissance
      };
      parentNaissanceFormSansValeurInconnu.lieuNaissance.EtrangerFrance = "";
      parentNaissanceFormSansValeurInconnu.lieuNaissance.lieuComplet = "";
      parentNaissanceFormSansValeurInconnu.lieuNaissance.ville = "";
      parentNaissanceFormSansValeurInconnu.lieuNaissance.arrondissement = "";
      parentNaissanceFormSansValeurInconnu.lieuNaissance.regionDepartement = "";
      parentNaissanceFormSansValeurInconnu.lieuNaissance.pays = "";
    }

    if (parentNaissanceForm.sexe === Sexe.getKey(Sexe.INCONNU)) {
      parentNaissanceFormSansValeurInconnu.sexe = "";
    }
  }

  return parentNaissanceFormSansValeurInconnu;
}
