import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import { Interesse } from "@model/etatcivil/rcrca/Interesse";
import { formatNom, formatPrenom, triListeObjetsSurPropriete } from "@util/Utils";
import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";

export class FournisseurDonneesBandeauRcRca extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return triListeObjetsSurPropriete(this.data.interesses, "numeroOrdreSaisi");
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map((p: Interesse) => new SimplePersonne(formatNom(p.nomFamille), formatPrenom(p.prenoms.split(",")[0])));
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
}
