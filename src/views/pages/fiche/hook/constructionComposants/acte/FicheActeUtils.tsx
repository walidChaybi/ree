import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { getTitulaires } from "./TitulairesActeUtils";
import { getEvenement } from "./EvenementActeUtils";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonneWithHabilitation } from "../personne/FichePersonne";
import React from "react";
import { ActeImage } from "./ActeImage";

export function getPanelsActe(acte: IFicheActe): AccordionReceProps {
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonneWithHabilitation(
    acte.personnes
  );
  return {
    panels: [
      {
        panelAreas: [
          {
            parts: getTitulaires(acte),
            title: "Titulaires",
            nbColonne: 2
          },
          { parts: getEvenement(acte), title: "Evènement", nbColonne: 2 }
        ],
        title: "Résumé de l'acte"
      },
      {
        panelAreas: [
          {
            value: <ActeImage id={acte.id}></ActeImage>,
            nbColonne: 1
          }
        ],
        title: "Vue de l'acte"
      },

      ...fichesPersonne
    ]
  };
}
