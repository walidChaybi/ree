import { CINQ, getLibelle } from "@util/Utils";
import { getColonneCheckbox } from "@widget/tableau/TableauRece/colonneInput/checkbox/ColonneCheckbox";
import { IColonneInputParams } from "@widget/tableau/TableauRece/colonneInput/InputParams";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { colonnesTableauMesRequetesCreation } from "./MesRequetesCreationParams";

export enum HeaderTableauRequetesServiceCreation {
  AttribueA = "attribueA"
}

export const getColonnesTableauRequetesServiceCreation = (
  colonneCheckboxParamsAttribueA: IColonneInputParams
) => [
  ...colonnesTableauMesRequetesCreation.slice(0, CINQ),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesServiceCreation.AttribueA],
    title: getLibelle("Attribuée à"),
    align: "center"
  }),
  getColonneCheckbox(colonneCheckboxParamsAttribueA),
  ...colonnesTableauMesRequetesCreation.slice(CINQ)
];
