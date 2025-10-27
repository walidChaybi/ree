import { useCallback, useEffect, useRef, useState } from "react";
import type EtatImage from "../../../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../../../utils/UtilitaireRetoucheImage";
import type { TOutilRetoucheImage } from "../barreOutils/BarreOutils";
import InteractionsRotation from "./InteractionsRotation";

interface IRotationModalProps {
  etatImage: EtatImage;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const RotationModal: React.FC<IRotationModalProps> = ({ etatImage, setOutilSelectionne }) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  const [rotationTemporaire, setRotationTemporaire] = useState<number>(0);

  const redessiner = useCallback((angle: number = 0) => {
    const canvas = refCanvas.current;

    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const centre = { x: canvas.width / 2, y: canvas.height / 2 };

    const img = etatImage.recupererImage;

    UtilitaireRetoucheImage.effacerCanvas(ctx, canvas);

    ctx.save();
    ctx.translate(centre.x, centre.y);

    if (angle) ctx.rotate(angle);

    const largeurMaximale = canvas.width * 0.9;
    const hauteurMaximale = canvas.height * 0.8;

    const miseAEchelle = Math.min(largeurMaximale / img.width, hauteurMaximale / img.height);

    const largeurAEchelle = img.width * miseAEchelle;
    const hauteurAEchelle = img.height * miseAEchelle;

    ctx.drawImage(img, -largeurAEchelle / 2, -hauteurAEchelle / 2, largeurAEchelle, hauteurAEchelle);

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = refCanvas.current;

    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let enRotation = false;
    let debutAngle = 0;

    const centre = { x: canvas.width / 2, y: canvas.height / 2 };

    const img = etatImage.recupererImage;

    if (img.complete) {
      redessiner();
    } else {
      img.onload = () => {
        redessiner();
      };
    }

    const debuterRotation = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      debutAngle = Math.atan2(y - centre.y, x - centre.x) - rotationTemporaire;
      enRotation = true;
    };

    const rotationEnCours = (e: MouseEvent) => {
      if (!enRotation) return;

      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const angle = Math.atan2(y - centre.y, x - centre.x) - debutAngle;

      setRotationTemporaire(angle);
    };

    const terminerRotation = () => {
      enRotation = false;
    };

    canvas.addEventListener("mousedown", debuterRotation);
    canvas.addEventListener("mousemove", rotationEnCours);
    window.addEventListener("mouseup", terminerRotation);

    return () => {
      canvas.removeEventListener("mousedown", debuterRotation);
      canvas.removeEventListener("mousemove", rotationEnCours);
      window.removeEventListener("mouseup", terminerRotation);
    };
  }, [etatImage]);

  useEffect(() => {
    redessiner(rotationTemporaire);
  }, [rotationTemporaire]);

  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-60">
      <div className="relative flex h-4/5 w-3/5 flex-col items-center justify-between rounded-md bg-white p-16">
        <h2 className="mt-0">{"Recadrer l'image"}</h2>
        <canvas
          ref={refCanvas}
          height={window.innerHeight * 0.7}
          width={window.innerWidth * 0.5}
          className="border border-solid border-black"
        />
        <InteractionsRotation
          etatImage={etatImage}
          rotationTemporaire={rotationTemporaire}
          setRotationTemporaire={setRotationTemporaire}
          setOutilSelectionne={setOutilSelectionne}
        />
      </div>
    </div>
  );
};

export default RotationModal;
