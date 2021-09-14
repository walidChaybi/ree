import { IPrenomOrdonnes } from "../../../../model/requete/v2/IPrenomOrdonnes";

export function getPrenoms(prenoms: any): IPrenomOrdonnes[] {
  const prenomsInteresse = [] as IPrenomOrdonnes[];
  if (prenoms.prenom1 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom1, numeroOrdre: 1 });
  }
  if (prenoms.prenom2 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom2, numeroOrdre: 2 });
  }
  if (prenoms.prenom3 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom3, numeroOrdre: 3 });
  }
  return prenomsInteresse;
}
