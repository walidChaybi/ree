import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option } from "@util/Type";

export interface IFiltreServiceRequeteCreationFormValues {
  numeroRequete: string;
  sousType: string;
  priorisation: string;
  attribueA: Option | null;
  attribueAuService: Option | null;
  statut: string;
}

export interface IFiltreServiceRequeteCreationDto {
  sousType: string | null;
  tagPriorisation: string | null;
  idAgent: string | null;
  idEntiteRattachement: string | null;
  statuts: string[] | null;
}
export type IFiltresServiceRequeteCreation = Omit<
  IFiltreServiceRequeteCreationFormValues,
  "numeroRequete"
>;

export function mappingFiltreServiceCreationVersFiltreDto(
  filtre: IFiltresServiceRequeteCreation
): IFiltreServiceRequeteCreationDto {
  return {
    sousType: filtre.sousType || null,
    tagPriorisation: filtre.priorisation || null,
    idAgent: filtre.attribueA?.cle || null,
    idEntiteRattachement: filtre.attribueAuService?.cle || null,
    statuts: filtre.statut
      ? [filtre.statut]
      : StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.CREATION).map(
          st => st.cle
        )
  };
}
