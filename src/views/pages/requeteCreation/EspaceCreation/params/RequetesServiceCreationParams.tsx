import { CINQ, getLibelle } from "@util/Utils";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { colonnesTableauMesRequetesCreation } from "./MesRequetesCreationParams";

export enum HeaderTableauRequetesServiceCreation {
  AttribueA = "attribueA"
}

export const colonnesTableauRequetesServiceCreation = [
  ...colonnesTableauMesRequetesCreation.slice(0, CINQ),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesServiceCreation.AttribueA],
    title: getLibelle("Attribuée à"),
    align: "center"
  }),
  ...colonnesTableauMesRequetesCreation.slice(CINQ)
];
