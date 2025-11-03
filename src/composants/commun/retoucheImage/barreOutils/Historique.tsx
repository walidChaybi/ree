import { useEffect } from "react";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import type EtatImage from "../../../../model/retoucheImage/EtatImage";
import BoutonIcon from "../../bouton/BoutonIcon";

interface IHistoriqueProps {
  etatImage: EtatImage;
  redessiner(): void;
}

const Historique: React.FC<IHistoriqueProps> = ({ etatImage, redessiner }) => {
  const defaireDerniereModification = () => {
    etatImage.annuler();
    redessiner();
  };

  const refaireDerniereModification = () => {
    etatImage.retablir();
    redessiner();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.ctrlKey && e.key.toLowerCase() === "z") {
        defaireDerniereModification();
      } else if (e.ctrlKey && e.key.toLowerCase() === "y") {
        refaireDerniereModification();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center gap-0.5 2xl:gap-1">
      <BoutonIcon
        type="button"
        title="Défaire"
        className="border-2 border-solid border-bleu-sombre"
        onClick={defaireDerniereModification}
      >
        <FaArrowRotateLeft size={18} />
      </BoutonIcon>
      <BoutonIcon
        type="button"
        title="Refaire"
        className="border-2 border-solid border-bleu-sombre"
        onClick={refaireDerniereModification}
      >
        <FaArrowRotateRight size={18} />
      </BoutonIcon>
    </div>
  );
};

export default Historique;
