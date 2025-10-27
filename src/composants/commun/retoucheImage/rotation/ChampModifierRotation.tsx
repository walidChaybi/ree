interface IChampModifierRotationProps {
  rotation: number;
  setRotation(valeur: number): void;
}

const ChampModifierRotation: React.FC<IChampModifierRotationProps> = ({ rotation, setRotation }) => {
  const changerRotation = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const rotationEnRadians = (Number(e.target.value) * Math.PI) / 180;

    setRotation(rotationEnRadians);
  };

  return (
    <input
      id="rotation"
      className="w-16 rounded-md border-[3px] border-solid border-bleu-sombre p-2"
      title="Modifier l'angle de rotation de l'image"
      type="number"
      value={Math.round((rotation * 180) / Math.PI)}
      onChange={changerRotation}
    />
  );
};

export default ChampModifierRotation;
