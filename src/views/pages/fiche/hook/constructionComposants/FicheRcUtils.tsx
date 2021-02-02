import { IFicheRcRca } from "../../../../../model/etatcivil/FicheInterfaces";
import { AccordionReceProps } from "../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "./inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "./interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { AccordionPanelProps } from "../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonne } from "./FichePersonne";

export function getPanelsRc(retourBack: IFicheRcRca): AccordionReceProps {
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonne(
    retourBack.personnes
  );
  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(retourBack)] },
          { parts: getInteresse(retourBack) },
          { parts: getDecision(retourBack) },
          { parts: getAutorite(retourBack), title: "Autorité" }
        ],
        title: "Vue du RC"
      },
      ...fichesPersonne
    ]
  };
}
