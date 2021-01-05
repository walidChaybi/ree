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

export function setDataBandeau(data: any, categorie: string): IBandeauFiche {
  let dataBandeau = {} as IBandeauFiche;

  if (data && categorie != null) {
    const personnes = getPersonnes(data, categorie);

    const nom1 =
      personnes && personnes[0] ? personnes[0].nomFamille : undefined;
    const nom2 =
      personnes && personnes[1] ? personnes[1].nomFamille : undefined;

    dataBandeau = {
      titreFenetre: getFicheTitle(
        categorie,
        data.annee,
        data.numero,
        nom1,
        nom2
      ),
      categorie: categorie,
      identifiant: data.id,
      registre: data.registre ? data.registre : undefined,
      annee: data.annee,
      numero: data.numero,
      statutsFiche: setStatuts(data.statutsFiche),
      prenom1: setPrenomInteresse(personnes[0].prenoms),
      nom1: nom1,
      prenom2: personnes[1]
        ? setPrenomInteresse(personnes[1].prenoms)
        : undefined,
      nom2: nom2,
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

function getPersonnes(data: any, categorie: string) {
  let personnes = [];
  if (categorie === "pacs") {
    personnes = data.partenaires;
  } else {
    personnes = data.interesses.sort((i1: any, i2: any) =>
      sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
    );
  }
  return personnes;
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
