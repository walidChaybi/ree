import { CENT } from "@util/Utils";
import { ErrorMessage, useField } from "formik";
import "./ChampsTexte.scss";

type TChampsTexteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
};

const ChampsTexte: React.FC<TChampsTexteProps> = ({ name, libelle, className, maxLength, ...props }) => {
  const [field, meta] = useField(name as string);

  return (
    <div className={`champs-texte-rece ${className ?? ""} ${meta.error && meta.touched ? "champs-en-erreur" : ""}`.trim()}>
      <label htmlFor={name as string}>{libelle}</label>
      <input id={name} className="input-texte-rece" maxLength={maxLength ?? CENT} {...props} {...field} />
      {meta.error && (
        <div className="message-erreur-texte">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampsTexte;
