import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { SectionPanelProps } from "../../../../../common/widget/section/SectionPanel";
import { IAccordionReceSection } from "../../../FicheUtils";
import { getInscriptionRepertoireCivil } from "../inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "../interesses/InteresseUtils";
import { getFichesPersonne } from "../personne/FichePersonne";
import { getAutorite } from "./AutoriteUtils";
import { getDecision } from "./DecisionUtils";

export function getPanelsRca(rca: IFicheRcRca): IAccordionReceSection {
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
