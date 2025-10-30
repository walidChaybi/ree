import { useEffect, useRef } from "react";
import { FaEraser } from "react-icons/fa";
import type EtatImage from "../../../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../../../utils/UtilitaireRetoucheImage";
import BoutonIcon from "../../bouton/BoutonIcon";
import type { TCanvasRef, TCoordonnees } from "../Canvas";
import type { TOutilRetoucheImage } from "./BarreOutils";

interface IGommeProps {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  etatImage: EtatImage;
  debutSelectionRectangulaire: TCoordonnees | null;
  finSelectionRectangulaire: TCoordonnees | null;
  pointsSelectionPolygonale: TCoordonnees[];
  outilSelectionne: TOutilRetoucheImage;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
  redessiner(): void;
}

const RAYON = 20;

const Gomme: React.FC<IGommeProps> = ({
  zoom,
  offset,
  refCanvas,
  etatImage,
  debutSelectionRectangulaire,
  finSelectionRectangulaire,
  pointsSelectionPolygonale,
  outilSelectionne,
  setOutilSelectionne,
  redessiner
}) => {
  const gommageRef = useRef<boolean>(false);

  useEffect(() => {
    if (outilSelectionne !== "gomme") return;

    const canvas = refCanvas.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) return;

    const gommer = (e: MouseEvent) => {
      if (!gommageRef.current) return;

      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      if (debutSelectionRectangulaire && finSelectionRectangulaire) {
        const selX = Math.min(debutSelectionRectangulaire.x, finSelectionRectangulaire.x);
        const selY = Math.min(debutSelectionRectangulaire.y, finSelectionRectangulaire.y);
        const selW = Math.abs(debutSelectionRectangulaire.x - finSelectionRectangulaire.x);
        const selH = Math.abs(debutSelectionRectangulaire.y - finSelectionRectangulaire.y);

        const effacerX = Math.max(x - RAYON / 2, selX);
        const effacerY = Math.max(y - RAYON / 2, selY);
        const effacerW = Math.min(RAYON, selX + selW - effacerX);
        const effacerH = Math.min(RAYON, selY + selH - effacerY);

        if (effacerW > 0 && effacerH > 0) {
          etatImage.effacerDansRectangle(effacerX, effacerY, effacerW, effacerH);
        }
      } else if (UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale)) {
        etatImage.effacerDansPolygone(x, y, RAYON, pointsSelectionPolygonale);
      } else {
        etatImage.effacer(x, y, RAYON);
      }

      redessiner();
    };

    const commencerAGommer = (e: MouseEvent) => {
      gommageRef.current = true;

      gommer(e);
    };

    const arreterDeGommer = () => {
      gommageRef.current = false;

      etatImage.enregistrerVersionDansHistorique("effacer");
    };

    canvas.addEventListener("mousedown", commencerAGommer);
    canvas.addEventListener("mousemove", gommer);
    canvas.addEventListener("mouseup", arreterDeGommer);

    return () => {
      canvas.removeEventListener("mousedown", commencerAGommer);
      canvas.removeEventListener("mousemove", gommer);
      canvas.removeEventListener("mouseup", arreterDeGommer);
    };
  }, [outilSelectionne, offset, zoom, debutSelectionRectangulaire, finSelectionRectangulaire, etatImage]);

  return (
    <BoutonIcon
      type="button"
      title="Gommer"
      className={`border-2 border-solid border-bleu-sombre ${outilSelectionne === "gomme" ? "bg-white text-bleu-sombre" : ""}`}
      onClick={() => {
        setOutilSelectionne("gomme");
      }}
    >
      <FaEraser size={18} />
    </BoutonIcon>
  );
};

export default Gomme;
