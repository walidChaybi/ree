import { IDateCompose } from "@util/DateUtils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export interface IMariageInteresse {
  villeMariage: string;
  arrondissementMariage?: string;
  regionMariage: string;
  paysMariage: string;
  dateMariage: IDateCompose;
  aletranger: boolean;
}

export const getLibelleLieuMariage = (mariage: IMariageInteresse): string => {
  if (!mariage.aletranger && !LieuxUtils.estPaysFrance(mariage.paysMariage)) {
    return "Mariés";
  } else {
    return "Mariés à";
  }
};

export const getLieuMariage = (mariage: IMariageInteresse) => {
  const villeString = mariage.villeMariage ? `${mariage.villeMariage.charAt(0).toUpperCase()}${mariage.villeMariage.slice(1)}` : "";
  const regionString = mariage.regionMariage ? `${mariage.regionMariage.charAt(0).toUpperCase()}${mariage.regionMariage.slice(1)}` : "";
  const paysString = mariage.paysMariage ? `${mariage.paysMariage.charAt(0).toUpperCase()}${mariage.paysMariage.slice(1)}` : "";
  const regionStringParentheses = `(${regionString})`;

  if (mariage.aletranger === true) {
    const regionMariage = `- ${regionString}`;
    return `${villeString} ${regionString ? regionMariage : ""} (${paysString})`;
  } else if (!LieuxUtils.estPaysFrance(paysString)) {
    return `devant les autorités consulaires de ${paysString} en France`;
  } else if (!mariage.arrondissementMariage) {
    return `${villeString} ${regionStringParentheses}`;
  } else {
    return `${villeString} ${LieuxUtils.formateArrondissement(
      mariage.arrondissementMariage,
      true
    )} ${LieuxUtils.estVilleParis(villeString) ? "" : regionStringParentheses}`;
  }
};
