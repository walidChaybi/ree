import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { HeaderTableauRMCActe } from "@model/rmc/acteInscription/HeaderTableauRMC";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { getLibelle } from "@util/Utils";
import React from "react";
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
    title: "Réf. acte",
    className: "ColOverflow",
    style: { width: "200px" }
  })
];

export function determinerColonnes(
  typeRMC: TypeRMC,
  hasWarning: (isChecked: boolean, data: IResultatRMCActe) => boolean,
  isDisabled: (data: IResultatRMCActe) => boolean,
  onClickCheckbox: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void,
  typeRequete?: TypeRequete
) {
  // Les checkbox s'affichent que pour la RMC Auto d'une requête de délivrance
  if (typeRMC === "Auto" && typeRequete === TypeRequete.DELIVRANCE) {
    return [
      ...columnsTableauRmc,
      new TableauTypeColumn({
        keys: [HeaderTableauRMCActe.Checkbox],
        title: "",
        getElement: getCheckBoxElement.bind(
          null,
          hasWarning,
          isDisabled,
          onClickCheckbox
        ),
        style: { width: "50px" }
      })
    ];
  }
  return columnsTableauRmc;
}

function getCheckBoxElement(
  hasWarningCallBack: (isChecked: boolean, data: IResultatRMCActe) => boolean,
  isDisabledCallBack: (data: IResultatRMCActe) => boolean,
  onClickCheckboxCallBack: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void,
  data: IResultatRMCActe,
  index: number
): JSX.Element {
  return (
    <CheckboxColumn
      index={index}
      data={data}
      hasWarningCallBack={hasWarningCallBack}
      disabledMessage={getLibelle(
        "Pas de délivrance pour un projet d'acte non finalisé"
      )}
      isDisabledCallBack={isDisabledCallBack}
      onClickCheckboxCallBack={onClickCheckboxCallBack}
    />
  );
}
