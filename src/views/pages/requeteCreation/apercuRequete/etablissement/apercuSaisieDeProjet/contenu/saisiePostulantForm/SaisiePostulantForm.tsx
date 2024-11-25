import { GestionnaireElementScroll } from "@composant/GestionnaireElementScroll/GestionnaireElementScroll";
import {
  ACQUISITION,
  AUTRES,
  FRANCISATION_POSTULANT,
  NATURE_ACTE,
  PARENT1,
  PARENT2,
  PARENTS,
  PROJET,
  TITULAIRE,
  TYPE
} from "@composant/formulaire/ConstantesNomsForm";
import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { ISaisieProjetPostulantForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { DEUX, UN } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { getLibelleParentFromSexe, withNamespace } from "@widget/formulaire/utils/FormUtil";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
import { FormikHelpers } from "formik";
import React, { useContext } from "react";
import { estJourMoisVide } from "./SaisiePostulantFormUtils";
import AcquisitionForm from "./form/AcquisitionForm";
import AutresForm from "./form/AutresForm";
import FrancisationPostulantForm from "./form/FrancisationPostulantForm";
import ParentForm from "./form/ParentForm";
import PostulantForm from "./form/PostulantForm";
import "./scss/Postulant.scss";
import { getPostulantValidationSchema } from "./validation/PostulantValidationSchema";

interface ISaisiePostulantFormProps {
  postulant: ITitulaireRequeteCreation;
  estProjetExistant: boolean;
  valeursForm?: ISaisieProjetPostulantForm;
  avancementProjet?: AvancementProjetActe;
  onSubmitSaisieProjetForm: (valeurs: ISaisieProjetPostulantForm, formikHelpers?: FormikHelpers<ISaisieProjetPostulantForm>) => void;
  affichageActualiserEtVisualiser: boolean
}

export const SaisiePostulantForm: React.FC<ISaisiePostulantFormProps> = props => {
  const { isDirty } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const libelleParent1 = getLibelleParentFromSexe(UN, props.valeursForm?.parents.parent1);
  const libelleParent2 = getLibelleParentFromSexe(DEUX, props.valeursForm?.parents.parent2);
  const elementListe = [
    {
      libelle: "Postulant",
      element: (
        <PostulantForm
          nom={TITULAIRE}
          afficherMessageNaissance={estJourMoisVide(props.postulant.retenueSdanf)}
        />
      )
    },
    {
      libelle: "Francisation postulant",
      element: (
        <FrancisationPostulantForm
          nom={FRANCISATION_POSTULANT}
          retenueSdanf={props.postulant?.retenueSdanf}
        />
      )
    },
    {
      libelle: libelleParent1,
      element: (
        <ParentForm
          nom={`${PARENTS}.${PARENT1}`}
          libelle={libelleParent1}
        />
      )
    },
    {
      libelle: libelleParent2,
      element: (
        <ParentForm
          nom={`${PARENTS}.${PARENT2}`}
          libelle={libelleParent2}
        />
      )
    },
    {
      libelle: "Autres",
      element: <AutresForm nom={AUTRES} />
    }
  ];

  props.avancementProjet &&
    !AvancementProjetActe.getAvancementsMasquantAcquisitionDecret().includes(props.avancementProjet) &&
    elementListe.push({
      libelle: "Acquisition",
      element: (
        <AcquisitionForm
          nom={ACQUISITION}
          estAvancementASigner={AvancementProjetActe.estActeASigner(props.avancementProjet)}
        />
      )
    });

  return (
    <div className="Postulant">
      <Formulaire
        formDefaultValues={props.valeursForm}
        formValidationSchema={getPostulantValidationSchema(props.avancementProjet)}
        onSubmit={props.onSubmitSaisieProjetForm}
        className="FormulairePostulant"
      >
        <FormikEffect
          onChange={(dirty: boolean) => {
            setIsDirty(dirty);
          }}
        />
        <div className="Projet">
          <InputField
            name={withNamespace(PROJET, TYPE)}
            label={"Intéressé"}
            disabled={true}
          />
          <InputField
            name={withNamespace(PROJET, NATURE_ACTE)}
            label={"Nature acte"}
            disabled={true}
          />
        </div>
        <GestionnaireElementScroll elementListe={elementListe} />
        {
          props.affichageActualiserEtVisualiser && (
            <BoutonDoubleSubmit
            type="submit"
            disabled={!isDirty && props.estProjetExistant}
          >
            {"Actualiser et visualiser"}
          </BoutonDoubleSubmit>
          )
        }
      </Formulaire>
    </div>
  );
};
