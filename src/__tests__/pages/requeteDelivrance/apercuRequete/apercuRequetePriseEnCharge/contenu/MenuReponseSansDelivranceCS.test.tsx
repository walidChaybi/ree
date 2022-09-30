import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { ChoixAction } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import {
  createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete,
  createReponseSansDelivranceCSPourCompositionApiFrancais,
  createReponseSansDelivranceCSPourCompositionApiMariage
} from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ReponseSansDelivranceCSFonctions";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/routeUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  reponseSansDelivranceCSDemandeIncomplete,
  reponseSansDelivranceCSFrancais,
  reponseSansDelivranceCSMariage
} from "../../../../../../mock/data/Composition";
import requeteDelivrance, {
  idRequeteRDCSC,
  idRequeteRDCSCCertificatSituationRCA,
  requeteDelivranceInstitutionnel,
  requeteRDCSC,
  requeteRDCSCCertificatSituationRCA
} from "../../../../../../mock/data/requeteDelivrance";
import { configComposition } from "../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configParamsBaseRequete } from "../../../../../../mock/superagent-config/superagent-mock-params";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configComposition[0],
  configEtatcivil[0],
  configParamsBaseRequete[0]
]);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    idRequeteRDCSC
  )
);

beforeEach(() => {
  ParametreBaseRequete.init();
});

describe("Menu réponse sans délivrance", () => {
  test("Doit rendre le menu des Action réponse sans délivrance", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSC} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Réponse sans délivrance")).toBeDefined();
    });
  });

  test("Doit rendre l'action - Requête incomplete... - quand le document demandé est une attestation PACS", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    act(() => {
      render(
        <Router history={history}>
          <ChoixAction requete={requeteRDCSC} />
        </Router>
      );
    });

    await waitFor(async () => {
      const boutonIgnorer = screen.getByText(
        "Requête incomplète ou difficilement lisible"
      );
      fireEvent.click(boutonIgnorer);
    });
  });

  test("Doit rendre l'action - Requête incomplete... - quand le type de documents demandés est autre que Attestation PACS", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSCCertificatSituationRCA
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSCCertificatSituationRCA} />
      </Router>
    );

    await act(async () => {
      expect(
        screen.getByText("Requête incomplète ou difficilement lisible")
      ).toBeDefined();
    });
  });

  test("Doit rendre l'action - PACS non inscrit - quand le document demandé est Attestion PACS", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSC} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("PACS non inscrit")).toBeDefined();
    });
  });

  test("Doit rendre l'action - Mariage en cours de validité - quand le document demandé est autre qu'une Attestation PACS", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSCCertificatSituationRCA
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSCCertificatSituationRCA} />
      </Router>
    );

    const choixActionMariage = screen.getByText("Mariage en cours de validité");

    await act(async () => {
      fireEvent.click(choixActionMariage);
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeDefined();
    });
  });

  test("Doit rendre l'action - Nationalité française ou naissance... quand le document demandé est une Attestation PACS- ", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSC} />
      </Router>
    );

    await waitFor(async () => {
      const choixActionNationaliteFrancaise = screen.getByText(
        "Nationalité française ou naissance en France"
      );
      fireEvent.click(choixActionNationaliteFrancaise);
    });
  });

  test("Doit rendre l'action - Ignorer la requête - quand le document demandé est autre qu'une Attestation PACS", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSCCertificatSituationRCA
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSCCertificatSituationRCA} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Ignorer la requête")).toBeDefined();
    });
  });

  test("test de création réponse sans délivrance mariage", async () => {
    const requete = requeteDelivrance;
    const acte = { idActe: "b41079a5-9e8d-478c-b04c-c4c2ac671348" };
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiMariage(
        requete,
        acte as any as IResultatRMCActe
      );
    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSMariage
    );
  });

  test("test de création réponse sans délivrance français", async () => {
    const requete = requeteDelivrance;
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiFrancais(requete);
    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSFrancais
    );
  });

  test("test de création réponse sans délivrance demande incomplete", async () => {
    const requete = requeteDelivranceInstitutionnel;
    const reponseSansDelivranceCS =
      await createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
        requete
      );
    expect(reponseSansDelivranceCS).toStrictEqual(
      reponseSansDelivranceCSDemandeIncomplete
    );
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête -", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSC} />
      </Router>
    );
    await act(async () => {
      fireEvent.click(screen.getByText("Ignorer la requête"));
    });

    const valider = screen.getByText("Valider") as HTMLButtonElement;

    expect(valider.disabled).toBeTruthy();
  });

  test("Doit avoir le bon comportement au click sur Valider sur - Ignorer la requête - ", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSC} />
      </Router>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Ignorer la requête"));

      await waitFor(() => {
        const annuler = screen.getByText("Annuler") as HTMLButtonElement;

        expect(annuler).toBeDefined();
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Annuler+/));

      await waitFor(() => {
        const annuler = screen.getByText("Annuler") as HTMLButtonElement;

        expect(annuler).toBeDefined();
      });
    });
  });

  test("message erreur", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    );

    render(
      <Router history={history}>
        <ChoixAction requete={requeteRDCSC} />
      </Router>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Ignorer la requête"));

      await waitFor(() => {
        const annuler = screen.getByText("Annuler") as HTMLButtonElement;

        expect(annuler).toBeDefined();
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

afterAll(() => {
  superagentMock.unset();
});
