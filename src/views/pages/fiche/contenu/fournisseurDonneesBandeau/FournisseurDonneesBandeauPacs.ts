import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
import { triListeObjetsSurPropriete } from "../../../../common/util/Utils";
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
