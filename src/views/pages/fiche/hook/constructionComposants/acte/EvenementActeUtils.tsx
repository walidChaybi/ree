import React from "react";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import {
  IFicheActe,
  FicheActe
} from "../../../../../../model/etatcivil/acte/IFicheActe";
import {
  IEvenement,
  Evenement
} from "../../../../../../model/etatcivil/acte/IEvenement";

export function getEvenement(acte: IFicheActe): AccordionPartProps[] {
  const evenement: AccordionPartProps[] = [
    {
      contents: getDateLieuEvenement(acte.evenement),
      title: "Evènement"
    }
  ];

  evenement.push({
    contents: [
      {
        libelle: "Nature",
        value: <span>{FicheActe.getNature(acte)}</span>
      }
    ],
    title: ""
  });

  return evenement;
}

function getDateLieuEvenement(evenement?: IEvenement): AccordionContentProps[] {
  return [
    {
      libelle: `Date de l'évènement`,
      value: <span>{Evenement.getDate(evenement)}</span>
    },
    {
      libelle: `Lieu de l'évènement`,
      value: <span>{Evenement.getLieu(evenement)}</span>
    }
  ];
}
