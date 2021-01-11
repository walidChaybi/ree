import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import {
  sortObjectWithNumeroOrdre,
  formatDe,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  getValeurOuVide,
  getPremierElemOuVide
} from "../../../../common/util/Utils";
import { SimplePersonne } from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauActe extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return this.data
      ? this.data.titulaires.sort((i1: any, i2: any) =>
          sortObjectWithNumeroOrdre(i1, i2, "ordre")
        )
      : [];
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map(
      (p: any) =>
        new SimplePersonne(
          getValeurOuVide(p.nom),
          getPremierElemOuVide(p.prenoms)
        )
    );
  }

  getTypeAbrege(): string {
    return this.data
      ? premiereLettreEnMajusculeLeResteEnMinuscule(this.data.nature)
      : "";
  }

  getType(): string {
    let res = "";
    if (this.data) {
      const nature = premiereLettreEnMajusculeLeResteEnMinuscule(
        this.data.nature
      );
      const de = formatDe(this.data.nature);
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
      const annee = this.data.evenement.annee;
      const noActe = this.data.numero;

      let famille = "";
      let pocopa = "";
      let support1 = "";
      let support2 = "";
      if (this.data.registre) {
        famille = getValeurOuVide(this.data.registre.famille);
        pocopa = getValeurOuVide(this.data.registre.pocopa);
        support1 = getValeurOuVide(this.data.registre.support1);
        support2 = getValeurOuVide(this.data.registre.support2);
      }
      res = `${famille}.${pocopa}.${annee}.${noActe}.${support1}.${support2}`;
    }
    return res;
  }
}
