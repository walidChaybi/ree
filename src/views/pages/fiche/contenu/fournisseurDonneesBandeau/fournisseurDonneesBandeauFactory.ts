import { FournisseurDonneeBandeauRcRca } from "./FournisseurDonneesBandeauRcRca";
import { FournisseurDonneeBandeauPacs } from "./FournisseurDonneesBandeauPacs";
import { FournisseurDonneeBandeauActe } from "./FournisseurDonneesBandeauActe";
import { FournisseurDonneesBandeau } from "./FournisseurDonneesBandeau";
import { TypeFiche } from "../../../../../model/etatcivil/enum/TypeFiche";

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

export const fournisseurDonneesBandeauFactory = new FournisseurDonneesBandeauFactory();
