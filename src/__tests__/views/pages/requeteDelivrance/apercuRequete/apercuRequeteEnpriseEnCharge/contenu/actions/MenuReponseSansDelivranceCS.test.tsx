import {
  createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete,
  createReponseSansDelivranceCSPourCompositionApiFrancais,
  createReponseSansDelivranceCSPourCompositionApiMariage,
  createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit
} from "@hook/reponseSansDelivrance/ReponseSansDelivranceCSFonctions";
import {
  reponseSansDelivranceCSDemandeIncomplete,
  reponseSansDelivranceCSFrancais,
  reponseSansDelivranceCSMariage,
  reponseSansDelivranceCSMariageElectronique,
  reponseSansDelivranceCSPACSNonInscrit
} from "@mock/data/Composition";
import {
  acteMariage,
  acteMariageElectronique
} from "@mock/data/ficheEtBandeau/ficheActe";
import requeteDelivrance, {
  idRequeteRDCSC,
  idRequeteRDCSCCertificatSituationRCA,
  requeteDelivranceInstitutionnel,
  requeteRDCSC,
  requeteRDCSCCertificatSituationRCA
} from "@mock/data/requeteDelivrance";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { ChoixAction } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import {
  PATH_APERCU_REQ_TRAITEMENT,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";

const RDCSC = () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ChoixAction requete={requeteRDCSC} />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
          "d19650ed-012b-41ec-b7be-9e6ea9101eaa"
        ),
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    ]
  );

  render(<RouterProvider router={router} />);

  return { router };
};
const RDCSCCertificatSituationRCA = () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ChoixAction requete={requeteRDCSCCertificatSituationRCA} />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
          "d19650ed-012b-41ec-b7be-9e6ea9101eaa"
        ),
        element: <ApercuRequeteTraitementPage />
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSCCertificatSituationRCA
      )
    ]
  );

  render(<RouterProvider router={router} />);

  return { router };
};
const Rendus = {
  apercuReqPriseEnCharge: {
    RDCSC,
    RDCSCCertificatSituationRCA
  }
};
const getBouton = (libelle: string) => () =>
  screen.getByText(libelle) as HTMLButtonElement;
const Boutons = {
  sansDelivrance: getBouton("Réponse sans délivrance"),
  reqIncomplete: getBouton("Requête incomplète ou difficilement lisible"),
  PACSNonInscrit: getBouton("PACS non inscrit"),
  mariageEnCours: getBouton("Mariage en cours de validité"),
  nationaliteNaissance: getBouton(
    "Nationalité française ou naissance en France"
  ),
  ignorer: getBouton("Ignorer la requête"),
  valider: getBouton("Valider"),
  annuler: getBouton("Annuler")
};

beforeEach(() => {
  ParametreBaseRequete.init();
});

describe("Menu réponse sans délivrance", () => {
  test("Doit rendre le menu des Action réponse sans délivrance", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    waitFor(() => {
      expect(Boutons.sansDelivrance()).toBeDefined();
    });
  });

  test("Doit rendre l'action - Requête incomplete... - quand le document demandé est une attestation PACS", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    waitFor(() => {
      fireEvent.click(Boutons.reqIncomplete());
    });
  });

  test("Doit rendre l'action - Requête incomplete... - quand le type de documents demandés est autre que Attestation PACS", () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    waitFor(() => {
      expect(Boutons.reqIncomplete()).toBeDefined();
    });
  });

  test("Doit rendre l'action - PACS non inscrit - quand le document demandé est Attestion PACS", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    waitFor(() => {
      expect(Boutons.PACSNonInscrit()).toBeDefined();
    });
  });

  test.skip("Réponse PACS non inscrit", () => {
    const rendu = Rendus.apercuReqPriseEnCharge.RDCSC();

    fireEvent.click(Boutons.PACSNonInscrit());

    waitFor(() => {
      expect(rendu.router.state.location.pathname).toBe(
        `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_TRAITEMENT}/${idRequeteRDCSC}`
      );
    });
  });

  test("Doit rendre l'action - Mariage en cours de validité - quand le document demandé est autre qu'une Attestation PACS", () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    fireEvent.click(Boutons.mariageEnCours());

    waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined();
    });
  });

  test.skip("Doit rendre l'action - Nationalité française ou naissance... quand le document demandé est une Attestation PACS- ", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    fireEvent.click(Boutons.nationaliteNaissance());

    waitFor(() => {
      expect(Boutons.nationaliteNaissance()).toBeCalled();
    });
  });

  test("Doit rendre l'action - Ignorer la requête - quand le document demandé est autre qu'une Attestation PACS", () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    waitFor(() => {
      expect(Boutons.ignorer()).toBeDefined();
    });
  });

  test.skip("test de création réponse sans délivrance mariage", () => {
    const acte = {
      idActe: acteMariage.id
    } as IResultatRMCActe;
    const reponseSansDelivranceCS =
      createReponseSansDelivranceCSPourCompositionApiMariage(
        requeteDelivrance,
        acte
      );

    waitFor(() => {
      expect(reponseSansDelivranceCS).toStrictEqual(
        reponseSansDelivranceCSMariage
      );
    });
  });

  test.skip("test de création réponse sans délivrance mariage electronique", () => {
    const acte = {
      idActe: acteMariageElectronique.id
    } as IResultatRMCActe;
    const reponseSansDelivranceCS =
      createReponseSansDelivranceCSPourCompositionApiMariage(
        requeteDelivrance,
        acte
      );

    waitFor(() => {
      expect(reponseSansDelivranceCS).toStrictEqual(
        reponseSansDelivranceCSMariageElectronique
      );
    });
  });

  test("test de création réponse sans délivrance français", () => {
    const reponseSansDelivranceCS =
      createReponseSansDelivranceCSPourCompositionApiFrancais(
        requeteDelivrance
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSFrancais
    );
  });

  test("test de création réponse sans délivrance demande incomplete", () => {
    const reponseSansDelivranceCS =
      createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
        requeteDelivranceInstitutionnel
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSDemandeIncomplete
    );
  });

  test("test de création réponse sans délivrance PACS non inscrit", () => {
    const reponseSansDelivranceCS =
      createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(
        requeteDelivranceInstitutionnel
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSPACSNonInscrit
    );
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête -", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    fireEvent.click(Boutons.ignorer());

    waitFor(() => {
      expect(Boutons.valider().disabled).toBeTruthy();
    });
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête - ", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    fireEvent.click(Boutons.ignorer());

    waitFor(() => {
      expect(Boutons.annuler()).toBeDefined();
    });

    fireEvent.click(Boutons.annuler());

    waitFor(() => {
      expect(Boutons.annuler()).toBeDefined();
    });
  });

  test.skip("message erreur", () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    fireEvent.click(Boutons.ignorer());

    waitFor(() => {
      expect(Boutons.annuler()).toBeDefined();
    });

    const reponseSansDelivranceCS1 =
      createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
        {} as IRequeteDelivrance
      );

    waitFor(() => {
      expect(reponseSansDelivranceCS1).toStrictEqual({});
    });

    const reponseSansDelivranceCS2 =
      createReponseSansDelivranceCSPourCompositionApiMariage(
        {} as IRequeteDelivrance,
        {} as IResultatRMCActe
      );
    waitFor(() => {
      expect(reponseSansDelivranceCS2).toStrictEqual({});
    });
    const reponseSansDelivranceCS3 =
      createReponseSansDelivranceCSPourCompositionApiFrancais(
        {} as IRequeteDelivrance
      );
    waitFor(() => {
      expect(reponseSansDelivranceCS3).toStrictEqual({});
    });
  });
});
