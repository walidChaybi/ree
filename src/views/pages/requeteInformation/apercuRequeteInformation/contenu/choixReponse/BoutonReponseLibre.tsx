import { IReponseRequeteInfo } from "@model/requete/IReponseRequeteInfo";
import React from "react";

interface BoutonReponseLibreProps {
  onClick: (reponse: IReponseRequeteInfo) => void;
  reponse: IReponseRequeteInfo;
  disabled: boolean;
}

export const BoutonReponseLibre: React.FC<BoutonReponseLibreProps> = props => {
  const handleClick = () => {
    props.onClick(props.reponse);
  };

  return (
    <div className="MenuReponse">
      <button
        disabled={props.disabled}
        onClick={handleClick}
      >
        {"Réponse libre"}
      </button>
    </div>
  );
};
