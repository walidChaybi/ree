import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
import { FournisseurDonneeBandeauPacs } from "./FournisseurDonneesBandeauPacs";
import { FournisseurDonneeBandeauActe } from "./FournisseurDonneesBandeauActe";
import FournisseurDonneesBandeau from "./FournisseurDonneesBandeau";

class FournisseurDonneesBandeauFactory {
  createFournisseur(categorie: string, data: any) {
    let fournisseur: FournisseurDonneesBandeau;

    switch (categorie) {
      case "rc":
      case "rca":
        fournisseur = new FournisseurDonneeBandeauRcRca(data);
        break;
      case "pacs":
        fournisseur = new FournisseurDonneeBandeauPacs(data);
        break;
      case "acte":
        fournisseur = new FournisseurDonneeBandeauActe(data);
        break;

      default:
        // N'arrive jamais normalement
        fournisseur = new FournisseurDonneeBandeauRcRca(data);
        break;
    }
    return fournisseur;
  }
}

export const fournisseurDonneesBandeauFactory = new FournisseurDonneesBandeauFactory();
