import { MdBuild } from "react-icons/md";
import BoutonIcon from "../../../bouton/BoutonIcon";
import type { TOutilRetoucheImage } from "../BarreOutils";

interface IManipulationLigneProps {
  outilSelectionne: TOutilRetoucheImage;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const ManipulationLigne: React.FC<IManipulationLigneProps> = ({ outilSelectionne, setOutilSelectionne }) => (
  <BoutonIcon
    type="button"
    title="Modifier mes lignes"
    className={`border-2 border-solid border-bleu-sombre ${outilSelectionne === "manipulationLigne" ? "bg-white text-bleu-sombre" : ""}`}
    onClick={() => {
      setOutilSelectionne("manipulationLigne");
    }}
  >
    <MdBuild size={18} />
  </BoutonIcon>
);

export default ManipulationLigne;
