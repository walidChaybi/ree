import { GestionnaireElementScroll } from "@composant/GestionnaireElementScroll/GestionnaireElementScroll";
import {
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
import { IUuidEtatCivilParams } from "@model/params/IUuidEtatCivilParams";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  getLibelleParentFromSexe,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import AutresForm from "./form/AutresForm";
import FrancisationPostulantForm from "./form/FrancisationPostulantForm";
import ParentForm from "./form/ParentForm";
import PostulantForm from "./form/PostulantForm";
import { mappingTitulairesVersSaisieProjetPostulant } from "./mapping/mappingTitulaireVersFormulairePostulant";
import "./scss/Postulant.scss";
import { PostulantValidationSchema } from "./validation/PostulantValidationSchema";

interface ISaisiePostulantFormProps {
  titulaires: ITitulaireRequeteCreation[];
}

export const SaisiePostulantForm: React.FC<
  ISaisiePostulantFormProps
> = props => {
  const { idEtatCivilParam } = useParams<IUuidEtatCivilParams>();

  const [titulaire] = useMemo(() => {
    let suiviDossierTitulaire;
    if (props.titulaires) {
      for (const titulaireRequete of props.titulaires) {
        suiviDossierTitulaire = titulaireRequete.suiviDossiers?.find(
          etatCivil => etatCivil.id === idEtatCivilParam
        );
        if (suiviDossierTitulaire) {
          return [titulaireRequete, suiviDossierTitulaire];
        }
      }
    }
    return [undefined, undefined];
  }, [props.titulaires, idEtatCivilParam]);

  const parentsTitulaire =
    TitulaireRequeteCreation.getParentsTriesParSexe(props.titulaires) || [];

  const titulaireParent1 = TitulaireRequeteCreation.getParentsTriesParSexe(
    props.titulaires
  )?.[0];
  const titulaireParent2 = TitulaireRequeteCreation.getParentsTriesParSexe(
    props.titulaires
  )?.[1];

  const elementListe = [
    {
      libelle: "Postulant",
      element: <PostulantForm nom={TITULAIRE} titulaire={titulaire} />
    },
    {
      libelle: getLibelle("Francisation postulant"),
      element: (
        <FrancisationPostulantForm
          nom={FRANCISATION_POSTULANT}
          retenueSdanf={titulaire?.retenueSdanf}
        />
      )
    },
    titulaireParent1
      ? {
          libelle: getLibelleParentFromSexe(titulaireParent1),
          element: (
            <ParentForm
              nom={`${PARENTS}.${PARENT1}`}
              parent={titulaireParent1}
            />
          )
        }
      : undefined,
    titulaireParent2
      ? {
          libelle: getLibelleParentFromSexe(titulaireParent2),
          element: (
            <ParentForm
              nom={`${PARENTS}.${PARENT2}`}
              parent={titulaireParent2}
            />
          )
        }
      : undefined,
    {
      libelle: getLibelle("Autres"),
      element: <AutresForm nom={AUTRES} />
    }
  ];

  function validerProjetPostulant() {}

  return (
    <div className="Postulant">
      <Formulaire
        formDefaultValues={mappingTitulairesVersSaisieProjetPostulant(
          titulaire || ({} as ITitulaireRequeteCreation),
          parentsTitulaire
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
