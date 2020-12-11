import { useState, useEffect } from "react";
import { getInformationsFiche } from "../../../../api/appels/etatcivilApi";
import messageManager from "../../../common/util/messageManager";
import { AccordionReceProps } from "../../../common/widget/accordion/AccordionRece";
import { getPanelsRc } from "./constructionComposants/FicheRcUtils";
import { IDataBandeauFicheProps, IAlerte } from "../contenu/BandeauFiche";
import {
  AlerteInscriptionUtil,
  AlerteInscription
} from "../../../../model/inscription/AlerteInscription";
import {
  getDateFromTimestamp,
  getDateString
} from "../../../common/util/DateUtils";
import { StatutUtil } from "../../../../model/Statut";
import { sortObjectWithNumeroOrdre } from "../../../common/util/Utils";

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

          if (categorie === "rc") {
            dataFiche.ficheRc = getPanelsRc(result.body.data);
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

function setDataBandeau(data: any): IDataBandeauFicheProps {
  let dataBandeau = {} as IDataBandeauFicheProps;
  const interesses = data.interesses.sort((i1: any, i2: any) =>
    sortObjectWithNumeroOrdre(i1, i2, "numeroOrdreSaisi")
  );

  if (data) {
    dataBandeau = {
      categorie: data.categorie,
      identifiant: data.id,
      registre: data.registre ? data.registre : undefined,
      annee: data.annee,
      numero: data.numero,
      statut: StatutUtil.getLibelle(data.statutsFiche[0].statut),
      prenom1: setPrenomInteresse(data.interesses[0].prenoms),
      nom1: interesses[0].nomFamille,
      prenom2: data.interesses[1]
        ? setPrenomInteresse(data.interesses[1].prenoms)
        : undefined,
      nom2: interesses[1] ? interesses[1].nomFamille : undefined,
      alertes: setAlertes(data.alertes),
      dateDerniereMaj: getDateString(
        getDateFromTimestamp(data.dateDerniereMaj)
      ),
      dateDerniereDelivrance: getDateString(
        getDateFromTimestamp(data.dateDerniereDelivrance)
      )
    };
  }
  return dataBandeau;
}

function setPrenomInteresse(prenoms: any[]) {
  let prenomInteresse = "";
  if (prenoms) {
    prenoms.forEach(p => {
      if (p.numeroOrdre === 1) {
        prenomInteresse = p.prenom;
      }
    });
  }
  return prenomInteresse;
}

function setAlertes(alertes: IAlerte[]) {
  const alertesInscription: IAlerte[] = [];
  if (alertes) {
    alertes.forEach(a => {
      a.alerte = AlerteInscriptionUtil.getLibelle(
        a.alerte as AlerteInscription
      );
      alertesInscription.push(a);
    });
  }
  return alertesInscription;
}
