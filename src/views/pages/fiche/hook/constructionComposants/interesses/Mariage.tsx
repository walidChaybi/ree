import React from "react";
import {
  IMariageInteresse,
  getLibelleLieuMariage,
  getLieuMariage
} from "../../../../../../model/etatcivil/fiche/IMariageInteresse";
import {
  getDateStringFromDateCompose,
  formatDeOuLe
} from "../../../../../common/util/DateUtils";
import "./sass/Mariage.scss";

export const Mariage: React.FC<IMariageInteresse> = props => {
  return (
    <>
      <span>
        {
          <label className="libelleContent">
            {getLibelleLieuMariage(props)}
          </label>
        }
        <span className="valueContent mariage">{getLieuMariage(props)}</span>
      </span>
      <span>
        {
          <label className="libelleContent">
            {formatDeOuLe(props.dateMariage)}
          </label>
        }
        <span className="valueContent mariage">
          {getDateStringFromDateCompose(props.dateMariage)}
        </span>
      </span>
    </>
  );
};
