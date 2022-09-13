import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import { FournisseurDonneeBandeauActe } from "./FournisseurDonneesBandeauActe";
import { FournisseurDonneeBandeauPacs } from "./FournisseurDonneesBandeauPacs";
import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";

class FournisseurDonneesBandeauFactory {
  createFournisseur(categorie: TypeFiche, data: any) {
    let fournisseur: FournisseurDonneesBandeau;

    switch (categorie) {
      case TypeFiche.RC:
      case TypeFiche.RCA:
        fournisseur = new FournisseurDonneeBandeauRcRca(data);
        break;
      case TypeFiche.PACS:
        fournisseur = new FournisseurDonneeBandeauPacs(data);
        break;
      case TypeFiche.ACTE:
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

export const fournisseurDonneesBandeauFactory =
  new FournisseurDonneesBandeauFactory();
