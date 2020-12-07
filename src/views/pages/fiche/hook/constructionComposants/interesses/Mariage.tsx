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
  if (date.jour) {
    return "Le";
  } else {
    return "En";
  }
}

function getLieuMariage(mariage: IMariageInteresse) {
  if (mariage.aletranger === true) {
    const regionMariage = `- ${mariage.regionMariage}`;
    return `${mariage.villeMariage} ${
      mariage.regionMariage ? regionMariage : ""
    } (${mariage.paysMariage})`;
  } else if (!LieuxUtils.isPaysFrance(mariage.paysMariage)) {
    return `devant les autorités consulaires de ${mariage.villeMariage} en France`;
  } else if (!mariage.arrondissementMariage) {
    return `${mariage.villeMariage} (${mariage.regionMariage})`;
  } else {
    return `${mariage.villeMariage} (Arr.${mariage.arrondissementMariage} ${
      LieuxUtils.isVilleParis(mariage.villeMariage) ? "" : mariage.regionMariage
    })`;
  }
}
