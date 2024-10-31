import { ErrorMessage } from "formik";
import React from "react";
import ChampRecherche, { IChampRechercheProps } from "../../../../../composants/commun/champs/ChampRecherche";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import "./scss/ChampRecherche.scss";

export type ChampRechercheFieldProps = IChampRechercheProps & {
  label: string;
};

export const ChampRechercheField: React.FC<ChampRechercheFieldProps> = ({ name, label, ...props }) => {
  return (
    <div className="BlockInput ChampRecherche">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="FieldContainer">
        <ChampRecherche name={name} {...props} />
        <div className="BlockErreur">
          <ErrorMessage component={IconErrorMessage} name={name} />
        </div>
      </div>
    </div>
  );
};
