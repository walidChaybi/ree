import { ETATCIVIL_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { IMandataire } from "@model/etatcivil/enum/MandataireRc";
import { INatureMention } from "@model/etatcivil/enum/NatureMention";
import { INatureRc } from "@model/etatcivil/enum/NatureRc";
import { INatureRca } from "@model/etatcivil/enum/NatureRca";
import { ITypePopinSignature } from "@model/signature/ITypePopinSignature";

const URI = "/nomenclature/:nomsNomenclatures";

const CONFIG_GET_NOMENCLATURES_ETAT_CIVIL: TConfigurationApi<
  typeof URI,
  undefined,
  undefined,
  (INatureRc | INatureRca | IMandataire | INatureMention | ITypePopinSignature)[]
> = {
  api: ETATCIVIL_API,
  methode: "GET",
  uri: URI
};

export default CONFIG_GET_NOMENCLATURES_ETAT_CIVIL;
