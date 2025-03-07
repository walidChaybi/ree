/* istanbul ignore file */
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import ChampCaseACocher from "../../../../commun/champs/ChampCaseACocher";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import FormulaireAdresse from "../../../../commun/champs/ChampsAddresse";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";
import { ISaisieProjetActeForm } from "./FormulaireSaisirProjet";

interface IBlocParentProps {
  estparent1?: boolean;
}

const BlocParent: React.FC<IBlocParentProps> = memo(({ estparent1 }) => {
  const { values, setFieldValue } = useFormikContext<ISaisieProjetActeForm>();
  const optionsSexe = useMemo(() => Sexe.getMasculinFemininAsOptions(), []);
  const prefix = useMemo(() => `parents.parent${estparent1 ? "1" : "2"}`, [estparent1]);
  const parent = useMemo(() => (estparent1 ? values.parents.parent1 : values.parents.parent2), [values, estparent1]);
  const titre = useMemo(() => {
    switch (parent.sexe) {
      case "MASCULIN":
        return "Père";
      case "FEMININ":
        return "Mère";
      default:
        return `Parent ${estparent1 ? "1" : "2"}`;
    }
  }, [parent, estparent1]);

  useEffect(() => {
    const valeurChamp = {
      cle: parent?.renseignerAge ? "dateNaissance" : "age",
      valeur: parent?.renseignerAge ? { jour: "", mois: "", annee: "" } : ""
    };
    setFieldValue(`${prefix}.${valeurChamp.cle}`, valeurChamp.valeur);
  }, [parent?.renseignerAge]);

  useEffect(() => {
    if (parent?.sansProfession) {
      setFieldValue(`${prefix}.profession`, "");
    }
  }, [parent?.sansProfession]);

  useEffect(() => {
    if (!estparent1 && values.parents.domicileCommun) {
      setFieldValue("parents.parent2.domicile", values.parents.parent1.domicile);
    }
  }, [values.parents.domicileCommun, values.parents.parent1.domicile]);

  return (
    <ConteneurAvecBordure
      className="py-6"
      titreEnTete={titre}
    >
      <div className="space-y-4">
        <ChampTexte
          name={`${prefix}.nom`}
          libelle="Nom"
        />
        <ChampsPrenoms
          cheminPrenoms={`${prefix}.prenoms`}
          prefixePrenom="prenom"
        />
        <ChampsRadio
          name={`${prefix}.sexe`}
          libelle="Sexe"
          options={optionsSexe}
        />
        <div className="grid grid-cols-2">
          <div>
            <ChampDate
              name={`${prefix}.dateNaissance`}
              libelle="Date de naissance"
              disabled={parent?.renseignerAge}
            />
          </div>
          <div className="flex items-end space-x-4">
            <ChampCaseACocher
              name={`${prefix}.renseignerAge`}
              libelle="Saisir l'âge"
            />
            {parent?.renseignerAge && (
              <div className="flex-1">
                <ChampTexte
                  name={`${prefix}.age`}
                  libelle="Âge (en années)"
                  numerique={true}
                  maxLength={3}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <SeparateurSection titre="Lieu de naissance" />

      <FormulaireAdresse
        key={`${prefix}.lieuNaissance`}
        prefix={`${prefix}.lieuNaissance`}
      />

      <SeparateurSection
        titre="Profession"
        libellePour={`${prefix}.profession`}
      />
      <div className="grid grid-cols-2 items-center gap-4">
        <ChampTexte
          name={`${prefix}.profession`}
          libelle=""
          data-testid={`${prefix}-profession`}
          disabled={parent?.sansProfession}
        />
        <ChampCaseACocher
          name={`${prefix}.sansProfession`}
          libelle="Sans profession"
        />
      </div>

      <SeparateurSection titre="Domicile" />
      <div className="grid gap-4">
        {!estparent1 && (
          <ChampCaseACocher
            name="parents.domicileCommun"
            libelle="Domicile commun avec parent 1"
          />
        )}

        {(estparent1 || !values.parents.domicileCommun) && (
          <FormulaireAdresse
            key={`${prefix}.domicile`}
            prefix={`${prefix}.domicile`}
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
});

export default BlocParent;
