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
    <div className={`flex w-full flex-col text-start ${className ?? ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
        {/* </label> */}
        <div className="mt-2.5 flex w-full flex-wrap gap-4 text-start">
          {...options.map((option: Option) => {
            return (
              <div key={`${name}-${option.cle}`}>
                <input
                  id={`${name}-${option.cle}`}
                  type="radio"
                  className={`m-0 mt-0.5 cursor-pointer selection:transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
                  {...(() => {
                    const { onChange: _, ...propsFormik } = field;

                    return propsFormik;
                  })()}
                  {...field}
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
      </label>
      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampsRadio;
