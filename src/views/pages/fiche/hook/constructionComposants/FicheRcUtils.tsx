import { IFicheRc } from "../../../../../model/ficheRcRca/FicheRcInterfaces";
import { AccordionReceProps } from "../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRepertoireCivil } from "./inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "./interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";
import { getAutorite } from "./AutoriteUtils";
import { getFicheTitle } from "../../FicheUtils";
import { sortObjectWithNumeroOrdre } from "../../../../common/util/Utils";

export function getPanelsRc(retourBack: IFicheRc): AccordionReceProps {
  const interesse = [...retourBack.interesses].sort((i1, i2) =>
    sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
  );
  const nomInteresse1 =
    interesse && interesse[0] ? interesse[0].nomFamille : "";
  const nomInteresse2 =
    interesse && interesse[1] ? interesse[1].nomFamille : "";

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
