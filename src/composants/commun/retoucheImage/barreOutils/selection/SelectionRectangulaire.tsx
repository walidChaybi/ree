import { useEffect } from "react";
import { MdOutlineCropFree } from "react-icons/md";
import UtilitaireRetoucheImage from "../../../../../utils/UtilitaireRetoucheImage";
import BoutonIcon from "../../../bouton/BoutonIcon";
import type { TCanvasRef, TCoordonnees } from "../../Canvas";
import type { TOutilRetoucheImage } from "../BarreOutils";

interface ISelectionRectangulaireProps {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  debutSelectionRectangulaire: TCoordonnees | null;
  finSelectionRectangulaire: TCoordonnees | null;
  outilSelectionne: TOutilRetoucheImage;
  setDebutSelectionRectangulaire(valeur: TCoordonnees | null): void;
  setFinSelectionRectangulaire(valeur: TCoordonnees | null): void;
  setPositionSouris(valeur: TCoordonnees | null): void;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
  annulerSelectionActuelle(): void;
}

const SelectionRectangulaire: React.FC<ISelectionRectangulaireProps> = ({
  zoom,
  offset,
  refCanvas,
  debutSelectionRectangulaire,
  finSelectionRectangulaire,
  outilSelectionne,
  setDebutSelectionRectangulaire,
  setFinSelectionRectangulaire,
  setPositionSouris,
  setOutilSelectionne,
  annulerSelectionActuelle
}) => {
  useEffect(() => {
    if (outilSelectionne !== "selectionRectangulaire") return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    const handleClic = (e: MouseEvent) => {
      const position = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      if (!debutSelectionRectangulaire || (debutSelectionRectangulaire && finSelectionRectangulaire)) {
        setDebutSelectionRectangulaire(position);
        setFinSelectionRectangulaire(null);
        setPositionSouris(null);
      } else {
        setFinSelectionRectangulaire(position);
        setPositionSouris(null);
        setOutilSelectionne("deplacement");
      }
    };

    const handleSourisEnMouvement = (e: MouseEvent) => {
      const position = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      if (debutSelectionRectangulaire && !finSelectionRectangulaire) {
        setPositionSouris(position);
      }
    };

    canvas.addEventListener("mousedown", handleClic);
    canvas.addEventListener("mousemove", handleSourisEnMouvement);

    return () => {
      canvas.removeEventListener("mousedown", handleClic);
      canvas.removeEventListener("mousemove", handleSourisEnMouvement);
    };
  }, [offset, zoom, outilSelectionne, debutSelectionRectangulaire, finSelectionRectangulaire]);

  const utiliserSelectionRectangulaire = () => {
    annulerSelectionActuelle();
    setOutilSelectionne("selectionRectangulaire");
  };

  return (
    <BoutonIcon
      type="button"
      title="Sélection rectangulaire"
      className={`border-2 border-solid border-bleu-sombre ${outilSelectionne === "selectionRectangulaire" ? "bg-white text-bleu-sombre" : ""}`}
      onClick={utiliserSelectionRectangulaire}
    >
      <MdOutlineCropFree size={18} />
    </BoutonIcon>
  );
};

export default SelectionRectangulaire;
