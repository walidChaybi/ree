import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { IPaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { ITypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";

const URI = "/nomenclature/:nomsNomenclatures";

const CONFIG_GET_NOMENCLATURES_REQUETE: TConfigurationApi<
  typeof URI,
  undefined,
  undefined,
  (IDocumentDelivrance | ITypePieceJustificative | IPaysSecabilite)[]
> = {
  api: REQUETE_API,
  methode: "GET",
  uri: URI
};

export default CONFIG_GET_NOMENCLATURES_REQUETE;
