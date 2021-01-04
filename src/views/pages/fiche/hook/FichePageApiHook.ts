import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import messageManager from "../../../common/util/messageManager";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/FicheRcUtils";
import { setDataBandeau } from "../contenu/BandeauFicheUtils";
import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";
import { getPanelsRca } from "./constructionComposants/FicheRcaUtils";

export interface IFicheApi {
  dataBandeau: IBandeauFiche;
  fiche: AccordionReceProps;
}

export function useFichePageApiHook(categorie: string, identifiant: string) {
  const [dataFicheState, setDataFicheState] = useState<IFicheApi>(
    {} as IFicheApi
  );
  const [errorState, setErrorState] = useState(undefined);

  useEffect(() => {
    if (identifiant != null && categorie != null) {
      getInformationsFiche(categorie, identifiant)
        .then((result: any) => {
          const dataFiche = {} as IFicheApi;
          dataFiche.dataBandeau = setDataBandeau(result.body.data);
          if (categorie === "rc") {
            dataFiche.fiche = getPanelsRc(result.body.data);
          } else if (categorie === "rca") {
            dataFiche.fiche = getPanelsRca(result.body.data);
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
