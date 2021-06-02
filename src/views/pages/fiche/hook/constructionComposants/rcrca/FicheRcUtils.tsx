import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { SectionPanelProps } from "../../../../../common/widget/section/SectionPanel";
import { getLibelle } from "../../../../../common/widget/Text";
import { getInscriptionRepertoireCivil } from "../inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "../interesses/InteresseUtils";
import { getFichesPersonne } from "../personne/FichePersonne";
import { getStatuts } from "../statut/StatutUtils";
import { getAutorite } from "./AutoriteUtils";
import { getDecision } from "./DecisionUtils";

export function getPanelsRc(rc: IFicheRcRca): AccordionReceProps {
  const fichesPersonne: SectionPanelProps[] = getFichesPersonne(rc.personnes);
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
          {
            parts: getAutorite(rc),
            title: getLibelle("Autorité"),
            nbColonne: 2
          },
          {
            parts: getStatuts(rc),
            title: getLibelle("Historique des statuts de la fiche")
          }
        ],
        title: getLibelle("Vue du RC")
      },
      ...fichesPersonne
    ]
  };
}
