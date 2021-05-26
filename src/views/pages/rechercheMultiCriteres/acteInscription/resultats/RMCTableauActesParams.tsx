import React from "react";
import { HeaderTableauRMCActe } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
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
    keys: [HeaderTableauRMCActe.Registre],
    title: "Registre"
  })
];

export const NB_ACTE_PAR_PAGE = 10;

export function determinerColonnes(
  typeRMC: TypeRMC,
  onClickCheckbox: (isChecked: boolean, data: any) => void
) {
  if (typeRMC === "Auto") {
    onClickParentCallBack = onClickCheckbox;
    return [
      ...columnsTableauRmc,
      new TableauTypeColumn({
        keys: [HeaderTableauRMCActe.Checkbox],
        title: "",
        getElement: getCheckBoxElement
      })
    ];
  }
  return columnsTableauRmc;
}

function getCheckBoxElement(data: any): JSX.Element {
  const hasWarning = (isChecked: boolean, data: any): boolean => {
    return isChecked && data?.alertes?.length !== 0;
  };
  return (
    <CheckboxColumn
      data={data}
      onClickParentCallBack={onClickParentCallBack}
      hasWarning={hasWarning}
    />
  );
}
