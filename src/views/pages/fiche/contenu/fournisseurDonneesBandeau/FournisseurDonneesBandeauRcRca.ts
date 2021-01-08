import FournisseurDonneesBandeau from "./FournisseurDonneesBandeau";
import { sortObjectWithNumeroOrdre } from "../../../../common/util/Utils";
import { IPrenom } from "../../../../../model/etatcivil/FicheInterfaces";

export class FournisseurDonneeBandeauRcRca extends FournisseurDonneesBandeau {
  getNom(ordre: number) {
    return this.personnes && this.personnes[ordre]
      ? this.personnes[ordre].nomFamille
      : undefined;
  }

  getPersonnes() {
    let personnes = [];
    personnes = this.data.interesses.sort((i1: any, i2: any) =>
      sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
    );
    return personnes;
  }

  getPrenom1(): string {
    return this.getPrenomInteresse(this.personnes[0].prenoms);
  }

  getPrenom2(): string | undefined {
    return this.personnes[1]
      ? this.getPrenomInteresse(this.personnes[1].prenoms)
      : undefined;
  }

  private getPrenomInteresse(prenoms: IPrenom[]) {
    let prenomInteresse = "";
    if (prenoms) {
      prenoms.forEach(p => {
        if (p.numeroOrdre === 1) {
          prenomInteresse = p.prenom;
        }
      });
    }
    return prenomInteresse;
  }

  getTypeAbrege(): string {
    return this.data.categorie;
  }

  getType(): string {
    return this.data.categorie;
  }

  getAnnee(): string {
    return this.data.annee;
  }
}
