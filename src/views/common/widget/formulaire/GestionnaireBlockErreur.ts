/* istanbul ignore file */
import { estRenseigne } from "@util/Utils";

export class GestionnaireBlockErreur {
  public static scrollALaPremiereErreur = () => {
    const blockErreurs = Array.from(
      document.getElementsByClassName("BlockErreur")
    );
    if (estRenseigne(blockErreurs)) {
      const blocErreurNonVide = blockErreurs.find(
        blockErreur => blockErreur.childNodes.length > 0
      );
      if (blocErreurNonVide) {
        const blockAScroller: any =
          blocErreurNonVide.parentNode ?? blocErreurNonVide;
        blockAScroller.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
}
