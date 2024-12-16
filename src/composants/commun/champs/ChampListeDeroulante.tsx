import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";

type TChampListeDeroulanteProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  libelle: string;
  options: string[];
};

const ChampListeDeroulante: React.FC<TChampListeDeroulanteProps> = ({ name, libelle, className, options, ...props }) => {
  const [field, meta] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <div
      className={`relative flex w-full flex-col text-start ${className ?? ""} ${meta.error && meta.touched ? "champs-en-erreur" : ""}`.trim()}
    >
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
      </label>
      <select
        id={name}
        className={`select-rece border-1 flex flex-grow rounded border border-solid px-2 py-1 transition-colors read-only:bg-gris-clair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
        {...props}
        {...field}
      >
        {options?.map(option => {
          return (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>

      {meta.error && (
        <div className="text-start text-sm text-rouge">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampListeDeroulante;
