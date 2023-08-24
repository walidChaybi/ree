import { GestionnaireElementScroll } from "@composant/GestionnaireElementScroll/GestionnaireElementScroll";
import {
  NATURE_ACTE,
  PROJET,
  TITULAIRE,
  TYPE
} from "@composant/formulaire/ConstantesNomsForm";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import PostulantForm from "./PostulantForm";
import { mappingTitulaireVersSaisieProjetPostulant } from "./mapping/mappingTitulaireVersFormulairePostulant";
import "./scss/Postulant.scss";
import { PostulantValidationSchema } from "./validation/PostulantValidationSchema";

interface PostulantProps {
  titulaire: ITitulaireRequeteCreation;
}

export const Postulant: React.FC<PostulantProps> = props => {
  const elementListe = [
    {
      libelle: "Postulant",
      element: <PostulantForm titulaire={props.titulaire} nom={TITULAIRE} />
    }
  ];

  function validerProjetPostulant() {}

  return (
    <div className="Postulant">
      <Formulaire
        formDefaultValues={mappingTitulaireVersSaisieProjetPostulant(
          props.titulaire
        )}
        formValidationSchema={PostulantValidationSchema}
        onSubmit={validerProjetPostulant}
        className="FormulairePostulant"
      >
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
        <GestionnaireElementScroll
          elementListe={elementListe}
        ></GestionnaireElementScroll>
        <Bouton type="submit">{getLibelle("Valider le postulant")}</Bouton>
      </Formulaire>
    </div>
  );
};
