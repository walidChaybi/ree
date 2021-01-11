import FournisseurDonneesBandeau from "./FournisseurDonneesBandeau";
import {
  sortObjectWithNumeroOrdre,
  formatDe,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  getValeurOuVide
} from "../../../../common/util/Utils";

export class FournisseurDonneeBandeauActe extends FournisseurDonneesBandeau {
  getNom(ordre: number) {
    return this.personnes && this.personnes[ordre]
      ? this.personnes[ordre].nom
      : undefined;
  }

  getPersonnes(): any[] {
    let personnes = [];
    personnes = this.data.titulaires.sort((i1: any, i2: any) =>
      sortObjectWithNumeroOrdre(i1, i2, "ordre")
    );
    return personnes;
  }

  getPrenom1(): string {
    return this.personnes[0].prenoms[0];
  }

  getPrenom2(): string | undefined {
    return this.personnes[1] ? this.personnes[1].prenoms[0] : undefined;
  }

  getTypeAbrege(): string {
    return premiereLettreEnMajusculeLeResteEnMinuscule(this.data.nature);
  }

  getType(): string {
    const nature = premiereLettreEnMajusculeLeResteEnMinuscule(
      this.data.nature
    );
    const de = formatDe(this.data.nature);
    return `Acte ${de}${nature}`;
  }

  getAnnee(): string {
    return this.data.evenement.annee;
  }

  getRegistre() {
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
    return `${famille}.${pocopa}.${annee}.${noActe}.${support1}.${support2}`;
  }
}
