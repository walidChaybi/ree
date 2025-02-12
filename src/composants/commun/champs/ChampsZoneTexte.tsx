import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";
import "./ChampsZoneTexte.scss";

type TRedimensionnement = "fixe" | "vertical" | "horizontal";

type TChampsZoneTexteProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  libelle?: string;
  typeRedimensionnement?: TRedimensionnement;
};

const getClassRedimensionnement = (typeRedimensionnement?: TRedimensionnement) => {
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

const ChampsZoneTexte: React.FC<TChampsZoneTexteProps> = ({ name, libelle, typeRedimensionnement, ...props }) => {
  const [field, meta] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
      </label>
      <textarea
        className={`font-noto-sans-ui text-base ${getClassRedimensionnement(typeRedimensionnement)}`}
        id={name}
        {...props}
        onChange={event => {
          if (props.maxLength !== undefined) {
            event.target.value = event.target.value.slice(0, props?.maxLength);
          }

          field.onChange(event);
        }}
        {...() => {
          const { onChange, ...propsFormik } = field;

          return propsFormik;
        }}
      />
      {meta.error && (
        <div className="message-erreur-textearea">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default ChampsZoneTexte;
