import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import {
  triListeObjetsSurPropriete,
  premiereLettreEnMajusculeLeResteEnMinuscule,
  getValeurOuVide
} from "../../../../common/util/Utils";
import { IPrenom } from "../../../../../model/etatcivil/FicheInterfaces";
import { SimplePersonne } from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauRcRca extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return triListeObjetsSurPropriete(this.data.interesses, "numeroOrdreSaisi");
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map(
      (p: any) =>
        new SimplePersonne(
          getValeurOuVide(p.nomFamille).toLocaleUpperCase(),
          premiereLettreEnMajusculeLeResteEnMinuscule(
            this.getPrenomInteresse(p.prenoms)
          )
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
        if (p.numeroOrdre === 1) {
          prenomInteresse = p.prenom;
        }
      });
    }
    return prenomInteresse;
  }
}
