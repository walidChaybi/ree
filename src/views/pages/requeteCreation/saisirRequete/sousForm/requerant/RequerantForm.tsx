import { AddCircle } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import {
  ADRESSE_MAIL_NON_CONFORME,
  CARACTERES_AUTORISES_MESSAGE,
  NUMERO_TELEPHONE_NON_CONFORME
} from "@widget/formulaire/FormulaireMessages";
import { AdresseFormDefaultValues, AdresseFormValidationSchema } from "@widget/formulaire/adresse/AdresseForm";
import { ISubForm, SubFormProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import BoutonIcon from "../../../../../../composants/commun/bouton/BoutonIcon";
import ChampTexte from "../../../../../../composants/commun/champs/ChampTexte";
import { default as ChampsCoordonnees } from "../../../../../../composants/commun/champs/ChampsCoordonnees";
import ConteneurAvecBordure from "../../../../../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
import { CaracteresAutorises, NumeroTelephone } from "../../../../../../ressources/Regex";
import {
  ADRESSE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  NOM,
  NOM_USAGE,
  PRENOM
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";

export const RequerantFormDefaultValue = {
  [NOM]: "",
  [PRENOM]: "",
  [NOM_USAGE]: "",
  [ADRESSE]: AdresseFormDefaultValues,
  [AUTRE_ADRESSE_COURRIEL]: "",
  [AUTRE_NUMERO_TELEPHONE]: ""
};

export const RequerantFormValidationSchema = Yup.object().shape({
  [NOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [PRENOM]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
  [AUTRE_ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
  [AUTRE_NUMERO_TELEPHONE]: Yup.string().matches(NumeroTelephone, NUMERO_TELEPHONE_NON_CONFORME),
  [ADRESSE]: AdresseFormValidationSchema
});

const RequerantForm: React.FC<SubFormProps> = props => {
  const [nomUsagePresent, setNomUsagePresent] = useState<boolean>(false);
  const nomUsageWithNamespace = withNamespace(props.nom, NOM_USAGE);

  const nomUsageForm = props.formik.getFieldProps(nomUsageWithNamespace).value;

  const nomWithNamespace = withNamespace(props.nom, NOM);
  const prenomWithNamespace = withNamespace(props.nom, PRENOM);

  useEffect(() => {
    if (nomUsageForm && !nomUsagePresent) {
      setNomUsagePresent(true);
    }
  }, [nomUsageForm, nomUsagePresent]);

  const toggleNomUsage = () => {
    props.formik.setFieldValue(nomUsageWithNamespace, "");
    setNomUsagePresent(!nomUsagePresent);
  };

  return (
    <ConteneurAvecBordure
      className="py-6"
      titreEnTete={"REQUÉRANT"}
    >
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-end">
              <div className="flex-grow">
                <ChampTexte
                  name={nomWithNamespace}
                  libelle="Nom"
                />
              </div>
              {!nomUsagePresent && (
                <div className="ml-4">
                  <BoutonIcon
                    tabIndex={-1}
                    disabled={nomUsagePresent}
                    onClick={toggleNomUsage}
                    className="mb-0"
                  >
                    <div className="flex items-center gap-4 px-2">
                      <AddCircle />
                      <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter un nom d'usage"}</span>
                    </div>
                  </BoutonIcon>
                </div>
              )}
            </div>
            {nomUsagePresent && (
              <div className="flex items-end">
                <div className="flex-grow">
                  <ChampTexte
                    name={nomUsageWithNamespace}
                    libelle="Nom d'usage"
                    boutonChamp={{
                      composant: (
                        <BoutonIcon
                          className="group absolute right-0 h-full rounded-l-none bg-transparent"
                          type="button"
                          title={"Supprimer le nom d'usage"}
                          onClick={toggleNomUsage}
                          styleBouton="suppression"
                        >
                          <Delete className="text-rouge group-hover:text-blanc" />
                        </BoutonIcon>
                      )
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <ChampTexte
            name={prenomWithNamespace}
            libelle="Prénom"
            className="flex-1"
          />
        </div>

        <ChampsCoordonnees
          affichageSousFormulaire={false}
          nom={`${props.nom}.adresse`}
        />
        <div className="flex space-x-4"></div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default connect<ISubForm>(RequerantForm);
