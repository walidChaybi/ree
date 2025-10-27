import UtilitaireRetoucheImage from "../../../../../utils/UtilitaireRetoucheImage";
import type { TCoordonnees } from "../../Canvas";
import type { TOutilRetoucheImage } from "../BarreOutils";

interface IAffichageSelectionProps {
  zoom: number;
  offset: TCoordonnees;
  outilSelectionne: TOutilRetoucheImage;
  debutSelectionRectangulaire: TCoordonnees | null;
  finSelectionRectangulaire: TCoordonnees | null;
  positionSouris: TCoordonnees | null;
  pointsSelectionPolygonale: TCoordonnees[];
}

const AffichageSelection: React.FC<IAffichageSelectionProps> = ({
  zoom,
  offset,
  outilSelectionne,
  debutSelectionRectangulaire,
  finSelectionRectangulaire,
  positionSouris,
  pointsSelectionPolygonale
}) => {
  // Sélection rectangulaire en cours
  if (outilSelectionne === "selectionRectangulaire" && debutSelectionRectangulaire && !finSelectionRectangulaire && positionSouris) {
    return (
      <div
        id="selection-rectangulaire-temporaire"
        style={{
          position: "absolute",
          left: `${Math.min(debutSelectionRectangulaire.x, positionSouris.x) * zoom + offset.x}px`,
          top: `${Math.min(debutSelectionRectangulaire.y, positionSouris.y) * zoom + offset.y}px`,
          width: `${Math.abs(positionSouris.x - debutSelectionRectangulaire.x) * zoom}px`,
          height: `${Math.abs(positionSouris.y - debutSelectionRectangulaire.y) * zoom}px`,
          border: "2px dashed red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          pointerEvents: "none"
        }}
      />
    );
  }

  // Sélection rectangulaire terminée
  if (debutSelectionRectangulaire && finSelectionRectangulaire) {
    return (
      <div
        id="selection-rectangulaire"
        style={{
          position: "absolute",
          left: `${Math.min(debutSelectionRectangulaire.x, finSelectionRectangulaire.x) * zoom + offset.x}px`,
          top: `${Math.min(debutSelectionRectangulaire.y, finSelectionRectangulaire.y) * zoom + offset.y}px`,
          width: `${Math.abs(finSelectionRectangulaire.x - debutSelectionRectangulaire.x) * zoom}px`,
          height: `${Math.abs(finSelectionRectangulaire.y - debutSelectionRectangulaire.y) * zoom}px`,
          border: "2px dashed red",
          pointerEvents: "none"
        }}
      />
    );
  }

  // Sélection polygonale en cours
  if (
    outilSelectionne === "selectionPolygonale" &&
    pointsSelectionPolygonale.length > 1 &&
    !UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale)
  ) {
    return (
      <svg
        id="selection-polygonale-temporaire"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        {pointsSelectionPolygonale.map((point, index) => {
          if (index === 0) return null;

          const precedent = pointsSelectionPolygonale[index - 1];

          return (
            <line
              key={point.x}
              x1={precedent.x * zoom + offset.x}
              y1={precedent.y * zoom + offset.y}
              x2={point.x * zoom + offset.x}
              y2={point.y * zoom + offset.y}
              stroke="red"
              strokeWidth={2}
            />
          );
        })}
      </svg>
    );
  }

  // Sélection polygonale terminée
  if (UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale) === true) {
    return (
      <svg
        id="selection-polygonale"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        <polygon
          points={pointsSelectionPolygonale.map(point => `${point.x * zoom + offset.x},${point.y * zoom + offset.y}`).join(" ")}
          fill="transparent"
          stroke="red"
          strokeWidth={2}
          strokeDasharray="5,5"
        />
      </svg>
    );
  }

  return null;
};

export default AffichageSelection;
