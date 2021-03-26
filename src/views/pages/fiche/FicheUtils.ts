import { SimplePersonne } from "./contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import { formatNom, jointAvec } from "../../common/util/Utils";
import { setDataBandeau } from "./contenu/BandeauFicheUtils";
import { getPanelsRc } from "./hook/constructionComposants/rcrca/FicheRcUtils";
import { getPanelsRca } from "./hook/constructionComposants/rcrca/FicheRcaUtils";
import { getPanelsPacs } from "./hook/constructionComposants/pacs/FichePacsUtils";
import {
  getPanelsActe,
  getParamsAffichageFicheActe
} from "./hook/constructionComposants/acte/FicheActeUtils";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { IBandeauFiche } from "../../../model/etatcivil/fiche/IBandeauFiche";
import { AccordionReceProps } from "../../common/widget/accordion/AccordionRece";
import { fournisseurDonneesBandeauFactory } from "./contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { IFicheActe } from "../../../model/etatcivil/acte/IFicheActe";

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

export interface IFiche {
  bandeauFiche: IBandeauFiche;
  alerteVisible: boolean;
  panelsFiche: AccordionReceProps;
}

export function setFiche(categorie: TypeFiche, data: any): IFiche {
  const fiche = {} as IFiche;
  if (categorie && data) {
    fiche.bandeauFiche = setDataBandeau(
      categorie,
      fournisseurDonneesBandeauFactory.createFournisseur(categorie, data)
    );

    switch (categorie) {
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
        fiche.alerteVisible = getParamsAffichageFicheActe(
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
