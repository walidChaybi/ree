import { useEffect, useRef } from "react";
import { TOutilRetoucheImage } from "../../composants/commun/retoucheImage/barreOutils/BarreOutils";
import type { TCanvasRef, TCoordonnees } from "../../composants/commun/retoucheImage/Canvas";
import type EtatImage from "../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage, { ILigneAvecExtremite, TExtremite } from "../../utils/UtilitaireRetoucheImage";

interface IUseDeplacerExtremiteLigneParams {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  etatImage: EtatImage;
  outilSelectionne: TOutilRetoucheImage;
  redessiner(): void;
}

const useDeplacerExtremiteLigne = ({
  zoom,
  offset,
  refCanvas,
  etatImage,
  outilSelectionne,
  redessiner
}: IUseDeplacerExtremiteLigneParams) => {
  const dragExtremiteRef = useRef<{
    actif: boolean;
    start: TCoordonnees;
    extremite: TExtremite;
    positionOriginale: TCoordonnees;
  } | null>(null);

  const ligneAvecExtremiteSelectionnee = useRef<ILigneAvecExtremite | null>(null);

  useEffect(() => {
    if (outilSelectionne !== "manipulationLigne") return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const commencerADeplacer = (e: MouseEvent) => {
      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const extremiteTrouvee = UtilitaireRetoucheImage.detecterClicSurExtremite({ x, y }, etatImage.lignes);
      ligneAvecExtremiteSelectionnee.current = extremiteTrouvee;

      if (!ligneAvecExtremiteSelectionnee.current) return;

      dragExtremiteRef.current = {
        actif: true,
        start: { x, y },
        extremite: ligneAvecExtremiteSelectionnee.current.extremite,
        positionOriginale: {
          ...ligneAvecExtremiteSelectionnee.current[
            ligneAvecExtremiteSelectionnee.current.extremite === "debut" ? "debutLigne" : "finLigne"
          ]
        }
      };

      etatImage.debuterDeplacementLigne(ligneAvecExtremiteSelectionnee.current.id);
    };

    const deplacerExtremiteLigne = (e: MouseEvent) => {
      if (!dragExtremiteRef.current || !dragExtremiteRef.current.actif) return;

      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const deltaX = x - dragExtremiteRef.current.start.x;
      const deltaY = y - dragExtremiteRef.current.start.y;

      redessiner();

      const nouvelleExtremite = {
        x: dragExtremiteRef.current.positionOriginale.x + deltaX,
        y: dragExtremiteRef.current.positionOriginale.y + deltaY
      };

      const ligne = ligneAvecExtremiteSelectionnee.current;
      if (!ligne) return;

      const debut = dragExtremiteRef.current.extremite === "debut" ? nouvelleExtremite : ligne.debutLigne;

      const fin = dragExtremiteRef.current.extremite === "fin" ? nouvelleExtremite : ligne.finLigne;

      ctx.save();
      ctx.strokeStyle = "red";
      ctx.lineWidth = etatImage.epaisseurLignes;
      ctx.beginPath();
      ctx.moveTo(debut.x, debut.y);
      ctx.lineTo(fin.x, fin.y);
      ctx.stroke();
      ctx.restore();
    };

    const finirDeDeplacer = (e: MouseEvent) => {
      if (!dragExtremiteRef.current || !dragExtremiteRef.current.actif || !ligneAvecExtremiteSelectionnee.current) return;

      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const deltaX = x - dragExtremiteRef.current.start.x;
      const deltaY = y - dragExtremiteRef.current.start.y;

      etatImage.finaliserDeplacementLigne(ligneAvecExtremiteSelectionnee.current.id, deltaX, deltaY, [
        ligneAvecExtremiteSelectionnee.current.extremite
      ]);

      dragExtremiteRef.current = null;
      ligneAvecExtremiteSelectionnee.current = null;

      redessiner();
    };

    canvas.addEventListener("mousedown", commencerADeplacer);
    canvas.addEventListener("mousemove", deplacerExtremiteLigne);
    canvas.addEventListener("mouseup", finirDeDeplacer);
    canvas.addEventListener("mouseleave", finirDeDeplacer);

    return () => {
      canvas.removeEventListener("mousedown", commencerADeplacer);
      canvas.removeEventListener("mousemove", deplacerExtremiteLigne);
      canvas.removeEventListener("mouseup", finirDeDeplacer);
      canvas.removeEventListener("mouseleave", finirDeDeplacer);
    };
  }, [refCanvas, zoom, offset, outilSelectionne]);
};

export default useDeplacerExtremiteLigne;
