import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import messageManager from "../../../common/util/messageManager";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/FicheRcUtils";
import { setDataBandeau } from "../contenu/BandeauFicheUtils";
import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";
import { getPanelsRca } from "./constructionComposants/FicheRcaUtils";
import { fournisseurDonneesBandeauFactory } from "../contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { TypeFiche } from "../../../../model/etatcivil/TypeFiche";
import { getPanelsPacs } from "./constructionComposants/pacs/FichePacsUtils";

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
      getInformationsFiche(categorie.toLowerCase(), identifiant).then(
        (result: any) => {
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
              dataFiche.fiche = getPanelsPacs(result.body.data);
              break;

            default:
              break;
          }

          setDataFicheState(dataFiche);
        }
      );
      // .catch((error: any) => {
      //   messageManager.showErrorAndClose(
      //     "Impossible récupérer les informations de la fiche"
      //   );
      //   setErrorState(error);
      // });
    }
  }, [categorie, identifiant]);

  return {
    dataFicheState,
    errorState
  };
}
