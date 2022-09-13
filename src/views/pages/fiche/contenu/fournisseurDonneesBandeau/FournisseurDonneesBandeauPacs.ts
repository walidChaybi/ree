import { triListeObjetsSurPropriete } from "@util/Utils";
import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
export class FournisseurDonneeBandeauPacs extends FournisseurDonneeBandeauRcRca {
  getPersonnesAsAny() {
    return triListeObjetsSurPropriete(
      this.data.partenaires,
      "numeroOrdreSaisi"
    );
  }

  getTypeAbrege(): string {
    return "pacs";
  }

  getType(): string {
    return "pacs";
  }
}
