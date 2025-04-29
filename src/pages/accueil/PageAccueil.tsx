import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition, faGavel, faLandmark, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import logoRece from "../../img/logo-rece.svg";

import { CONFIG_GET_NOMBRE_REQUETES } from "../../api/configurations/requete/GetNombreRequetesConfigApi";
import { CONFIG_GET_NOMBRE_REQUETES_INFORMATION } from "../../api/configurations/requete/GetNombreRequetesInformationConfigApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  URL_MES_REQUETES_CONSULAIRE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_INFORMATION,
  URL_RECHERCHE_ACTE,
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_CONSULAIRE_SERVICE,
  URL_REQUETES_CREATION_SERVICE,
  URL_REQUETES_DELIVRANCE_SERVICE,
  URL_REQUETES_INFORMATION_SERVICE
} from "@router/ReceUrls";
import { logError } from "@util/LogManager";
import AccessibleAvecDroits from "../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import Bouton from "../../composants/commun/bouton/Bouton";
import useFetchApi from "../../hooks/api/FetchApiHook";

interface ILienAccueil {
  libelle: string;
  urlPage: string;
  droits: Droit[];
  compteurNotifications?: number;
}

export interface IRangRubrique {
  libelle: string;
  icone: IconDefinition;
  liens: ILienAccueil[];
  droits: Droit[];
}

export const getDataMenu = (nombreRequetes: number, nombreRequetesInformation: number): IRangRubrique[] => [
  {
    libelle: "Délivrance",
    icone: faGavel,
    droits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_DELIVRANCE,
        droits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
        compteurNotifications: nombreRequetes
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_DELIVRANCE_SERVICE,
        droits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER]
      }
    ]
  },
  {
    libelle: "Création",
    icone: faPlusCircle,
    droits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_CREATION,
        droits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI]
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_CREATION_SERVICE,
        droits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI]
      }
    ]
  },
  {
    libelle: "Consulaire",
    icone: faLandmark,
    droits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_CONSULAIRE,
        droits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE]
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_CONSULAIRE_SERVICE,
        droits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE]
      }
    ]
  },
  {
    libelle: "Communication avec les usagers",
    icone: faEnvelope,
    droits: [Droit.INFORMER_USAGER],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_INFORMATION,
        droits: [Droit.INFORMER_USAGER]
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_INFORMATION_SERVICE,
        droits: [Droit.INFORMER_USAGER],
        compteurNotifications: nombreRequetesInformation
      }
    ]
  },
  {
    libelle: "Recherche",
    icone: faSearch,
    droits: [Droit.CONSULTER, Droit.CONSULTER_ARCHIVES],
    liens: [
      {
        libelle: "Rechercher une requête",
        urlPage: URL_RECHERCHE_REQUETE,
        droits: [Droit.CONSULTER]
      },
      {
        libelle: "Rechercher un acte et une inscription",
        urlPage: URL_RECHERCHE_ACTE_INSCRIPTION,
        droits: [Droit.CONSULTER]
      },
      {
        libelle: "Rechercher un acte",
        urlPage: URL_RECHERCHE_ACTE,
        droits: [Droit.CONSULTER_ARCHIVES]
      }
    ]
  }
];

const PageAccueil: React.FC = () => {
  const [nombreRequetes, setNombreRequetes] = useState<number>(0);
  const [nombreRequetesInformation, setNombreRequetesInformation] = useState<number>(0);

  const { appelApi: getNombreRequetesInformation } = useFetchApi(CONFIG_GET_NOMBRE_REQUETES_INFORMATION);
  const { appelApi: getNombreRequetes } = useFetchApi(CONFIG_GET_NOMBRE_REQUETES);

  useEffect(() => {
    getNombreRequetesInformation({
      parametres: { query: { statuts: [StatutRequete.PRISE_EN_CHARGE.nom, StatutRequete.TRANSFEREE.nom].join(",") } },
      apresSucces: nombre => setNombreRequetesInformation(nombre),
      apresErreur: () => logError({ messageUtilisateur: "Erreur lors de la récupération du nombre de requêtes d'information" })
    });

    getNombreRequetes({
      parametres: { query: { statuts: StatutRequete.TRAITE_REPONDU.nom } },
      apresSucces: nombre => setNombreRequetes(nombre),
      apresErreur: () => logError({ messageUtilisateur: "Erreur lors de la récupération du nombre de requêtes" })
    });
  }, []);

  useTitreDeLaFenetre("Accueil");

  const dataMenu = useMemo(() => getDataMenu(nombreRequetes, nombreRequetesInformation), [nombreRequetes, nombreRequetesInformation]);

  return (
    <div className="AccueilPage">
      <div className="flex">
        <div className="flex min-h-[750px] w-1/3 items-center justify-center">
          <img
            src={logoRece}
            alt="Logo RECE"
            className=""
          />
        </div>

        <div className="w-2/3">
          <div className="container mx-auto pt-6">
            <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-2">
              {dataMenu.map(item =>
                item.droits ? (
                  <AccessibleAvecDroits
                    droits={item.droits}
                    key={"rubrique-accueil-" + item.libelle}
                  >
                    <div className="group min-h-44 select-none rounded-xl border border-solid border-bleu-transparent bg-blanc p-6 pb-3 text-white shadow-2xl transition-colors duration-300">
                      <div className="mb-4 flex items-start">
                        <div className="pm-5 aspect-square h-20 shrink-0 items-center justify-center rounded-md bg-bleu">
                          <FontAwesomeIcon
                            className="IconeBouton mt-4 text-5xl text-white"
                            icon={item.icone}
                          />
                        </div>

                        <div className="ml-6 flex-1 overflow-hidden">
                          <h2 className="text-shadow mb-0 mt-6 break-words text-3xl font-semibold leading-tight text-bleu">
                            {item.libelle}
                          </h2>
                        </div>
                      </div>

                      {item.liens && (
                        <ul className="list-none rounded-xl px-0 text-left transition-colors duration-300">
                          {item.liens.map(lienItem =>
                            lienItem.droits ? (
                              <AccessibleAvecDroits
                                droits={lienItem.droits}
                                key={"bouton-accueil-" + item.libelle + lienItem.libelle}
                              >
                                <li>
                                  <Bouton
                                    type="button"
                                    lienVers={lienItem.urlPage}
                                    className="mb-4 flex items-center"
                                  >
                                    <div className="w-[48px]" />

                                    <div className="flex-1 text-center">{lienItem.libelle}</div>

                                    <div className="flex w-[48px] justify-end">
                                      {typeof lienItem.compteurNotifications === "number" && lienItem.compteurNotifications > 0 && (
                                        <span className="inline-flex h-6 items-center justify-center rounded-xl bg-red-600 px-2 text-xs text-white">
                                          {lienItem.compteurNotifications}
                                        </span>
                                      )}
                                    </div>
                                  </Bouton>
                                </li>
                              </AccessibleAvecDroits>
                            ) : (
                              <Fragment key={lienItem.libelle}></Fragment>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </AccessibleAvecDroits>
                ) : (
                  <Fragment key={item.libelle}></Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PageAccueil);
