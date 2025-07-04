/* v8 ignore start */
import { IService } from "@model/agent/IService";
import { Utilisateur } from "@model/agent/Utilisateur";
import DateUtils from "@util/DateUtils";
import { getValeurOuUndefined, getValeurOuVide } from "@util/Utils";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapAttribueA } from "./IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau, mapTitulaires } from "./ITitulaireRequeteTableau";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { StatutRequete } from "./enum/StatutRequete";
import { TagPriorisation } from "./enum/TagPriorisation";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";
import { TypeRequete } from "./enum/TypeRequete";

export interface IRequeteTableauCreation extends IRequeteTableau {
  numeroFonctionnel: string;
  numeroTeledossier: string;
  numeroDila: string;
  numeroNatali?: string;
  numeroAncien: string;
  dateDerniereAction: string;
  postulant: string;
  numeroAffichage: string;
  idService?: string;
  attribueA?: string;
  tagPriorisation: TagPriorisation;
  alerte: string;
}

export function mappingUneRequeteTableauCreation(
  requete: any,
  mappingSupplementaire: boolean,
  utilisateurs: Utilisateur[],
  services: IService[]
): IRequeteTableauCreation {
  const titulaires = mapTitulaires(filtrerUniquementTitulairesHorsFamille(requete?.titulaires), mappingSupplementaire);
  return {
    idRequete: getValeurOuUndefined(requete?.id),
    numeroFonctionnel: getValeurOuVide(requete?.numeroFonctionnel),
    numeroTeledossier: requete?.numeroDossierNational
      ? getValeurOuVide(requete?.numeroDossierNational)
      : getValeurOuVide(requete?.numeroNatali) || getValeurOuVide(requete.numeroDila) || getValeurOuVide(requete.numeroFonctionnel),
    numero: getValeurOuVide(requete.numero),
    numeroDila: getValeurOuVide(requete?.numeroDila),
    numeroAffichage: getValeurOuVide(requete?.numeroAffichage),
    type: TypeRequete.getEnumFor("CREATION")?.libelle,
    sousType: SousTypeCreation.getEnumFor(requete?.sousType).libelleCourt,
    tagPriorisation: TagPriorisation.getEnumFor(requete?.tagPriorisation).libelle,
    numeroAncien: requete?.numeroAncien,
    titulaires,
    nomCompletRequerant: requete?.nomCompletRequerant,
    dateCreation: DateUtils.getFormatDateFromTimestamp(requete?.dateCreation),
    dateDerniereAction: DateUtils.getFormatDateFromTimestamp(requete?.dateDerniereAction),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    idUtilisateur: getValeurOuUndefined(requete?.idUtilisateur),
    idService: getValeurOuUndefined(requete?.idService),
    postulant: getPostulant(titulaires),
    attribueA: mapAttribueA(requete, utilisateurs, services) ?? undefined,
    alerte: requete.alerte
  };
}
function getPostulant(titulaires: ITitulaireRequeteTableau[]) {
  return titulaires.length > 0
    ? titulaires
        .map(el => `${el.nom} ${getValeurOuVide(el.prenoms[0])}`)
        .reduce((accumulateur, valeurCourante) => {
          return `${accumulateur}, ${valeurCourante}`;
        })
    : "";
}

function filtrerUniquementTitulairesHorsFamille(titulaires: any) {
  return titulaires.filter((titulaire: any) => titulaire.typeObjetTitulaire !== TypeObjetTitulaire.FAMILLE);
}
/* v8 ignore stop */
