import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import React from "react";

interface PostulantProps {
  titulaire: ITitulaireRequeteCreation;
}

export const Postulant: React.FC<PostulantProps> = props => {
  return (
    <div className="Postulant">
      <h2>Postulant</h2>
    </div>
  );
};
