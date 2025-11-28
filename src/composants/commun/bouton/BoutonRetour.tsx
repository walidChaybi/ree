import React, { useMemo } from "react";
import { MdArrowBack } from "react-icons/md";
import { URL_ACCUEIL } from "../../../router/infoPages/InfoPagesBase";
import GestionnaireFilAriane, { IElementFilAriane } from "../../../utils/GestionnaireFilAriane";
import Bouton from "./Bouton";

const BoutonRetour: React.FC = () => {
  const { titre, url }: IElementFilAriane = useMemo(
    () =>
      (GestionnaireFilAriane.elementsFilAriane.niveau2 && GestionnaireFilAriane.elementsFilAriane.niveau1) || {
        titre: "Accueil",
        url: URL_ACCUEIL
      },

    [GestionnaireFilAriane.elementsFilAriane]
  );

  return (
    <Bouton
      lienVers={url}
      className="float-left flex items-center justify-center gap-2"
    >
      <MdArrowBack size={17} />
      {`Retour ${titre}`.toUpperCase()}
    </Bouton>
  );
};

export default BoutonRetour;
