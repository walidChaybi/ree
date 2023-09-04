import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import {
  formatPremieresLettresMajusculesNomCompose,
  getValeurOuVide
} from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";

export interface INomSecablePostulant {
  estPaysSecable: boolean;
  nomTitulaire: string;
  nomPartie1: string;
  nomPartie2: string;
}

export function getNomSecable(
  retenueSdanf?: IRetenueSdanf
): INomSecablePostulant {
  const nom = getValeurOuVide(retenueSdanf?.nomNaissance);
  const estPaysSecable = PaysSecabilite.estSecable(
    formatPremieresLettresMajusculesNomCompose(retenueSdanf?.paysNaissance)
  );
  const vocables = EtatCivilUtil.getVocables(nom);
  const estSecable = estPaysSecable && vocables.length > 1;
  return {
    estPaysSecable,
    nomTitulaire: nom,
    nomPartie1: estSecable ? vocables[0] : "",
    nomPartie2: estSecable ? vocables.slice(1).join(" ") : ""
  };
}

export function estJourMoisVide(retenueSdanf?: IRetenueSdanf): boolean {
  return (
    !retenueSdanf?.jourNaissance &&
    !retenueSdanf?.moisNaissance &&
    !!retenueSdanf?.anneeNaissance
  );
}

export function filtrePrenomsNonFrancises(
  prenoms: IPrenomOrdonnes[] = []
): IPrenomOrdonnes[] {
  return prenoms.filter(prenom => !prenom.estPrenomFrRetenuSdanf);
}

export function filtrePrenomsFrancises(
  prenoms: IPrenomOrdonnes[] = []
): IPrenomOrdonnes[] {
  return prenoms.filter(prenom => prenom.estPrenomFrRetenuSdanf);
}
