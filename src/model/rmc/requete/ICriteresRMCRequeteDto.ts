import { TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import DateRECE from "../../../utils/DateRECE";
import { nettoyerAttributsDto } from "../../commun/dtoUtils";
import { ETypeRequete } from "../../requete/enum/TypeRequete";
import { IRMCRequeteForm } from "./IRMCRequete";

export interface ICriteresRMCRequeteDto<TTypeRequete extends keyof typeof ETypeRequete | ""> {
  // Filtre Requete
  numeroRequete?: string;
  typeRequete?: TTypeRequete;
  sousTypeRequete?: TTypeRequete extends keyof typeof ETypeRequete ? TSousTypeRequete<TTypeRequete> : "";
  statutRequete?: keyof typeof EStatutRequete;
  numeroTeledossier?: string;
  numeroDossierNational?: string;

  // Filtre Titulaire
  nomTitulaire?: string;
  prenomTitulaire?: string;
  jourNaissance?: string;
  moisNaissance?: string;
  anneeNaissance?: string;
  paysNaissance?: string;

  // Filtre Date de création
  dateCreationDebut?: TDateArrayDTO;
  dateCreationFin?: TDateArrayDTO;

  // Filtre Requerant
  nomRequerant?: string;
  raisonSociale?: string;
}

export const mappingCriteresRMCRequeteVersDto = <TTypeRequete extends keyof typeof ETypeRequete | "">(
  criteres: IRMCRequeteForm<TTypeRequete>
): ICriteresRMCRequeteDto<TTypeRequete> =>
  nettoyerAttributsDto<ICriteresRMCRequeteDto<TTypeRequete>>({
    // Filtre Requete
    numeroRequete: criteres.requete?.numeroRequete,
    typeRequete: criteres.requete?.typeRequete,
    sousTypeRequete: criteres.requete?.sousTypeRequete,
    statutRequete: criteres.requete?.statutRequete,
    numeroTeledossier: criteres.requete?.numeroTeledossier,
    numeroDossierNational: criteres.requete?.numeroDossierNational,

    // Filtre Titulaire
    nomTitulaire: criteres.titulaire?.nom,
    prenomTitulaire: criteres.titulaire?.prenom,
    jourNaissance: criteres.titulaire?.dateNaissance?.jour,
    moisNaissance: criteres.titulaire?.dateNaissance?.mois,
    anneeNaissance: criteres.titulaire?.dateNaissance?.annee,
    paysNaissance: criteres.titulaire?.paysNaissance,

    // Filtre Date de création
    dateCreationDebut:
      criteres.datesDebutFinAnnee?.dateDebut && !DateUtils.estDateVide(criteres.datesDebutFinAnnee?.dateDebut)
        ? DateRECE.depuisObjetDate(criteres.datesDebutFinAnnee.dateDebut).versDateArrayDTO()
        : undefined,
    dateCreationFin:
      criteres.datesDebutFinAnnee?.dateFin && !DateUtils.estDateVide(criteres.datesDebutFinAnnee?.dateFin)
        ? DateRECE.depuisObjetDate(criteres.datesDebutFinAnnee.dateFin).versDateArrayDTO()
        : undefined,

    // Filtre Requérant
    nomRequerant: criteres.requerant?.nom,
    raisonSociale: criteres.requerant?.raisonSociale
  });
