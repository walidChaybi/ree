import { EPrepositionLieu } from "@model/etatcivil/enum/EPrepositionLieu";
import { enumVersOptions, genererArrondissements } from "@util/Utils";
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
  avecLigneAdresse?: boolean;
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

const optionsPreposition = enumVersOptions(EPrepositionLieu);

const ARRONDISSEMENTS_OPTIONS: Record<EVilleSpeciale, Option[]> = {
  paris: [{ cle: "", libelle: "" }, ...genererArrondissements(20), { cle: "centre", libelle: "centre" }],
  marseille: [{ cle: "", libelle: "" }, ...genererArrondissements(16)],
  lyon: [{ cle: "", libelle: "" }, ...genererArrondissements(9)]
};

const AdresseFrance = ({ prefixe, avecLigneAdresse }: { prefixe: string; avecLigneAdresse?: boolean }) => {
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
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex gap-4">
          <ChampListeDeroulante
            name={`${prefixe}.preposition`}
            libelle="Préposition"
            options={optionsPreposition}
          />
          <ChampTexte
            name={`${prefixe}.ville`}
            libelle="Ville"
            optionFormatage="PREMIER_MAJUSCULE"
            estObligatoire
          />
        </div>
        {villeSpeciale && (
          <ChampListeDeroulante
            name={`${prefixe}.arrondissement`}
            libelle="Arrondissement"
            options={ARRONDISSEMENTS_OPTIONS[villeSpeciale]}
            premiereLettreMajuscule
          />
        )}
        {villeSpeciale !== EVilleSpeciale.PARIS && (
          <ChampTexte
            name={`${prefixe}.departement`}
            libelle="Département"
            estObligatoire
          />
        )}
        {avecLigneAdresse && (
          <ChampTexte
            name={`${prefixe}.adresse`}
            libelle="Adresse"
          />
        )}
      </div>
    </div>
  );
};

const AdresseEtranger = ({ prefixe, avecLigneAdresse }: { prefixe: string; avecLigneAdresse?: boolean }) => (
  <div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="flex gap-4">
        <ChampListeDeroulante
          name={`${prefixe}.preposition`}
          libelle="Préposition"
          options={optionsPreposition}
        />
        <ChampTexte
          name={`${prefixe}.ville`}
          libelle="Ville"
          optionFormatage="PREMIER_MAJUSCULE"
        />
      </div>
      <ChampTexte
        name={`${prefixe}.etatProvince`}
        libelle="État, canton, province"
      />
      <div>
        <ChampTexte
          name={`${prefixe}.pays`}
          libelle="Pays"
          optionFormatage="PREMIER_MAJUSCULE"
        />
      </div>

      {avecLigneAdresse && (
        <div>
          <ChampTexte
            name={`${prefixe}.adresse`}
            libelle="Adresse"
          />
        </div>
      )}
    </div>
  </div>
);

const ChampsAdresse: React.FC<IChampsAdresseProps> = memo(({ prefixe, libelle, avecLigneAdresse }) => {
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
            preposition: "A",
            pays: typeLieu === "FRANCE" ? "France" : ""
          })
        }
      />

      {valeursAdresse.typeLieu === "France" && (
        <AdresseFrance
          prefixe={prefixe}
          avecLigneAdresse={avecLigneAdresse}
        />
      )}

      {valeursAdresse.typeLieu === "Étranger" && (
        <AdresseEtranger
          prefixe={prefixe}
          avecLigneAdresse={avecLigneAdresse}
        />
      )}
    </div>
  );
});

export default ChampsAdresse;
