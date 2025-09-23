import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";
import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { jointAvec } from "@util/Utils";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { IDataFicheProps } from "./FichePage";
import { setDataBandeau } from "./contenu/BandeauFicheUtils";
import { getPanelsActe, getParamsAffichageFicheActe } from "./hook/constructionComposants/acte/FicheActeUtils";

export interface IAccordionReceSection {
  panels: SectionPanelProps[];
  panelParDefaut?: number;
}

interface IFiche {
  bandeauFiche: IBandeauFiche;
  panelsFiche: IAccordionReceSection;
  alertes: IAlerte[];
  visuBoutonAlertes: boolean;
}

export type TFiche = FicheRcRca | FichePacs | FicheActe;

export const getTitreDeLaFiche = (categorie: string, annee: string, numero: string, personnes: SimplePersonne[], typeFiche: ETypeFiche) => {
  const noms = jointAvec(
    personnes.map(p => `${p.nom} ${p.prenom}`),
    " et "
  );
  const title = `${categorie.toLocaleUpperCase()} - ${noms}`;
  return typeFiche === ETypeFiche.ACTE ? title : title + ` - N° ${annee} - ${numero}`;
};

export const setFiche = (utilisateurConnecte: UtilisateurConnecte, dataFiche: IDataFicheProps | undefined, data: TFiche | null): IFiche => {
  const fiche = {} as IFiche;

  if (dataFiche?.categorie && data && dataFiche.identifiant === data.id) {
    fiche.bandeauFiche = setDataBandeau(dataFiche.categorie, data);

    switch (true) {
      case dataFiche.categorie === ETypeFiche.RC:
      case dataFiche.categorie === ETypeFiche.RCA:
        fiche.panelsFiche = (data as FicheRcRca).commePanelAccordionReceSection;
        break;

      case dataFiche.categorie === ETypeFiche.PACS:
        fiche.panelsFiche = (data as FichePacs).commePanelAccordionReceSection;
        break;

      case dataFiche.categorie === ETypeFiche.ACTE:
        if (data instanceof FicheActe) {
          // Vérification à ne pas mettre dans la condition du case car une erreur est relevée pendant la transpilation
          fiche.panelsFiche = getPanelsActe(data, utilisateurConnecte);
          fiche.alertes = data.alertes;
          fiche.visuBoutonAlertes = getParamsAffichageFicheActe(
            data.registre?.type?.id,
            data.visibiliteArchiviste,
            utilisateurConnecte
          ).visuBoutonAlertes;
        }
        break;

      default:
        break;
    }
  }

  return fiche;
};
