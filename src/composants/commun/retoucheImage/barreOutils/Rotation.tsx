import { FaRotate } from "react-icons/fa6";
import BoutonIcon from "../../bouton/BoutonIcon";
import type { TOutilRetoucheImage } from "./BarreOutils";

interface IRotationProps {
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const Rotation: React.FC<IRotationProps> = ({ setOutilSelectionne }) => {
  return (
    <BoutonIcon
      type="button"
      title="Redresser l'image"
      className="border-2 border-solid border-bleu-sombre"
      onClick={() => {
        setOutilSelectionne("rotation");
      }}
    >
      <FaRotate size={18} />
    </BoutonIcon>
  );
};

export default Rotation;
