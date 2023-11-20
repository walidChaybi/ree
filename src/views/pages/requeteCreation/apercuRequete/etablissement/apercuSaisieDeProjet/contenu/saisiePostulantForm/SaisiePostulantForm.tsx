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
import { RECEContext } from "@core/body/RECEContext";
import { ISaisieProjetPostulantForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { estDateVide } from "@util/DateUtils";
import { DEUX, UN, getLibelle } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  getLibelleParentFromSexe,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
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
    }
  ];

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_ACQUISITION_DECRET)) {
    props.avancementProjet &&
      !AvancementProjetActe.getAvancementsMasquantAcquisitionjDecret().includes(
        props.avancementProjet
      ) &&
      elementListe.push({
        libelle: getLibelle("Acquisition"),
        element: (
          <AcquisitionForm
            nom={ACQUISITION}
            afficherDateDecret={
              AvancementProjetActe.estASigner(props.avancementProjet) &&
              !estDateVide(props.postulant?.decret?.dateSignature)
            }
            estAvancementASigner={AvancementProjetActe.estASigner(
              props.avancementProjet
            )}
          />
        )
      });
  } else {
    elementListe.push({
      libelle: getLibelle("Acquisition"),
      element: (
        <AcquisitionForm
          nom={ACQUISITION}
          afficherDateDecret={false}
          estAvancementASigner={false}
        />
      )
    });
  }

  return (
    <div className="Postulant">
      <Formulaire
        formDefaultValues={props.valeursForm}
        formValidationSchema={getPostulantValidationSchema(
          props.avancementProjet
        )}
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
