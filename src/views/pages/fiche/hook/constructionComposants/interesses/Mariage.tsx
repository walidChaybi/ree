import {
  getLibelleLieuMariage,
  getLieuMariage,
  IMariageInteresse
} from "@model/etatcivil/rcrca/IMariageInteresse";
import DateUtils from "@util/DateUtils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import React from "react";
import "./scss/Mariage.scss";

export const Mariage: React.FC<IMariageInteresse> = props => {
  return (
    <>
      {<label className="libelleContent">{getLibelleLieuMariage(props)}</label>}
      <span className="valueContent mariage">{getLieuMariage(props)}</span>
      <span>
        {<label className="libelleContent">{EtatCivilUtil.formatLeOuEnAPartirDate(props.dateMariage)}</label>}
        <span className="valueContent mariage">{DateUtils.getDateStringFromDateCompose(props.dateMariage)}</span>
      </span>
    </>
  );
};
