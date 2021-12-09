import { IRMCArchiveRequest } from "../../../../../model/rmc/acteArchive/envoi/IRMCArchiveRequest";
import { IRMCActeArchive } from "../../../../../model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import {
  getDateDebutFromDateCompose,
  getDateFinFromDateCompose
} from "../../../../common/util/DateUtils";
import { valeurOuUndefined } from "../../../../common/util/Utils";
import { getCriteresTitulaire } from "../../common/mapping/RMCMappingUtil";

/** Critères de recherche: mapping avant appel d'api */
export function mappingCriteres(criteres: IRMCActeArchive): IRMCArchiveRequest {
  let criteresMapper: IRMCArchiveRequest;
  criteresMapper = {
    // Filtre Titulaire
    ...getCriteresTitulaire(criteres),
    // Filtre Date de création
    dateCreationDebut: getDateDebutFromDateCompose(
      criteres.datesDebutFinAnnee?.dateDebut
    ),
    dateCreationFin: getDateFinFromDateCompose(
      criteres.datesDebutFinAnnee?.dateFin
    ),

    // Filtre Registre Civile
    natureActe: valeurOuUndefined(
      criteres.registreArchive?.registre?.natureActe
    ),
    familleRegistre: valeurOuUndefined(
      criteres.registreArchive?.registre?.familleRegistre
    ),
    posteOuPocopa: valeurOuUndefined(
      criteres.registreArchive?.registre?.pocopa?.value
    ),
    numeroActe: valeurOuUndefined(
      criteres.registreArchive?.registre?.numeroActe
    ),
    anneeRegistre: valeurOuUndefined(
      criteres.registreArchive?.registre?.anneeRegistre
    ),
    jourDateEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.jour
    ),
    moisDateEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.mois
    ),
    anneeDateEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.dateEvenement?.annee
    ),
    paysEvenement: valeurOuUndefined(
      criteres.registreArchive?.evenement?.paysEvenement
    )
  };
  return criteresMapper;
}
