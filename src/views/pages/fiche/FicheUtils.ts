import {SimplePersonne} from "./contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import {formatNom, jointAvec} from "../../common/util/Utils";

export function getFicheTitle(
    categorie: string,
    annee: string,
    numero: string,
    personnes: SimplePersonne[]
) {
  const noms = jointAvec(
      personnes.map(p => `${formatNom(p.nom)}`),
      " et "
  );
  return `${categorie.toLocaleUpperCase()} - ${noms} - N° ${annee} - ${numero}`;
}
