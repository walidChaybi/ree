import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import { ApercuRequeteEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import {
  URL_MES_REQUETES_CONSULAIRE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID
} from "@router/ReceUrls";
import { render } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import React from "react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import PageRequeteCreationTranscriptionPriseEnCharge from "../../../../../pages/requetesConsulaire/PageRequeteCreationTranscriptionPriseEnCharge";
import PageRequeteTranscriptionSaisieProjet from "../../../../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../mock/context/MockRECEContextProvider";

const ID_REQUETE = "b63ebccd-ba5e-443a-8837-c5e1e111e846";

type HookConsumerProps = {
  paramsCreation: NavigationApercuReqCreationParams;
};

const HookConsumer: React.FC<HookConsumerProps> = props => {
  useNavigationApercuCreation(props.paramsCreation);
  return <></>;
};

const routerAvecContexte = (router: any): any => {
  return (
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

describe("Doit rediriger sur le bon aperçu de requête de transcription en fonction du statut et du sousType", () => {
  test("Doit rediriger sur l'aperçu de requête création transcription simple quand le sousType est RCTC et que le statut est A_TRAITER", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTC,
      statut: StatutRequete.A_TRAITER
    };

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          element: <PageRequeteCreationTranscriptionPriseEnCharge />
        },
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID,
          element: <PageRequeteTranscriptionSaisieProjet />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercu-requete-transcription-en-prise-en-charge", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription prise en charge quand le sousType est RCTC et que le statut est A_TRAITER", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTC,
      statut: StatutRequete.A_TRAITER
    };

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          element: <PageRequeteCreationTranscriptionPriseEnCharge />
        },
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercu-requete-transcription-en-prise-en-charge", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription prise en charge quand le sousType est RCTD et que le statut est PRISE_EN_CHARGE", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTD,
      statut: StatutRequete.PRISE_EN_CHARGE
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          element: <PageRequeteCreationTranscriptionPriseEnCharge />
        },
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercu-requete-transcription-en-prise-en-charge", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription en traitement quand le sousType est RCTD et que le statut est EN_TRAITEMENT", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTD,
      statut: StatutRequete.EN_TRAITEMENT
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          element: <PageRequeteCreationTranscriptionPriseEnCharge />
        },
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
            "b63ebccd-ba5e-443a-8837-c5e1e111e846"
          ),
          element: <PageRequeteTranscriptionSaisieProjet />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(apercuRequeteURL("apercurequetetranscriptionensaisieprojet", paramsCreation.idRequete));
  });
});

describe("Doit rediriger sur le bon aperçu de requête d'établissement en fonction du statut et du sousType", () => {
  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut À traiter", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.A_TRAITER
    };

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut Prise en charge", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.PRISE_EN_CHARGE
    };

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création simple QUAND le sousType est RCEXR et au statut Traité", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.TRAITE
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
          element: <ApercuRequeteEtablissementSimplePage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(apercuRequeteURL("apercurequetecreationetablissementsimple", paramsCreation.idRequete));
  });

  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut Projet Validé", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.PROJET_VALIDE
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut Retour SDANF", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.RETOUR_SDANF
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut BI Validé", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.BI_VALIDE
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier", paramsCreation.idRequete)
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut A Signer", () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.A_SIGNER
    };
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <HookConsumer paramsCreation={paramsCreation} />
        },
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
          element: <ApercuRequeteEtablissementSuiviDossierPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(routerAvecContexte(router));

    expect(router.state.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier", paramsCreation.idRequete)
    );
  });
});

function apercuRequeteURL(apercuRequete: string, idRequete: string) {
  if (apercuRequete.includes("etablissement")) {
    return `${URL_MES_REQUETES_CREATION}/${apercuRequete}/${idRequete}`;
  }
  return `${URL_MES_REQUETES_CONSULAIRE}/${apercuRequete}/${idRequete}`;
}
