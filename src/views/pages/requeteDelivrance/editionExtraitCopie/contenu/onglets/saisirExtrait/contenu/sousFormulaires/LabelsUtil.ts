import { NatureActe } from "@model/etatcivil/enum/NatureActe";

interface ILabel {
  dateEvenement: string;
  lieuEvenement: string;
  evenement: string;
  titulaireEtOuEvenenement: string;
}
export function getLabels(natureActe: NatureActe): ILabel {
  const libelleNatureEnMinuscule = natureActe.libelle.toLowerCase();
  return {
    dateEvenement: `Date de ${libelleNatureEnMinuscule}`,
    lieuEvenement: `Lieu de ${libelleNatureEnMinuscule}`,
    evenement: `Evénement ${libelleNatureEnMinuscule}`,
    titulaireEtOuEvenenement: natureActe === NatureActe.NAISSANCE ? "Titulaire / Evénement" : "Titulaire"
  };
}
