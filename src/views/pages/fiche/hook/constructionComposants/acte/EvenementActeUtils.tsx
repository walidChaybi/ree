import React from "react";
import {
  Evenement,
  IEvenement
} from "../../../../../../model/etatcivil/acte/IEvenement";
import {
  FicheActe,
  IFicheActe
} from "../../../../../../model/etatcivil/acte/IFicheActe";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";

export function getEvenement(acte: IFicheActe): SectionPartProps[] {
  const evenement: SectionPartProps[] = [
    {
      partContent: {
        contents: getDateLieuEvenement(acte.evenement)
      }
    }
  ];

  evenement.push({
    partContent: {
      contents: [
        {
          libelle: "Nature",
          value: <span>{FicheActe.getNature(acte)}</span>
        }
      ],
      title: ""
    }
  });

  return evenement;
}

function getDateLieuEvenement(evenement?: IEvenement): SectionContentProps[] {
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
