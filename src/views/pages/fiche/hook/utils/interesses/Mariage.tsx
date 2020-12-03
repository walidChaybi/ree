import React from "react";
import { IMariageInteresse } from "../../FicheRcInterfaces";
import {
  IDateCompose,
  getDateStringFromDateCompose
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
  if (!mariage.aletranger && mariage.paysMariage.toUpperCase() !== "FRANCE") {
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
  } else if (mariage.paysMariage.toUpperCase() !== "FRANCE") {
    return `devant les autorités consulaires de ${mariage.villeMariage} en France`;
  } else if (!mariage.arrondissementMariage) {
    return `${mariage.villeMariage} (${mariage.regionMariage})`;
  } else {
    return `${mariage.villeMariage} (Arr.${mariage.arrondissementMariage} ${
      mariage.villeMariage.toUpperCase() === "PARIS"
        ? ""
        : mariage.regionMariage
    })}`;
  }
}
