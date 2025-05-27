import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ID_CONTENEUR_MODALE = "conteneur-modale-rece";

export const ConteneurParentModales: React.FC = () => <div id={ID_CONTENEUR_MODALE}></div>;
const recupererParent = (): HTMLElement | null => document.getElementById(ID_CONTENEUR_MODALE);

interface IConteneurModaleProps {
  fermerModale?: () => void;
}

const ConteneurModale: React.FC<React.PropsWithChildren<IConteneurModaleProps>> = ({ fermerModale, children }) => {
  const [conteneurParentModales, setConteneurParentModales] = useState<HTMLElement | null>(recupererParent());

  useEffect(() => {
    !conteneurParentModales && setConteneurParentModales(recupererParent());
  }, []);

  if (!conteneurParentModales) return <></>;

  return createPortal(
    <div
      className="fixed left-0 top-0 z-[1000] flex h-screen w-screen animate-apparition items-center justify-center bg-black bg-opacity-40 duration-100"
      {...(fermerModale ? { onClick: fermerModale } : {})}
    >
      <div
        className="m-4 flex"
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    conteneurParentModales
  );
};

export default ConteneurModale;
