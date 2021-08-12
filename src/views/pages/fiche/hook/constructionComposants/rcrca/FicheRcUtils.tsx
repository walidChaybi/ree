import { IFicheRcRca } from "../../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { SectionPanelProps } from "../../../../../common/widget/section/SectionPanel";
import { getLibelle } from "../../../../../common/widget/Text";
import { IAccordionReceSection } from "../../../FicheUtils";
import { getInscriptionRepertoireCivil } from "../inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "../interesses/InteresseUtils";
import { getFichesPersonne } from "../personne/FichePersonne";
import { getStatuts } from "../statut/StatutUtils";
import { getAutorite } from "./AutoriteUtils";
import { getDecision } from "./DecisionUtils";

export function getPanelsRc(rc: IFicheRcRca): IAccordionReceSection {
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
            parts: getStatuts(rc.statutsFiche),
            title: getLibelle("Historique des statuts de la fiche")
          }
        ],
        title: getLibelle("Vue du RC")
      },
      ...fichesPersonne
    ]
  };
}
