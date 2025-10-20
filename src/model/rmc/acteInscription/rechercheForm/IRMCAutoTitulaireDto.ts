import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { IDate } from "@util/DateUtils";

export interface IRMCAutoTitulaireDto {
  nom?: string;
  prenom?: string;
  dateNaissance?: IDate;
}

export const titulaireRequeteVersRMCAutoTitulaireDto = (titulaire: ITitulaireRequete): IRMCAutoTitulaireDto => ({
  nom: TitulaireRequete.getNom(titulaire),
  prenom: TitulaireRequete.getPrenom1(titulaire),
  dateNaissance: {
    annee: titulaire.anneeNaissance?.toString(),
    mois: titulaire.moisNaissance?.toString(),
    jour: titulaire.jourNaissance?.toString()
  }
});
