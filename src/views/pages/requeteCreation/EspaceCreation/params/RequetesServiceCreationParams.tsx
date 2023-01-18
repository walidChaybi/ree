import {
  CheckboxColumn,
  IEtatCheckboxColonne
} from "@pages/rechercheMultiCriteres/acteInscription/resultats/checkboxColumn/CheckboxColumn";
import { CINQ, getLibelle } from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import { colonnesTableauMesRequetesCreation } from "./MesRequetesCreationParams";

export enum HeaderTableauRequetesServiceCreation {
  AttribueA = "attribueA",
  AttribueACheckbox = "attribueACheckbox"
}

const getAttribueACheckbox = (
  etat: IEtatCheckboxColonne,
  value: any,
  index: number
) => {
  const onClick = (idx: number, isChecked: boolean, data: any) => {
    if (isChecked !== undefined) {
      data.attribueAChecked = isChecked;
    }
  };

  return (
    <CheckboxColumn
      index={index}
      data={value}
      onClickCheckboxCallBack={onClick}
      etat={etat}
    />
  );
};

export const getColonnesTableauRequetesServiceCreation = (
  etat: IEtatCheckboxColonne
) => [
  ...colonnesTableauMesRequetesCreation.slice(0, CINQ),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesServiceCreation.AttribueA],
    title: getLibelle("Attribuée à"),
    align: "center",
    sortable: true
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesServiceCreation.AttribueACheckbox],
    title: "",
    getElement: getAttribueACheckbox.bind(null, etat),
    style: { width: "3.5%" }
  }),
  ...colonnesTableauMesRequetesCreation.slice(CINQ)
];
