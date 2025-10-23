import { MdClose } from "react-icons/md";
import type EtatImage from "../../../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../../../utils/UtilitaireRetoucheImage";
import BoutonIcon from "../../bouton/BoutonIcon";
import type { TCanvasRef, TCoordonnees } from "../Canvas";

interface IEffacerHorsSelectionProps {
  zoom: number;
  offset: TCoordonnees;
  etatImage: EtatImage;
  refCanvas: TCanvasRef;
  debutSelectionRectangulaire: TCoordonnees | null;
  finSelectionRectangulaire: TCoordonnees | null;
  pointsSelectionPolygonale: TCoordonnees[];
  setDebutSelectionRectangulaire(valeur: TCoordonnees | null): void;
  setFinSelectionRectangulaire(valeur: TCoordonnees | null): void;
}

const EffacerHorsSelection: React.FC<IEffacerHorsSelectionProps> = ({
  zoom,
  offset,
  etatImage,
  refCanvas,
  debutSelectionRectangulaire,
  finSelectionRectangulaire,
  pointsSelectionPolygonale,
  setDebutSelectionRectangulaire,
  setFinSelectionRectangulaire
}) => {
  const effacer = () => {
    if ((!debutSelectionRectangulaire || !finSelectionRectangulaire) && pointsSelectionPolygonale.length === 0) return;

    if (!refCanvas.current) return;

    if (debutSelectionRectangulaire && finSelectionRectangulaire) {
      const x = Math.min(debutSelectionRectangulaire.x, finSelectionRectangulaire.x);
      const y = Math.min(debutSelectionRectangulaire.y, finSelectionRectangulaire.y);
      const largeur = Math.abs(debutSelectionRectangulaire.x - finSelectionRectangulaire.x);
      const hauteur = Math.abs(debutSelectionRectangulaire.y - finSelectionRectangulaire.y);

      etatImage.effacerHorsRectangle(x, y, largeur, hauteur);
    } else {
      etatImage.effacerHorsPolygone(pointsSelectionPolygonale);
    }

    const canvas = refCanvas.current;
    const ctx = canvas.getContext("2d");

    if (!canvas || !ctx) return;

    UtilitaireRetoucheImage.reinitialiserEtatCanvas(ctx);
    UtilitaireRetoucheImage.effacerCanvas(ctx, canvas);

    ctx.setTransform(zoom, 0, 0, zoom, offset.x, offset.y);

    const img = etatImage.recupererImage;
    img.onload = () => ctx.drawImage(img, 0, 0);

    setDebutSelectionRectangulaire(null);
    setFinSelectionRectangulaire(null);
  };

  return (
    <BoutonIcon
      type="button"
      title="Effacer hors sélection"
      className="border-2 border-solid border-bleu-sombre"
      onClick={effacer}
    >
      <MdClose size={18} />
    </BoutonIcon>
  );
};

export default EffacerHorsSelection;
