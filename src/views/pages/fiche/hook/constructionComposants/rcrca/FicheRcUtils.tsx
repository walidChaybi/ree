import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "../inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "../interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonne } from "../personne/FichePersonne";

export function getPanelsRc(rc: IFicheRcRca): AccordionReceProps {
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonne(rc.personnes);
  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(rc)] },
          {
            parts: getInteresse(rc),
            nbColonne: 2
          },
          { parts: getDecision(rc), nbColonne: 2 },
          { parts: getAutorite(rc), title: "Autorité", nbColonne: 2 }
        ],
        title: "Vue du RC"
      },
      ...fichesPersonne
    ]
  };
}
