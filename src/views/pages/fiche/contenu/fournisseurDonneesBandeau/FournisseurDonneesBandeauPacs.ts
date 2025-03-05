import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import { Partenaire } from "@model/etatcivil/pacs/Partenaire";
import { formatNom, formatPrenom, triListeObjetsSurPropriete } from "@util/Utils";
import { FournisseurDonneesBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
export class FournisseurDonneeBandeauPacs extends FournisseurDonneesBandeauRcRca {
  getPersonnesAsAny() {
    return triListeObjetsSurPropriete(this.data.partenaires, "numeroOrdreSaisi");
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map((p: Partenaire) => new SimplePersonne(formatNom(p.nomFamille), formatPrenom(p.prenoms.split(",")[0])));
  }

  getTypeAbrege(): string {
    return "pacs";
  }

  getType(): string {
    return "pacs";
  }
}
