import { ErrorMessage, useField } from "formik";
import { useMemo } from "react";
import "./ChampsZoneTexte.scss";

type TChampsZoneTexteProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { libelle?: string };

const ChampsZoneTexte: React.FC<TChampsZoneTexteProps> = ({ name, libelle, ...props }) => {
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
        {...props}
        {...field}
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
