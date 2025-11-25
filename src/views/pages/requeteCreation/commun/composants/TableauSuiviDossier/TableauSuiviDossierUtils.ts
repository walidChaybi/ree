import { HeaderTableauRMCPersonne } from "@model/rmc/headerTableau/HeaderTableauRMCPersonne";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";

class HeaderTableauSuiviDossier extends EnumWithComplete {
  public static readonly QUALITE = new HeaderTableauRMCPersonne("qualite", "");
  public static readonly NOM = new HeaderTableauRMCPersonne("nom", "Nom");
  public static readonly PRENOMS = new HeaderTableauRMCPersonne("prenoms", "Prénoms");
  public static readonly DECRET = new HeaderTableauRMCPersonne("decret", "Décret");
  public static readonly EVENEMENT = new HeaderTableauRMCPersonne("evenement", "Evénement");
  public static readonly DATE_EVENEMENT = new HeaderTableauRMCPersonne("dateEvenement", "Date évenement");
  public static readonly AVANCEMENT = new HeaderTableauRMCPersonne("avancement", "Avancement");
}

export const getColonnesTableauSuiviDossier = (): TableauTypeColumn[] => {
  return [
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.QUALITE.nom],
      title: HeaderTableauSuiviDossier.QUALITE.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.NOM.nom],
      title: HeaderTableauSuiviDossier.NOM.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.PRENOMS.nom],
      title: HeaderTableauSuiviDossier.PRENOMS.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.DECRET.nom],
      title: HeaderTableauSuiviDossier.DECRET.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.EVENEMENT.nom],
      title: HeaderTableauSuiviDossier.EVENEMENT.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.DATE_EVENEMENT.nom],
      title: HeaderTableauSuiviDossier.DATE_EVENEMENT.libelle
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauSuiviDossier.AVANCEMENT.nom],
      title: HeaderTableauSuiviDossier.AVANCEMENT.libelle
    })
  ];
};
