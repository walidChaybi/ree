import { getLibelle } from "@util/Utils";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import {
  NATURE,
  NOM,
  PRENOM,
  TYPE
} from "../../modelForm/ISaisirRequetePageModel";

// Schéma de validation des champs
export function getFormValidationCarAutorisesEtNAtureObligatoireShema(
  autreKey: string
) {
  return Yup.object()
    .shape({
      [TYPE]: Yup.string(),
      [NATURE]: Yup.string().matches(
        CarateresAutorise,
        CARATERES_AUTORISES_MESSAGE
      ),
      [autreKey]: Yup.string().matches(
        CarateresAutorise,
        CARATERES_AUTORISES_MESSAGE
      ),
      [NOM]: Yup.string().matches(
        CarateresAutorise,
        CARATERES_AUTORISES_MESSAGE
      ),
      [PRENOM]: Yup.string().matches(
        CarateresAutorise,
        CARATERES_AUTORISES_MESSAGE
      )
    })
    .test("natureObligatoire", function (value, error) {
      const type = value[TYPE] as string;
      const nature = value[NATURE] as string;

      const paramsError = {
        path: `${error.path}.nature`,
        message: getLibelle(
          'La saisie d\'une Nature est obligatoire pour le Type "Autre"'
        )
      };
      return type === "AUTRE" && nature == null
        ? this.createError(paramsError)
        : true;
    });
}
