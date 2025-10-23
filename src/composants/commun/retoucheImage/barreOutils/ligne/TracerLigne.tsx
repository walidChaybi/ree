import { useEffect } from "react";
import { FaPen } from "react-icons/fa";
import type EtatImage from "../../../../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../../../../utils/UtilitaireRetoucheImage";
import BoutonIcon from "../../../bouton/BoutonIcon";
import type { TCanvasRef, TCoordonnees } from "../../Canvas";
import type { TOutilRetoucheImage } from "../BarreOutils";

export interface ILigne {
  id: string;
  debutLigne: TCoordonnees;
  finLigne: TCoordonnees;
}

interface ITracerLigneProps {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  etatImage: EtatImage;
  debutSelectionRectangulaire: TCoordonnees | null;
  finSelectionRectangulaire: TCoordonnees | null;
  debutLigneTemporaire: TCoordonnees | null;
  pointsSelectionPolygonale: TCoordonnees[];
  outilSelectionne: TOutilRetoucheImage;
  setPositionSouris(valeur: TCoordonnees | null): void;
  setDebutLigneTemporaire(valeur: TCoordonnees | null): void;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const TracerLigne: React.FC<ITracerLigneProps> = ({
  zoom,
  offset,
  refCanvas,
  etatImage,
  debutSelectionRectangulaire,
  finSelectionRectangulaire,
  debutLigneTemporaire,
  pointsSelectionPolygonale,
  outilSelectionne,
  setPositionSouris,
  setDebutLigneTemporaire,
  setOutilSelectionne
}) => {
  useEffect(() => {
    if (outilSelectionne !== "tracerLigne") return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    const creerExtremiteLigne = (e: MouseEvent) => {
      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      if (
        (debutSelectionRectangulaire &&
          finSelectionRectangulaire &&
          UtilitaireRetoucheImage.pointEstDansLeRectangle({ point: { x, y }, debutSelectionRectangulaire, finSelectionRectangulaire }) ===
            false) ||
        (UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale) === true &&
          UtilitaireRetoucheImage.estPointDansLePolygone({ x, y }, pointsSelectionPolygonale) === false)
      )
        return;

      if (!debutLigneTemporaire) {
        setDebutLigneTemporaire({ x, y });
      } else {
        etatImage.dessinerLigne(debutLigneTemporaire.x, debutLigneTemporaire.y, x, y);

        setDebutLigneTemporaire(null);
        setPositionSouris(null);
      }
    };

    const definirPositionSouris = (e: MouseEvent) => {
      if (!debutLigneTemporaire) return;

      const { x, y } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      setPositionSouris({ x, y });
    };

    canvas.addEventListener("mousedown", creerExtremiteLigne);
    canvas.addEventListener("mousemove", definirPositionSouris);

    return () => {
      canvas.removeEventListener("mousedown", creerExtremiteLigne);
      canvas.removeEventListener("mousemove", definirPositionSouris);
    };
  }, [outilSelectionne, zoom, offset, refCanvas, debutLigneTemporaire]);

  return (
    <BoutonIcon
      type="button"
      title="Tracer une ligne"
      className={`border-2 border-solid border-bleu-sombre ${outilSelectionne === "tracerLigne" ? "bg-white text-bleu-sombre" : ""}`}
      onClick={() => setOutilSelectionne("tracerLigne")}
    >
      <FaPen size={18} />
    </BoutonIcon>
  );
};

export default TracerLigne;
