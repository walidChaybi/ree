import React from "react";
import { HeaderTableauRMCActe } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";
import { CheckboxColumn } from "./checkboxColumn/CheckboxColumn";
import {
  commonHeadersTableauRMC,
  natureHeadersTableauRMC,
  TypeRMC
} from "./RMCTableauCommun";

let onClickParentCallBack: (
  index: number,
  isChecked: boolean,
  data: any
) => void;

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
  onClickCheckbox: (index: number, isChecked: boolean, data: any) => void
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

function getCheckBoxElement(data: any, index: number): JSX.Element {
  const hasWarning = (isChecked: boolean, value: any): boolean => {
    return isChecked && value?.alertes?.length !== 0;
  };
  return (
    <CheckboxColumn
      index={index}
      data={data}
      onClickParentCallBack={onClickParentCallBack}
      hasWarning={hasWarning}
    />
  );
}
