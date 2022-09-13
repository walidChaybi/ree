import { RetourSdanf } from "@model/requete/enum/RetourSdanf";
import { IEchange } from "@model/requete/IEchange";
import React from "react";
interface ItemEchangesRetourSDANFProps {
  echanges?: IEchange[];
}

export const ItemEchangesRetourSDANF: React.FC<
  ItemEchangesRetourSDANFProps
> = props => {
  return (
    <div className="ItemEchangesRetourSDANF">
      <ul className="listeMessage">
        {props.echanges?.map((echange, index) => (
          <li className="container" key={echange.id || 0 + index}>
            <span className="date">
              {RetourSdanf.getEnumFor(echange.nature).libelle} - {echange.date}
            </span>
            <span className="message">{echange.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
