import { TypeEntite } from "@model/agent/enum/TypeEntite";
import { RequetesServicePage } from "@pages/requeteDelivrance/espaceDelivrance/RequetesServicePage";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";


let history: any;
const setParamsRMCAuto = jest.fn();

beforeAll(() => {
  storeRece.listeEntite = [
    {
      idEntite: "1234",
      type: TypeEntite.BUREAU,
      code: "1234",
      libelleEntite: "str1",
      estDansSCEC: true
    },
    {
      idEntite: "12345",
      type: TypeEntite.DEPARTEMENT,
      code: "12345",
      libelleEntite: "str2",
      estDansSCEC: true
    }
  ];
});

beforeEach(() => {
  history = createMemoryHistory();
  history.push(URL_REQUETES_DELIVRANCE_SERVICE);
});

test("renders Page requete interactions works, no errors returned", async () => {
  render(
    <Router history={history}>
      <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
    </Router>
  );

  const titreNumero = screen.getByText("N°");
  const pageSuivante = screen.getByTitle("Page suivante");

  fireEvent.click(screen.getByTestId("loupeButton"));
  
  await waitFor(() => {
    const numero = screen.getByText("1234");
    expect(titreNumero).toBeDefined();
    expect(numero).toBeDefined();
  });

  act(() => {
    fireEvent.click(pageSuivante);
  });

  await waitFor(() => {
    const numero = screen.getByText("9021");
    expect(numero).toBeDefined();
  });

  act(() => {
    // Clic sur une ligne
    fireEvent.click(screen.getByText("9021"));
  });
  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });

  act(() => {
    // Clic sur un titre de colonne
    fireEvent.click(titreNumero);
  });
  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });
});

test("Test Attribuée à", async () => {
  render(
    <Router history={history}>
      <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
    </Router>
  );
  fireEvent.click(screen.getByTestId("loupeButton"));

  await waitFor(() => {
    const numero = screen.getByText("1234");
    expect(numero).toBeDefined();
    expect(screen.getAllByTitle("Attribuer requête")[0]).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Attribuer requête")[0]);
  });

  await waitFor(() => {
    expect(screen.getAllByText("À un service")[0]).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("À un service")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Attribuer à un service")).toBeDefined();
  });

  const autocomplete = screen.getAllByTestId("autocomplete")[0];
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
    autocomplete.focus();
  });
  await act(async () => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });

  const entite = screen.getByText("str2");
  await waitFor(() => {
    expect(entite).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(entite);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;
  await waitFor(() => {
    expect(valider).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(valider);
  });
});

test("la page DOIT afficher les requetes filtrées QUAND on selectionne un filtre et qu'on clique sur la recherche", async () => {
  render(
    <Router history={history}>
      <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
    </Router>
  );
  fireEvent.click(screen.getByTestId("loupeButton"));

  await waitFor(() => {
    expect(screen.getAllByText("1234")).toBeDefined();
    expect(screen.getAllByText("2090860")).toBeDefined();
    expect(screen.getAllByText("9876")).toBeDefined();
    expect(screen.getAllByText("9012")).toBeDefined();
    expect(screen.getAllByText("1235")).toBeDefined();
    expect(screen.getAllByText("2090861")).toBeDefined();
    expect(screen.getAllByText("9877")).toBeDefined();
  });

  const boutonRechercher = screen.getByTestId("loupeButton");

  await waitFor(() => {
    fireEvent.change(screen.getByLabelText("Sous-Type"), {
      target: {
        value: "RDDCO"
      }
    });
    fireEvent.click(boutonRechercher);
  });

  await waitFor(() => {
    expect(screen.getAllByText("1234")).toBeDefined();
    expect(screen.getAllByText("2090860")).toBeDefined();
    expect(screen.getAllByText("9876")).toBeDefined();
    expect(screen.getAllByText("9012")).toBeDefined();
    expect(screen.getAllByText("1235")).toBeDefined();
    expect(screen.getAllByText("2090861")).toBeDefined();
    expect(screen.getAllByText("9877")).toBeDefined();
  });
});

