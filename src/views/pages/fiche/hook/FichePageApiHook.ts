import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import messageManager from "../../../common/util/messageManager";
import { IDataBandeauFicheProps } from "../contenu/BandeauFiche";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getRcRcaVue } from "./FicheRcUtils";
import { mockFicheRc } from "./mockFiche";

export interface IFicheApi {
  dataBandeau: IDataBandeauFicheProps;
  ficheRc: AccordionReceProps;
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
          dataFiche.ficheRc = getRcRcaVue(result.body.data);
          setDataFicheState(dataFiche);
        })
        .catch((error: any) => {
          console.log(error);
          messageManager.showErrorAndClose(
            "Impossible récupérer les informations de la fiche"
          );
          setErrorState(error);
          const dataFiche = {} as IFicheApi;
          dataFiche.dataBandeau = setDataBandeau(mockFicheRc);
          console.log(mockFicheRc);
          dataFiche.ficheRc = getRcRcaVue(mockFicheRc);
          setDataFicheState(dataFiche);
        });
    }
  }, [categorie, identifiant]);

  return {
    dataFicheState,
    errorState
  };
}

function setDataBandeau(data: any): IDataBandeauFicheProps {
  let dataBandeau = {} as IDataBandeauFicheProps;
  console.log(
    "data.categorie",
    data.categorie,
    "data.id ",
    data.id,
    "data.registre ",
    data.registre,
    "data.annee ",
    data.annee,
    "data.numero ",
    data.numero,
    "data.statutsFiche ",
    data.statutsFiche,
    "data.interesses ",
    data.interesses,

    "data.alertes ",
    data.alertes,
    "data.dateDerniereMaj ",
    data.dateDerniereMaj,
    "data.dateDerniereDelivrance ",
    data.dateDerniereDelivrance
  );
  if (data) {
    dataBandeau = {
      categorie: data.categorie,
      identifiant: data.id,
      registre: data.registre ? data.registre : undefined,
      annee: data.annee,
      numero: data.numero,
      statut: data.statutsFiche[0].statut,
      prenom1: setPrenomInteresse(data.interesses[0].prenoms),
      nom1: data.interesses[0].nomFamille,
      prenom2: data.interesses[1]
        ? setPrenomInteresse(data.interesses[1].prenoms)
        : undefined,
      nom2: data.interesses[1] ? data.interesses[1].nomFamille : undefined,
      alertes: data.alertes,
      dateDerniereMaj: data.dateDerniereMaj,
      dateDerniereDelivrance: data.dateDerniereDelivrance
    };
  }
  return dataBandeau;
}

function setPrenomInteresse(prenoms: any[]) {
  let prenomInteresse = "";
  prenoms.forEach(p => {
    if (p.numeroOrdre === 0) {
      prenomInteresse = p.prenom;
    }
  });
  return prenomInteresse;
}
