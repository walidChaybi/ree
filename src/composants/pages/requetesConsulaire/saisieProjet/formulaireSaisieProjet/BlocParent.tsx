import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { useFormikContext } from "formik";
import React, { memo, useMemo } from "react";
import ChampCaseACocher from "../../../../commun/champs/ChampCaseACocher";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampsAdresse from "../../../../commun/champs/ChampsAddresse";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

interface IBlocParentProps {
  estParent1?: boolean;
}

const BlocParent: React.FC<IBlocParentProps> = memo(({ estParent1 }) => {
  const { values, setFieldValue } = useFormikContext<IProjetActeTranscritForm>();
  const optionsSexe = useMemo(() => Sexe.getMasculinFemininAsOptions(), []);
  const prefixe = useMemo(() => `parents.parent${estParent1 ? "1" : "2"}`, [estParent1]);
  const parent = useMemo(() => (estParent1 ? values.parents.parent1 : values.parents.parent2), [values, estParent1]);

  const titre = useMemo(() => {
    const numeroParent = estParent1 ? "1" : "2";

    switch (parent.sexe) {
      case "MASCULIN":
        return `Père (Parent ${numeroParent})`;
      case "FEMININ":
        return `Mère (Parent ${numeroParent})`;
      default:
        return `Parent ${numeroParent}`;
    }
  }, [parent, estParent1]);

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
        <div className="grid grid-cols-2 gap-4">
          <ChampsRadio
            name={`${prefixe}.sexe`}
            libelle="Sexe"
            options={optionsSexe}
          />

          <div className="flex items-end gap-8">
            {parent?.renseignerAge ? (
              <ChampTexte
                name={`${prefixe}.age`}
                className="max-w-52"
                libelle="Âge (en années)"
                numerique={true}
                maxLength={3}
              />
            ) : (
              <ChampDate
                name={`${prefixe}.dateNaissance`}
                libelle="Date de naissance"
                disabled={parent?.renseignerAge}
              />
            )}
            <div className="pb-1">
              <ChampCaseACocher
                name={`${prefixe}.renseignerAge`}
                libelle="Saisir l'âge"
                apresChangement={renseignerAge =>
                  renseignerAge
                    ? setFieldValue(`${prefixe}.dateNaissance`, { jour: "", mois: "", annee: "" })
                    : setFieldValue(`${prefixe}.age`, "")
                }
              />
            </div>
          </div>
        </div>
      </div>

      <SeparateurSection titre="Lieu de naissance" />

      <ChampsAdresse
        key={`${prefixe}.lieuNaissance`}
        prefixe={`${prefixe}.lieuNaissance`}
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
          apresChangement={sansProfession => sansProfession && setFieldValue(`${prefixe}.profession`, "")}
        />
      </div>

      <SeparateurSection titre="Domicile" />
      <div className="grid gap-4">
        {!estParent1 && (
          <ChampCaseACocher
            name="parents.domicileCommun"
            libelle="Domicile commun avec parent 1"
            apresChangement={domicileCommun =>
              domicileCommun
                ? setFieldValue("parents.parent2.domicile", values.parents.parent1.domicile)
                : setFieldValue("parents.parent2.domicile", {
                    ...parent.domicile,
                    adresse: "",
                    arrondissement: "",
                    departement: "",
                    etatProvince: "",
                    ville: "",
                    pays: parent.domicile?.typeLieu === "France" ? "France" : ""
                  })
            }
          />
        )}

        {(estParent1 || !values.parents.domicileCommun) && (
          <ChampsAdresse
            key={`${prefixe}.domicile`}
            prefixe={`${prefixe}.domicile`}
          />
        )}
      </div>
    </ConteneurAvecBordure>
  );
});

export default BlocParent;
