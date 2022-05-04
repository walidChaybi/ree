import { NatureActe } from "../../../../../../../../../model/etatcivil/enum/NatureActe";
import { getLibelle } from "../../../../../../../../common/util/Utils";

interface ILabel {
  dateEvenement: string;
  lieuEvenement: string;
}
export function getLabels(natureActe: NatureActe) {
  const label: ILabel = { dateEvenement: "", lieuEvenement: "" };

  switch (natureActe) {
    case NatureActe.NAISSANCE:
      label.dateEvenement = getLibelle("Date de naissance");
      label.lieuEvenement = getLibelle("Lieu de naissance");
      break;
    case NatureActe.DECES:
      label.dateEvenement = getLibelle("Date de déces");
      label.lieuEvenement = getLibelle("Lieu de déces");
      break;

    case NatureActe.MARIAGE:
      label.dateEvenement = getLibelle("Date de mariage");
      label.lieuEvenement = getLibelle("Lieu de mariage");
      break;
  }

  return label;
}
