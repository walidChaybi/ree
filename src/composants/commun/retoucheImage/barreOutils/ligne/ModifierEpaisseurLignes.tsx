import type EtatImage from "../../../../../model/retoucheImage/EtatImage";

interface IModifierEpaisseurLignesProps {
  etatImage: EtatImage;
  redessiner(): void;
}

const ModifierEpaisseurLignes: React.FC<IModifierEpaisseurLignesProps> = ({ etatImage, redessiner }) => {
  const changerEpaisseur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    etatImage.changerEpaisseurLignes(Number(e.target.value));

    redessiner();
  };

  return (
    <input
      id="epaisseur"
      className="w-8 rounded-[4px] border-[3px] border-solid border-bleu-sombre bg-bleu-sombre p-[2px] text-white"
      title="Modifier l'épaisseur des lignes"
      type="number"
      min={1}
      max={10}
      defaultValue={etatImage.epaisseurLignes}
      onChange={changerEpaisseur}
    />
  );
};

export default ModifierEpaisseurLignes;
