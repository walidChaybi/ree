import { Option } from "@util/Type";
import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";

type TChampsRadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
  options: Option[];
  desactive?: boolean;
};

const ChampsRadio: React.FC<TChampsRadioProps> = ({ name, libelle, className, options, desactive, ...props }) => {
  const [field, meta] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <fieldset className={`m-0 flex w-full flex-col border-0 p-0 text-start ${className ?? ""}`.trim()}>
      <legend
        className={`m-0 mb-1 ml-1 block w-fit text-start text-base transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
      >
        {libelle}
      </legend>
      <div className="ml-1.5 mt-2.5 flex w-full flex-wrap gap-x-10 gap-y-4 text-start">
        {...options.map((option: Option) => {
          return (
            <div key={`${name}-${option.cle}`}>
              <input
                id={`${name}-${option.cle}`}
                type="radio"
                className={`m-0 mt-0.5 cursor-pointer accent-bleu-sombre selection:transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
                {...(() => {
                  const { value, ...propsFormik } = field;
                  return propsFormik;
                })()}
                disabled={desactive}
                value={option.cle}
                checked={option.cle === field.value}
                {...props}
              />
              <label
                className="cursor-pointer pl-2"
                htmlFor={`${name}-${option.cle}`}
              >
                {option.libelle}
              </label>
            </div>
          );
        })}
      </div>
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </fieldset>
  );
};

export default ChampsRadio;
