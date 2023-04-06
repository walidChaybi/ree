import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { StatutsRequetesInformation } from "@pages/requeteInformation/espaceInformation/EspaceReqInfoParams";
import { ReqInfoServicePage } from "@pages/requeteInformation/espaceInformation/ReqInfoServicePage";
import {
  URL_REQUETES_INFORMATION_SERVICE,
  URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";



const history = createMemoryHistory();

const parametresReqInfo = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const HookConsummer: React.FC = () => {
  history.push(URL_REQUETES_INFORMATION_SERVICE);

  return (
    <Router history={history}>
      <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
    </Router>
  );
};

test("renders Requête Service Info, Clic requête au statut TRANSFEREE", async () => {
  render(<HookConsummer />);

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

  await act(async () => {
    // Clic sur une ligne
    fireEvent.click(screen.getByText("EVIPG4"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
      )
    );
  });
});

test("renders Requête Service Info, Clic requête au statut PRISE_EN_CHARGE", async () => {
  await act(async () => {
    render(<HookConsummer />);
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
        URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"
      )
    );
  });
});


