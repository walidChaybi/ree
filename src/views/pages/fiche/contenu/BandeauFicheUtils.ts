import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { AlerteInscription, AlerteInscriptionUtil } from "@model/etatcivil/enum/AlerteInscription";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { getTitreDeLaFiche, TFiche } from "../FicheUtils";
import { FournisseurDonneeBandeauActe } from "./fournisseurDonneesBandeau/FournisseurDonneesBandeauActe";
import { FournisseurDonneeBandeauPacs } from "./fournisseurDonneesBandeau/FournisseurDonneesBandeauPacs";
import { FournisseurDonneesBandeauRcRca } from "./fournisseurDonneesBandeau/FournisseurDonneesBandeauRcRca";

export const setDataBandeau = (typeFiche: ETypeFiche, fiche: TFiche | null): IBandeauFiche => {
  if (!fiche) return {} as IBandeauFiche;

  const fournisseurDonneesBandeau = (() => {
    switch (typeFiche) {
      case ETypeFiche.RC:
      case ETypeFiche.RCA:
        return new FournisseurDonneesBandeauRcRca(fiche as FicheRcRca);
      case ETypeFiche.PACS:
        return new FournisseurDonneeBandeauPacs(fiche as FichePacs);
      case ETypeFiche.ACTE:
        return new FournisseurDonneeBandeauActe(fiche as FicheActe);
    }
  })();

  const annee = fournisseurDonneesBandeau.getAnnee();

  return {
    titreFenetre: getTitreDeLaFiche(
      fournisseurDonneesBandeau.getTypeAbrege(),
      annee,
      fiche.numero ?? "",
      fournisseurDonneesBandeau.getSimplePersonnes(),
      typeFiche
    ),
    categorie: fournisseurDonneesBandeau.getType(),
    identifiant: fiche.id,
    registre: fournisseurDonneesBandeau.getRegistre(),
    annee,
    numero: fiche.numero ?? "",
    statutsFiche: fiche instanceof FicheActe ? [] : fiche.statutsFiche,
    personnes: fournisseurDonneesBandeau.getSimplePersonnes(),
    alertes: fiche instanceof FichePacs ? undefined : setAlertes(fiche.alertes),
    dateDerniereMaj: fiche.dateDerniereMaj?.format("JJ/MM/AAAA") ?? "",
    dateDerniereDelivrance: fiche.dateDerniereDelivrance?.format("JJ/MM/AAAA") ?? ""
  };
};

const setAlertes = (alertes: IAlerte[]) => {
  const alertesInscription: IAlerte[] = [];
  if (alertes) {
    alertes.forEach(a => {
      a.alerte = AlerteInscriptionUtil.getLibelle(a.alerte as AlerteInscription);
      alertesInscription.push(a);
    });
  }
  return alertesInscription;
};
