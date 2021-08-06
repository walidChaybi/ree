import { IFicheActe } from "../../../model/etatcivil/acte/IFicheActe";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { IBandeauFiche } from "../../../model/etatcivil/fiche/IBandeauFiche";
import { formatNom, jointAvec } from "../../common/util/Utils";
import { SectionPanelProps } from "../../common/widget/section/SectionPanel";
import { setDataBandeau } from "./contenu/BandeauFicheUtils";
import { SimplePersonne } from "./contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import { IDataFicheProps } from "./FichePage";
import {
  getPanelsActe,
  getParamsAffichageFicheActe
} from "./hook/constructionComposants/acte/FicheActeUtils";
import { getPanelsPacs } from "./hook/constructionComposants/pacs/FichePacsUtils";
import { getPanelsRca } from "./hook/constructionComposants/rcrca/FicheRcaUtils";
import { getPanelsRc } from "./hook/constructionComposants/rcrca/FicheRcUtils";

export function getFicheTitle(
  categorie: string,
  annee: string,
  numero: string,
  personnes: SimplePersonne[]
) {
  const noms = jointAvec(
    personnes.map(p => `${formatNom(p.nom)}`),
    " et "
  );
  return `${categorie.toLocaleUpperCase()} - ${noms} - N° ${annee} - ${numero}`;
}

export interface IAccordionReceSection {
  panels: SectionPanelProps[];
}
export interface IFiche {
  bandeauFiche: IBandeauFiche;
  ajouterAlerte: boolean;
  panelsFiche: IAccordionReceSection;
}

export function setFiche(dataFiche: IDataFicheProps, data: any): IFiche {
  const fiche = {} as IFiche;

  if (dataFiche.categorie && data && dataFiche.identifiant === data.id) {
    fiche.bandeauFiche = setDataBandeau(dataFiche, data);

    switch (dataFiche.categorie) {
      case TypeFiche.RC:
        fiche.panelsFiche = getPanelsRc(data);
        break;

      case TypeFiche.RCA:
        fiche.panelsFiche = getPanelsRca(data);
        break;

      case TypeFiche.PACS:
        fiche.panelsFiche = getPanelsPacs(data);
        break;

      case TypeFiche.ACTE:
        const ficheActe = data as IFicheActe;
        fiche.panelsFiche = getPanelsActe(ficheActe);
        fiche.ajouterAlerte = getParamsAffichageFicheActe(
          ficheActe.registre.type.id,
          ficheActe.visibiliteArchiviste
        ).ajouterAlerte;
        break;

      default:
        break;
    }
  }
  return fiche;
}
