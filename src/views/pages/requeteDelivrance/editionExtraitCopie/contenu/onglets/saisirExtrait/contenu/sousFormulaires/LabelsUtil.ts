import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { getLibelle } from "@util/Utils";

export const LIBELLE_DATE_NAISSANCE = getLibelle("Date de naissance");
export const LIBELLE_LIEU_NAISSANCE = getLibelle("Lieu de naissance");

export interface ILabel {
  dateEvenement: string;
  lieuEvenement: string;
  evenement: string;
  titulaireEtOuEvenenement: string;
}
export function getLabels(natureActe: NatureActe): ILabel {
  const libelleNatureEnMinuscule = natureActe.libelle.toLowerCase();
  return {
    dateEvenement: getLibelle(`Date de ${libelleNatureEnMinuscule}`),
    lieuEvenement: getLibelle(`Lieu de ${libelleNatureEnMinuscule}`),
    evenement: getLibelle(`Evénement ${libelleNatureEnMinuscule}`),
    titulaireEtOuEvenenement:
      natureActe === NatureActe.NAISSANCE
        ? getLibelle("Titulaire / Evénement")
        : getLibelle("Titulaire")
  };
}
