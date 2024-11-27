import Bouton, { IBoutonProps } from "../../../commun/bouton/Bouton";

const BoutonActualiserEtVisualiser: React.FC<IBoutonProps> = ({ ...props }) => {
  return (
    <Bouton
      title="Actualiser et visualiser"
      {...props}
    >
      Actualiser et visualiser
    </Bouton>
  );
};

export default BoutonActualiserEtVisualiser;
