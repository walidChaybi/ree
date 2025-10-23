import { MdOutlineCancelPresentation } from "react-icons/md";
import BoutonIcon from "../../../bouton/BoutonIcon";
import type { TOutilRetoucheImage } from "../BarreOutils";

interface IAnnulerSelectionProps {
  annulerSelectionActuelle(): void;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const AnnulerSelection: React.FC<IAnnulerSelectionProps> = ({ annulerSelectionActuelle, setOutilSelectionne }) => {
  return (
    <BoutonIcon
      type="button"
      title="Annuler la sélection"
      className="border-2 border-solid border-bleu-sombre"
      onClick={() => {
        setOutilSelectionne("deplacement");
        annulerSelectionActuelle();
      }}
    >
      <MdOutlineCancelPresentation size={18} />
    </BoutonIcon>
  );
};

export default AnnulerSelection;
