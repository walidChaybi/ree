import React from "react";
import { HeaderTableauRMCInscription } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../../common/widget/Text";
import { CheckboxColumn } from "./checkboxColumn/CheckboxColumn";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  TypeRMC
} from "./RMCTableauCommun";

const columnsTableauRmc = [
  ...commonHeadersTableauRMC,
  ...natureHeadersTableauRMC,
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.NumeroRef],
    title: "N° Réf."
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Type],
    title: "Type"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRMCInscription.Statut],
    title: "Statut fiche"
  })
];

export const NB_INSCRIPTION_PAR_PAGE = 5;

export function determinerColonnes(
  typeRMC: TypeRMC,
  isCheckboxDisabled: (data: IResultatRMCInscription) => boolean,
  onClickCheckbox: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void
) {
  if (typeRMC === "Auto") {
    return [
      ...columnsTableauRmc,
      new TableauTypeColumn({
        keys: [HeaderTableauRMCInscription.Checkbox],
        title: "",
        getElement: getCheckBoxElement.bind(
          null,
          isCheckboxDisabled,
          onClickCheckbox
        )
      })
    ];
  }
  return columnsTableauRmc;
}

function getCheckBoxElement(
  isDisabled: (data: IResultatRMCInscription) => boolean,
  onClickParentCallBack: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void,
  data: any,
  index: number
): JSX.Element {
  return (
    <CheckboxColumn
      index={index}
      data={data}
      disabledMessage={getLibelle(
        "Ce résultat ne correspond pas au document demandé par le requérant"
      )}
      isDisabled={isDisabled}
      onClickParentCallBack={onClickParentCallBack}
    />
  );
}
