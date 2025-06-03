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

enum EVilleSpeciale {
  PARIS = "paris",
  MARSEILLE = "marseille",
  LYON = "lyon"
}

const ARRONDISSEMENTS_OPTIONS: Record<EVilleSpeciale, Option[]> = {
  paris: [{ cle: "", libelle: "" }, ...genererArrondissements(20), { cle: "centre", libelle: "centre" }],
  marseille: [{ cle: "", libelle: "" }, ...genererArrondissements(16)],
  lyon: [{ cle: "", libelle: "" }, ...genererArrondissements(9)]
};

const AdresseFrance = ({ prefixe, afficherAdresse = true }: { prefixe: string; afficherAdresse?: boolean }) => {
  const [fieldVille] = useField(`${prefixe}.ville`);
  const { values, setFieldValue } = useFormikContext();

  const villeSpeciale = useMemo(() => {
    const villeSaisie = fieldVille.value?.toLowerCase().trim();

    return Object.values(EVilleSpeciale).includes(villeSaisie) ? (villeSaisie as EVilleSpeciale) : null;
  }, [fieldVille.value]);

  useEffect(() => {
    if (!villeSpeciale && getIn(values, `${prefixe}.arrondissement`)) setFieldValue(`${prefixe}.arrondissement`, "");
    if (villeSpeciale === EVilleSpeciale.PARIS && getIn(values, `${prefixe}.departement`)) {
      setFieldValue(`${prefixe}.departement`, "");
    }
  }, [villeSpeciale]);

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
        {villeSpeciale && (
          <div className="flex-1">
            <ChampListeDeroulante
              name={`${prefixe}.arrondissement`}
              libelle="Arrondissement"
              options={ARRONDISSEMENTS_OPTIONS[villeSpeciale]}
              premiereLettreMajuscule
            />
          </div>
        )}
        {villeSpeciale !== EVilleSpeciale.PARIS && (
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
