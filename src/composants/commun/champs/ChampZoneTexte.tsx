import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";
import { CHAMP_EN_ERREUR } from "../formulaire/ScrollVersErreur";

type TRedimensionnement = "fixe" | "vertical" | "horizontal";

type TChampsZoneTexteProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  libelle?: string;
  typeRedimensionnement?: TRedimensionnement;
  sansRetourChariot?: boolean;
  estObligatoire?: boolean;
};

const getClasseRedimensionnement = (typeRedimensionnement?: TRedimensionnement) => {
  switch (typeRedimensionnement) {
    case "fixe":
      return "resize-none";
    case "vertical":
      return "resize-y";
    case "horizontal":
      return "resize-x";
    default:
      return "";
  }
};

const ChampZoneTexte: React.FC<TChampsZoneTexteProps> = ({
  name,
  libelle,
  typeRedimensionnement = "fixe",
  sansRetourChariot,
  estObligatoire,
  ...props
}) => {
  const [field, meta] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <div className={`grid ${enErreur ? CHAMP_EN_ERREUR : ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
        {estObligatoire && <span className="ml-1 text-rouge">*</span>}
      </label>
      <textarea
        className={`font-marianne text-base ${getClasseRedimensionnement(typeRedimensionnement)} transition-colors ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
        id={name}
        onKeyDown={event => {
          if (sansRetourChariot && event.key === "Enter") {
            event.preventDefault();
          }
        }}
        {...props}
        onChange={event => {
          if (props.maxLength !== undefined) event.target.value = event.target.value.slice(0, props?.maxLength);

          if (sansRetourChariot) event.target.value = event.target.value.replace(/[\r\n]+/g, " ");

          field.onChange(event);
        }}
        {...(() => {
          const { onChange, ...propsFormik } = field;

          return propsFormik;
        })()}
      />
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name ?? ""} />
        </div>
      )}
    </div>
  );
};

export default ChampZoneTexte;
