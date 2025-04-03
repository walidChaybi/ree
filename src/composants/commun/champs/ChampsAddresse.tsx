import { genererArrondissements } from "@util/Utils";
import { useField } from "formik";
import React, { memo, useMemo } from "react";
import ChampListeDeroulante from "./ChampListeDeroulante";
import ChampTexte from "./ChampTexte";
import ChampsRadio from "./ChampsRadio";

interface Option {
  cle: string;
  libelle: string;
}

interface IFormulaireAdresseProps {
  prefix: string;
  libelle?: string;
  afficherAdresse?: boolean;
}

const TYPES_LIEU: Option[] = [
  { cle: "France", libelle: "France" },
  { cle: "Étranger", libelle: "Étranger" },
  { cle: "Inconnu", libelle: "Inconnu" }
];

const VILLES_SPECIALES = ["paris", "marseille", "lyon"] as const;
type TVilleSpeciale = (typeof VILLES_SPECIALES)[number];

const ARRONDISSEMENTS_OPTIONS: Record<TVilleSpeciale, Option[]> = {
  paris: [{ cle: "", libelle: "" }, ...genererArrondissements(20), { cle: "centre", libelle: "centre" }],
  marseille: [{ cle: "", libelle: "" }, ...genererArrondissements(16)],
  lyon: [{ cle: "", libelle: "" }, ...genererArrondissements(9)]
};

const AdresseFrance = memo(({ prefix, afficherAdresse = true }: { prefix: string; afficherAdresse?: boolean }) => {
  const [fieldVille] = useField(`${prefix}.ville`);
  const estVilleSpeciale = useMemo(
    () => VILLES_SPECIALES.includes(fieldVille.value?.toLowerCase().trim() as TVilleSpeciale),
    [fieldVille.value]
  );

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <ChampTexte
            name={`${prefix}.ville`}
            libelle="Ville"
            optionFormatage="PREMIER_MAJUSCULE"
          />
        </div>
        {estVilleSpeciale && (
          <div className="flex-1">
            <ChampListeDeroulante
              name={`${prefix}.arrondissement`}
              libelle="Arrondissement"
              options={ARRONDISSEMENTS_OPTIONS[fieldVille.value.toLowerCase().trim() as TVilleSpeciale]}
              premiereLettreMajuscule
            />
          </div>
        )}
        {fieldVille.value?.toLowerCase().trim() !== "paris" && (
          <div className="flex-1">
            <ChampTexte
              name={`${prefix}.departement`}
              libelle="Département"
            />
          </div>
        )}
      </div>
      {afficherAdresse && (
        <ChampTexte
          name={`${prefix}.adresse`}
          libelle="Adresse"
        />
      )}
    </div>
  );
});

const AdresseEtranger = memo(({ prefix, afficherAdresse = true }: { prefix: string; afficherAdresse?: boolean }) => (
  <div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <ChampTexte
        name={`${prefix}.ville`}
        libelle="Ville"
        optionFormatage="PREMIER_MAJUSCULE"
      />
      <ChampTexte
        name={`${prefix}.etatProvince`}
        libelle="État, canton, province"
      />
    </div>
    <div className="mt-4">
      <ChampTexte
        name={`${prefix}.pays`}
        libelle="Pays"
        optionFormatage="PREMIER_MAJUSCULE"
      />
    </div>
    <div className="mt-4">
      {afficherAdresse && (
        <ChampTexte
          name={`${prefix}.adresse`}
          libelle="Adresse"
        />
      )}
    </div>
  </div>
));

const FormulaireAdresse: React.FC<IFormulaireAdresseProps> = memo(({ prefix, libelle, afficherAdresse = true }) => {
  const [fieldTypeLieu] = useField(`${prefix}.typeLieu`);

  return (
    <div>
      <ChampsRadio
        name={`${prefix}.typeLieu`}
        libelle={libelle}
        options={TYPES_LIEU}
      />
      {fieldTypeLieu.value === "France" && (
        <AdresseFrance
          prefix={prefix}
          afficherAdresse={afficherAdresse}
        />
      )}
      {fieldTypeLieu.value === "Étranger" && (
        <AdresseEtranger
          prefix={prefix}
          afficherAdresse={afficherAdresse}
        />
      )}
    </div>
  );
});

export default FormulaireAdresse;
