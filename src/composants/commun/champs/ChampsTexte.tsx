import { ErrorMessage, useField } from "formik";
import React from "react";
import "./ChampsTexte.scss";

type TChampsTexteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  libelle: string;
};

const ChampsTexte: React.FC<TChampsTexteProps> = ({
  name,
  libelle,
  className,
  ...props
}) => {
  const [field, meta] = useField(name as string);

  return (
    <>
      <div className={`champs-texte-rece ${className ?? ""}`.trim()}>
        <label htmlFor={name as string}>{libelle}</label>
        <input className="input-texte-rece" {...props} {...field} />
      </div>
      {meta.error && (
        <div className="message-erreur-textearea">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default ChampsTexte;
