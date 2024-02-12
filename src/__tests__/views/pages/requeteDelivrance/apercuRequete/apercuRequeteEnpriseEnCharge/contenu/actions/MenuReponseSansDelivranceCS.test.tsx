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
import { ChoixAction } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import {
  PATH_APERCU_REQ_TRAITEMENT,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";

const RDCSC = () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ChoixAction requete={requeteRDCSC} />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    ]
  );

  act(() => {
    render(<RouterProvider router={router} />);
  });

  return { router };
};
const RDCSCCertificatSituationRCA = () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ChoixAction requete={requeteRDCSCCertificatSituationRCA} />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSCCertificatSituationRCA
      )
    ]
  );

  act(() => {
    render(<RouterProvider router={router} />);
  });

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
  test("Doit rendre le menu des Action réponse sans délivrance", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await waitFor(() => {
      expect(Boutons.sansDelivrance()).toBeDefined();
    });
  });

  test("Doit rendre l'action - Requête incomplete... - quand le document demandé est une attestation PACS", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await waitFor(async () => {
      fireEvent.click(Boutons.reqIncomplete());
    });
  });

  test("Doit rendre l'action - Requête incomplete... - quand le type de documents demandés est autre que Attestation PACS", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    await act(async () => {
      expect(Boutons.reqIncomplete()).toBeDefined();
    });
  });

  test("Doit rendre l'action - PACS non inscrit - quand le document demandé est Attestion PACS", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await waitFor(() => {
      expect(Boutons.PACSNonInscrit()).toBeDefined();
    });
  });

  test("Réponse PACS non inscrit", async () => {
    const rendu = Rendus.apercuReqPriseEnCharge.RDCSC();

    await act(async () => {
      fireEvent.click(Boutons.PACSNonInscrit());
    });

    expect(rendu.router.state.location.pathname).toBe(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_TRAITEMENT}/${idRequeteRDCSC}`
    );
  });

  test("Doit rendre l'action - Mariage en cours de validité - quand le document demandé est autre qu'une Attestation PACS", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    await act(async () => {
      fireEvent.click(Boutons.mariageEnCours());
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined();
    });
  });

  test("Doit rendre l'action - Nationalité française ou naissance... quand le document demandé est une Attestation PACS- ", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await waitFor(async () => {
      fireEvent.click(Boutons.nationaliteNaissance());
    });
  });

  test("Doit rendre l'action - Ignorer la requête - quand le document demandé est autre qu'une Attestation PACS", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    await waitFor(() => {
      expect(Boutons.ignorer()).toBeDefined();
    });
  });

  test("test de création réponse sans délivrance mariage", async () => {
    const acte = {
      idActe: acteMariage.id
    } as IResultatRMCActe;
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiMariage(
        requeteDelivrance,
        acte
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSMariage
    );
  });

  test("test de création réponse sans délivrance mariage electronique", async () => {
    const acte = {
      idActe: acteMariageElectronique.id
    } as IResultatRMCActe;
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiMariage(
        requeteDelivrance,
        acte
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSMariageElectronique
    );
  });

  test("test de création réponse sans délivrance français", async () => {
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiFrancais(
        requeteDelivrance
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSFrancais
    );
  });

  test("test de création réponse sans délivrance demande incomplete", async () => {
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
        requeteDelivranceInstitutionnel
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSDemandeIncomplete
    );
  });

  test("test de création réponse sans délivrance PACS non inscrit", async () => {
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(
        requeteDelivranceInstitutionnel
      );

    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSPACSNonInscrit
    );
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête -", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await act(async () => {
      fireEvent.click(Boutons.ignorer());
    });

    expect(Boutons.valider().disabled).toBeTruthy();
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête - ", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await act(async () => {
      fireEvent.click(Boutons.ignorer());

      await waitFor(() => {
        expect(Boutons.annuler()).toBeDefined();
      });
    });

    await act(async () => {
      fireEvent.click(Boutons.annuler());

      await waitFor(() => {
        expect(Boutons.annuler()).toBeDefined();
      });
    });
  });

  test("message erreur", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    await act(async () => {
      fireEvent.click(Boutons.ignorer());

      await waitFor(() => {
        expect(Boutons.annuler()).toBeDefined();
      });
    });

    const reponseSansDelivranceCS1 =
      await createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
        {} as IRequeteDelivrance
      );
    expect(reponseSansDelivranceCS1).toStrictEqual({});
    const reponseSansDelivranceCS2 =
      await createReponseSansDelivranceCSPourCompositionApiMariage(
        {} as IRequeteDelivrance,
        {} as IResultatRMCActe
      );
    expect(reponseSansDelivranceCS2).toStrictEqual({});
    const reponseSansDelivranceCS3 =
      await createReponseSansDelivranceCSPourCompositionApiFrancais(
        {} as IRequeteDelivrance
      );
    expect(reponseSansDelivranceCS3).toStrictEqual({});
  });
});
