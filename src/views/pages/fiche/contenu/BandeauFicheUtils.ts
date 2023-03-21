import {
  AlerteInscription,
  AlerteInscriptionUtil
} from "@model/etatcivil/enum/AlerteInscription";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";
import { formatDateStringIso } from "@util/DateUtils";
import { IDataFicheProps } from "../FichePage";
import { getFicheTitle } from "../FicheUtils";
import { fournisseurDonneesBandeauFactory } from "./fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

export function setDataBandeau(
  dataFiche: IDataFicheProps,
  data: any
): IBandeauFiche {
  const fournisseurDonneesBandeau =
    fournisseurDonneesBandeauFactory.createFournisseur(
      dataFiche.categorie,
      data
    );

  let bandeauFiche = {} as IBandeauFiche;
  const dataBandeau = fournisseurDonneesBandeau.getData();

  if (dataBandeau && dataFiche.categorie != null) {
    const annee = fournisseurDonneesBandeau.getAnnee();
    bandeauFiche = {
      titreFenetre: getFicheTitle(
        fournisseurDonneesBandeau.getTypeAbrege(),
        annee,
        dataBandeau.numero,
        fournisseurDonneesBandeau.getSimplePersonnes(),
        dataFiche.categorie
      ),
      categorie: fournisseurDonneesBandeau.getType(),
      identifiant: dataBandeau.id,
      registre: fournisseurDonneesBandeau.getRegistre(),
      annee,
      numero: dataBandeau.numero,
      statutsFiche: dataBandeau.statutsFiche,
      personnes: fournisseurDonneesBandeau.getSimplePersonnes(),
      alertes: setAlertes(dataBandeau.alertes),
      dateDerniereMaj: formatDateStringIso(dataBandeau.dateDerniereMaj),
      dateDerniereDelivrance: formatDateStringIso(
        dataBandeau.dateDerniereDelivrance
      )
    };
  }

  return bandeauFiche;
}

function setAlertes(alertes: IAlerte[]) {
  const alertesInscription: IAlerte[] = [];
  if (alertes) {
    alertes.forEach(a => {
      a.alerte = AlerteInscriptionUtil.getLibelle(
        a.alerte as AlerteInscription
      );
      alertesInscription.push(a);
    });
  }
  return alertesInscription;
}
