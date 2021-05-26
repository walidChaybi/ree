import React from "react";
import { HeaderTableauRMCInscription } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";
import { CheckboxColumn } from "./checkboxColumn/CheckboxColumn";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  TypeRMC
} from "./RMCTableauCommun";

let onClickParentCallBack: (isChecked: boolean, data: any) => void;

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
  onClickCheckbox: (isChecked: boolean, data: any) => void
) {
  if (typeRMC === "Auto") {
    onClickParentCallBack = onClickCheckbox;
    return [
      ...columnsTableauRmc,
      new TableauTypeColumn({
        keys: [HeaderTableauRMCInscription.Checkbox],
        title: "",
        getElement: getCheckBoxElement
      })
    ];
  }
  return columnsTableauRmc;
}

function getCheckBoxElement(data: any): JSX.Element {
  return (
    <CheckboxColumn data={data} onClickParentCallBack={onClickParentCallBack} />
  );
}
