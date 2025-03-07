import { LIEN_REQUERANT, NATURE_ACTE, REGISTRE } from "@composant/formulaire/ConstantesNomsForm";
import RecherchePocopas from "@composant/recherchePocopas/RecherchePocopas";
import { NatureActeTranscrit } from "@model/requete/enum/NatureActeTranscrit";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { LIEN_REQUERANT_OBLIGATOIRE, NATURE_ACTE_OBLIGATOIRE, REGISTRE_OBLIGATOIRE } from "@widget/formulaire/FormulaireMessages";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import ChampListeDeroulante from "../../../../../../composants/commun/champs/ChampListeDeroulante";
import ConteneurAvecBordure from "../../../../../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
import "./RequeteForm.scss";

const NOMBRE_RESULTAT_MAX = 15;
const FAMILLE_REGISTRE = "CSL";

// Valeurs par défaut des champs
export const RequeteFormDefaultValues = {
  [NATURE_ACTE]: NatureActeTranscrit.getKey(NatureActeTranscrit.NAISSANCE_MINEUR),
  [LIEN_REQUERANT]: TypeLienRequerantCreation.getKey(TypeLienRequerantCreation.PERE_MERE),
  [REGISTRE]: null
};

export const RequeteFormValidationSchema = Yup.object().shape({
  [NATURE_ACTE]: Yup.string().required(NATURE_ACTE_OBLIGATOIRE),
  [LIEN_REQUERANT]: Yup.string().required(LIEN_REQUERANT_OBLIGATOIRE),
  [REGISTRE]: Yup.object().nullable().required(REGISTRE_OBLIGATOIRE)
});

const RequeteForm: React.FC<SubFormProps> = ({ nom, formik }) => {
  useEffect(() => {
    if (!formik.values[withNamespace(nom, NATURE_ACTE)]) {
      formik.setFieldValue(withNamespace(nom, NATURE_ACTE), NatureActeTranscrit.getKey(NatureActeTranscrit.NAISSANCE_MINEUR));
    }
  }, []);

  return (
    <ConteneurAvecBordure className="py-6">
      <div className="space-y-4">
        <ChampListeDeroulante
          name={withNamespace(nom, NATURE_ACTE)}
          libelle="Acte à transcrire"
          options={NatureActeTranscrit.getAllEnumsAsOptions()}
          estObligatoire
        />
        <div className="grid grid-cols-2 items-center gap-6">
          <ChampListeDeroulante
            name={withNamespace(nom, LIEN_REQUERANT)}
            libelle="Requérant"
            options={TypeLienRequerantCreation.getAllEnumsAsOptions()}
            estObligatoire
          />

          <div className="flex flex-col">
            <label
              htmlFor={withNamespace(nom, REGISTRE)}
              className={"mb-1 ml-1 block w-fit text-start text-bleu-sombre transition-colors first-line:m-0"}
            >
              Registre
            </label>
            <RecherchePocopas
              estOuvert={true}
              nombreResultatsMax={NOMBRE_RESULTAT_MAX}
              nom={withNamespace(nom, REGISTRE)}
              familleRegistre={FAMILLE_REGISTRE}
            />
          </div>
        </div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default connect<ISubForm>(RequeteForm);
