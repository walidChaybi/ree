import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/FicheRcUtils";
import { setDataBandeau } from "../contenu/BandeauFicheUtils";
import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";
import { getPanelsRca } from "./constructionComposants/FicheRcaUtils";
import { fournisseurDonneesBandeauFactory } from "../contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import {
  getPanelsActe,
  mappingDataActe
} from "./constructionComposants/acte/FicheActeUtils";
import { logError } from "../../../common/util/LogManager";

export interface IFicheApi {
  dataBandeau: IBandeauFiche;
  fiche: AccordionReceProps;
}

export function useFichePageApiHook(categorie: string, identifiant: string) {
  const [dataFicheState, setDataFicheState] = useState<IFicheApi>(
    {} as IFicheApi
  );

  useEffect(() => {
    if (identifiant != null && categorie != null) {
      getInformationsFiche(categorie, identifiant)
        .then((result: any) => {
          const dataFiche = {} as IFicheApi;

          dataFiche.dataBandeau = setDataBandeau(
            categorie,
            fournisseurDonneesBandeauFactory.createFournisseur(
              categorie,
              result.body.data
            )
          );
          if (categorie === "rc") {
            dataFiche.fiche = getPanelsRc(result.body.data);
          } else if (categorie === "rca") {
            dataFiche.fiche = getPanelsRca(result.body.data);
          } else if (categorie === "acte") {
            const dataActe = mappingDataActe(result.body.data);
            dataFiche.fiche = getPanelsActe(dataActe);
          }
          setDataFicheState(dataFiche);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations de la fiche",
            error
          });
        });
    }
  }, [categorie, identifiant]);

  return {
    dataFicheState
  };
}
