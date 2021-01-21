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
import { TypeFiche } from "../../../../model/etatcivil/TypeFiche";

export function setDataBandeau(
  categorie: TypeFiche,
  fournisseurDonneesBandeau: IFournisseurDonneesBandeau
): IBandeauFiche {
  let dataBandeau = {} as IBandeauFiche;

  const data = fournisseurDonneesBandeau.getData();

  if (data && categorie != null) {
    const annee = fournisseurDonneesBandeau.getAnnee();

    dataBandeau = {
      titreFenetre: getFicheTitle(
        fournisseurDonneesBandeau.getTypeAbrege(),
        annee,
        data.numero,
        fournisseurDonneesBandeau.getSimplePersonnes()
      ),
      categorie: fournisseurDonneesBandeau.getType(),
      identifiant: data.id,
      registre: fournisseurDonneesBandeau.getRegistre(),
      annee,
      numero: data.numero,
      statutsFiche: setStatuts(data.statutsFiche),
      personnes: fournisseurDonneesBandeau.getSimplePersonnes(),
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
