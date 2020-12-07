import { IFicheRc } from "../../../../../model/ficheRcRca/FicheRcInterfaces";
import { AccordionReceProps } from "../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "./inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "./interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { getFicheTitle } from "../../FicheUtils";

export function getPanelsRc(retourBack: IFicheRc): AccordionReceProps {
  const nomInteresse1 =
    retourBack.interesses && retourBack.interesses[0]
      ? retourBack.interesses[0].nomFamille
      : "";
  const nomInteresse2 =
    retourBack.interesses && retourBack.interesses[1]
      ? retourBack.interesses[1].nomFamille
      : "";

  return {
    panels: [
      {
        panelAreas: [
          { parts: [getInscriptionRepertoireCivil(retourBack)] },
          { parts: getInteresse(retourBack) },
          { parts: getDecision(retourBack) },
          { parts: getAutorite(retourBack) }
        ],
        title: "Vue du RC"
      }
    ],
    title: getFicheTitle(
      retourBack.categorie,
      retourBack.annee,
      retourBack.numero,
      nomInteresse1,
      nomInteresse2
    )
  };
}
