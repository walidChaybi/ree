import React from "react";
import { HeaderTableauRMCActe } from "../../../../../model/rmc/acteInscription/HeaderTableauRMC";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";
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
    keys: [HeaderTableauRMCActe.Registre],
    title: "Registre",
    className: "ColOverflow"
  })
];

export const NB_ACTE_PAR_PAGE = 10;

export function determinerColonnes(
  typeRMC: TypeRMC,
  onClickCheckbox: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void
) {
  if (typeRMC === "Auto") {
    return [
      ...columnsTableauRmc,
      new TableauTypeColumn({
        keys: [HeaderTableauRMCActe.Checkbox],
        title: "",
        getElement: getCheckBoxElement.bind(null, onClickCheckbox)
      })
    ];
  }
  return columnsTableauRmc;
}

function getCheckBoxElement(
  onClickParentCallBack: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void,
  data: IResultatRMCActe,
  index: number
): JSX.Element {
  const hasWarning = (isChecked: boolean, value: IResultatRMCActe): boolean => {
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
