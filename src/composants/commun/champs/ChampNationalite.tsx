import Delete from "@mui/icons-material/Delete";
import React from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

interface IPropsChampNationalite {
  nom: string;
  libelle: string;
  desactive?: boolean;
  onSupprimer?: () => void;
  afficherBoutonSupprimer?: boolean;
  boutonSupprimerDesactive?: boolean;
}

const ChampNationalite: React.FC<IPropsChampNationalite> = ({
  nom,
  libelle,
  desactive = false,
  onSupprimer,
  afficherBoutonSupprimer = false,
  boutonSupprimerDesactive = false
}) => {
  return (
    <div className="flex items-end gap-4">
      <ChampTexte
        name={nom}
        libelle={libelle}
        optionFormatage="PREMIER_MAJUSCULE"
        disabled={desactive}
        className="w-full"
        boutonChamp={
          afficherBoutonSupprimer
            ? {
                composant: (
                  <BoutonIcon
                    className="group absolute right-0 h-full rounded-l-none bg-transparent"
                    type="button"
                    title={"Supprimer cette nationalité"}
                    onClick={onSupprimer}
                    styleBouton="suppression"
                    disabled={boutonSupprimerDesactive}
                  >
                    <Delete className="text-rouge group-hover:text-blanc" />
                  </BoutonIcon>
                )
              }
            : undefined
        }
      />
    </div>
  );
};

export default ChampNationalite;
