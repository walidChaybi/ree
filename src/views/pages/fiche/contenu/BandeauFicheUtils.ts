import {
  IAlerte,
  IBandeauFiche,
  IPrenom,
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
import { sortObjectWithNumeroOrdre } from "../../../common/util/Utils";
import { getFicheTitle } from "../FicheUtils";

export function setDataBandeau(data: any): IBandeauFiche {
  let dataBandeau = {} as IBandeauFiche;

  if (data) {
    const interesses = data.interesses.sort((i1: any, i2: any) =>
      sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
    );
    const nomInteresse1 =
      interesses && interesses[0] ? interesses[0].nomFamille : "";
    const nomInteresse2 =
      interesses && interesses[1] ? interesses[1].nomFamille : "";

    dataBandeau = {
      titreFenetre: getFicheTitle(
        data.categorie,
        data.annee,
        data.numero,
        nomInteresse1,
        nomInteresse2
      ),
      categorie: data.categorie,
      identifiant: data.id,
      registre: data.registre ? data.registre : undefined,
      annee: data.annee,
      numero: data.numero,
      statutsFiche: setStatuts(data.statutsFiche),
      prenom1: setPrenomInteresse(data.interesses[0].prenoms),
      nom1: nomInteresse1,
      prenom2: data.interesses[1]
        ? setPrenomInteresse(data.interesses[1].prenoms)
        : undefined,
      nom2: nomInteresse2 ? nomInteresse2 : undefined,
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

function setPrenomInteresse(prenoms: IPrenom[]) {
  let prenomInteresse = "";
  if (prenoms) {
    prenoms.forEach(p => {
      if (p.numeroOrdre === 1) {
        prenomInteresse = p.prenom;
      }
    });
  }
  return prenomInteresse;
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
