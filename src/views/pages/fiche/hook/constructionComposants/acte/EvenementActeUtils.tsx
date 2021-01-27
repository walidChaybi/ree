import React from "react";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { LieuxUtils } from "../../../../../../model/Lieux";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import {
  getDateStringFromDateCompose,
  getHeureFromNumber
} from "../../../../../common/util/DateUtils";
import { IEvenement } from "../../../../../../model/etatcivil/acte/IEvenement";

export function getEvenement(retourBack: IFicheActe): AccordionPartProps[] {
  const evenement: AccordionPartProps[] = [
    {
      contents: getDateLieuEvenement(retourBack.evenement),
      title: "Evènement"
    }
  ];

  evenement.push({
    contents: [
      {
        libelle: "Nature",
        value: <span>{retourBack.nature ? retourBack.nature.libelle : ""}</span>
      }
    ],
    title: ""
  });

  return evenement;
}

function getDateLieuEvenement(evenement: IEvenement): AccordionContentProps[] {
  return [
    {
      libelle: `Date de l'évènement`,
      value: (
        <span>
          {`${getDateStringFromDateCompose({
            jour: evenement.jour.toString(),
            mois: evenement.mois.toString(),
            annee: evenement.annee.toString()
          })} ${getHeureFromNumber(evenement.heure, evenement.minute)}`}
        </span>
      )
    },
    {
      libelle: `Lieu de l'évènement`,
      value: (
        <span>
          {LieuxUtils.getLieu(
            evenement.ville,
            evenement.region,
            evenement.pays,
            evenement.arrondissement
          )}
        </span>
      )
    }
  ];
}
