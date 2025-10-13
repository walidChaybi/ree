import React from "react";
import AffichageDocument from "../../../../composants/commun/affichageDocument/AffichageDocument";
import { EMimeType } from "../../../../ressources/EMimeType";
import { Fieldset } from "../fieldset/Fieldset";

interface IVisionneuseDocumentProps {
  titre: string;
  contenuBase64?: string;
  typeMime: EMimeType;
}

export const VisionneuseAvecTitre: React.FC<IVisionneuseDocumentProps> = ({ titre, contenuBase64, typeMime }) => {
  return (
    <Fieldset titre={titre}>
      <div className="h-screen">
        <AffichageDocument
          contenuBase64={contenuBase64}
          typeZoom={"page-fit"}
          typeMime={typeMime}
          titre={titre}
        />
      </div>
    </Fieldset>
  );
};
