import { useEffect, useRef, useState } from "react";
import type EtatImage from "../../../model/retoucheImage/EtatImage";
import UtilitaireRetoucheImage from "../../../utils/UtilitaireRetoucheImage";
import Bouton from "../bouton/Bouton";
import type { TOutilRetoucheImage } from "./barreOutils/BarreOutils";

interface IRotationModalProps {
  etatImage: EtatImage;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const RotationModal: React.FC<IRotationModalProps> = ({ etatImage, setOutilSelectionne }) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  const [rotationTemporaire, setRotationTemporaire] = useState<number>(0);

  useEffect(() => {
    const canvas = refCanvas.current;

    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let enRotation = false;
    let debutAngle = 0;

    const centre = { x: canvas.width / 2, y: canvas.height / 2 };

    const img = etatImage.recupererImage;

    const redessiner = (angle: number = 0) => {
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
    };

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
      redessiner(angle);
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

  const validerRotation = () => {
    etatImage.appliquerRotation((rotationTemporaire * 180) / Math.PI);
    setRotationTemporaire(0);
    setOutilSelectionne("deplacement");
  };

  const annulerRotation = () => {
    setOutilSelectionne("deplacement");
  };

  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center">
      <div className="flex h-4/5 w-4/5 flex-col justify-between rounded-md bg-white p-16">
        <canvas
          ref={refCanvas}
          height={window.innerHeight * 0.75}
          width={window.innerWidth * 0.8}
          className="border border-solid border-black"
        />
        <div className="mt-2 flex justify-center">
          <Bouton
            onClick={annulerRotation}
            className="mr-2"
            type="button"
          >
            Annuler
          </Bouton>
          <Bouton
            onClick={validerRotation}
            className="ml-2"
            type="button"
          >
            Valider
          </Bouton>
        </div>
      </div>
    </div>
  );
};

export default RotationModal;
