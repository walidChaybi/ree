import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { useMemo } from "react";
import "./TypeRequete.scss";

interface IInfoTypeRequete {
  referenceDila: string | undefined;
  sousType: string;
  provenance: string | undefined;
  statut: string;
}

interface ITypeRequeteProps {
  requete: IRequeteDelivrance;
}

const TypeRequete: React.FC<ITypeRequeteProps> = ({ requete }) => {
  const infoTypeRequete: IInfoTypeRequete = useMemo(
    () => ({
      referenceDila:
        requete.provenanceRequete?.provenanceServicePublic?.referenceDila,
      sousType: requete.sousType.libelle,
      provenance: requete.provenanceRequete?.provenance?.libelle,
      statut: requete.statutCourant.statut.libelle
    }),
    [requete]
  );

  return (
    <div className="conteneur-type-requete-delivrance">
      {infoTypeRequete.referenceDila && (
        <div>{infoTypeRequete.referenceDila}</div>
      )}
      <div>{infoTypeRequete.sousType}</div>
      <div className="conteneur-provenance-statut">
        {infoTypeRequete.provenance && <div>{infoTypeRequete.provenance}</div>}
        <div>
          <span className="libelle-statut">{"Statut"}</span>
          <span>{infoTypeRequete.statut}</span>
        </div>
      </div>
    </div>
  );
};

export default TypeRequete;
