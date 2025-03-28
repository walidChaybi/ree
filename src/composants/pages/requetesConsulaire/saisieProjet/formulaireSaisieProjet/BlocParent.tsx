/* istanbul ignore file */
/* v8 ignore start a faire Lundi 31 Mars @ Adrien_Bonvin */
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
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

interface IBlocParentProps {
  estparent1?: boolean;
}

const BlocParent: React.FC<IBlocParentProps> = memo(({ estparent1 }) => {
  const { values, setFieldValue } = useFormikContext<IProjetActeTranscritForm>();
  const optionsSexe = useMemo(() => Sexe.getMasculinFemininAsOptions(), []);
  const prefixe = useMemo(() => `parents.parent${estparent1 ? "1" : "2"}`, [estparent1]);
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
    setFieldValue(`${prefixe}.${valeurChamp.cle}`, valeurChamp.valeur);
  }, [parent?.renseignerAge]);

  useEffect(() => {
    if (parent?.sansProfession) {
      setFieldValue(`${prefixe}.profession`, "");
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
          name={`${prefixe}.nom`}
          libelle="Nom"
        />
        <ChampsPrenoms
          cheminPrenoms={`${prefixe}.prenomsChemin`}
          prefixePrenom="prenom"
        />
        <ChampsRadio
          name={`${prefixe}.sexe`}
          libelle="Sexe"
          options={optionsSexe}
        />
        <div className="grid grid-cols-2">
          <div>
            <ChampDate
              name={`${prefixe}.dateNaissance`}
              libelle="Date de naissance"
              disabled={parent?.renseignerAge}
            />
          </div>
          <div className="flex items-end space-x-4">
            <ChampCaseACocher
              name={`${prefixe}.renseignerAge`}
              libelle="Saisir l'âge"
            />
            {parent?.renseignerAge && (
              <div className="flex-1">
                <ChampTexte
                  name={`${prefixe}.age`}
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
        key={`${prefixe}.lieuNaissance`}
        prefix={`${prefixe}.lieuNaissance`}
      />

      <SeparateurSection
        titre="Profession"
        libellePour={`${prefixe}.profession`}
      />
      <div className="grid grid-cols-2 items-center gap-4">
        <ChampTexte
          name={`${prefixe}.profession`}
          libelle=""
          data-testid={`${prefixe}-profession`}
          disabled={parent?.sansProfession}
        />
        <ChampCaseACocher
          name={`${prefixe}.sansProfession`}
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
            key={`${prefixe}.domicile`}
            prefix={`${prefixe}.domicile`}
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
});

export default BlocParent;

/* v8 ignore end */
