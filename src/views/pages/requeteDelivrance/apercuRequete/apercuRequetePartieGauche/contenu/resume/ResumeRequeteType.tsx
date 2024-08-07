import { IProvenanceRequete } from "@model/requete/IProvenanceRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React, { useEffect, useState } from "react";
import { ItemLibelle } from "./item/ItemLibelle";
import "./scss/ResumeRequetePartieHaute.scss";

interface TypeRequeteProps {
  provenanceRequete?: IProvenanceRequete;
  sousType: SousTypeDelivrance;
  statut: StatutRequete;
}

export const ResumeRequeteType: React.FC<TypeRequeteProps> = props => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (props.sousType) {
      setExpanded(state => !state);
    }
  }, [props.sousType]);

  return (
    <div className="TypeRequete">
      <AccordionRece titre={"Type requête"} expanded={expanded}>
        <div className="ResumeRequetePartieHaute">
          <ItemLibelle
            texte={
              props.provenanceRequete?.provenanceServicePublic?.referenceDila
            }
          />
          <ItemLibelle texte={props.sousType.libelle} />
          <div className="inline">
            <ItemLibelle texte={props.provenanceRequete?.provenance?.libelle} />
            <ItemLibelle
              label={"Statut"}
              texte={props.statut.libelle}
              classNameLabel={"no-space-between"}
            />
          </div>
        </div>
      </AccordionRece>
    </div>
  );
};
