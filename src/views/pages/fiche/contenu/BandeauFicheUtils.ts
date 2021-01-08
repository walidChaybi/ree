import {
  IAlerte,
  IBandeauFiche,
  IStatutFiche
} from "../../../../model/etatcivil/FicheInterfaces";
import {
  AlerteInscription,
  AlerteInscriptionUtil
} from "../../../../model/etatcivil/AlerteInscription";
import {
  StatutFiche,
  StatutFicheUtil
} from "../../../../model/etatcivil/StatutFiche";
import {
  getDateFromTimestamp,
  getDateString
} from "../../../common/util/DateUtils";
import { getFicheTitle } from "../FicheUtils";
import IFournisseurDonneesBandeau from "./fournisseurDonneesBandeau/IFournisseurDonneesBandeau";

export function setDataBandeau(
  categorie: string,
  fournisseurDonneesBandeau: IFournisseurDonneesBandeau
): IBandeauFiche {
  let dataBandeau = {} as IBandeauFiche;

  const data = fournisseurDonneesBandeau.getData();

  if (data && categorie != null) {
    const nom1 = fournisseurDonneesBandeau.getNom1();
    const nom2 = fournisseurDonneesBandeau.getNom2();
    const annee = fournisseurDonneesBandeau.getAnnee();

    dataBandeau = {
      titreFenetre: getFicheTitle(
        fournisseurDonneesBandeau.getTypeAbrege(),
        annee,
        data.numero,
        nom1,
        nom2
      ),
      categorie: fournisseurDonneesBandeau.getType(),
      identifiant: data.id,
      registre: fournisseurDonneesBandeau.getRegistre(),
      annee,
      numero: data.numero,
      statutsFiche: setStatuts(data.statutsFiche),
      prenom1: fournisseurDonneesBandeau.getPrenom1(),
      nom1,
      prenom2: fournisseurDonneesBandeau.getPrenom2(),
      nom2,
      alertes: setAlertes(data.alertes),
      dateDerniereMaj: getDateString(
        getDateFromTimestamp(data.dateDerniereMaj)
      ),
      dateDerniereDelivrance: getDateString(
        getDateFromTimestamp(data.dateDerniereDelivrance)
      )
    };
  }

  return dataBandeau;
}

function setStatuts(statuts: IStatutFiche[]) {
  const statutsInscription: IStatutFiche[] = [];
  if (statuts) {
    statuts.forEach(s => {
      s.statut = StatutFicheUtil.getLibelle(s.statut as StatutFiche);
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
