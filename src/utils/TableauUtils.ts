import { THeader } from "@model/api/Api";
import { IParametresRecherche } from "../composants/commun/tableau/Tableau";

const TableauUtils = {
  recupererPlageDepuisParametresRecherche: (parametresRecherche: IParametresRecherche) => {
    return parseInt(parametresRecherche.range?.split("-")[0] ?? "0");
  },
  recupererNombreTotalLignesDepuisHeaders: (headers: THeader) => {
    return parseInt((headers["content-range"] ?? "").split("/")[1] ?? "");
  }
} as const;

export default TableauUtils;
