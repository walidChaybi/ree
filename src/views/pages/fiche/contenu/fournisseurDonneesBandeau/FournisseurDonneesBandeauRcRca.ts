import {FournisseurDonneesBandeau} from "./FournisseurDonneesBandeau";
import {formatNom, formatPrenom, triListeObjetsSurPropriete} from "../../../../common/util/Utils";
import {IPrenom} from "../../../../../model/etatcivil/FicheInterfaces";
import {SimplePersonne} from "./IFournisseurDonneesBandeau";

export class FournisseurDonneeBandeauRcRca extends FournisseurDonneesBandeau {
  getPersonnesAsAny(): any[] {
    return triListeObjetsSurPropriete(this.data.interesses, "numeroOrdreSaisi");
  }

  getSimplePersonnes(): SimplePersonne[] {
    return this.personnes.map(
        (p: any) =>
            new SimplePersonne(
                formatNom(p.nomFamille),
                formatPrenom(
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
        p.prenom = p.prenom ? formatPrenom(p.prenom) : p.prenom;
        if (p.numeroOrdre === 1) {
          prenomInteresse = p.prenom;
        }
      });
    }
    return prenomInteresse;
  }
}
