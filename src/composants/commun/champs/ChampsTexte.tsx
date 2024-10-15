import { CENT } from "@util/Utils";
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
  max,
  ...props
}) => {
  const [field, meta] = useField(name as string);

  return (
    <div className={`champs-texte-rece ${className ?? ""}`.trim()}>
      <label htmlFor={name as string}>{libelle}</label>
      <input
        id={name}
        className="input-texte-rece"
        max={max ?? CENT}
        {...props}
        {...field}
      />
      {meta.error && (
        <div className="message-erreur-texte">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default ChampsTexte;
