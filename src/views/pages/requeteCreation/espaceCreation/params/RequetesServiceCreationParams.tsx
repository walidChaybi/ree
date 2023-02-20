import { CINQ, getLibelle } from "@util/Utils";
import { getColonneCheckbox } from "@widget/tableau/TableauRece/colonneInput/checkbox/ColonneCheckbox";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { colonnesTableauMesRequetesCreation } from "./MesRequetesCreationParams";

export enum HeaderTableauRequetesServiceCreation {
  AttribueA = "attribueA"
}

export const getColonnesTableauRequetesServiceCreation = (
  idRequetesSelectionnees: string[],
  setIdRequetesSelectionnees: React.Dispatch<React.SetStateAction<string[]>>,
  getRequeteId: (data: any) => string,
  allRequeteId: string[]
) => [
  ...colonnesTableauMesRequetesCreation.slice(0, CINQ),
  new TableauTypeColumn({
    keys: [HeaderTableauRequetesServiceCreation.AttribueA],
    title: getLibelle("Attribuée à"),
    align: "center"
  }),
  getColonneCheckbox(
    idRequetesSelectionnees,
    setIdRequetesSelectionnees,
    getRequeteId,
    true,
    allRequeteId
  ),
  ...colonnesTableauMesRequetesCreation.slice(CINQ)
];
