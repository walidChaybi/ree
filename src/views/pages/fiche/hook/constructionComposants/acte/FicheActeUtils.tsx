import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { getTitulaires } from "./TitulairesActeUtils";
import { getEvenement } from "./EvenementActeUtils";

export function getPanelsActe(acte: IFicheActe): AccordionReceProps {
  return {
    panels: [
      {
        panelAreas: [
          { parts: getTitulaires(acte) },
          { parts: getEvenement(acte), title: "Evènement" }
        ],
        title: "Résumé de l'acte"
      }
    ]
  };
}
