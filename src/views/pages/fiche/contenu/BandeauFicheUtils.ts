import { IStatutFiche } from "../../../../model/etatcivil/fiche/IStatutFiche";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";
import {
  AlerteInscription,
  AlerteInscriptionUtil
} from "../../../../model/etatcivil/enum/AlerteInscription";
import { StatutFiche } from "../../../../model/etatcivil/enum/StatutFiche";
import { getDateString } from "../../../common/util/DateUtils";
import { getFicheTitle } from "../FicheUtils";
import { IDataFicheProps } from "../FichePage";
import { fournisseurDonneesBandeauFactory } from "./fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

export function setDataBandeau(
  dataFiche: IDataFicheProps,
  data: any
): IBandeauFiche {
  const fournisseurDonneesBandeau = fournisseurDonneesBandeauFactory.createFournisseur(
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
        fournisseurDonneesBandeau.getSimplePersonnes()
      ),
      categorie: fournisseurDonneesBandeau.getType(),
      identifiant: dataBandeau.id,
      registre: fournisseurDonneesBandeau.getRegistre(),
      annee,
      numero: dataBandeau.numero,
      statutsFiche: setStatuts(dataBandeau.statutsFiche),
      personnes: fournisseurDonneesBandeau.getSimplePersonnes(),
      alertes: setAlertes(dataBandeau.alertes),
      dateDerniereMaj: getDateString(dataBandeau.dateDerniereMaj),
      dateDerniereDelivrance: getDateString(dataBandeau.dateDerniereDelivrance)
    };
  }

  return bandeauFiche;
}

function setStatuts(statuts: IStatutFiche[]) {
  const statutsInscription: IStatutFiche[] = [];
  if (statuts) {
    statuts.forEach(s => {
      s.statut = StatutFiche.getEnumFor(s.statut).libelle;
      statutsInscription.push(s);
    });
  }
  return statutsInscription;
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
