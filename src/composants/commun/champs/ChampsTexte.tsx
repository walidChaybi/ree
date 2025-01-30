import { CENT } from "@util/Utils";
import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";

type TChampsTexteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  numerique?: boolean;
  optionFormatage?: TFormatChampsTexte;
  estObligatoire?: boolean;
};

type TFormatChampsTexte = "PREMIER_MAJUSCULE" | "NOMS_PROPRES" | "MAJUSCULES" | "SANS_ESPACES";
const ChampsTexte: React.FC<TChampsTexteProps> = ({
  name,
  libelle,
  className,
  maxLength,
  numerique = false,
  optionFormatage,
  estObligatoire,
  ...props
}) => {
  const [field, meta, helper] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <div className={`flex w-full flex-col text-start ${className ?? ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>
      <input
        id={name}
        className={`border-1 flex flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
        maxLength={maxLength ?? CENT}
        onChange={event => {
          if (numerique) {
            event.target.value = event.target.value.replace(/\D/, "");
          }
          field.onChange(event);
        }}
        onBlur={event => {
          let nouveauFormatValeur = event.target.value;
          switch (true) {
            case optionFormatage === "PREMIER_MAJUSCULE":
              nouveauFormatValeur = `${event.target.value.charAt(0).toUpperCase()}${event.target.value.substring(1)}`;
              break;
            case optionFormatage === "NOMS_PROPRES":
              nouveauFormatValeur = event.target.value
                .split(/\s/g)
                .map(nom => `${nom.charAt(0)?.toUpperCase() ?? ""}${nom.substring(1)}`)
                .join(" ")
                .split("-")
                .map(nom => `${nom.charAt(0)?.toUpperCase() ?? ""}${nom.substring(1)}`)
                .join("-");
              break;
            case optionFormatage === "MAJUSCULES":
              nouveauFormatValeur = event.target.value.toUpperCase();
              break;
            case optionFormatage === "SANS_ESPACES":
              nouveauFormatValeur = event.target.value.replace(/\s/g, "");
              break;
            default:
              break;
          }
          field.onBlur(event);
          helper.setValue(nouveauFormatValeur);
        }}
        {...(() => {
          const { onBlur, onChange, ...propsFormik } = field;

          return propsFormik;
        })()}
        {...props}
      />
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampsTexte;
