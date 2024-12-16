import { ErrorMessage, useField } from "formik";
import "./ChampsCaseACocher.scss";

type TChampsCaseACocherProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { libelle: string };

const ChampsCaseACocher: React.FC<TChampsCaseACocherProps> = ({ name, libelle, disabled, ...props }) => {
  const [field, meta] = useField(name as string);

  return (
    <>
      <label className={`champs-case-a-cocher-rece ${disabled ? "inactif" : ""}`.trim()}>
        <input
          type="checkbox"
          {...props}
          {...field}
          checked={field.value}
          disabled={disabled}
        />
        <span>{libelle}</span>
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
