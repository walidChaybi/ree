import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/analyse-marginale/acte/:idActe";

export interface IMiseAJourAnalyseMarginaleDto {
  motifModification: string;
  titulaires: {
    ordre: number;
    nom: string;
    prenoms: string[];
    nomPartie1: string | null;
    nomPartie2: string | null;
  }[];
}

export const CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE: TConfigurationApi<typeof URI, IMiseAJourAnalyseMarginaleDto> = {
  api: ETATCIVIL_API,
  methode: "PUT",
  uri: URI,
  avecAxios: true
};
