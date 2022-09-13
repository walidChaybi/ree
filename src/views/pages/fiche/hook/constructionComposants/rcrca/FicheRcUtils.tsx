import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getLibelle } from "@util/Utils";
import { SectionPanelProps } from "@widget/section/SectionPanel";
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
        title: getLibelle("Visualisation du RC")
      },
      ...fichesPersonne
    ]
  };
}
