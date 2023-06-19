import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { BoiteAOnglets } from "@widget/onglets/BoiteAOnglets";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const mock = [
  {
    enTete: { titre: "Mes requêtes de délivrance" },
    corps: { composant: <div /> }
  },
  {
    enTete: {
      titre: "Requêtes de mon service"
    },
    corps: { composant: <p>Non je n'ai pas changé</p> }
  }
];

test("renders BoiteAOnglet", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);

  await act(async () => {
    render(
      <Router history={history}>
        <BoiteAOnglets selectedTab={0} onglets={mock} />
      </Router>
    );
  });
  const mesRequetes = screen.getByText(/Mes requêtes de délivrance/i);
  const requetesService = screen.getByText(/Requêtes de mon service/i);

  await waitFor(() => {
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
  });

  act(() => {
    fireEvent.click(requetesService);
  });

  const corpsService = screen.getByText(/Non je n'ai pas changé/i);
  await waitFor(() => {
    expect(corpsService).toBeDefined();
  });
});
