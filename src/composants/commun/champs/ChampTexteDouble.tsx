import { useField } from "formik";
import { useMemo, useState } from "react";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

interface ITexteDoubleProps {
  proprietesPremierChamp: React.InputHTMLAttributes<HTMLInputElement>;
  proprietesSecondChamp: React.InputHTMLAttributes<HTMLInputElement>;
  libelle: string;
  estObligatoire?: boolean;
}

const seulementNumerique = (texte: string) => texte.replace(/\D/, "");

const ChampTexteDouble: React.FC<ITexteDoubleProps> = ({ proprietesPremierChamp, proprietesSecondChamp, libelle, estObligatoire }) => {
  const [fieldPremierChamp, metaPremierChamp] = useField(proprietesPremierChamp.name as string);
  const [fieldSecondChamp, metaSecondChamp] = useField(proprietesSecondChamp.name as string);
  const [refPremierChamp, setRefPremierChamp] = useState<HTMLInputElement | null>(null);
  const [refSecondChamp, setRefSecondChamp] = useState<HTMLInputElement | null>(null); // A deghager si pas de nb max de caractères
  const enErreur = useMemo(
    () => (Boolean(metaPremierChamp.error) && metaPremierChamp.touched) || (Boolean(metaSecondChamp.error) && metaSecondChamp.touched),
    [metaPremierChamp, metaSecondChamp]
  );

  return (
    <div {...(enErreur ? { className: CHAMP_EN_ERREUR } : {})}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={proprietesPremierChamp.name}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">{"*"}</span>}
      </label>
      <div className="grid grid-cols-2 gap-3 rounded-md shadow-sm">
        <input
          ref={setRefPremierChamp}
          id={proprietesPremierChamp.name}
          data-testid={proprietesPremierChamp.name}
          className={`border-1 flex w-auto flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valeur = seulementNumerique(event.target.value);
            valeur.length === 4 && refSecondChamp?.focus();
            event.target.value = valeur;
            fieldPremierChamp.onChange(event);
          }}
          {...proprietesPremierChamp}
          {...(() => {
            const { onChange, ...autreProps } = fieldPremierChamp;

            return autreProps;
          })()}
        />
        <input
          ref={setRefSecondChamp}
          id={proprietesSecondChamp.name}
          data-testid={proprietesSecondChamp.name}
          className={`border-1 flex w-auto flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valeur = seulementNumerique(event.target.value);
            !valeur.length && fieldSecondChamp.value.length && refPremierChamp?.focus();
            event.target.value = valeur;
            fieldSecondChamp.onChange(event); // Juste passer valeur si pas numerique seulement
          }}
          {...proprietesSecondChamp}
          {...(() => {
            const { onChange, ...autreProps } = fieldSecondChamp;

            return autreProps;
          })()}
        />
      </div>
      {enErreur && <div className="text-start text-sm text-rouge">{metaPremierChamp.error ?? metaSecondChamp.error}</div>}
    </div>
  );
};

export default ChampTexteDouble;
