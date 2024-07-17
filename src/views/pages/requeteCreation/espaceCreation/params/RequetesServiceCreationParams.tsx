import { SIX, ZERO, getLibelle } from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  IColonneCaseACocherParams,
  getColonneCasesACocher
} from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import { colonnesTableauMesRequetesCreation } from "./MesRequetesCreationParams";

export enum HeaderTableauRequetesServiceCreation {
  AttribueA = "attribueA"
}

export function getColonnesTableauRequetesServiceCreation<TData, TIdentifiant>(
  colonneCaseACocherAttribueAParams: IColonneCaseACocherParams<
    TData,
    TIdentifiant
  >,
  conteneurCaseACocherAttribueAProps?: IConteneurElementPropsPartielles<
    TData,
    TIdentifiant,
    TChangeEventSurHTMLInputElement
  >
) {
  return [
    ...colonnesTableauMesRequetesCreation.slice(ZERO, SIX),
    new TableauTypeColumn({
      keys: [HeaderTableauRequetesServiceCreation.AttribueA],
      title: getLibelle("Attribuée à"),
      align: "center"
    }),
    getColonneCasesACocher(
      colonneCaseACocherAttribueAParams,
      { size: "small" },
      conteneurCaseACocherAttribueAProps
    ),
    ...colonnesTableauMesRequetesCreation.slice(SIX)
  ];
}
