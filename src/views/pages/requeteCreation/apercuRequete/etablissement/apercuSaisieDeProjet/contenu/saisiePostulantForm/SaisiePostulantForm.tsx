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
import { GestionnaireElementScroll } from "@composant/GestionnaireElementScroll/GestionnaireElementScroll";
import { RECEContext } from "@core/body/RECEContext";
import { ISaisieProjetPostulantForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { estDateVide } from "@util/DateUtils";
import { DEUX, getLibelle, UN } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { Formulaire } from "@widget/formulaire/Formulaire";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
import {
  getLibelleParentFromSexe,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import React, { useContext } from "react";
import AcquisitionForm from "./form/AcquisitionForm";
import AutresForm from "./form/AutresForm";
import FrancisationPostulantForm from "./form/FrancisationPostulantForm";
import ParentForm from "./form/ParentForm";
import PostulantForm from "./form/PostulantForm";
import { estJourMoisVide } from "./SaisiePostulantFormUtils";
import "./scss/Postulant.scss";
import { PostulantValidationSchema } from "./validation/PostulantValidationSchema";

interface ISaisiePostulantFormProps {
  postulant: ITitulaireRequeteCreation;
  valeursForm?: ISaisieProjetPostulantForm;
  estProjetExistant: boolean;
  onSubmitSaisieProjetForm: (valeurs: ISaisieProjetPostulantForm) => void;
}

export const SaisiePostulantForm: React.FC<
  ISaisiePostulantFormProps
> = props => {
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const libelleParent1 = getLibelleParentFromSexe(
    UN,
    props.valeursForm?.parents.parent1
  );
  const libelleParent2 = getLibelleParentFromSexe(
    DEUX,
    props.valeursForm?.parents.parent2
  );

  const elementListe = [
    {
      libelle: "Postulant",
      element: (
        <PostulantForm
          nom={TITULAIRE}
          valeursForm={props.valeursForm}
          afficherMessageNaissance={estJourMoisVide(
            props.postulant.retenueSdanf
          )}
        />
      )
    },
    {
      libelle: getLibelle("Francisation postulant"),
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
        <ParentForm nom={`${PARENTS}.${PARENT1}`} libelle={libelleParent1} />
      )
    },
    {
      libelle: libelleParent2,
      element: (
        <ParentForm nom={`${PARENTS}.${PARENT2}`} libelle={libelleParent2} />
      )
    },
    {
      libelle: getLibelle("Autres"),
      element: <AutresForm nom={AUTRES} />
    },
    {
      libelle: getLibelle("Acquisition"),
      element: (
        <AcquisitionForm
          nom={ACQUISITION}
          afficherDateDecret={
            !estDateVide(props.postulant?.decret?.dateSignature)
          }
        />
      )
    }
  ];

  return (
    <div className="Postulant">
      <Formulaire
        formDefaultValues={props.valeursForm}
        formValidationSchema={PostulantValidationSchema}
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
            label={getLibelle("Intéressé")}
            disabled={true}
          />
          <InputField
            name={withNamespace(PROJET, NATURE_ACTE)}
            label={getLibelle("Nature acte")}
            disabled={true}
          />
        </div>
        <GestionnaireElementScroll elementListe={elementListe} />
        <Bouton type="submit" disabled={!isDirty && props.estProjetExistant}>
          {getLibelle("Actualiser et visualiser")}
        </Bouton>
      </Formulaire>
    </div>
  );
};
