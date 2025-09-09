import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IMiseAJourAnalyseMarginaleDto } from "./PutMiseAJourAnalyseMarginaleConfigApi";

const URI = "/acte/mentions-et-analyse-marginale";

export interface IEvenementMention {
  jour: string | null;
  mois: string | null;
  annee: string | null;
  ville: string | null;
  arrondissement: string | null;
  departement: string | null;
  pays: string | null;
}

export interface IPersonneLieeDto {
  nom: string | null;
  prenoms: string | null;
}

interface IMentionEnregistree {
  idTypeMention: string;
  texteMention: string;
  numeroOrdre: number;
  evenement?: IEvenementMention;
  estSaisieAssistee?: boolean;
  personneLiee?: IPersonneLieeDto;
}

export interface IEnregistrerAnalyseMarginaleEtMentionDto {
  idActe: string;
  mentionCreationList: IMentionEnregistree[];
  analyseMarginale: IMiseAJourAnalyseMarginaleDto | null;
}

export const CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS: TConfigurationApi<typeof URI, IEnregistrerAnalyseMarginaleEtMentionDto> = {
  api: ETATCIVIL_API,
  methode: "PUT",
  uri: URI,
  avecAxios: true
};
