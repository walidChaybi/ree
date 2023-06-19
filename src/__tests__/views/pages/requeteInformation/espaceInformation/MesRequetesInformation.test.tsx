import { OfficierContext } from "@core/contexts/OfficierContext";
import officier from "@mock/data/connectedUser.json";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

let history: any;
beforeEach(() => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_INFORMATION);
});

test("renders Page requete information et clique sur une TRANSFEREE", async () => {
  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: { idSSO: officier.id_sso, ...officier }
        }}
      >
        <EspaceInformationPage />
      </OfficierContext.Provider>
    </Router>
  );

  const titreNumero = screen.getByText("N° requête");
  const pageSuivante = screen.getByTitle("Page suivante");
  expect(pageSuivante).toBeDefined();
  expect(titreNumero).toBeDefined();

  await waitFor(() => {
    expect(screen.getByText("EVIPG4")).toBeDefined();
    expect(screen.getByText("EVIPG5")).toBeDefined();
    expect(screen.getByText("NOM1 p1")).toBeDefined();
    expect(screen.getByText("NOM2 p1")).toBeDefined();
  });

  act(() => {
    // Clic sur une ligne
    fireEvent.click(screen.getByText("EVIPG4"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
      )
    );
  });
});

test("renders Requête Service Info, Clic requête au statut PRISE_EN_CHARGE", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <OfficierContext.Provider
          value={{
            officierDataState: { idSSO: officier.id_sso, ...officier }
          }}
        >
          <EspaceInformationPage />
        </OfficierContext.Provider>
      </Router>
    );
  });

  const req = screen.getByText("EVIPG5");

  await waitFor(() => {
    expect(req).toBeDefined();
  });

  await act(async () => {
    // Clic sur une ligne
    fireEvent.click(req);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"
      )
    );
  });
});
