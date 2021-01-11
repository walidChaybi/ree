import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import { sortObjectWithNumeroOrdre } from "../../../../common/util/Utils";
import { IPrenom } from "../../../../../model/etatcivil/FicheInterfaces";
import { SimplePersonne } from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauRcRca extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return this.data
      ? this.data.interesses.sort((i1: any, i2: any) =>
          sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
        )
      : [];
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map(
      (p: any) =>
        new SimplePersonne(p.nomFamille, this.getPrenomInteresse(p.prenoms))
    );
  }

  getTypeAbrege(): string {
    return this.data ? this.data.categorie : "";
  }

  getType(): string {
    return this.data ? this.data.categorie : "";
  }

  getAnnee(): string {
    return this.data ? this.data.annee : "";
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
}
