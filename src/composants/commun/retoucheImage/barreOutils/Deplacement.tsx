import { useEffect, useRef } from "react";
import { FaArrowPointer } from "react-icons/fa6";
import BoutonIcon from "../../bouton/BoutonIcon";
import { COORDONNEES_INITIALES, type TCanvasRef, type TCoordonnees } from "../Canvas";
import type { TOutilRetoucheImage } from "./BarreOutils";

interface IDeplacementProps {
  zoom: number;
  offset: TCoordonnees;
  refCanvas: TCanvasRef;
  outilSelectionne: TOutilRetoucheImage;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
  setOffset(valeur: TCoordonnees): void;
}

const Deplacement: React.FC<IDeplacementProps> = ({ zoom, offset, refCanvas, outilSelectionne, setOutilSelectionne, setOffset }) => {
  const enDeplacement = useRef<boolean>(false);
  const debutDeplacement = useRef<TCoordonnees>(COORDONNEES_INITIALES);
  const pointDeDeplacementInitial = useRef<TCoordonnees>(COORDONNEES_INITIALES);

  useEffect(() => {
    if (outilSelectionne !== "deplacement") return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    const handleDebutClic = (e: MouseEvent) => {
      enDeplacement.current = true;
      debutDeplacement.current = { x: e.clientX, y: e.clientY };
      pointDeDeplacementInitial.current = { ...offset };
    };

    const handleSourisEnMouvement = (e: MouseEvent) => {
      if (!enDeplacement.current) return;

      const dx = e.clientX - debutDeplacement.current.x;
      const dy = e.clientY - debutDeplacement.current.y;

      setOffset({
        x: pointDeDeplacementInitial.current.x + dx,
        y: pointDeDeplacementInitial.current.y + dy
      });
    };

    const handleFinClic = () => {
      enDeplacement.current = false;
    };

    canvas.addEventListener("mousedown", handleDebutClic);
    window.addEventListener("mousemove", handleSourisEnMouvement);
    window.addEventListener("mouseup", handleFinClic);

    return () => {
      canvas.removeEventListener("mousedown", handleDebutClic);
      window.removeEventListener("mousemove", handleSourisEnMouvement);
      window.removeEventListener("mouseup", handleFinClic);
    };
  }, [offset, zoom, outilSelectionne]);

  return (
    <BoutonIcon
      type="button"
      title="Se déplacer"
      className={`border-2 border-solid border-bleu-sombre ${outilSelectionne === "deplacement" ? "bg-white text-bleu-sombre" : ""}`}
      onClick={() => {
        setOutilSelectionne("deplacement");
      }}
    >
      <FaArrowPointer size={18} />
    </BoutonIcon>
  );
};

export default Deplacement;
