import { useEffect } from "react";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { TbZoomCancel } from "react-icons/tb";
import UtilitaireRetoucheImage from "../../../../utils/UtilitaireRetoucheImage";
import BoutonIcon from "../../bouton/BoutonIcon";
import { COORDONNEES_INITIALES, type TCoordonnees } from "../Canvas";

interface IGestionnaireZoomProps {
  refCanvas: React.RefObject<HTMLCanvasElement | null>;
  zoom: number;
  offset: TCoordonnees;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setOffset(valeur: TCoordonnees): void;
}

const GestionnaireZoom: React.FC<IGestionnaireZoomProps> = ({ refCanvas, zoom, offset, setZoom, setOffset }) => {
  const zoomer = () => {
    setZoom(actuel => Math.min(actuel + 0.1, 5));
  };

  const dezoomer = () => {
    setZoom(actuel => Math.max(actuel - 0.1, 1));
  };

  const reinitialiserZoom = () => {
    setZoom(1);
    setOffset(COORDONNEES_INITIALES);
  };

  const recupererPourcentageZoom = () => Math.round(zoom * 100);

  useEffect(() => {
    const canvas = refCanvas?.current;
    if (!canvas) return;

    const gererZoom = (e: WheelEvent) => {
      e.preventDefault();

      const { x: sourisX, y: sourisY } = UtilitaireRetoucheImage.recupererCoordonneesClic(e, canvas, zoom, offset);

      const montantScale = e.deltaY > 0 ? -0.1 : 0.1;

      setZoom(precedentZoom => {
        const nouveauZoom = Math.max(1, Math.min(precedentZoom + montantScale, 5));

        const nouvelOffset = {
          x: offset.x - sourisX * (nouveauZoom - precedentZoom),
          y: offset.y - sourisY * (nouveauZoom - precedentZoom)
        };

        setOffset(nouvelOffset);

        return nouveauZoom;
      });
    };

    canvas.addEventListener("wheel", gererZoom, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", gererZoom);
    };
  }, [offset, zoom]);

  return (
    <div className="flex items-center gap-0.5 2xl:gap-1">
      <BoutonIcon
        type="button"
        title="Dézoomer"
        className="border-2 border-solid border-bleu-sombre"
        onClick={dezoomer}
      >
        <MdOutlineZoomOut size={18} />
      </BoutonIcon>
      <p
        className="my-0 py-0 text-lg"
        aria-label="Pourcentage de zoom actuel"
      >
        {recupererPourcentageZoom()} %
      </p>
      <BoutonIcon
        type="button"
        title="Zoomer"
        className="border-2 border-solid border-bleu-sombre"
        onClick={zoomer}
      >
        <MdOutlineZoomIn size={18} />
      </BoutonIcon>
      <BoutonIcon
        type="button"
        title="Réinitialiser le zoom"
        className="border-2 border-solid border-bleu-sombre"
        onClick={reinitialiserZoom}
      >
        <TbZoomCancel size={18} />
      </BoutonIcon>
    </div>
  );
};

export default GestionnaireZoom;
