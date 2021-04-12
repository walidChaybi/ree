import {
  formatNom,
  getValeurOuVide,
  valeurOuUndefined
} from "../../../../common/util/Utils";
import {
  getDateFinFromDateCompose,
  getDateDebutFromDateCompose
} from "../../../../common/util/DateUtils";

import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { IRMCRequestRequete } from "../../../../../model/rmc/requete/IRMCRequestRequete";
import { IResultatRMCRequete } from "../../../../../model/rmc/requete/IResultatRMCRequete";

/** Critères de recherche requete: mapping avant appel d'api */
export function mappingCriteresRequete(
  criteres: IRMCRequete
): IRMCRequestRequete {
  let criteresMapper: IRMCRequestRequete;
  criteresMapper = {
    // Filtre Requete
    numeroRequete: valeurOuUndefined(criteres.requete?.numeroRequete),
    typeRequete: valeurOuUndefined(criteres.requete?.typeRequete),
    sousTypeRequete: valeurOuUndefined(criteres.requete?.sousTypeRequete),
    statutRequete: valeurOuUndefined(criteres.requete?.statutRequete),

    // Filtre Titulaire
    nomTitulaire: valeurOuUndefined(criteres.titulaire?.nom),
    prenomTitulaire: valeurOuUndefined(criteres.titulaire?.prenom),
    jourNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.jour),
    moisNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.mois),
    anneeNaissance: valeurOuUndefined(criteres.titulaire?.dateNaissance?.annee),
    paysNaissance: valeurOuUndefined(criteres.titulaire?.paysNaissance),

    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFin?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(criteres.datesDebutFin?.dateFin),

    // Filtre Requerant
    nomRequerant: valeurOuUndefined(criteres.requerant?.nom),
    raisonSociale: valeurOuUndefined(criteres.requerant?.raisonSociale)
  };
  return criteresMapper;
}

/** Requetes: mapping après appel d'api */
export function mappingRequetes(
  resultatsRecherche: any
): IResultatRMCRequete[] {
  const requetesMapper: IResultatRMCRequete[] = [];

  resultatsRecherche.forEach((requete: any) => {
    const requeteMapper: IResultatRMCRequete = {
      idRequete: getValeurOuVide(requete.id),
      numeroRequete: getValeurOuVide(requete.numero),
      sousTypeRequete: getValeurOuVide(requete.sousType),
      provenance: getValeurOuVide(requete.provenance),
      natureActe: getValeurOuVide(requete.nature),
      document: getValeurOuVide(requete.document),
      requerant: getValeurOuVide(requete.requerant),
      attribuerA: formatNom(requete.attribuerA),
      dateCreation: getValeurOuVide(requete.dateCreation),
      dateDerniereMaj: getValeurOuVide(requete.dateDerniereMaj),
      statut: getValeurOuVide(requete.statut),
      prioriteRequete: getValeurOuVide(requete.priorite)
    };
    requetesMapper.push(requeteMapper);
  });

  return requetesMapper;
}
