import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { getTitulaires } from "./TitulairesActeUtils";
import { getEvenement } from "./EvenementActeUtils";
import { NatureActe } from "../../../../../../model/etatcivil/acte/NatureActe";

export function mappingDataActe(retourBack: any): IFicheActe {
  const dataActe = retourBack;
  dataActe.nature = NatureActe.getEnumFor(retourBack.nature);
  return dataActe;
}

export function getPanelsActe(acte: IFicheActe): AccordionReceProps {
  return {
    panels: [
      {
        panelAreas: [
          { parts: getTitulaires(acte) },
          { parts: getEvenement(acte) }
        ],
        title: "Résumé de l'acte"
      }
    ]
  };
}
