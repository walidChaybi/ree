import React from "react";
import { IReponseRequeteInfo } from "../../../../../../model/requete/IReponseRequeteInfo";
import { getLibelle } from "../../../../../common/util/Utils";

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
      <button disabled={props.disabled} onClick={handleClick}>
        {getLibelle("Réponse libre")}
      </button>
    </div>
  );
};
