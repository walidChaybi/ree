import React, { memo } from "react";
import { Link } from "react-router";
import "./OngletsLien.scss";

interface IOngletsLienProps {
  liens: {
    libelle: string;
    url?: string;
  }[];
}

const OngletsLien: React.FC<IOngletsLienProps> = memo(({ liens }) => (
  <div className="conteneur-onglets-lien">
    {liens.map(lien => (
      <div
        key={lien.libelle}
        className="onglet-lien"
      >
        {lien.url ? <Link to={lien.url}>{lien.libelle}</Link> : <span>{lien.libelle}</span>}
      </div>
    ))}
  </div>
));

export default OngletsLien;
