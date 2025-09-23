import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";

export interface ITypeMentionDto {
  idTypeMention: string;
  libelleType: string;
  idNatureMention?: string;
  natureActe: keyof typeof ENatureActe;
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
