import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "../inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "../interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { SectionPanelProps } from "../../../../../common/widget/section/SectionPanel";
import { getFichesPersonne } from "../personne/FichePersonne";

export function getPanelsRca(rca: IFicheRcRca): AccordionReceProps {
  const fichesPersonne: SectionPanelProps[] = getFichesPersonne(rca.personnes);

  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(rca)], nbColonne: 1 },
          {
            parts: getInteresse(rca),
            nbColonne: 2
          },
          { parts: getDecision(rca), nbColonne: 2 },
          { parts: getAutorite(rca), title: "Autorité", nbColonne: 2 }
        ],
        title: "Vue du RCA"
      },
      ...fichesPersonne
    ]
  };
}
