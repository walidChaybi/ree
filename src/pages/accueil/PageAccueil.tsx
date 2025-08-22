import React, { useContext, useEffect, useMemo, useState } from "react";

import { CONFIG_GET_NOMBRE_REQUETES } from "../../api/configurations/requete/GetNombreRequetesConfigApi";
import { CONFIG_GET_NOMBRE_REQUETES_INFORMATION } from "../../api/configurations/requete/GetNombreRequetesInformationConfigApi";

import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { FaEnvelope, FaGavel, FaLandmark, FaPlusCircle, FaSearch } from "react-icons/fa";
import AccessibleAvecDroits from "../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import Bouton from "../../composants/commun/bouton/Bouton";
import { RECEContextData } from "../../contexts/RECEContextProvider";
import useFetchApi from "../../hooks/api/FetchApiHook";
import LiensRECE from "../../router/LiensRECE";
import {
  INFO_PAGE_MES_REQUETES_CONSULAIRES,
  INFO_PAGE_REQUETES_CONSULAIRES_SERVICE
} from "../../router/infoPages/InfoPagesEspaceConsulaire";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE, INFO_PAGE_REQUETES_DELIVRANCE_SERVICE } from "../../router/infoPages/InfoPagesEspaceDelivrance";
import {
  INFO_PAGE_MES_REQUETES_ETABLISSEMENT,
  INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE
} from "../../router/infoPages/InfoPagesEspaceEtablissement";
import {
  INFO_PAGE_MES_REQUETES_INFORMATION,
  INFO_PAGE_REQUETES_INFORMATION_SERVICE
} from "../../router/infoPages/InfoPagesEspaceInformation";
import {
  INFO_PAGE_RECHERCHE_ACTE,
  INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION,
  INFO_PAGE_RECHERCHE_REQUETE
} from "../../router/infoPages/InfoPagesEspaceRecherche";
import AfficherMessage from "../../utils/AfficherMessage";

interface ILienAccueil {
  libelle: string;
  urlPage: string;
  compteurNotifications?: number;
  auMoinsUnDesDroits: Droit[];
  droits?: Droit[];
  estDroitUnique?: boolean;
}

interface IRangRubrique {
  libelle: string;
  icone: JSX.Element;
  liens: ILienAccueil[];
  auMoinsUnDesDroits: Droit[];
  droits?: Droit[];
}

const getDonneesMenu = (nombreRequetes: number, nombreRequetesInformation: number): IRangRubrique[] => [
  {
    libelle: "Délivrance",
    icone: (
      <FaGavel
        className="text-5xl text-white"
        aria-hidden
      />
    ),
    auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url),
        auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
        compteurNotifications: nombreRequetes
      },
      {
        libelle: "Mon service",
        urlPage: LiensRECE.genererLien(INFO_PAGE_REQUETES_DELIVRANCE_SERVICE.url),
        auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC]
      }
    ]
  },
  {
    libelle: "Établissement",
    icone: (
      <FaPlusCircle
        className="text-5xl text-white"
        aria-hidden
      />
    ),
    auMoinsUnDesDroits: [Droit.CREER_ACTE_ETABLI],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_ETABLISSEMENT.url),
        auMoinsUnDesDroits: [Droit.CREER_ACTE_ETABLI]
      },
      {
        libelle: "Mon service",
        urlPage: LiensRECE.genererLien(INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE.url),
        droits: [Droit.ATTRIBUER_REQUETE],
        auMoinsUnDesDroits: [Droit.CREER_ACTE_ETABLI]
      }
    ]
  },
  {
    libelle: "Consulaire",
    icone: (
      <FaLandmark
        className="text-5xl text-white"
        aria-hidden
      />
    ),
    auMoinsUnDesDroits: [Droit.CONSULAIRE_ACCES_ESPACE_MES_REQUETES, Droit.CONSULAIRE_ACCES_ESPACE_REQUETES_DE_MON_SERVICE],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_CONSULAIRES.url),
        auMoinsUnDesDroits: [Droit.CONSULAIRE_ACCES_ESPACE_MES_REQUETES, Droit.CONSULAIRE_ACCES_ESPACE_REQUETES_DE_MON_SERVICE]
      },
      {
        libelle: "Mon service",
        urlPage: LiensRECE.genererLien(INFO_PAGE_REQUETES_CONSULAIRES_SERVICE.url),
        auMoinsUnDesDroits: [Droit.CONSULAIRE_ACCES_ESPACE_REQUETES_DE_MON_SERVICE]
      }
    ]
  },
  {
    libelle: "Recherche",
    icone: (
      <FaSearch
        className="text-5xl text-white"
        aria-hidden
      />
    ),
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.CONSULTER_ARCHIVES],
    liens: [
      {
        libelle: "Requête",
        urlPage: LiensRECE.genererLien(INFO_PAGE_RECHERCHE_REQUETE.url),
        auMoinsUnDesDroits: [Droit.CONSULTER]
      },
      {
        libelle: "Acte et Inscription",
        urlPage: LiensRECE.genererLien(INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url),
        auMoinsUnDesDroits: [Droit.CONSULTER]
      },
      {
        libelle: "Acte",
        urlPage: LiensRECE.genererLien(INFO_PAGE_RECHERCHE_ACTE.url),
        auMoinsUnDesDroits: [Droit.CONSULTER_ARCHIVES],
        estDroitUnique: true
      }
    ]
  },
  {
    libelle: "Communication avec les usagers",
    icone: (
      <FaEnvelope
        className="text-5xl text-white"
        aria-hidden
      />
    ),
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER, Droit.ATTRIBUER_REQUETE],
    liens: [
      {
        libelle: "Mes requêtes",
        urlPage: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_INFORMATION.url),
        auMoinsUnDesDroits: [Droit.INFORMER_USAGER]
      },
      {
        libelle: "Mon service",
        urlPage: LiensRECE.genererLien(INFO_PAGE_REQUETES_INFORMATION_SERVICE.url),
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
      apresErreur: erreurs => AfficherMessage.erreur("Erreur lors de la récupération du nombre de requêtes d'information", { erreurs })
    });

    getNombreRequetes({
      parametres: { query: { statuts: StatutRequete.TRAITE_REPONDU.nom } },
      apresSucces: nombre => setNombreRequetes(nombre),
      apresErreur: erreurs => AfficherMessage.erreur("Erreur lors de la récupération du nombre de requêtes", { erreurs })
    });
  }, []);

  const { utilisateurConnecte } = useContext(RECEContextData);
  const donneesMenu = useMemo(
    () =>
      getDonneesMenu(nombreRequetes, nombreRequetesInformation).filter(donnees =>
        utilisateurConnecte.estHabilitePour({ unDesDroits: donnees.auMoinsUnDesDroits })
      ),
    [nombreRequetes, nombreRequetesInformation]
  );

  return (
    <div
      className={`container mx-auto flex flex-wrap justify-center gap-x-10 gap-y-14 ${donneesMenu.length < 5 ? "max-w-[60vw]" : ""} pt-14`}
    >
      {donneesMenu.map(element => (
        <div
          key={"rubrique-accueil-" + element.libelle}
          className="min-h-44 w-[23vw] select-none rounded-xl border border-solid border-bleu-transparent bg-blanc p-6 pb-3 text-white shadow-lg transition-colors duration-300"
        >
          <div className="mb-4 flex items-center gap-6">
            <div className="grid aspect-square h-20 place-content-center rounded-md bg-bleu">{element.icone}</div>
            <h2 className="text-shadow m-0 break-words text-2xl font-semibold leading-tight text-bleu">{element.libelle}</h2>
          </div>
          {element.liens && (
            <ul className="list-none rounded-xl px-0 text-left transition-colors duration-300">
              {element.liens.map(lienElement => (
                <AccessibleAvecDroits
                  droits={lienElement.droits}
                  estDroitUnique={lienElement.estDroitUnique}
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
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PageAccueil;
