import type EtatImage from "../../../../model/retoucheImage/EtatImage";
import { type TCanvasRef, type TCoordonnees } from "../Canvas";
import Deplacement from "./Deplacement";
import EffacerHorsSelection from "./EffacerHorsSelection";
import GestionnaireZoom from "./GestionnaireZoom";
import Gomme from "./Gomme";
import Historique from "./Historique";
import ManipulationLigne from "./ligne/ManipulationLigne";
import ModifierEpaisseurLignes from "./ligne/ModifierEpaisseurLignes";
import TracerLigne from "./ligne/TracerLigne";
import Rotation from "./Rotation";
import AnnulerSelection from "./selection/AnnulerSelection";
import SelectionPolygonale from "./selection/SelectionPolygonale";
import SelectionRectangulaire from "./selection/SelectionRectangulaire";

export type TOutilRetoucheImage =
  | "gomme"
  | "tracerLigne"
  | "manipulationLigne"
  | "rotation"
  | "selectionRectangulaire"
  | "selectionPolygonale"
  | "deplacement";

interface IBarreOutilsProps {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  etatImage: EtatImage;
  debutSelectionRectangulaire: TCoordonnees | null;
  finSelectionRectangulaire: TCoordonnees | null;
  outilSelectionne: TOutilRetoucheImage;
  debutLigneTemporaire: TCoordonnees | null;
  pointsSelectionPolygonale: TCoordonnees[];
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<TCoordonnees>>;
  setPointsSelectionPolygonale: React.Dispatch<React.SetStateAction<TCoordonnees[]>>;
  setDebutSelectionRectangulaire(valeur: TCoordonnees | null): void;
  setFinSelectionRectangulaire(valeur: TCoordonnees | null): void;
  setPositionSouris(valeur: TCoordonnees | null): void;
  setDebutLigneTemporaire(valeur: TCoordonnees | null): void;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
  annulerSelectionActuelle(): void;
  appelerRedessiner(): void;
}

const BarreOutils: React.FC<IBarreOutilsProps> = ({
  zoom,
  offset,
  refCanvas,
  etatImage,
  debutSelectionRectangulaire,
  finSelectionRectangulaire,
  outilSelectionne,
  debutLigneTemporaire,
  pointsSelectionPolygonale,
  setZoom,
  setOffset,
  setPointsSelectionPolygonale,
  setDebutSelectionRectangulaire,
  setFinSelectionRectangulaire,
  setPositionSouris,
  setDebutLigneTemporaire,
  setOutilSelectionne,
  annulerSelectionActuelle,
  appelerRedessiner
}) => {
  return (
    <ul
      aria-label="Outils"
      className="m-0 flex w-full list-none items-start gap-0.5 p-1 2xl:gap-1"
    >
      <li>
        <SelectionRectangulaire
          zoom={zoom}
          offset={offset}
          refCanvas={refCanvas}
          debutSelectionRectangulaire={debutSelectionRectangulaire}
          finSelectionRectangulaire={finSelectionRectangulaire}
          outilSelectionne={outilSelectionne}
          setDebutSelectionRectangulaire={setDebutSelectionRectangulaire}
          setFinSelectionRectangulaire={setFinSelectionRectangulaire}
          setPositionSouris={setPositionSouris}
          setOutilSelectionne={setOutilSelectionne}
          annulerSelectionActuelle={annulerSelectionActuelle}
        />
      </li>
      <li>
        <SelectionPolygonale
          zoom={zoom}
          offset={offset}
          refCanvas={refCanvas}
          outilSelectionne={outilSelectionne}
          pointsSelectionPolygonale={pointsSelectionPolygonale}
          setPositionSouris={setPositionSouris}
          setOutilSelectionne={setOutilSelectionne}
          setPointsSelectionPolygonale={setPointsSelectionPolygonale}
          annulerSelectionActuelle={annulerSelectionActuelle}
        />
      </li>
      <li>
        <AnnulerSelection
          annulerSelectionActuelle={annulerSelectionActuelle}
          setOutilSelectionne={setOutilSelectionne}
        />
      </li>
      <li>
        <Gomme
          zoom={zoom}
          offset={offset}
          refCanvas={refCanvas}
          etatImage={etatImage}
          debutSelectionRectangulaire={debutSelectionRectangulaire}
          finSelectionRectangulaire={finSelectionRectangulaire}
          pointsSelectionPolygonale={pointsSelectionPolygonale}
          outilSelectionne={outilSelectionne}
          setOutilSelectionne={setOutilSelectionne}
          redessiner={appelerRedessiner}
        />
      </li>
      <li>
        <TracerLigne
          zoom={zoom}
          offset={offset}
          refCanvas={refCanvas}
          etatImage={etatImage}
          debutSelectionRectangulaire={debutSelectionRectangulaire}
          finSelectionRectangulaire={finSelectionRectangulaire}
          debutLigneTemporaire={debutLigneTemporaire}
          pointsSelectionPolygonale={pointsSelectionPolygonale}
          outilSelectionne={outilSelectionne}
          setPositionSouris={setPositionSouris}
          setDebutLigneTemporaire={setDebutLigneTemporaire}
          setOutilSelectionne={setOutilSelectionne}
        />
      </li>
      <li>
        <ManipulationLigne
          outilSelectionne={outilSelectionne}
          setOutilSelectionne={setOutilSelectionne}
        />
      </li>
      <li>
        <EffacerHorsSelection
          zoom={zoom}
          offset={offset}
          etatImage={etatImage}
          refCanvas={refCanvas}
          debutSelectionRectangulaire={debutSelectionRectangulaire}
          finSelectionRectangulaire={finSelectionRectangulaire}
          pointsSelectionPolygonale={pointsSelectionPolygonale}
          setDebutSelectionRectangulaire={setDebutSelectionRectangulaire}
          setFinSelectionRectangulaire={setFinSelectionRectangulaire}
        />
      </li>
      <li>
        <Rotation setOutilSelectionne={setOutilSelectionne} />
      </li>
      <li>
        <Deplacement
          zoom={zoom}
          offset={offset}
          refCanvas={refCanvas}
          outilSelectionne={outilSelectionne}
          setOffset={setOffset}
          setOutilSelectionne={setOutilSelectionne}
        />
      </li>
      <li>
        <ModifierEpaisseurLignes
          etatImage={etatImage}
          redessiner={appelerRedessiner}
        />
      </li>
      <li>
        <GestionnaireZoom
          refCanvas={refCanvas}
          zoom={zoom}
          offset={offset}
          setZoom={setZoom}
          setOffset={setOffset}
        />
      </li>
      <li>
        <Historique
          etatImage={etatImage}
          redessiner={appelerRedessiner}
        />
      </li>
    </ul>
  );
};

export default BarreOutils;
