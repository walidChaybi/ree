import { SimplePersonne } from "./contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import { getValeurOuVide, jointAvec } from "../../common/util/Utils";

export function getFicheTitle(
  categorie: string,
  annee: string,
  numero: string,
  personnes: SimplePersonne[]
) {
  const noms = jointAvec(
    personnes.map(p => `${getValeurOuVide(p.nom).toLocaleUpperCase()}`),
    " et "
  );
  return `${categorie.toLocaleUpperCase()} - ${noms} - N° ${annee} - ${numero}`;
}
