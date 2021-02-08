import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { getTitulaires } from "./TitulairesActeUtils";
import { getEvenement } from "./EvenementActeUtils";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonne } from "../FichePersonne";

export function getPanelsActe(acte: IFicheActe): AccordionReceProps {
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonne(
    acte.personnes
  );
  return {
    panels: [
      {
        panelAreas: [
          {
            parts: getTitulaires(acte),
            title: "Titulaires",
            nbColonne: 2
          },
          { parts: getEvenement(acte), title: "Evènement", nbColonne: 2 }
        ],
        title: "Résumé de l'acte"
      },
      ...fichesPersonne
    ]
  };
}
