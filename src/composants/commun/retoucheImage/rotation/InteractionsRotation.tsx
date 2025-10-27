import EtatImage from "@model/retoucheImage/EtatImage";
import Bouton from "../../bouton/Bouton";
import { TOutilRetoucheImage } from "../barreOutils/BarreOutils";
import ChampModifierRotation from "./ChampModifierRotation";

interface IInteractionsRotationProps {
  etatImage: EtatImage;
  rotationTemporaire: number;
  setRotationTemporaire(valeur: number): void;
  setOutilSelectionne(valeur: TOutilRetoucheImage): void;
}

const InteractionsRotation: React.FC<IInteractionsRotationProps> = ({
  etatImage,
  rotationTemporaire,
  setRotationTemporaire,
  setOutilSelectionne
}) => {
  const validerRotation = () => {
    etatImage.appliquerRotation((rotationTemporaire * 180) / Math.PI);
    setRotationTemporaire(0);
    setOutilSelectionne("deplacement");
  };

  const annulerRotation = () => {
    setOutilSelectionne("deplacement");
  };

  return (
    <div className="mt-2 flex justify-center gap-4">
      <Bouton
        onClick={annulerRotation}
        className="mr-2"
        type="button"
      >
        {"Annuler"}
      </Bouton>
      <ChampModifierRotation
        rotation={rotationTemporaire}
        setRotation={setRotationTemporaire}
      />
      <Bouton
        onClick={validerRotation}
        className="ml-2"
        type="button"
      >
        {"Valider"}
      </Bouton>
    </div>
  );
};

export default InteractionsRotation;
