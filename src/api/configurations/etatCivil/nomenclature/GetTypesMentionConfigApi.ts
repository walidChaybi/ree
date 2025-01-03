import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

export interface ITypeMentionDto {
  idTypeMention: string;
  libelleType: string;
  idNatureMention?: string;
  natureActe: string;
  typeMentionEnfantList?: ITypeMentionDto[];
  affecteAnalyseMarginale: boolean;
  estPresentListeDeroulante: boolean;
  estSousType: boolean;
  estSaisieAssistee: boolean;
}

const URI = "/nomenclature/typemention";

const CONFIG_GET_TYPES_MENTION: TConfigurationApi<typeof URI, undefined, undefined, ITypeMentionDto[]> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};

export default CONFIG_GET_TYPES_MENTION;
