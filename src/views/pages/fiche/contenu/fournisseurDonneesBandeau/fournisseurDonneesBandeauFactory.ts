import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import { FournisseurDonneeBandeauActe } from "./FournisseurDonneesBandeauActe";
import { FournisseurDonneeBandeauPacs } from "./FournisseurDonneesBandeauPacs";
import { FournisseurDonneesBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";

class FournisseurDonneesBandeauFactory {
  createFournisseur(categorie: ETypeFiche, data: any) {
    let fournisseur: FournisseurDonneesBandeau;

    switch (categorie) {
      case ETypeFiche.RC:
      case ETypeFiche.RCA:
        fournisseur = new FournisseurDonneesBandeauRcRca(data);
        break;
      case ETypeFiche.PACS:
        fournisseur = new FournisseurDonneeBandeauPacs(data);
        break;
      case ETypeFiche.ACTE:
        fournisseur = new FournisseurDonneeBandeauActe(data);
        break;

      default:
        // N'arrive jamais normalement
        fournisseur = new FournisseurDonneesBandeauRcRca(data);
        break;
    }
    return fournisseur;
  }
}

export const fournisseurDonneesBandeauFactory = new FournisseurDonneesBandeauFactory();
