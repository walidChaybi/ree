import { ErrorMessage, useField } from "formik";

type TChampsCaseACocherProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  libelle: string;
  apresChangement?: (valeur: boolean) => void;
};

const ChampCaseACocher: React.FC<TChampsCaseACocherProps> = ({ name, libelle, disabled, apresChangement, ...props }) => {
  const [field, meta] = useField(name as string);

  return (
    <div className={`${props.className ?? ""}`}>
      <label className={`flex w-fit text-start ${disabled ? "cursor-default opacity-60" : "cursor-pointer"}`.trim()}>
        <input
          type="checkbox"
          {...props}
          {...field}
          checked={field.value}
          disabled={disabled}
          className={`${disabled ? "cursor-default" : "cursor-pointer accent-bleu-sombre"}`}
          onChange={event => {
            apresChangement?.(event.target.checked);
            field.onChange(event);
          }}
        />
        <span className="ml-2 select-none text-nowrap font-semibold text-bleu-sombre">{libelle}</span>
      </label>
      {meta.error && (
        <div className="message-erreur-textearea">
          <ErrorMessage name={name ?? ""} />
        </div>
      )}
    </div>
  );
};

export default ChampCaseACocher;
