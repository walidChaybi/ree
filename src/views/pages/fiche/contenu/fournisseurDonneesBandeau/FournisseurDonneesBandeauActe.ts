import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import {
  formatDe,
  formatNom,
  formatPrenom,
  getValeurOuVide,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  triListeObjetsSurPropriete
} from "@util/Utils";
import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";

export class FournisseurDonneeBandeauActe extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return this.data ? triListeObjetsSurPropriete(this.data.titulaires, "ordre") : [];
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map((p: any) => new SimplePersonne(formatNom(p.nom), formatPrenom(p.prenoms?.[0] ?? "")));
  }

  getTypeAbrege(): string {
    return this.data ? premiereLettreEnMajusculeLeResteEnMinuscule(this.data.nature.libelle) : "";
  }

  getType(): string {
    let res = "";
    if (this.data) {
      const nature = premiereLettreEnMajusculeLeResteEnMinuscule(this.data.nature.libelle);
      const de = formatDe(this.data.nature.libelle);
      res = `Acte ${de}${nature}`;
    }
    return res;
  }

  getAnnee(): string {
    return this.data ? this.data.evenement?.annee : "";
  }

  getRegistre(): string {
    if (this.data?.referenceRegistre) {
      return getValeurOuVide(`${this.data.referenceActe} / ${this.data.referenceRegistre}`);
    } else {
      return getValeurOuVide(this.data.referenceActe);
    }
  }
}
