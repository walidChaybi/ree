import { SectionContentProps } from "./SectionContent";
import { SectionPanelProps } from "./SectionPanel";
import { SectionPanelAreaProps } from "./SectionPanelArea";
import { SectionPartProps } from "./SectionPart";

export const ajouterPanelAreasAuPanel = (
  panel: SectionPanelProps,
  param: any,
  fct: (p: any) => SectionPartProps[],
  nbColonne: number,
  title?: string
) => {
  if (param) {
    panel.panelAreas.push({
      parts: fct(param),
      title,
      nbColonne
    });
  }
};

export const AjoutePartAuPanelAreas = (
  panelAreas: SectionPanelAreaProps[],
  param: any,
  fct: (p: any) => SectionPartProps[],
  id?: string,
  title?: string,
  nbColonne?: number
) => {
  if (param) {
    panelAreas.push({
      parts: fct(param),
      id,
      title,
      nbColonne
    } as SectionPanelAreaProps);
  }
};

export const ajouterContentPartAuPartUneValeur = (panel: SectionContentProps[], libelle: string, info?: string) => {
  if (libelle != null && info != null && info !== "") {
    panel.push({
      libelle,
      value: <span>{info}</span>
    });
  }
};

export const ajouterContentPartAuPartUneValeurVide = (panel: SectionContentProps[], libelle: string, info?: string) => {
  if (libelle != null && info != null && info !== "") {
    panel.push({
      libelle,
      value: <span className="break-all">{info}</span>
    });
  } else if (libelle) {
    panel.push({
      libelle,
      value: <span></span>
    });
  }
};

export const ajouterContentPartAuPartMultiValeurs = (panel: SectionContentProps[], libelle: string, infos: string[]) => {
  if (libelle != null && infos != null && infos.length > 0) {
    const infosNonVide: string[] = [];

    infos.forEach((info: string) => {
      if (info != null && info !== "") {
        infosNonVide.push(info);
      }
    });

    if (infosNonVide.length > 0) {
      panel.push({
        libelle,
        value: (
          <>
            {infosNonVide.map((info: string, index: number) => {
              return <div key={`ligne${index}`}>{info}</div>;
            })}
          </>
        )
      });
    }
  }
};
