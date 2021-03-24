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
import IFournisseurDonneesBandeau from "./fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import { TypeFiche } from "../../../../model/etatcivil/enum/TypeFiche";

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
      dateDerniereMaj: getDateString(data.dateDerniereMaj),
      dateDerniereDelivrance: getDateString(data.dateDerniereDelivrance)
    };
  }

  return dataBandeau;
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
