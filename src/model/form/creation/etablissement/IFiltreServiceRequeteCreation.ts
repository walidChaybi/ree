/* v8 ignore start */
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option } from "@util/Type";
import { nettoyerAttributsDto } from "../../../commun/dtoUtils";
/* v8 ignore stop */

export interface IFiltreServiceRequeteCreationFormValues {
  numeroRequete: string;
  sousType: string;
  priorisation: string;
  attribueA: Option | null;
  attribueAuService: Option | null;
  statut: string;
  numeroDossierNational: string | null;
}

export interface IFiltreServiceRequeteCreationDto {
  sousType: string | null;
  tagPriorisation: string | null;
  idAgent: string | null;
  idService: string | null;
  statuts: string[] | null;
  numeroDossierNational?: string | null;
}
export type IFiltresServiceRequeteCreation = Omit<IFiltreServiceRequeteCreationFormValues, "numeroRequete">;

/* v8 ignore start */
export const mappingFiltreServiceCreationVersFiltreDto = (filtre: IFiltresServiceRequeteCreation): IFiltreServiceRequeteCreationDto => {
  return nettoyerAttributsDto<IFiltreServiceRequeteCreationDto>({
    sousType: filtre.sousType,
    tagPriorisation: filtre.priorisation,
    idAgent: filtre.attribueA?.cle ?? null,
    idService: filtre.attribueAuService?.cle ?? null,
    statuts: filtre.statut ? [filtre.statut] : StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.CREATION).map(st => st.cle),
    numeroDossierNational: filtre.numeroDossierNational
  });
};
/* v8 ignore stop */
