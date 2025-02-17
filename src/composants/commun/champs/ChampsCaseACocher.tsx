import { ErrorMessage, useField } from "formik";

type TChampsCaseACocherProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { libelle: string };

const ChampsCaseACocher: React.FC<TChampsCaseACocherProps> = ({ name, libelle, disabled, ...props }) => {
  const [field, meta] = useField(name as string);

  return (
    <>
      <label className={`flex w-fit text-start ${disabled ? "cursor-default opacity-60" : "cursor-pointer"}`.trim()}>
        <input
          type="checkbox"
          {...props}
          {...field}
          checked={field.value}
          disabled={disabled}
          className={`${disabled ? "cursor-default" : "cursor-pointer accent-bleu-sombre"}`}
        />
        <span className="ml-2 select-none text-nowrap font-semibold text-bleu-sombre">{libelle}</span>
      </label>
      {meta.error && (
        <div className="message-erreur-textearea">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default ChampsCaseACocher;
