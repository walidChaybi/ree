import { useEffect, useState } from "react";
import {
  getRequetesCreation,
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { SousTypeCreation } from "../../../../model/requete/enum/SousTypeCreation";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { IRequeteTableauCreation } from "../../../../model/requete/IRequeteTableauCreation";
import {
  ITitulaireRequeteTableau,
  mapTitulaires
} from "../../../../model/requete/ITitulaireRequeteTableau";
import { getFormatDateFromTimestamp } from "../../../common/util/DateUtils";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../common/util/GestionDesLiensApi";
import { logError } from "../../../common/util/LogManager";
import { getValeurOuVide, valeurOuUndefined } from "../../../common/util/Utils";

export function useRequeteCreationApi(
  queryParameters: IQueryParametersPourRequetes,
  typeRequete: TypeAppelRequete,
  setEnChargement: (enChargement: boolean) => void
) {
  const [dataState, setDataState] = useState<IRequeteTableauCreation[]>([]);
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>({});

  useEffect(() => {
    async function fetchMesRequetes() {
      try {
        const listeStatuts = queryParameters?.statuts?.join(",");
        const result = await getRequetesCreation(
          listeStatuts,
          typeRequete,
          queryParameters
        );
        const mesRequetes = mappingRequetesTableauCreation(
          result?.body?.data,
          false
        );
        setDataState(mesRequetes);
        setParamsTableau(getParamsTableau(result));
        setEnChargement(false);
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les requêtes de création",
          error
        });
      }
    }
    fetchMesRequetes();
  }, [queryParameters, typeRequete, setEnChargement]);

  return {
    dataState,
    paramsTableau
  };
}

function mappingRequetesTableauCreation(
  resultatsRecherche: any,
  mappingSupplementaire: boolean
): IRequeteTableauCreation[] {
  return resultatsRecherche?.map((requete: any) => {
    return mappingUneRequeteTableauCreation(requete, mappingSupplementaire);
  });
}

function mappingUneRequeteTableauCreation(
  requete: any,
  mappingSupplementaire: boolean
): IRequeteTableauCreation {
  const titulaires = mapTitulaires(requete?.titulaires, mappingSupplementaire);
  return {
    idRequete: valeurOuUndefined(requete?.id),
    numeroFonctionnel: getValeurOuVide(requete?.numeroFonctionnel),
    numeroNatali: getValeurOuVide(requete?.numeroNatali),
    numeroDila: getValeurOuVide(requete?.numeroDila),
    numeroAffichage: getValeurOuVide(requete?.numeroAffichage),
    type: TypeRequete.getEnumFor("CREATION")?.libelle,
    sousType: SousTypeCreation.getEnumFor(requete?.sousType).libelleCourt,
    numeroAncien: requete?.numeroAncien,
    titulaires,
    nomCompletRequerant: requete?.nomCompletRequerant,
    dateCreation: getFormatDateFromTimestamp(requete?.dateCreation),
    dateDerniereAction: getFormatDateFromTimestamp(requete?.dateDerniereAction),
    statut: StatutRequete.getEnumFor(requete?.statut)?.libelle,
    idUtilisateur: valeurOuUndefined(requete?.idUtilisateur),
    idEntiteRattachement: valeurOuUndefined(requete?.idEntiteRattachement),
    postulant: getPostulant(titulaires)
  };
}

function getPostulant(titulaires: ITitulaireRequeteTableau[]) {
  return titulaires
    .map(el => `${el.nom} ${getValeurOuVide(el.prenoms[0])}`)
    .reduce(function (accumulateur, valeurCourante) {
      return `${accumulateur}, ${valeurCourante}`;
    });
}

