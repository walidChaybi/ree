import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import IFournisseurDonneesBandeau from "./IFournisseurDonneesBandeau";

export abstract class FournisseurDonneesBandeau
  implements IFournisseurDonneesBandeau
{
  personnes: SimplePersonne[];

  constructor(protected data: any) {
    this.personnes = this.getPersonnesAsAny();
  }

  getData(): any {
    return this.data;
  }

  abstract getPersonnesAsAny(): any[];

  abstract getSimplePersonnes(): SimplePersonne[];

  abstract getTypeAbrege(): string;
  abstract getType(): string;

  abstract getAnnee(): string;

  getRegistre(): string | undefined {
    return undefined;
  }
}
