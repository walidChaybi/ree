import { Option } from "@util/Type";
import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";

type TChampListeDeroulanteProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  libelle: string;
  options: Option[];
  pendantChangement?: () => void;
  premiereLettreMajuscule?: boolean;
};

const ChampListeDeroulante: React.FC<TChampListeDeroulanteProps> = ({
  name,
  libelle,
  className,
  options,
  pendantChangement,
  premiereLettreMajuscule,
  ...props
}) => {
  const [field, meta] = useField(name as string);
  const enErreur = useMemo<boolean>(() => Boolean(meta.error) && meta.touched, [meta]);

  return (
    <div className={`relative flex w-full flex-col text-start ${className ?? ""}`.trim()}>
      <label
        className={`m-0 mb-1 ml-1 block w-fit text-start transition-colors ${enErreur ? "text-rouge" : "text-bleu-sombre"}`}
        htmlFor={name as string}
      >
        {libelle}
      </label>
      <select
        id={name}
        className={`select-rece border-1 flex flex-grow rounded border border-solid bg-blanc px-2 py-[.325rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-70 disabled:bg-gris-clair ${enErreur ? "border-rouge focus-visible:ring-rouge" : "border-gris focus-visible:ring-bleu"}`}
        {...props}
        {...field}
        onChange={e => {
          field.onChange(e);
          pendantChangement?.();
        }}
      >
        {[{ cle: "", libelle: "" }, ...options]?.map(option => (
          <option
            key={option.cle}
            value={option.cle}
            selected={field.value === option.cle}
            hidden={option.cle === ""}
          >
            {option.libelle.length
              ? premiereLettreMajuscule
                ? `${option.libelle.charAt(0).toUpperCase()}${option.libelle.substring(1)}`
                : option.libelle
              : ""}
          </option>
        ))}
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
