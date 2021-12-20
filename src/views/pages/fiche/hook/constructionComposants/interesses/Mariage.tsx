import React from "react";
import {
  getLibelleLieuMariage,
  getLieuMariage,
  IMariageInteresse
} from "../../../../../../model/etatcivil/rcrca/IMariageInteresse";
import { getDateStringFromDateCompose } from "../../../../../common/util/DateUtils";
import { EtatCivilUtil } from "../../../../../common/utilMetier/EtatCivilUtil";
import "./scss/Mariage.scss";

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
            {EtatCivilUtil.formatLeOuEnAPartirDate(props.dateMariage)}
          </label>
        }
        <span className="valueContent mariage">
          {getDateStringFromDateCompose(props.dateMariage)}
        </span>
      </span>
    </>
  );
};
