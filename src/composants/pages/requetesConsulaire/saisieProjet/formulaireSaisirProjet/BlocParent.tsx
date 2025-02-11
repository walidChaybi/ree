/* istanbul ignore file */
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampsCaseACocher from "../../../../commun/champs/ChampsCaseACocher";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";
import FormulaireAdresse from "../../../../commun/formulaire/FormulaireAdresse";
import { ISaisieProjetActeForm } from "./FormulaireSaisirProjet";

interface IBlocParentProps {
  estparent1?: boolean;
}

interface ITitreSectionProps {
  titre: string;
}

const TitreSection = memo<ITitreSectionProps>(({ titre }) => (
  <div className="mb-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
    <h3 className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre">{titre}</h3>
  </div>
));

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
    <div className="m-4 mb-10 mt-8 rounded-md border border-solid border-blue-200 bg-white p-4 shadow-md">
      <div className="relative mb-5 flex border-bleu">
        <h2 className="absolute -top-[3.4rem] ml-8 bg-white px-2 text-bleu-sombre">{titre}</h2>
      </div>

      <div className="space-y-4">
        <ChampsTexte
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
            <ChampsCaseACocher
              name={`${prefix}.renseignerAge`}
              libelle="Saisir l'âge"
            />
            {parent?.renseignerAge && (
              <div className="flex-1">
                <ChampsTexte
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

      <TitreSection titre="Lieu de naissance" />
      <FormulaireAdresse
        key={`${prefix}.lieuNaissance`}
        prefix={`${prefix}.lieuNaissance`}
        categorieLieu={parent?.lieuNaissance?.typeLieu}
        ville={parent?.lieuNaissance?.ville}
      />

      <TitreSection titre="Profession" />
      <div className="grid grid-cols-2 items-center gap-4">
        <ChampsTexte
          name={`${prefix}.profession`}
          libelle=""
          data-testid={`${prefix}-profession`}
          disabled={parent?.sansProfession}
        />
        <ChampsCaseACocher
          name={`${prefix}.sansProfession`}
          libelle="Sans profession"
        />
      </div>

      <TitreSection titre="Domicile" />
      {!estparent1 && (
        <ChampsCaseACocher
          name="parents.domicileCommun"
          libelle="Domicile commun avec parent 1"
        />
      )}

      {(estparent1 || !values.parents.domicileCommun) && (
        <FormulaireAdresse
          key={`${prefix}.domicile`}
          prefix={`${prefix}.domicile`}
          categorieLieu={parent?.domicile?.typeLieu}
          ville={parent?.domicile?.ville}
        />
      )}
    </div>
  );
});

export default BlocParent;
