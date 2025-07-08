import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";
import { TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ITitulaireRequeteAssocieeDto } from "@model/rmc/requete/TitulaireRequeteAssociee";
import { IEnveloppeCriteresRMCAutoRequete } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";

const URI = "/requetes/rmcauto";

interface IQuery {
  range?: string;
}

export interface IRequeteRMCAutoDto<TTypeRequete extends keyof typeof ETypeRequete> {
  id: string;
  dateCreation: number;
  titulaires: ITitulaireRequeteAssocieeDto[];
  type: TTypeRequete;
  sousType: TSousTypeRequete<TTypeRequete>;
  statut: keyof typeof EStatutRequete;
  numero: string;
}

export type TRequeteRMCAutoDto = IRequeteRMCAutoDto<"CREATION" | "DELIVRANCE" | "INFORMATION" | "MISE_A_JOUR">;

export const CONFIG_POST_RMC_AUTO_REQUETE: TConfigurationApi<typeof URI, IEnveloppeCriteresRMCAutoRequete, IQuery, TRequeteRMCAutoDto[]> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI,
  avecAxios: true
};
