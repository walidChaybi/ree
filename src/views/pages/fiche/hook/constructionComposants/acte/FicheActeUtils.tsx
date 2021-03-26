import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { getTitulaires } from "./TitulairesActeUtils";
import { getEvenement } from "./EvenementActeUtils";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { getFichesPersonneActe } from "../personne/FichePersonne";
import React from "react";
import { ActeImage } from "./ActeImage";
import { AccordionPanelAreaProps } from "../../../../../common/widget/accordion/AccordionPanelArea";
import {
  officierALeDroitSurLePerimetre,
  officierAutoriserSurLeTypeRegistre,
  officierHabiliterPourLeDroit
} from "../../../../../../model/IOfficierSSOApi";
import { Droit } from "../../../../../../model/Droit";
import { PERIMETRE_MEAE } from "../../../../../../model/IPerimetre";
import { TypeVisibiliteArchiviste } from "../../../../../../model/etatcivil/enum/TypeVisibiliteArchiviste";

export function getPanelsActe(acte: IFicheActe): AccordionReceProps {
  const idTypeRegistre = acte.registre.type.id;
  const paramsAffichage = getParamsAffichageFicheActe(
    idTypeRegistre,
    acte.visibiliteArchiviste
  );
  const fichesPersonne: AccordionPanelProps[] = getFichesPersonneActe(
    acte.personnes,
    paramsAffichage
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
        panelAreas: getPanelAreasActeImage(acte, paramsAffichage),
        title: "Vue de l'acte"
      },

      ...fichesPersonne
    ]
  };
}

function getPanelAreasActeImage(
  acte: IFicheActe,
  params: IParamsAffichage
): AccordionPanelAreaProps[] {
  if (params.visuActe === "classique" || params.visuActe === "filigrane") {
    return [
      {
        value: <ActeImage id={acte.id}></ActeImage>,
        nbColonne: 1
      }
    ];
  } else {
    // params.visuActe === "disabled"
    return [{ value: undefined }];
  }
}

export interface IParamsAffichage {
  ajouterAlerte: boolean;
  visuActe: "classique" | "filigrane" | "disabled";
  personnes: "visible" | "disabled" | "none";
}

export function getParamsAffichageFicheActe(
  idTypeRegistre: string,
  typeVisibiliteArchiviste: TypeVisibiliteArchiviste
) {
  const params = {
    ajouterAlerte: true,
    visuActe: "disabled",
    personnes: "disabled"
  } as IParamsAffichage;

  // Vérification que l'officier à le droit de consulter la visualisation de l'acte

  // S'il a le droit CONSULTER sur le périmètre MEAE
  // ou
  // S'il a le droit CONSULTER sur le périmètre de l'acte et le type de registre est présent dans ce périmètre
  if (
    officierALeDroitSurLePerimetre(Droit.CONSULTER, PERIMETRE_MEAE) ||
    officierAutoriserSurLeTypeRegistre(idTypeRegistre)
  ) {
    params.ajouterAlerte = true;
    params.visuActe = "classique";
    params.personnes = "visible";
  }

  // Si c'est un acte archive et qu'il a le droit CONSULTER_ARCHIVE
  else if (
    typeVisibiliteArchiviste !== TypeVisibiliteArchiviste.NON &&
    officierHabiliterPourLeDroit(Droit.CONSULTER_ARCHIVES)
  ) {
    params.ajouterAlerte = false;
    params.visuActe = "filigrane";
    params.personnes = "none";
  }

  // S'il a un droit CONSULTER mais pas sur le périmètre de l'acte
  // ou Si le type de registre n'est présent dans le périmètre de l'acte
  else if (!officierAutoriserSurLeTypeRegistre(idTypeRegistre)) {
    params.ajouterAlerte = false;
    params.visuActe = "disabled";
    params.personnes = "disabled";
  }
  return params;
}
