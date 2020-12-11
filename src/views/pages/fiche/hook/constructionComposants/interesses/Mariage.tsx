import React from "react";
import { IMariageInteresse } from "../../../../../../model/ficheRcRca/FicheRcInterfaces";
import {
  IDateCompose,
  getDateStringFromDateCompose
} from "../../../../../common/util/DateUtils";
import "./sass/Mariage.scss";
import { LieuxUtils } from "../../../../../../model/Lieux";

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
            {getLibelleDateMariage(props.dateMariage)}
          </label>
        }
        <span className="valueContent mariage">
          {getDateStringFromDateCompose(props.dateMariage)}
        </span>
      </span>
    </>
  );
};

function getLibelleLieuMariage(mariage: IMariageInteresse): string {
  if (!mariage.aletranger && !LieuxUtils.isPaysFrance(mariage.paysMariage)) {
    return "Mariés";
  } else {
    return "Mariés à";
  }
}

function getLibelleDateMariage(date: IDateCompose) {
  if (date && date.jour) {
    return "Le";
  } else {
    return "En";
  }
}

function getLieuMariage(mariage: IMariageInteresse) {
  const villeString = mariage.villeMariage
    ? `${mariage.villeMariage
        .charAt(0)
        .toUpperCase()}${mariage.villeMariage.slice(1)}`
    : "";
  const regionString = mariage.regionMariage
    ? `${mariage.regionMariage
        .charAt(0)
        .toUpperCase()}${mariage.regionMariage.slice(1)}`
    : "";
  const paysString = mariage.paysMariage
    ? `${mariage.paysMariage
        .charAt(0)
        .toUpperCase()}${mariage.paysMariage.slice(1)}`
    : "";

  if (mariage.aletranger === true) {
    const regionMariage = `- ${regionString}`;
    return `${villeString} ${
      regionString ? regionMariage : ""
    } (${paysString})`;
  } else if (!LieuxUtils.isPaysFrance(paysString)) {
    return `devant les autorités consulaires de ${villeString} en France`;
  } else if (!mariage.arrondissementMariage) {
    return `${villeString} (${regionString})`;
  } else {
    return `${villeString} (Arr.${mariage.arrondissementMariage} ${
      LieuxUtils.isVilleParis(villeString) ? "" : regionString
    })`;
  }
}
