import { IFicheRcRca } from "../../../../../model/etatcivil/FicheInterfaces";
import { AccordionReceProps } from "../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "./inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "./interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { AccordionPanelProps } from "../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonne } from "./FichePersonne";

export function getPanelsRca(retourBack: IFicheRcRca): AccordionReceProps {
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonne(
    retourBack.personnes
  );

  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(retourBack)], nbColonne: 1 },
          {
            parts: getInteresse(retourBack),
            nbColonne: 2
          },
          { parts: getDecision(retourBack), nbColonne: 2 },
          { parts: getAutorite(retourBack), title: "Autorité", nbColonne: 2 }
        ],
        title: "Vue du RCA"
      },
      ...fichesPersonne
    ]
  };
}
