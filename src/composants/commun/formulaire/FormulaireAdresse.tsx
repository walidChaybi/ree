import { ILocalisation } from "@model/requete/IParents";
import { genererArrondissements } from "@util/Utils";
import React, { memo, useMemo } from "react";
import ChampListeDeroulante from "../champs/ChampListeDeroulante";
import ChampTexte from "../champs/ChampTexte";
import ChampsRadio from "../champs/ChampsRadio";

interface Option {
  cle: string;
  libelle: string;
}

type TTypeLieu = ILocalisation["typeLieu"];

interface IFormulaireAdresseProps {
  prefix: string;
  categorieLieu?: TTypeLieu;
  ville?: string;
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

const AdresseFrance = memo(({ prefix, ville }: { prefix: string; ville?: string }) => {
  const estVilleSpeciale = useMemo(() => VILLES_SPECIALES.includes(ville?.toLowerCase() as TVilleSpeciale), [ville]);

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
              options={ARRONDISSEMENTS_OPTIONS[ville?.toLowerCase() as TVilleSpeciale]}
              premiereLettreMajuscule
            />
          </div>
        )}
        {ville?.toLowerCase() !== "paris" && (
          <div className="flex-1">
            <ChampTexte
              name={`${prefix}.departement`}
              libelle="Département"
            />
          </div>
        )}
      </div>
      <ChampTexte
        name={`${prefix}.adresse`}
        libelle="Adresse"
      />
    </div>
  );
});

const AdresseEtranger = memo(({ prefix }: { prefix: string }) => (
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
      <ChampTexte
        name={`${prefix}.adresse`}
        libelle="Adresse"
      />
    </div>
  </div>
));

const FormulaireAdresse: React.FC<IFormulaireAdresseProps> = memo(({ prefix, categorieLieu, ville }) => {
  return (
    <div>
      <ChampsRadio
        name={`${prefix}.typeLieu`}
        libelle=""
        options={TYPES_LIEU}
      />

      {categorieLieu === "France" && (
        <AdresseFrance
          prefix={prefix}
          ville={ville}
        />
      )}
      {categorieLieu === "Étranger" && <AdresseEtranger prefix={prefix} />}
    </div>
  );
});

export default FormulaireAdresse;
