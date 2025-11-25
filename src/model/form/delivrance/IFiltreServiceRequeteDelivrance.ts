import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option } from "@util/Type";
/* v8 ignore start */
import { nettoyerAttributsDto } from "../../commun/dtoUtils";
/* v8 ignore stop */

export interface IFiltreServiceRequeteDelivranceDto {
  sousType: string | null;
  provenance: string | null;
  idAgent: string | null;
  idService: string | null;
  statuts: string[] | null;
}

export interface IFiltreServiceRequeteDelivranceFormValues {
  sousType: string;
  provenance: string;
  attribueA: Option | null;
  attribueAuService: Option | null;
  statut: string;
}

const STATUTS_REQUETE_A_EXCLURE: StatutRequete[] = [
  StatutRequete.DOUBLON,
  StatutRequete.IGNOREE,
  StatutRequete.TRAITE_IMPRIME,
  StatutRequete.TRAITE_DELIVRE_DEMAT,
  StatutRequete.REJET_IMPRESSION,
  StatutRequete.TRAITE_IMPRIME_LOCAL,
  StatutRequete.REJET
];

/* v8 ignore start */
export const FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE = StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.DELIVRANCE).filter(
  statutCourant => !STATUTS_REQUETE_A_EXCLURE.includes(StatutRequete.getEnumFromLibelle(statutCourant.libelle))
);

export const mappingFiltreServiceRequeteDelivranceVersFiltreDto = (
  filtre: IFiltreServiceRequeteDelivranceFormValues
): IFiltreServiceRequeteDelivranceDto => {
  return nettoyerAttributsDto<IFiltreServiceRequeteDelivranceDto>({
    sousType: filtre.sousType,
    provenance: filtre.provenance,
    idAgent: filtre.attribueA?.cle || null,
    idService: filtre.attribueAuService?.cle || null,
    statuts: filtre.statut ? [filtre.statut] : FILTRES_SERVICE_STATUTS_REQUETE_DELIVRANCE.map(statut => statut.cle)
  });
};
/* v8 ignore stop */
