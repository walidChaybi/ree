import { useEffect, useRef } from "react";
import { FaCircleNodes } from "react-icons/fa6";
import UtilitaireRetoucheImage from "../../../../../utils/UtilitaireRetoucheImage";
import BoutonIcon from "../../../bouton/BoutonIcon";
import type { TCanvasRef, TCoordonnees } from "../../Canvas";
import type { TOutilRetoucheImage } from "../BarreOutils";

interface ISelectionPolygonaleProps {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  outilSelectionne: TOutilRetoucheImage;
  pointsSelectionPolygonale: TCoordonnees[];
  setPositionSouris(valeur: TCoordonnees | null): void;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
  setPointsSelectionPolygonale: React.Dispatch<React.SetStateAction<TCoordonnees[]>>;
  annulerSelectionActuelle(): void;
}

const SelectionPolygonale: React.FC<ISelectionPolygonaleProps> = ({
  zoom,
  offset,
  refCanvas,
  outilSelectionne,
  pointsSelectionPolygonale,
  setPositionSouris,
  setOutilSelectionne,
  setPointsSelectionPolygonale,
  annulerSelectionActuelle
}) => {
  const selectionRef = useRef<boolean>(false);

  useEffect(() => {
    if (outilSelectionne !== "selectionPolygonale") return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleClic = (e: MouseEvent) => {
      const position = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      if (pointsSelectionPolygonale.length === 0) {
        selectionRef.current = true;
      }

      if (
        UtilitaireRetoucheImage.peutAjouterPoint(pointsSelectionPolygonale, position) === false &&
        UtilitaireRetoucheImage.pointProcheDuPointDeDepart({
          position,
          positionPointDeDepart: pointsSelectionPolygonale[0]
        }) === false
      )
        return;

      setPointsSelectionPolygonale(precedents => [...precedents, position]);

      if (
        pointsSelectionPolygonale.length > 2 &&
        UtilitaireRetoucheImage.pointProcheDuPointDeDepart({
          position,
          positionPointDeDepart: pointsSelectionPolygonale[0]
        })
      ) {
        selectionRef.current = false;

        setOutilSelectionne("deplacement");
      }
    };

    const handleSourisEnMouvement = (e: MouseEvent) => {
      const position = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      if (selectionRef.current === true) {
        setPositionSouris(position);
      }
    };

    canvas.addEventListener("mousedown", handleClic);
    canvas.addEventListener("mousemove", handleSourisEnMouvement);

    return () => {
      canvas.removeEventListener("mousedown", handleClic);
      canvas.removeEventListener("mousemove", handleSourisEnMouvement);
    };
  }, [offset, zoom, outilSelectionne, pointsSelectionPolygonale]);

  const utiliserSelectionPolygonale = () => {
    annulerSelectionActuelle();
    setOutilSelectionne("selectionPolygonale");
  };

  return (
    <BoutonIcon
      type="button"
      title="Sélection polygonale"
      className={`border-2 border-solid border-bleu-sombre ${outilSelectionne === "selectionPolygonale" ? "bg-white text-bleu-sombre" : ""}`}
      onClick={utiliserSelectionPolygonale}
    >
      <FaCircleNodes size={18} />
    </BoutonIcon>
  );
};

export default SelectionPolygonale;
