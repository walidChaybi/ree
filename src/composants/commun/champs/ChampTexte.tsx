import { ErrorMessage, useField } from "formik";
import { Ref, useCallback } from "react";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

type TFormatChampsTexte = "PREMIER_MAJUSCULE" | "NOMS_PROPRES" | "MAJUSCULES" | "SANS_ESPACES";

interface IBoutonIcon {
  composant?: JSX.Element;
  estAGauche?: boolean;
}

type TChampsTexteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  libelle?: string;
  numerique?: boolean;
  optionFormatage?: TFormatChampsTexte;
  estObligatoire?: boolean;
  boutonChamp?: IBoutonIcon;
  regex?: RegExp;
  refChamp?: Ref<HTMLInputElement>;
};

const ChampTexte: React.FC<TChampsTexteProps> = ({
  name,
  libelle,
  className,
  maxLength,
  numerique,
  optionFormatage,
  estObligatoire,
  boutonChamp = {
    composant: <></>,
    estAGauche: false
  },
  regex,
  refChamp,
  ...props
}) => {
  const [field, meta, helper] = useField(name);
  const enErreur = Boolean(meta.error) && meta.touched;

  const formaterValeur = useCallback(
    (valeur: string): string => {
      if (!valeur) return "";
      switch (optionFormatage) {
        case "PREMIER_MAJUSCULE":
          return valeur.charAt(0).toUpperCase() + valeur.slice(1).toLowerCase();
        case "NOMS_PROPRES":
          return valeur.toLowerCase().replace(/(?:^|\s|-)\p{L}/gu, l => l.toUpperCase());
        case "MAJUSCULES":
          return valeur.toUpperCase();
        case "SANS_ESPACES":
          return valeur.replace(/\s+/g, "");
        default:
          return valeur;
      }
    },
    [optionFormatage]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const valeurFormatee = formaterValeur(event.target.value.trim());
      field.onBlur(event);
      helper.setValue(valeurFormatee);
    },
    [formaterValeur, field, helper]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let valeur = event.target.value;

      if (numerique) {
        valeur = valeur.replace(/\D/g, "");
      } else if (regex) {
        valeur = valeur.replace(regex, "");
      }

      helper.setValue(valeur);
    },
    [helper, numerique, regex]
  );

  return (
    <div
      className={`flex w-full flex-col text-start ${libelle ? "" : "justify-end"} ${className ?? ""} ${enErreur ? CHAMP_EN_ERREUR : ""}`.trim()}
    >
      {libelle && (
        <label
          className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
          htmlFor={name}
        >
          {libelle}
          {estObligatoire && <span className="ml-1 text-rouge">*</span>}
        </label>
      )}
      <div className="relative flex rounded-md shadow-sm">
        <input
          {...field}
          {...props}
          id={name}
          ref={refChamp}
          maxLength={maxLength}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border-1 flex w-full flex-grow rounded border border-solid px-2 py-1 ${boutonChamp?.estAGauche ? "pl-12" : ""} transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
        />
        {boutonChamp.composant}
      </div>
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name ?? ""} />
        </div>
      )}
    </div>
  );
};

export default ChampTexte;
