import { IFicheRc } from "../FicheRcInterfaces";
import { AccordionPartProps } from "../../../../common/widget/accordion/AccordionPart";
import { AccordionReceProps } from "../../../../common/widget/accordion/AccordionRece";
import { AutoriteUtil } from "../../../../../model/ficheRcRca/TypeAutorite";
import { DecisionUtil } from "../../../../../model/ficheRcRca/TypeDecision";
import { getInscriptionRepertoireCivil } from "./inscriptionRepertoireCivil/InscriptionRepertoireCivilUtils";
import { getInteresse } from "./interesses/InteresseUtils";
import { getDecision } from "./DecisionUtils";

export function getRcRcaVue(retourBack: IFicheRc): AccordionReceProps {
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
    ]
  };
}

function getAutorite(retourBack: IFicheRc): AccordionPartProps[] {
  const autorite: AccordionPartProps[] = [
    {
      contents: [
        {
          libelle: "Type",
          value: AutoriteUtil.getLibelle(retourBack.decision.autorite.type)
        },
        {
          libelle: "Ville",
          value: retourBack.decision.autorite.ville || ""
        },
        {
          libelle: "Arrondissement",
          value: `${retourBack.decision.autorite.arrondissement || ""}`
        },
        {
          libelle: "Département",
          value: `${retourBack.decision.autorite.libelleDepartement || ""} (${
            retourBack.decision.autorite.numeroDepartement || ""
          })`
        }
      ],
      title: "Autorité"
    }
  ];

  if (retourBack.decision.sourceConfirmation != null) {
    autorite.push(getSourceConfirmation(retourBack));
  }

  return autorite;
}

function getSourceConfirmation(retourBack: IFicheRc): AccordionPartProps {
  return {
    contents: [
      {
        libelle: "Type",
        value: DecisionUtil.getLibelle(
          retourBack.decision.sourceConfirmation.type
        )
      },
      {
        libelle: "Ville",
        value: retourBack.decision.sourceConfirmation.autorite.ville || ""
      },
      {
        libelle: "Arrondissement",
        value: `${
          retourBack.decision.sourceConfirmation.autorite.arrondissement || ""
        }`
      },
      {
        libelle: "Département",
        value: `${
          retourBack.decision.sourceConfirmation.autorite.libelleDepartement ||
          ""
        } (${
          retourBack.decision.sourceConfirmation.autorite.numeroDepartement ||
          ""
        })`
      }
    ],
    title: ""
  };
}
