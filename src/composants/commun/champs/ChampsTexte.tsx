import { CENT } from "@util/Utils";
import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";

type TChampsTexteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  numerique?: boolean;
  optionFormatage?: TFormatChampsTexte;
};

type TFormatChampsTexte = "PREMIER_MAJUSCULE" | "NOMS_PROPRES" | "MAJUSCULES" | "SANS_ESPACES";
const ChampsTexte: React.FC<TChampsTexteProps> = ({
  name,
  libelle,
  className,
  maxLength,
  numerique = false,
  optionFormatage,
  ...props
}) => {
  const [field, meta] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <div className={`flex w-full flex-col text-start ${className ?? ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
      </label>
      <input
        id={name}
        className={`border-1 flex flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
        maxLength={maxLength ?? CENT}
        onChange={event => {
          switch (true) {
            case numerique:
              event.target.value = event.target.value.replace(/\D/, "");
              break;
            case optionFormatage === "PREMIER_MAJUSCULE":
              event.target.value = `${event.target.value?.charAt(0).toUpperCase()}${event.target.value?.substring(1)}`;
              break;
            case optionFormatage === "NOMS_PROPRES":
              event.target.value = "";
              break;
            case optionFormatage === "MAJUSCULES":
              event.target.value = event.target.value?.toUpperCase();
              break;
            case optionFormatage === "SANS_ESPACES":
              event.target.value = event.target.value?.replace(/\s/g, "");
              break;
            default:
              break;
          }
          field.onChange(event);
        }}
        {...(() => {
          const { onChange, onBlur, ...propsFormik } = field;

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
