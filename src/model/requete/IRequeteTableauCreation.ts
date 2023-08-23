import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { getValeurOuUndefined, getValeurOuVide } from "@util/Utils";
import { QualiteFamille } from "./enum/QualiteFamille";
import { SousTypeCreation } from "./enum/SousTypeCreation";
import { StatutRequete } from "./enum/StatutRequete";
import { TagPriorisation } from "./enum/TagPriorisation";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";
import { TypeRequete } from "./enum/TypeRequete";
import { IRequeteTableau } from "./IRequeteTableau";
import { mapAttribueA } from "./IRequeteTableauDelivrance";
import {
  ITitulaireRequeteTableau,
  mapTitulaires
} from "./ITitulaireRequeteTableau";

export interface IRequeteTableauCreation extends IRequeteTableau {
  numeroFonctionnel: string;
  numeroTeledossierOuSDANFOuFonctionnel: string;
  numeroDila: string;
  numeroNatali?: string;
  numeroAncien: string;
  dateDerniereAction: string;
  postulant: string;
  numeroAffichage: string;
  idEntiteRattachement?: string;
  attribueA?: string;
  tagPriorisation: TagPriorisation;
}

export function mappingUneRequeteTableauCreation(
  requete: any,
  mappingSupplementaire: boolean
): IRequeteTableauCreation {
  const titulaires = mapTitulaires(
    filtrerUniquementTitulairesHorsFamille(requete?.titulaires),
    mappingSupplementaire
  );
  return {
    idRequete: getValeurOuUndefined(requete?.id),
    numeroFonctionnel: getValeurOuVide(requete?.numeroFonctionnel),
    numeroTeledossierOuSDANFOuFonctionnel: requete?.numeroDossierNational
      ? getValeurOuVide(requete?.numeroDossierNational)
      : getValeurOuVide(requete?.numeroNatali) ||
        getValeurOuVide(requete.numeroDila) ||
        getValeurOuVide(requete.numeroFonctionnel),
    numero: getValeurOuVide(requete.numero),
    numeroDila: getValeurOuVide(requete?.numeroDila),
    numeroAffichage: getValeurOuVide(requete?.numeroAffichage),
    type: TypeRequete.getEnumFor("CREATION")?.libelle,
    sousType: SousTypeCreation.getEnumFor(requete?.sousType).libelleCourt,
    tagPriorisation: TagPriorisation.getEnumFor(requete?.tagPriorisation)
      .libelle,
    numeroAncien: requete?.numeroAncien,
    titulaires,
    nomCompletRequerant: requete?.nomCompletRequerant,
    dateCreation: getFormatDateFromTimestamp(requete?.dateCreation),
    dateDerniereAction: getFormatDateFromTimestamp(requete?.dateDerniereAction),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    idUtilisateur: getValeurOuUndefined(requete?.idUtilisateur),
    idEntiteRattachement: getValeurOuUndefined(requete?.idEntite),
    postulant: getPostulant(titulaires),
    attribueA: mapAttribueA(requete)
  };
}
function getPostulant(titulaires: ITitulaireRequeteTableau[]) {
  return titulaires.length > 0
    ? titulaires
        .filter(el => el.qualite !== QualiteFamille.PARENT)
        .map(el => `${el.nom} ${getValeurOuVide(el.prenoms[0])}`)
        .reduce((accumulateur, valeurCourante) => {
          return `${accumulateur}, ${valeurCourante}`;
        })
    : "";
}

function filtrerUniquementTitulairesHorsFamille(titulaires: any) {
  return titulaires.filter(
    (titulaire: any) =>
      titulaire.typeObjetTitulaire !== TypeObjetTitulaire.FAMILLE
  );
}
