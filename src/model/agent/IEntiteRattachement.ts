import { Option } from "@util/Type";
import { storeRece } from "./../../views/common/util/storeRece";
import { TypeEntite } from "./enum/TypeEntite";

const CODE_ENTITE_ETABLISSEMENT = "Etablissement";

export interface IHierarchieEntite {
  entite?: IEntite;
  entiteMere: IEntite;
}

export interface IEntite {
  idEntite: string;
  type: TypeEntite;
  code: string;
  libelleEntite: string;
  hierarchieEntite?: IHierarchieEntite[];
  utilisateur?: any;
  estDansSCEC?: boolean;
}

export const Entite = {
  getEntite(codeEntite: string) {
    return storeRece.listeEntite.find(entite => entite.code === codeEntite);
  },
  getEntiteEtablissement() {
    return this.getEntite(CODE_ENTITE_ETABLISSEMENT);
  },
  mapCommeOptions(entites?: IEntite[]): Option[] {
    return entites
      ? entites.map(entite => ({
          libelle: entite.libelleEntite,
          cle: entite.idEntite
        }))
      : [];
  }
};

export function getEntiteParId(idEntite: string): IEntite | undefined {
  return storeRece.listeEntite.find(entite => entite.idEntite === idEntite);
}
