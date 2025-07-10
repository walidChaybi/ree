import { IconDefinition, faEnvelope, faGavel, faLandmark, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";

import { CONFIG_GET_NOMBRE_REQUETES } from "../../api/configurations/requete/GetNombreRequetesConfigApi";
import { CONFIG_GET_NOMBRE_REQUETES_INFORMATION } from "../../api/configurations/requete/GetNombreRequetesInformationConfigApi";

import { RECEContextData } from "@core/contexts/RECEContext";
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
import messageManager from "@util/messageManager";
import AccessibleAvecDroits from "../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import Bouton from "../../composants/commun/bouton/Bouton";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { useTitreDeLaFenetre } from "../../hooks/utilitaires/TitreDeLaFenetreHook";

interface ILienAccueil {
  libelle: string;
  urlPage: string;
  compteurNotifications?: number;
  auMoinsUnDesDroits: Droit[];
  droits?: Droit[];
}

export interface IRangRubrique {
  libelle: string;
  icone: IconDefinition;
  liens: ILienAccueil[];
  auMoinsUnDesDroits: Droit[];
  droits?: Droit[];
}

const getDonneesMenu = (nombreRequetes: number, nombreRequetesInformation: number): IRangRubrique[] => [
  {
    libelle: "Délivrance",
    icone: faGavel,
    auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_DELIVRANCE,
        auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
        compteurNotifications: nombreRequetes
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_DELIVRANCE_SERVICE,
        auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC]
      }
    ]
  },
  {
    libelle: "Création",
    icone: faPlusCircle,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_CREATION,
        auMoinsUnDesDroits: [Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI, Droit.CREER_ACTE_TRANSCRIT]
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_CREATION_SERVICE,
        droits: [Droit.ATTRIBUER_REQUETE],
        auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI]
      }
    ]
  },
  {
    libelle: "Consulaire",
    icone: faLandmark,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_CONSULAIRE,
        auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE]
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_CONSULAIRE_SERVICE,
        auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE]
      }
    ]
  },
  {
    libelle: "Recherche",
    icone: faSearch,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.CONSULTER_ARCHIVES],
    liens: [
      {
        libelle: "Requête",
        urlPage: URL_RECHERCHE_REQUETE,
        auMoinsUnDesDroits: [Droit.CONSULTER]
      },
      {
        libelle: "Acte et Inscription",
        urlPage: URL_RECHERCHE_ACTE_INSCRIPTION,
        auMoinsUnDesDroits: [Droit.CONSULTER]
      },
      {
        libelle: "Acte",
        urlPage: URL_RECHERCHE_ACTE,
        auMoinsUnDesDroits: [Droit.CONSULTER_ARCHIVES]
      }
    ]
  },
  {
    libelle: "Communication avec les usagers",
    icone: faEnvelope,
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER, Droit.ATTRIBUER_REQUETE],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: URL_MES_REQUETES_INFORMATION,
        auMoinsUnDesDroits: [Droit.INFORMER_USAGER]
      },
      {
        libelle: "Mon service",
        urlPage: URL_REQUETES_INFORMATION_SERVICE,
        auMoinsUnDesDroits: [Droit.INFORMER_USAGER, Droit.ATTRIBUER_REQUETE],
        compteurNotifications: nombreRequetesInformation
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
      apresErreur: () => messageManager.showError("Erreur lors de la récupération du nombre de requêtes d'information")
    });

    getNombreRequetes({
      parametres: { query: { statuts: StatutRequete.TRAITE_REPONDU.nom } },
      apresSucces: nombre => setNombreRequetes(nombre),
      apresErreur: () => messageManager.showError("Erreur lors de la récupération du nombre de requêtes")
    });
  }, []);

  useTitreDeLaFenetre("Accueil");

  const { utilisateurConnecte } = useContext(RECEContextData);
  const donneesMenu = useMemo(
    () =>
      getDonneesMenu(nombreRequetes, nombreRequetesInformation).filter(donnees =>
        utilisateurConnecte.estHabilitePour({ unDesDroits: donnees.auMoinsUnDesDroits })
      ),
    [nombreRequetes, nombreRequetesInformation]
  );

  return (
    <div className="container mx-auto max-w-[1470px] pt-6">
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
        {donneesMenu.map(element => (
          <div
            className={`sm:basis-[${donneesMenu.length <= 4 ? "32%" : "31%"}]`}
            key={"rubrique-accueil-" + element.libelle}
          >
            <div className="min-h-44 max-w-[433px] basis-full select-none rounded-xl border border-solid border-bleu-transparent bg-blanc p-6 pb-3 text-white shadow-lg transition-colors duration-300">
              <div className="mb-4 flex items-start">
                <div className="pm-5 aspect-square h-20 shrink-0 items-center justify-center rounded-md bg-bleu">
                  <FontAwesomeIcon
                    className="IconeBouton mt-4 text-5xl text-white"
                    icon={element.icone}
                  />
                </div>

                <div className="ml-6 flex-1 overflow-hidden">
                  <h2 className="text-shadow mb-0 mt-6 break-words text-2xl font-semibold leading-tight text-bleu">{element.libelle}</h2>
                </div>
              </div>
              {element.liens && (
                <ul className="list-none rounded-xl px-0 text-left transition-colors duration-300">
                  {element.liens.map(lienElement =>
                    lienElement.auMoinsUnDesDroits ? (
                      <AccessibleAvecDroits
                        droits={lienElement.droits}
                        auMoinsUnDesDroits={lienElement.auMoinsUnDesDroits}
                        key={"bouton-accueil-" + element.libelle + lienElement.libelle}
                      >
                        <li>
                          <Bouton
                            lienVers={lienElement.urlPage}
                            className="mb-4 flex items-center"
                            title={lienElement.libelle}
                          >
                            <div className="w-[48px]" />

                            <div className="flex-1 text-center">{lienElement.libelle}</div>

                            <div className="flex w-[48px] justify-end">
                              {Number(lienElement.compteurNotifications) > 0 && (
                                <span className="inline-flex h-[18px] items-center justify-center rounded-xl bg-red-600 px-2 text-xs text-white">
                                  {lienElement.compteurNotifications}
                                </span>
                              )}
                            </div>
                          </Bouton>
                        </li>
                      </AccessibleAvecDroits>
                    ) : (
                      <Fragment key={lienElement.libelle}></Fragment>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageAccueil;
