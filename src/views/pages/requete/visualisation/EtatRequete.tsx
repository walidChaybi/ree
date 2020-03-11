import React from "react";
import "./sass/EtatRequete.scss";
import { Text } from "../../../common/widget/Text";
import { IDataTable } from "../RequeteTableauHeaderCell";

interface EtatRequeteProps {
  requete: IDataTable;
}

export const EtatRequete: React.FC<EtatRequeteProps> = props => {
  return (
    <div className="etat-requete">
      <h1>
        <Text
          messageId={`pages.requetes.apercu.etat.titre.${props.requete.natureActe}`}
        />
      </h1>

      <div>
        <span>
          <Text messageId={"pages.requetes.apercu.etat.numeroRequete"} />
          {props.requete.idSagaDila}
        </span>
        <span className={"title"}>
          <Text messageId={"pages.requetes.apercu.etat.canal"} />
          {`: `}
        </span>
        <span>
          <Text messageId={`referentiel.canal.${props.requete.canal}`} />
        </span>
        <span className={"title"}>
          <Text messageId={"pages.requetes.apercu.etat.etat"} />
          {`: `}
        </span>
        <span>
          <Text
            messageId={`referentiel.statutRequete.${props.requete.statut}`}
          />
        </span>
      </div>
    </div>
  );
};
