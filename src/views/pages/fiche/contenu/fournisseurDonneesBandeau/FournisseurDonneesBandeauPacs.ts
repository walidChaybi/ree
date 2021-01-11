import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
export class FournisseurDonneeBandeauPacs extends FournisseurDonneeBandeauRcRca {
  getPersonnesAsAny() {
    return this.data.partenaires;
  }

  getTypeAbrege(): string {
    return "pacs";
  }

  getType(): string {
    return "pacs";
  }
}
