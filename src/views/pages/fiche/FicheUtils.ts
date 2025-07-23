import { mapAlertesActe } from "@hook/alertes/MappingAlertesActe";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
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

export const getFicheTitle = (categorie: string, annee: string, numero: string, personnes: SimplePersonne[], typeFiche: ETypeFiche) => {
  const noms = jointAvec(
    personnes.map(p => `${p.nom} ${p.prenom}`),
    " et "
  );
  const title = `${categorie.toLocaleUpperCase()} - ${noms}`;
  return typeFiche === ETypeFiche.ACTE ? title : title + ` - N° ${annee} - ${numero}`;
};

export const setFiche = (utilisateurConnecte: UtilisateurConnecte, dataFiche?: IDataFicheProps, data?: any): IFiche => {
  const fiche = {} as IFiche;

  if (dataFiche?.categorie && data && dataFiche.identifiant === data.id) {
    fiche.bandeauFiche = setDataBandeau(dataFiche, data);

    switch (dataFiche.categorie) {
      case ETypeFiche.RC:
      case ETypeFiche.RCA:
        fiche.panelsFiche = (data as FicheRcRca).commePanelAccordionReceSection;
        break;

      case ETypeFiche.PACS:
        fiche.panelsFiche = (data as FichePacs).commePanelAccordionReceSection;
        break;

      case ETypeFiche.ACTE:
        const ficheActe = data as IFicheActe;
        fiche.panelsFiche = getPanelsActe(ficheActe, utilisateurConnecte);
        fiche.alertes = mapAlertesActe(data?.alerteActes);
        fiche.visuBoutonAlertes = getParamsAffichageFicheActe(
          ficheActe.registre?.type?.id,
          ficheActe.visibiliteArchiviste,
          utilisateurConnecte
        ).visuBoutonAlertes;
        break;

      default:
        break;
    }
  }

  return fiche;
};
