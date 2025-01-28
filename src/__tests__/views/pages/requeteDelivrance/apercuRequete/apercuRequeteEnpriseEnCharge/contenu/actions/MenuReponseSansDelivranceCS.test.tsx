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
import { acteMariage, acteMariageElectronique } from "@mock/data/ficheEtBandeau/ficheActe";
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

describe("Menu réponse sans délivrance", () => {
  const RDCSC = () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <ChoixAction requete={requeteRDCSC} />
        },
        {
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "d19650ed-012b-41ec-b7be-9e6ea9101eaa"),
          element: <ApercuRequeteTraitementPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
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
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "d19650ed-012b-41ec-b7be-9e6ea9101eaa"),
          element: <ApercuRequeteTraitementPage />
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
          element: <ApercuRequeteTraitementPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSCCertificatSituationRCA)]
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
  const getBouton = (libelle: string) => () => screen.getByText<HTMLButtonElement>(libelle);
  const Boutons = {
    sansDelivrance: getBouton("Réponse sans délivrance"),
    reqIncomplete: getBouton("Requête incomplète ou difficilement lisible"),
    PACSNonInscrit: getBouton("PACS non inscrit"),
    mariageEnCours: getBouton("Mariage en cours de validité"),
    nationaliteNaissance: getBouton("Nationalité française ou naissance en France"),
    ignorer: getBouton("Ignorer la requête"),
    valider: getBouton("Valider"),
    annuler: getBouton("Annuler")
  };

  beforeEach(() => {
    ParametreBaseRequete.init();
  });

  test("Doit rendre l'action - Nationalité française ou naissance & PACS non inscrit & Requête incomplete... - quand le document demandé est une attestation PACS", async () => {
    const rendu = Rendus.apercuReqPriseEnCharge.RDCSC();

    await waitFor(() => {
      expect(Boutons.sansDelivrance()).toBeDefined();

      expect(Boutons.PACSNonInscrit()).toBeDefined();

      expect(Boutons.reqIncomplete()).toBeDefined();

      expect(Boutons.nationaliteNaissance()).toBeDefined();
    });

    // Réponse PACS non inscrit
    fireEvent.click(Boutons.PACSNonInscrit());

    await waitFor(() => {
      expect(rendu.router.state.location.pathname).toBe(`${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_TRAITEMENT}/${idRequeteRDCSC}`);
    });
  });

  test("Doit rendre l'action - Ignorer la requête & Mariage en cours de validité & Requête incomplete... - quand le type de documents demandés est autre que Attestation PACS", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSCCertificatSituationRCA();

    await waitFor(() => {
      expect(Boutons.reqIncomplete()).toBeDefined();

      expect(Boutons.mariageEnCours()).toBeDefined();

      expect(Boutons.ignorer()).toBeDefined();
    });

    fireEvent.click(Boutons.mariageEnCours());

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined();
    });
  });

  test("test de création réponse sans délivrance mariage", async () => {
    const acte = {
      idActe: acteMariage.id
    } as IResultatRMCActe;
    const reponseSansDelivranceCS = await createReponseSansDelivranceCSPourCompositionApiMariage(requeteDelivrance, acte);

    expect(reponseSansDelivranceCS).toStrictEqual(reponseSansDelivranceCSMariage);

    // Test comportement entrée vide
    const reponseSansDelivranceCS2 = await createReponseSansDelivranceCSPourCompositionApiMariage(
      {} as IRequeteDelivrance,
      {} as IResultatRMCActe
    );
    expect(reponseSansDelivranceCS2).toStrictEqual({});
  });

  test("test de création réponse sans délivrance mariage electronique", async () => {
    const acte = {
      idActe: acteMariageElectronique.id
    } as IResultatRMCActe;
    const reponseSansDelivranceCS = await createReponseSansDelivranceCSPourCompositionApiMariage(requeteDelivrance, acte);

    expect(reponseSansDelivranceCS).toStrictEqual(reponseSansDelivranceCSMariageElectronique);
  });

  test("test de création réponse sans délivrance français", async () => {
    const reponseSansDelivranceCS = createReponseSansDelivranceCSPourCompositionApiFrancais(requeteDelivrance);
    expect(reponseSansDelivranceCS).toStrictEqual(reponseSansDelivranceCSFrancais);

    // Test comportement entrée vide
    const reponseSansDelivranceCSVide = createReponseSansDelivranceCSPourCompositionApiFrancais({} as IRequeteDelivrance);
    expect(reponseSansDelivranceCSVide).toStrictEqual({});
  });

  test("test de création réponse sans délivrance demande incomplete", () => {
    const reponseSansDelivranceCS = createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(requeteDelivranceInstitutionnel);
    expect(reponseSansDelivranceCS).toStrictEqual(reponseSansDelivranceCSDemandeIncomplete);

    // Test comportement entrée vide
    const reponseSansDelivranceCSVide = createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete({} as IRequeteDelivrance);
    expect(reponseSansDelivranceCSVide).toStrictEqual({});
  });

  test("test de création réponse sans délivrance PACS non inscrit", () => {
    const reponseSansDelivranceCS = createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit(requeteDelivranceInstitutionnel);
    expect(reponseSansDelivranceCS).toStrictEqual(reponseSansDelivranceCSPACSNonInscrit);

    // Test comportement entrée vide
    const reponseSansDelivranceCSVide = createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit({} as IRequeteDelivrance);
    expect(reponseSansDelivranceCSVide).toStrictEqual({});
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête", async () => {
    Rendus.apercuReqPriseEnCharge.RDCSC();

    fireEvent.click(Boutons.ignorer());

    await waitFor(() => {
      expect(Boutons.annuler()).toBeDefined();
      expect(Boutons.valider().disabled).toBeTruthy();
    });

    fireEvent.click(Boutons.annuler());

    await waitFor(() => {
      expect(Boutons.annuler()).toBeDefined();
    });
  });
});
