import IFournisseurDonneesBandeau from "./IFournisseurDonneesBandeau";

export default abstract class FournisseurDonneesBandeau
  implements IFournisseurDonneesBandeau {
  personnes: any[];

  constructor(protected data: any) {
    this.personnes = this.getPersonnes();
  }

  getData(): any {
    return this.data;
  }

  abstract getPersonnes(): any[];

  abstract getNom(ordre: number): string;

  abstract getPrenom1(): string;

  abstract getPrenom2(): string | undefined;

  abstract getTypeAbrege(): string;
  abstract getType(): string;

  abstract getAnnee(): string;

  getRegistre(): string | undefined {
    return undefined;
  }

  getNom1() {
    return this.getNom(0);
  }

  getNom2() {
    return this.getNom(1);
  }
}
