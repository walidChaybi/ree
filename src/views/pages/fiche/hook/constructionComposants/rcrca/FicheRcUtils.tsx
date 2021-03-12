import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "../inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "../interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonneWithHabilitation } from "../personne/FichePersonne";

export function getPanelsRc(retourBack: IFicheRcRca): AccordionReceProps {
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonneWithHabilitation(
    retourBack.personnes
  );
  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(retourBack)] },
          {
            parts: getInteresse(retourBack),
            nbColonne: 2
          },
          { parts: getDecision(retourBack), nbColonne: 2 },
          { parts: getAutorite(retourBack), title: "Autorité", nbColonne: 2 }
        ],
        title: "Vue du RC"
      },
      ...fichesPersonne
    ]
  };
}
