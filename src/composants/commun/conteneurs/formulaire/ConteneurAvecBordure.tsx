import React from "react";
import { MdReplay } from "react-icons/md";
import BoutonIcon from "../../bouton/BoutonIcon";

interface IConteneurAvecBordureProps {
  titreEnTete?: string;
  sansMargeHorizontale?: boolean;
  className?: string;
  reinitialiserDonneesBloc?: () => void;
}

const ConteneurAvecBordure: React.FC<React.PropsWithChildren<IConteneurAvecBordureProps>> = ({
  children,
  titreEnTete,
  sansMargeHorizontale,
  className,
  reinitialiserDonneesBloc
}) => (
  <div {...(className ? { className: className } : {})}>
    <div
      className={`relative rounded-md border border-solid border-blue-200 bg-white px-5 pb-8 pt-4 shadow-md ${sansMargeHorizontale ? "" : "mx-4"}`.trimEnd()}
    >
      {titreEnTete && (
        <span className="absolute -top-4 left-8 bg-white px-2 text-start text-xl font-bold text-bleu-sombre">{titreEnTete}</span>
      )}

      {reinitialiserDonneesBloc && (
        <BoutonIcon
          className="absolute -top-4 right-8 rounded-md border border-solid border-blue-200 shadow-md hover:border-rouge"
          styleBouton="suppression"
          title="Réinitialiser les données du bloc"
          aria-label="Réinitialiser les données du bloc"
          iconeSeule
          onClick={reinitialiserDonneesBloc}
        >
          <MdReplay
            className="text-2xl"
            aria-hidden
          />
        </BoutonIcon>
      )}
      {children}
    </div>
  </div>
);

export default ConteneurAvecBordure;
