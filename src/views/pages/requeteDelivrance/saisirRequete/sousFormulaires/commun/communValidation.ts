import { NATURE, NOM, PRENOM, TYPE } from "@views/common/composant/formulaire/ConstantesNomsForm";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../../ressources/Regex";

// Schéma de validation des champs
export const getFormValidationCarAutorisesEtNAtureObligatoireShema = (autreKey: string) => {
  return Yup.object()
    .shape({
      [TYPE]: Yup.string(),
      [NATURE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
      [autreKey]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
      [NOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
      [PRENOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE)
    })
    .test("natureObligatoire", function (value, error) {
      const type = value[TYPE] as string;
      const nature = value[NATURE] as string;

      const paramsError = {
        path: `${error.path}.nature`,
        message: 'La saisie d\'une Nature est obligatoire pour le Type "Autre"'
      };
      return type === "AUTRE" && nature == null ? this.createError(paramsError) : true;
    });
};
