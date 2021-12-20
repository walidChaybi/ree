import { IDateCompose } from "../../../views/common/util/DateUtils";
import { LieuxUtils } from "../../../views/common/utilMetier/LieuxUtils";

export interface IMariageInteresse {
  villeMariage: string;
  arrondissementMariage: string;
  regionMariage: string;
  paysMariage: string;
  dateMariage: IDateCompose;
  aletranger: boolean;
}

export function getLibelleLieuMariage(mariage: IMariageInteresse): string {
  if (!mariage.aletranger && !LieuxUtils.isPaysFrance(mariage.paysMariage)) {
    return "Mariés";
  } else {
    return "Mariés à";
  }
}

export function getLieuMariage(mariage: IMariageInteresse) {
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
    return `devant les autorités consulaires de ${paysString} en France`;
  } else if (!mariage.arrondissementMariage) {
    return `${villeString} (${regionString})`;
  } else {
    return `${villeString} (Arr.${mariage.arrondissementMariage} ${
      LieuxUtils.isVilleParis(villeString) ? "" : regionString
    })`;
  }
}
