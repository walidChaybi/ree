import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option } from "@util/Type";

export interface IFiltreServiceRequeteDelivranceDto {
  sousType: string | null;
  provenance: string | null;
  idAgent: string | null;
  idEntiteRattachement: string | null;
  statuts: string[] | null;
}

export interface IFiltreServiceRequeteDelivranceFormValues {
  sousType: string;
  provenance: string;
  attribueA: Option | null;
  attribueAuService: Option | null;
  statut: string;
}


export function mappingFiltreServiceRequeteDelivranceVersFiltreDto(
  filtre: IFiltreServiceRequeteDelivranceFormValues
): IFiltreServiceRequeteDelivranceDto {
  return {
    sousType: filtre.sousType || null,
    provenance: filtre.provenance || null,
    idAgent: filtre.attribueA?.cle || null,
    idEntiteRattachement: filtre.attribueAuService?.cle || null,
    statuts: filtre.statut
      ? [filtre.statut]
      : StatutRequete.getOptionsAPartirTypeRequete(TypeRequete.DELIVRANCE).map(
          st => st.cle
        )
  };
}
