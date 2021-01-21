import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";

export function getInscriptionRegistrePacs(
  retourBack: IFichePacs
): AccordionPartProps {
  return {
    contents: [],
    title: "Inscription des registre des PACS des étrangers nés à l'étranger"
  };
}
