import EtatImage from "@model/retoucheImage/EtatImage";
import { useEffect, useRef } from "react";
import { TOutilRetoucheImage } from "../../composants/commun/retoucheImage/barreOutils/BarreOutils";
import { ILigne } from "../../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";
import { TCanvasRef, TCoordonnees } from "../../composants/commun/retoucheImage/Canvas";
import UtilitaireRetoucheImage from "../../utils/UtilitaireRetoucheImage";

interface IUseSupprimerLigneParams {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  etatImage: EtatImage;
  outilSelectionne: TOutilRetoucheImage;
  redessiner(): void;
}

const useSupprimerLigne = ({ zoom, offset, refCanvas, etatImage, outilSelectionne, redessiner }: IUseSupprimerLigneParams) => {
  const ligneSelectionnee = useRef<ILigne | null>(null);

  useEffect(() => {
    if (outilSelectionne !== "manipulationLigne") return;

    const canvas = refCanvas.current;

    if (!canvas) return;

    const supprimerLigne = (e: KeyboardEvent) => {
      if (e.key === "Delete" && ligneSelectionnee.current) {
        etatImage.effacerLigne(ligneSelectionnee.current.id);

        ligneSelectionnee.current = null;

        redessiner();
      }
    };

    const selectionnerLigne = (e: MouseEvent) => {
      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const ligneTrouvee = UtilitaireRetoucheImage.detecterClicSurLigne({ x, y }, etatImage.lignes);

      if (ligneTrouvee) {
        etatImage.selectionnerLigne(ligneTrouvee.id);

        ligneSelectionnee.current = ligneTrouvee;
      } else {
        etatImage.annulerSelectionLignes();

        ligneSelectionnee.current = null;
      }

      redessiner();
    };

    canvas.addEventListener("mousedown", selectionnerLigne);
    window.addEventListener("keydown", supprimerLigne);

    return () => {
      canvas.removeEventListener("mousedown", selectionnerLigne);
      window.removeEventListener("keydown", supprimerLigne);
    };
  }, [outilSelectionne]);
};

export default useSupprimerLigne;
