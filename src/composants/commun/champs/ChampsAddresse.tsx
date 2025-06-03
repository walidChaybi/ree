import { genererArrondissements } from "@util/Utils";
import { getIn, useField, useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import ChampListeDeroulante from "./ChampListeDeroulante";
import ChampTexte from "./ChampTexte";
import ChampsRadio from "./ChampsRadio";

interface Option {
  cle: string;
  libelle: string;
}

interface IChampsAdresseProps {
  prefixe: string;
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

const AdresseFrance = ({ prefixe, afficherAdresse = true }: { prefixe: string; afficherAdresse?: boolean }) => {
  const [fieldVille] = useField(`${prefixe}.ville`);
  const { setFieldValue } = useFormikContext();

  const estVilleSpeciale = useMemo(
    () => VILLES_SPECIALES.includes(fieldVille.value?.toLowerCase().trim() as TVilleSpeciale),
    [fieldVille.value]
  );

  useEffect(() => {
    if (fieldVille.value?.toLowerCase().trim() === "paris") {
      setFieldValue(`${prefixe}.departement`, "");
    }
  }, [fieldVille.value]);

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <ChampTexte
            name={`${prefixe}.ville`}
            libelle="Ville"
            optionFormatage="PREMIER_MAJUSCULE"
            estObligatoire
          />
        </div>
        {estVilleSpeciale && (
          <div className="flex-1">
            <ChampListeDeroulante
              name={`${prefixe}.arrondissement`}
              libelle="Arrondissement"
              options={ARRONDISSEMENTS_OPTIONS[fieldVille.value.toLowerCase().trim() as TVilleSpeciale]}
              premiereLettreMajuscule
            />
          </div>
        )}
        {fieldVille.value?.toLowerCase().trim() !== "paris" && (
          <div className="flex-1">
            <ChampTexte
              name={`${prefixe}.departement`}
              libelle="Département"
              estObligatoire
            />
          </div>
        )}
      </div>
      {afficherAdresse && (
        <ChampTexte
          name={`${prefixe}.adresse`}
          libelle="Adresse"
        />
      )}
    </div>
  );
};

const AdresseEtranger = ({ prefixe, afficherAdresse = true }: { prefixe: string; afficherAdresse?: boolean }) => (
  <div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <ChampTexte
        name={`${prefixe}.ville`}
        libelle="Ville"
        optionFormatage="PREMIER_MAJUSCULE"
      />
      <ChampTexte
        name={`${prefixe}.etatProvince`}
        libelle="État, canton, province"
      />
    </div>
    <div className="mt-4">
      <ChampTexte
        name={`${prefixe}.pays`}
        libelle="Pays"
        optionFormatage="PREMIER_MAJUSCULE"
      />
    </div>
    <div className="mt-4">
      {afficherAdresse && (
        <ChampTexte
          name={`${prefixe}.adresse`}
          libelle="Adresse"
        />
      )}
    </div>
  </div>
);

const ChampsAdresse: React.FC<IChampsAdresseProps> = memo(({ prefixe, libelle, afficherAdresse = true }) => {
  const { values, setFieldValue } = useFormikContext();
  const valeursAdresse = useMemo(() => getIn(values, prefixe), [values, prefixe]);

  return (
    <div>
      <ChampsRadio
        name={`${prefixe}.typeLieu`}
        libelle={libelle}
        options={TYPES_LIEU}
        apresChangement={typeLieu =>
          setFieldValue(`${prefixe}`, {
            ...valeursAdresse,
            adresse: "",
            arrondissement: "",
            departement: "",
            etatProvince: "",
            ville: "",
            pays: typeLieu === "FRANCE" ? "France" : ""
          })
        }
      />
      {valeursAdresse.typeLieu === "France" && (
        <AdresseFrance
          prefixe={prefixe}
          afficherAdresse={afficherAdresse}
        />
      )}
      {valeursAdresse.typeLieu === "Étranger" && (
        <AdresseEtranger
          prefixe={prefixe}
          afficherAdresse={afficherAdresse}
        />
      )}
    </div>
  );
});

export default ChampsAdresse;
