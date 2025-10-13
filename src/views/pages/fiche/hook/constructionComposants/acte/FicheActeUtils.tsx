import VisionneuseActe from "@composant/visionneuseActe/VisionneuseActe";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ETypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import { IAccordionReceSection } from "../../../FicheUtils";
import { getFichesPersonneActe } from "../personne/FichePersonne";
import { getEvenement } from "./EvenementActeUtils";
import { getTitulairesAM } from "./TitulairesActeUtils";

export function getPanelsActe(acte: FicheActe, utilisateurConnecte: UtilisateurConnecte): IAccordionReceSection {
  const idTypeRegistre = acte?.registre?.type?.id;
  const paramsAffichage = getParamsAffichageFicheActe(idTypeRegistre, acte.visibiliteArchiviste, utilisateurConnecte);
  const fichesPersonne: SectionPanelProps[] = getFichesPersonneActe(acte?.personnes, paramsAffichage);

  return {
    panels: [
      {
        panelAreas: getPanelAreasActeImage(acte, paramsAffichage),
        title: "Visualisation de l'acte"
      },
      {
        panelAreas: [
          {
            parts: getTitulairesAM(acte),
            title: "Titulaires",
            nbColonne: 2
          },
          { parts: getEvenement(acte), title: "Evènement", nbColonne: 2 }
        ],
        title: "Résumé de l'acte"
      },
      ...fichesPersonne
    ],
    panelParDefaut: paramsAffichage.visuActe === "disabled" ? 1 : 0
  };
}

function getPanelAreasActeImage(acte: FicheActe, params: IParamsAffichage): SectionPanelAreaProps[] {
  if (params.visuActe === "classique" || params.visuActe === "filigrane") {
    return [
      {
        value: (
          <div className="h-screen">
            <VisionneuseActe
              idActe={acte.id}
              typeActe={acte.type}
              estReecrit={params.visuActe === "classique" ? (acte.estReecrit ?? undefined) : undefined}
            />
          </div>
        ),
        nbColonne: 1
      }
    ];
  } else {
    return [{ value: undefined }];
  }
}

export interface IParamsAffichage {
  visuBoutonAlertes: boolean;
  visuActe: "classique" | "filigrane" | "disabled";
  personnes: "visible" | "disabled" | "none";
}

export function getParamsAffichageFicheActe(
  idTypeRegistre: string | undefined,
  typeVisibiliteArchiviste: keyof typeof ETypeVisibiliteArchiviste,
  utilisateurConnecte: UtilisateurConnecte
): IParamsAffichage {
  const params: IParamsAffichage = {
    visuBoutonAlertes: false,
    visuActe: "disabled",
    personnes: "disabled"
  };

  // Vérification que l'officier à le droit de consulter la visualisation de l'acte
  // S'il a le droit CONSULTER sur le périmètre TOUS_REGISTRES
  // ou
  // S'il a le droit CONSULTER sur le périmètre de l'acte et le type de registre est présent dans ce périmètre
  if (
    utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER, pourIdTypeRegistre: idTypeRegistre }) ||
    utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER, surLePerimetre: Perimetre.TOUS_REGISTRES }) ||
    utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER_COMEDEC })
  ) {
    params.visuBoutonAlertes = true;
    params.visuActe = "classique";
    params.personnes = "visible";
  }

  // Si c'est un acte archive et qu'il a le droit CONSULTER_ARCHIVE
  else if (typeVisibiliteArchiviste !== "NON" && utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER_ARCHIVES })) {
    params.visuBoutonAlertes = false;
    params.visuActe = "filigrane";
    params.personnes = "none";
  }

  // S'il a un droit CONSULTER mais pas sur le périmètre de l'acte
  // ou Si le type de registre n'est présent dans le périmètre de l'acte
  else if (!utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER, pourIdTypeRegistre: idTypeRegistre })) {
    params.visuBoutonAlertes = false;
    params.visuActe = "disabled";
    params.personnes = "disabled";
  }

  return params;
}
