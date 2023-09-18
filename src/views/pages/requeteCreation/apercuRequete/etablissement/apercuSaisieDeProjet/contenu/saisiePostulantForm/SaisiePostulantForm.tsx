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
import { GestionnaireElementScroll } from "@composant/GestionnaireElementScroll/GestionnaireElementScroll";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IUuidEtatCivilParams } from "@model/params/IUuidEtatCivilParams";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { DEUX, getLibelle, UN } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { Formulaire } from "@widget/formulaire/Formulaire";
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

  const parentMasculinEtOuPositionUn =
    TitulaireRequeteCreation.getParentParSexeEtOuParPosition(
      props.titulaires,
      Sexe.MASCULIN,
      UN
    );
  const parentFemininEtOuPositionDeux =
    TitulaireRequeteCreation.getParentParSexeEtOuParPosition(
      props.titulaires,
      Sexe.FEMININ,
      DEUX
    );

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
    parentMasculinEtOuPositionUn
      ? {
          libelle: getLibelleParentFromSexe(parentMasculinEtOuPositionUn),
          element: (
            <ParentForm
              nom={`${PARENTS}.${PARENT1}`}
              parent={parentMasculinEtOuPositionUn}
            />
          )
        }
      : undefined,
    parentFemininEtOuPositionDeux
      ? {
          libelle: getLibelleParentFromSexe(parentFemininEtOuPositionDeux),
          element: (
            <ParentForm
              nom={`${PARENTS}.${PARENT2}`}
              parent={parentFemininEtOuPositionDeux}
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
          parentMasculinEtOuPositionUn,
          parentFemininEtOuPositionDeux
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
        <GestionnaireElementScroll elementListe={elementListe} />
        <Bouton type="submit">{getLibelle("Valider le postulant")}</Bouton>
      </Formulaire>
    </div>
  );
};
