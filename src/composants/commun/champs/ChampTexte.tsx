import { CENT } from "@util/Utils";
import { ErrorMessage, useField } from "formik";
import { useCallback, useMemo } from "react";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

type TFormatChampsTexte = "PREMIER_MAJUSCULE" | "NOMS_PROPRES" | "MAJUSCULES" | "SANS_ESPACES";

interface IBoutonIcon {
  composant?: JSX.Element;
  estAGauche?: boolean;
}

type TChampsTexteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  numerique?: boolean;
  optionFormatage?: TFormatChampsTexte;
  estObligatoire?: boolean;
  boutonChamp?: IBoutonIcon;
  regex?: RegExp;
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
  ...props
}) => {
  const [field, meta, helper] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      let nouveauFormatValeur = event.target.value;

      switch (optionFormatage) {
        case "PREMIER_MAJUSCULE":
          nouveauFormatValeur = `${event.target.value.charAt(0).toUpperCase()}${event.target.value.substring(1)}`;
          break;
        case "NOMS_PROPRES":
          nouveauFormatValeur = event.target.value
            .split(/\s/g)
            .map(nom => `${nom.charAt(0)?.toUpperCase() ?? ""}${nom.substring(1)}`)
            .join(" ")
            .split("-")
            .map(nom => `${nom.charAt(0)?.toUpperCase() ?? ""}${nom.substring(1)}`)
            .join("-");
          break;
        case "MAJUSCULES":
          nouveauFormatValeur = event.target.value.toUpperCase();
          break;
        case "SANS_ESPACES":
          nouveauFormatValeur = event.target.value.replace(/\s/g, "");
          break;
        default:
          break;
      }

      field.onBlur(event);
      helper.setValue(nouveauFormatValeur.trim());
    },
    [optionFormatage, field, helper]
  );

  const { onBlur, onChange, ...fieldProps } = field;

  return (
    <div className={`flex w-full flex-col text-start ${className ?? ""} ${enErreur ? CHAMP_EN_ERREUR : ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
        aria-label={`aria-label-${name}`}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>
      <div className="relative flex rounded-md shadow-sm">
        <input
          id={name}
          className={`border-1 flex flex-grow rounded border border-solid px-2 py-1 ${boutonChamp?.estAGauche ? "pl-12" : ""} transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
          maxLength={maxLength ?? CENT}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const regexTexte = numerique ? /\D/ : regex;
            if (regexTexte) {
              event.target.value = event.target.value.replace(regexTexte, "");
            }
            field.onChange(event);
          }}
          onBlur={handleBlur}
          {...fieldProps}
          {...props}
        />
        {boutonChamp?.composant}
      </div>
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampTexte;
