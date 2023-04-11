import { CINQ, getLibelle } from "@util/Utils";
import {
  getColonneCasesACocher,
  IColonneCaseACocherParams
} from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
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
    ...colonnesTableauMesRequetesCreation.slice(0, CINQ),
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
    ...colonnesTableauMesRequetesCreation.slice(CINQ)
  ];
}
