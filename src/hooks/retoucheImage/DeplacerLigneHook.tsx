import { useEffect, useRef } from "react";
import { TOutilRetoucheImage } from "../../composants/commun/retoucheImage/barreOutils/BarreOutils";
import { ILigne } from "../../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";
import type { TCanvasRef, TCoordonnees } from "../../composants/commun/retoucheImage/Canvas";
import type EtatImage from "../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../utils/UtilitaireRetoucheImage";

interface IUseDeplacerLigneParams {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  etatImage: EtatImage;
  outilSelectionne: TOutilRetoucheImage;
  redessiner(): void;
}

const useDeplacerLigne = ({ zoom, offset, refCanvas, etatImage, outilSelectionne, redessiner }: IUseDeplacerLigneParams) => {
  const dragLigneRef = useRef<{
    actif: boolean;
    start: TCoordonnees;
    originalDebut: TCoordonnees;
    originalFin: TCoordonnees;
  } | null>(null);

  const ligneSelectionnee = useRef<ILigne | null>(null);

  useEffect(() => {
    if (outilSelectionne !== "manipulationLigne") return;

    const canvas = refCanvas.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas) return;

    if (!ctx) return;

    const commencerADeplacer = (e: MouseEvent) => {
      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const extremiteTrouvee = UtilitaireRetoucheImage.detecterClicSurExtremite({ x, y }, etatImage.lignes);

      if (extremiteTrouvee) return;

      const ligneTrouvee = UtilitaireRetoucheImage.detecterClicSurLigne({ x, y }, etatImage.lignes);
      ligneSelectionnee.current = ligneTrouvee;

      if (!ligneSelectionnee.current) return;

      dragLigneRef.current = {
        actif: true,
        start: { x, y },
        originalDebut: { ...ligneSelectionnee.current.debutLigne },
        originalFin: { ...ligneSelectionnee.current.finLigne }
      };

      etatImage.debuterDeplacementLigne(ligneSelectionnee.current.id);
    };

    const deplacerLigne = (e: MouseEvent) => {
      if (!dragLigneRef.current || !dragLigneRef.current.actif) return;

      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const deltaX = x - dragLigneRef.current.start.x;
      const deltaY = y - dragLigneRef.current.start.y;

      redessiner();

      ctx.save();
      ctx.strokeStyle = "red";
      ctx.lineWidth = etatImage.epaisseurLignes;
      ctx.beginPath();
      ctx.moveTo(dragLigneRef.current.originalDebut.x + deltaX, dragLigneRef.current.originalDebut.y + deltaY);
      ctx.lineTo(dragLigneRef.current.originalFin.x + deltaX, dragLigneRef.current.originalFin.y + deltaY);
      ctx.stroke();
      ctx.restore();
    };

    const finirDeDeplacer = (e: MouseEvent) => {
      if (!dragLigneRef.current || !dragLigneRef.current.actif || !ligneSelectionnee.current) return;

      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const deltaX = x - dragLigneRef.current.start.x;
      const deltaY = y - dragLigneRef.current.start.y;

      etatImage.finaliserDeplacementLigne(ligneSelectionnee.current.id, deltaX, deltaY, ["debut", "fin"]);

      UtilitaireRetoucheImage.reinitialiserEtatCanvas(ctx);
      UtilitaireRetoucheImage.effacerCanvas(ctx, canvas);

      ctx.setTransform(zoom, 0, 0, zoom, offset.x, offset.y);
      ctx.drawImage(etatImage.recupererBuffer, 0, 0);

      dragLigneRef.current = null;

      redessiner();
    };

    canvas.addEventListener("mousedown", commencerADeplacer);
    canvas.addEventListener("mousemove", deplacerLigne);
    canvas.addEventListener("mouseup", finirDeDeplacer);

    return () => {
      canvas.removeEventListener("mousedown", commencerADeplacer);
      canvas.removeEventListener("mousemove", deplacerLigne);
      canvas.removeEventListener("mouseup", finirDeDeplacer);
    };
  }, [outilSelectionne, zoom, offset, etatImage, redessiner]);
};

export default useDeplacerLigne;
