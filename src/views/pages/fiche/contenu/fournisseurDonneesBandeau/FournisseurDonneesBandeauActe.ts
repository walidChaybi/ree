import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import { formatDe, formatNom, formatPrenom, premiereLettreEnMajusculeLeResteEnMinuscule } from "@util/Utils";
import IFournisseurDonneesBandeau from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauActe implements IFournisseurDonneesBandeau {
  public constructor(private readonly _fiche: FicheActe) {}

  public get fiche(): FicheActe {
    return this._fiche;
  }

  public readonly getSimplePersonnes = (): SimplePersonne[] => {
    return this.fiche.titulaires.map(
      (titulaire: any) => new SimplePersonne(formatNom(titulaire.nom), formatPrenom(titulaire.prenoms?.[0] ?? ""))
    );
  };

  public readonly getTypeAbrege = (): string =>
    this.fiche ? premiereLettreEnMajusculeLeResteEnMinuscule(ENatureActe[this.fiche.nature]) : "";

  public readonly getType = (): string => {
    let res = "";
    if (this.fiche) {
      const nature = premiereLettreEnMajusculeLeResteEnMinuscule(ENatureActe[this.fiche.nature]);
      const de = formatDe(ENatureActe[this.fiche.nature]);
      res = `Acte ${de}${nature}`;
    }
    return res;
  };

  public readonly getAnnee = (): string => (this.fiche.evenement?.annee ? this.fiche.evenement.annee.toString() : "");

  public readonly getRegistre = (): string => {
    if (this.fiche?.referenceRegistreSansNumeroDActe) {
      return `${this.fiche.referenceActe} / ${this.fiche.referenceRegistreSansNumeroDActe}`;
    } else {
      return this.fiche.referenceActe ?? "";
    }
  };
}
