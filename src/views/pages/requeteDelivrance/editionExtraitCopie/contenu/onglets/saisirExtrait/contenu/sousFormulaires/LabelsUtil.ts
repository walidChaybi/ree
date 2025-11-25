import { ENatureActe } from "@model/etatcivil/enum/NatureActe";

interface ILabel {
  dateEvenement: string;
  lieuEvenement: string;
  evenement: string;
  titulaireEtOuEvenenement: string;
}
export const getLabels = (natureActe: keyof typeof ENatureActe): ILabel => {
  const libelleNatureEnMinuscule = ENatureActe[natureActe].toLowerCase();
  return {
    dateEvenement: `Date de ${libelleNatureEnMinuscule}`,
    lieuEvenement: `Lieu de ${libelleNatureEnMinuscule}`,
    evenement: `Evénement ${libelleNatureEnMinuscule}`,
    titulaireEtOuEvenenement: natureActe === "NAISSANCE" ? "Titulaire / Evénement" : "Titulaire"
  };
};
