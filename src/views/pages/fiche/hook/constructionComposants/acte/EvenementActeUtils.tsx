import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { Evenement, IEvenementDto } from "@model/etatcivil/acte/IEvenement";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";

export const getEvenement = (acte: FicheActe): SectionPartProps[] => {
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
          value: <span>{ENatureActe[acte.nature]}</span>
        }
      ],
      title: ""
    }
  });

  return evenement;
};

const getDateLieuEvenement = (evenement: IEvenementDto | null): SectionContentProps[] => {
  return [
    {
      libelle: `Date de l'évènement`,
      value: <span>{Evenement.getDate(evenement ?? undefined)}</span>
    },
    {
      libelle: `Lieu de l'évènement`,
      value: <span>{evenement?.lieuFormate ?? ""}</span>
    }
  ];
};
