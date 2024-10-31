import { ErrorMessage } from "formik";
import React from "react";
import ChampRecherche, { IChampRechercheProps } from "../../../../../composants/commun/champs/ChampRecherche";
import { IconErrorMessage } from "../erreur/IconeErreurMessage";
import "./scss/ChampRecherche.scss";

export type ChampRechercheFieldProps = IChampRechercheProps & {
  label: string;
  componentName: string;
};

export const ChampRechercheField: React.FC<ChampRechercheFieldProps> = ({ componentName, label, ...props }) => {
  return (
    <div className="BlockInput ChampRecherche">
      {label && <label htmlFor={componentName}>{label}</label>}
      <div className="FieldContainer">
        <ChampRecherche {...props} />
        <div className="BlockErreur">
          <ErrorMessage
            component={IconErrorMessage}
            name={componentName}
          />
        </div>
      </div>
    </div>
  );
};
