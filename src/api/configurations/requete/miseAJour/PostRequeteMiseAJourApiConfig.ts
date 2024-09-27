import { TConfigurationApi } from "@model/api/Api";
import { ITitulaireRequeteMiseAJour } from "@model/requete/ITitulaireRequeteMiseAJour";
import { SousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";

const URI = "/requetes/mise-a-jour";

interface IBody {
  idActeMAJ: string;
  choixMAJ: "MAJ_ACTE_APPOSER_MENTION" | "MAJ_ACTE_ANALYSE_MARGINALE";
  sousType:
    | typeof SousTypeMiseAJour.RMAC.nom
    | typeof SousTypeMiseAJour.RMAR.nom;
  titulaires: ITitulaireRequeteMiseAJour[];
}

interface IResultat {
  id: string;
}

export const CONFIG_POST_REQUETE_MISE_A_JOUR: TConfigurationApi<
  typeof URI,
  IBody,
  undefined,
  IResultat
> = {
  api: {
    nom: "rece-requete-api",
    version: "v2"
  },
  methode: "POST",
  uri: URI
};
