import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import {
  formatDe,
  formatNom,
  formatPrenom,
  getPremierElemOuVide,
  getValeurOuVide,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  triListeObjetsSurPropriete
} from "../../../../common/util/Utils";
import { SimplePersonne } from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauActe extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return this.data
      ? triListeObjetsSurPropriete(this.data.titulaires, "ordre")
      : [];
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map(
      (p: any) =>
        new SimplePersonne(
          formatNom(p.nom),
          formatPrenom(getPremierElemOuVide(p.prenoms))
        )
    );
  }

  getTypeAbrege(): string {
    return this.data
      ? premiereLettreEnMajusculeLeResteEnMinuscule(this.data.nature.libelle)
      : "";
  }

  getType(): string {
    let res = "";
    if (this.data) {
      const nature = premiereLettreEnMajusculeLeResteEnMinuscule(
        this.data.nature.libelle
      );
      const de = formatDe(this.data.nature.libelle);
      res = `Acte ${de}${nature}`;
    }
    return res;
  }

  getAnnee(): string {
    return this.data ? this.data.evenement.annee : "";
  }

  getRegistre() {
    let res = "";
    if (this.data) {
      const annee = getValeurOuVide(this.data.evenement.annee);
      const noActe = getValeurOuVide(this.data.numero);
      const numeroBisTer = getValeurOuVide(this.data.numeroBisTer);

      let famille = "";
      let pocopa = "";
      let support1 = "";
      let support2 = "";
      if (this.data.registre) {
        famille = getValeurOuVide(
          this.data.registre.famille
        ).toLocaleUpperCase();
        pocopa = getValeurOuVide(this.data.registre.pocopa).toLocaleUpperCase();
        support1 = getValeurOuVide(
          this.data.registre.support1
        ).toLocaleUpperCase();
        support2 = getValeurOuVide(
          this.data.registre.support2
        ).toLocaleUpperCase();
      }
      res = `${famille}.${pocopa}.${annee}.${noActe}.${numeroBisTer}.${support1}.${support2}`;
    }
    return res;
  }
}
