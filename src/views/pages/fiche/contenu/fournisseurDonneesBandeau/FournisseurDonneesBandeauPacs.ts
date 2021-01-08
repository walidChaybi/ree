import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
export class FournisseurDonneeBandeauPacs extends FournisseurDonneeBandeauRcRca {
  getPersonnes() {
    return this.data.partenaires;
  }

  getTypeAbrege(): string {
    return "pacs";
  }

  getType(): string {
    return "pacs";
  }
}
