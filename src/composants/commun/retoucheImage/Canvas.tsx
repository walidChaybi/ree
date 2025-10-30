import { useEffect, useRef, useState } from "react";
import useDeplacerExtremiteLigne from "../../../hooks/retoucheImage/DeplacerExtremiteLigneHook";
import useDeplacerLigne from "../../../hooks/retoucheImage/DeplacerLigneHook";
import useSupprimerLigne from "../../../hooks/retoucheImage/SupprimerLigneHook";
import type EtatImage from "../../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../../utils/UtilitaireRetoucheImage";
import BarreOutils, { type TOutilRetoucheImage } from "./barreOutils/BarreOutils";
import AffichageSelection from "./barreOutils/selection/AffichageSelection";
import { ITaille } from "./RetoucheImage";
import RotationModal from "./rotation/RotationModal";

export type TCoordonnees = { x: number; y: number };
export type TCanvasRef = React.RefObject<HTMLCanvasElement | null>;

export const COORDONNEES_INITIALES = { x: 0, y: 0 };

interface ICanvasProps {
  tailleCanvas: ITaille;
  etatImage: EtatImage;
  pageCourante: number;
}

const Canvas: React.FC<ICanvasProps> = ({ tailleCanvas, etatImage, pageCourante }) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<TCoordonnees>({ x: 0, y: 0 });
  const [curseur, setCurseur] = useState<string>("default");
  const [outilSelectionne, setOutilSelectionne] = useState<TOutilRetoucheImage>("deplacement");
  const [positionSouris, setPositionSouris] = useState<TCoordonnees | null>(null);
  const [debutSelectionRectangulaire, setDebutSelectionRectangulaire] = useState<TCoordonnees | null>(null);
  const [finSelectionRectangulaire, setFinSelectionRectangulaire] = useState<TCoordonnees | null>(null);
  const [pointsSelectionPolygonale, setPointsSelectionPolygonale] = useState<TCoordonnees[]>([]);
  const [debutLigneTemporaire, setDebutLigneTemporaire] = useState<TCoordonnees | null>(null);

  useEffect(() => {
    appelerRedessiner();
  }, [
    etatImage,
    zoom,
    offset,
    tailleCanvas,
    debutLigneTemporaire,
    positionSouris,
    outilSelectionne,
    pointsSelectionPolygonale,
    etatImage.epaisseurLignes
  ]);

  useEffect(() => {
    annulerSelectionActuelle();
  }, [pageCourante]);

  useEffect(() => {
    // En cas de changement d'outil lors d'une sélection en cours, suppression de celle-ci
    if (
      (pointsSelectionPolygonale.length > 1 && !UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale)) ||
      (debutSelectionRectangulaire && !finSelectionRectangulaire)
    ) {
      annulerSelectionActuelle();
    }

    if (etatImage.lignes.length > 0) {
      etatImage.annulerSelectionLignes();

      appelerRedessiner();
    }

    switch (outilSelectionne) {
      case "deplacement":
        setCurseur("grab");
        break;
      case "gomme":
      case "tracerLigne":
        setCurseur("crosshair");
        break;
      default:
        setCurseur("default");
        break;
    }
  }, [outilSelectionne]);

  const appelerRedessiner = () =>
    UtilitaireRetoucheImage.redessiner({
      refCanvas,
      zoom,
      offset,
      etatImage,
      outilSelectionne,
      debutLigneTemporaire,
      pointsSelectionPolygonale,
      positionSouris
    });

  const annulerSelectionActuelle = () => {
    setDebutSelectionRectangulaire(null);
    setFinSelectionRectangulaire(null);
    setPointsSelectionPolygonale([]);
    setPositionSouris(null);
  };

  useDeplacerLigne({ zoom, offset, refCanvas, etatImage, outilSelectionne, redessiner: appelerRedessiner });
  useDeplacerExtremiteLigne({ zoom, offset, refCanvas, etatImage, outilSelectionne, redessiner: appelerRedessiner });
  useSupprimerLigne({ zoom, offset, refCanvas, etatImage, outilSelectionne, redessiner: appelerRedessiner });

  return (
    <div>
      <div className="flex gap-2">
        <BarreOutils
          zoom={zoom}
          offset={offset}
          refCanvas={refCanvas}
          etatImage={etatImage}
          debutSelectionRectangulaire={debutSelectionRectangulaire}
          finSelectionRectangulaire={finSelectionRectangulaire}
          outilSelectionne={outilSelectionne}
          debutLigneTemporaire={debutLigneTemporaire}
          pointsSelectionPolygonale={pointsSelectionPolygonale}
          setZoom={setZoom}
          setOffset={setOffset}
          setPointsSelectionPolygonale={setPointsSelectionPolygonale}
          setDebutSelectionRectangulaire={setDebutSelectionRectangulaire}
          setFinSelectionRectangulaire={setFinSelectionRectangulaire}
          setPositionSouris={setPositionSouris}
          setDebutLigneTemporaire={setDebutLigneTemporaire}
          setOutilSelectionne={setOutilSelectionne}
          annulerSelectionActuelle={annulerSelectionActuelle}
          appelerRedessiner={appelerRedessiner}
        />
      </div>
      <div className="relative mt-4">
        <canvas
          ref={refCanvas}
          aria-label="Image en cours de retouche"
          className="mb-4 block border-2 border-solid border-bleu-sombre"
          style={{ cursor: curseur, width: tailleCanvas.largeur, height: tailleCanvas.hauteur }}
          width={tailleCanvas.largeur}
          height={tailleCanvas.hauteur}
        />
        <AffichageSelection
          zoom={zoom}
          offset={offset}
          outilSelectionne={outilSelectionne}
          debutSelectionRectangulaire={debutSelectionRectangulaire}
          finSelectionRectangulaire={finSelectionRectangulaire}
          positionSouris={positionSouris}
          pointsSelectionPolygonale={pointsSelectionPolygonale}
        />
      </div>
      {outilSelectionne === "rotation" && (
        <RotationModal
          etatImage={etatImage}
          setOutilSelectionne={setOutilSelectionne}
        />
      )}
    </div>
  );
};

export default Canvas;
