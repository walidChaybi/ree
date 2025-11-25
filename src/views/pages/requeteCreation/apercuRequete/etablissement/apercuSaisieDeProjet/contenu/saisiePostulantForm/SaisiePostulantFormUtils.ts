import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";

interface INomSecablePostulant {
  estPaysSecable: boolean;
  nomTitulaire: string;
  nomPartie1: string;
  nomPartie2: string;
}

export const getNomSecable = (retenueSdanf?: IRetenueSdanf): INomSecablePostulant => {
  const nom = retenueSdanf?.nomNaissance ?? "";
  const estPaysSecable = PaysSecabilite.estSecable(retenueSdanf?.paysNaissance ?? "");
  const vocables = EtatCivilUtil.getVocables(nom);
  const estSecable = estPaysSecable && vocables.length > 1;
  return {
    estPaysSecable,
    nomTitulaire: nom.toUpperCase(),
    nomPartie1: estSecable ? vocables[0].toUpperCase() : "",
    nomPartie2: estSecable ? vocables.slice(1).join(" ").toUpperCase() : ""
  };
};

export const estJourMoisVide = (jour?: number, mois?: number, annee?: number): boolean => !jour && !mois && Boolean(annee);

export const filtrePrenomsNonFrancises = (prenoms: IPrenomOrdonnes[] = []): IPrenomOrdonnes[] => {
  return prenoms.filter(prenom => !prenom.estPrenomFrRetenuSdanf);
};

export const filtrePrenomsFrancises = (prenoms: IPrenomOrdonnes[] = []): IPrenomOrdonnes[] => {
  return prenoms.filter(prenom => prenom.estPrenomFrRetenuSdanf);
};
