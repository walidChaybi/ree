import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import messageManager from "../../../common/util/messageManager";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/FicheRcUtils";
import { setDataBandeau } from "../contenu/BandeauFicheUtils";
import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";
import { getPanelsRca } from "./constructionComposants/FicheRcaUtils";
import { fournisseurDonneesBandeauFactory } from "../contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
<<<<<<< HEAD
import { TypeFiche } from "../../../../model/etatcivil/TypeFiche";
import { getPanelsPacs } from "./constructionComposants/pacs/FichePacsUtils";
import { IFichePacs } from "../../../../model/etatcivil/pacs/IFichePacs";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { IPartenaire } from "../../../../model/etatcivil/pacs/IPartenaire";
import { getFormatDateFromTimestamp } from "../../../common/util/DateUtils";
import { mappingDataActe, getPanelsActe } from "./constructionComposants/acte/FicheActeUtils";
=======
import {
  getPanelsActe,
  mappingDataActe
} from "./constructionComposants/acte/FicheActeUtils";
>>>>>>> refs/remotes/origin/develop

export interface IFicheApi {
  dataBandeau: IBandeauFiche;
  fiche: AccordionReceProps;
}

export function useFichePageApiHook(categorie: TypeFiche, identifiant: string) {
  const [dataFicheState, setDataFicheState] = useState<IFicheApi>(
    {} as IFicheApi
  );
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    if (identifiant != null && categorie != null) {
      getInformationsFiche(categorie.toLowerCase(), identifiant)
        .then((result: any) => {
          const dataFiche = {} as IFicheApi;

          dataFiche.dataBandeau = setDataBandeau(
            categorie,
            fournisseurDonneesBandeauFactory.createFournisseur(
              categorie,
              result.body.data
            )
          );

          switch (categorie) {
            case TypeFiche.RC:
              dataFiche.fiche = getPanelsRc(result.body.data);
              break;

            case TypeFiche.RCA:
              dataFiche.fiche = getPanelsRca(result.body.data);
              break;

            case TypeFiche.PACS:
              dataFiche.fiche = getPanelsPacs(mapPacs(result.body.data));
              break;

            case TypeFiche.ACTE:
              const dataActe = mappingDataActe(result.body.data);
              dataFiche.fiche = getPanelsActe(dataActe);
              break;

            default:
              break;
          }

          setDataFicheState(dataFiche);
        })
        .catch((error: any) => {
          messageManager.showErrorAndClose(
            "Impossible récupérer les informations de la fiche"
          );
          setErrorState(error);
        });
    }
  }, [categorie, identifiant]);

  return {
    dataFicheState,
    errorState
  };
}

export function mapPacs(data: any) {
  const pacs: IFichePacs = data;
  if (data.partenaires) {
    data.partenaires.forEach((p: any) => {
      (p as IPartenaire).nationalite = Nationalite.getEnumFor(p.nationalite);
    });
  }
  pacs.dateDerniereDelivrance = getFormatDateFromTimestamp(
    data.dateDerniereDelivrance
  );
  pacs.dateDerniereMaj = getFormatDateFromTimestamp(data.dateDerniereMaj);
  pacs.dateEnregistrementParAutorite = getFormatDateFromTimestamp(
    data.dateEnregistrementParAutorite
  );
  pacs.dateInscription = getFormatDateFromTimestamp(data.dateInscription);
  return pacs;
}
