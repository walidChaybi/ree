import { IPrenom } from "../../../../../model/etatcivil/fiche/IPrenom";
import {
  formatNom,
  formatPrenom,
  triListeObjetsSurPropriete
} from "../../../../common/util/Utils";
import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import { SimplePersonne } from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauRcRca extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return triListeObjetsSurPropriete(this.data.interesses, "numeroOrdreSaisi");
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map(
      (p: any) =>
        new SimplePersonne(
          formatNom(p.nomFamille),
          formatPrenom(this.getPrenomInteresse(p.prenoms))
        )
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
        p.valeur = p.valeur ? formatPrenom(p.valeur) : p.valeur;
        if (p.numeroOrdre === 1) {
          prenomInteresse = p.valeur;
        }
      });
    }
    return prenomInteresse;
  }
}
