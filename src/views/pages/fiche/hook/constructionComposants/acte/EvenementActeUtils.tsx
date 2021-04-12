import React from "react";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import {
  IFicheActe,
  FicheActe
} from "../../../../../../model/etatcivil/acte/IFicheActe";
import {
  IEvenement,
  Evenement
} from "../../../../../../model/etatcivil/acte/IEvenement";

export function getEvenement(acte: IFicheActe): SectionPartProps[] {
  const evenement: SectionPartProps[] = [
    {
      contentsPart: {
        contents: getDateLieuEvenement(acte.evenement)
      }
    }
  ];

  evenement.push({
    contentsPart: {
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
