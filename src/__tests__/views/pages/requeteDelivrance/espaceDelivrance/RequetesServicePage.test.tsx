import { ETypeService } from "@model/agent/enum/ETypeService";
import { RequetesServicePage } from "@pages/requeteDelivrance/espaceDelivrance/RequetesServicePage";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../mock/context/MockRECEContextProvider";

const setParamsRMCAuto = vi.fn();

const services = [
  {
    idService: "1234",
    type: ETypeService.BUREAU,
    code: "1234",
    libelleService: "str1",
    estDansScec: true
  },
  {
    idService: "12345",
    type: ETypeService.DEPARTEMENT,
    code: "12345",
    libelleService: "str2",
    estDansScec: true
  }
];

const routerAvecContexte = (router: any): any => {
  return (
    <MockRECEContextProvider services={services}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

test.skip("renders Page requete interactions works, no errors returned", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_DELIVRANCE_SERVICE,
        element: <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
      }
    ],
    [URL_REQUETES_DELIVRANCE_SERVICE]
  );

  render(routerAvecContexte(router));

  const titreNumero = screen.getByText("N°");
  const pageSuivante = screen.getByTitle("Page suivante");

  fireEvent.click(screen.getByTestId("loupeButton"));

  waitFor(() => {
    const numero = screen.getByText("1234");
    expect(titreNumero).toBeDefined();
    expect(numero).toBeDefined();
  });

  fireEvent.click(pageSuivante);

  waitFor(() => {
    const numero = screen.getByText("9021");
    expect(numero).toBeDefined();
  });

  // Clic sur une ligne
  fireEvent.click(screen.getByText("9021"));

  waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });

  // Clic sur un titre de colonne
  fireEvent.click(titreNumero);

  waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });
});

test.skip("Test Attribuée à", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_DELIVRANCE_SERVICE,
        element: <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
      }
    ],
    [URL_REQUETES_DELIVRANCE_SERVICE]
  );

  render(routerAvecContexte(router));

  fireEvent.click(screen.getByTestId("loupeButton"));

  waitFor(() => {
    const numero = screen.getByText("1234");
    expect(numero).toBeDefined();
    expect(screen.getAllByTitle("Attribuer requête")[0]).toBeDefined();
  });

  fireEvent.click(screen.getAllByTitle("Attribuer requête")[0]);

  waitFor(() => {
    expect(screen.getAllByText("À un service")[0]).toBeDefined();
  });

  fireEvent.click(screen.getAllByText("À un service")[0]);

  waitFor(() => {
    expect(screen.getByText("Attribuer à un service")).toBeDefined();
  });

  const autocomplete = screen.getAllByTestId("autocomplete")[0];
  const inputChampRecherche = screen.getByLabelText("TransfertPopin") as HTMLInputElement;

  waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
  });

  autocomplete.focus();

  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });

  const service = screen.getByText("str2");
  waitFor(() => {
    expect(service).toBeDefined();
  });

  fireEvent.click(service);

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  waitFor(() => {
    expect(valider).toBeDefined();
  });

  fireEvent.click(valider);
});

test.skip("la page DOIT afficher les requetes filtrées QUAND on selectionne un filtre et qu'on clique sur la recherche", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_DELIVRANCE_SERVICE,
        element: <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
      }
    ],
    [URL_REQUETES_DELIVRANCE_SERVICE]
  );

  render(routerAvecContexte(router));

  fireEvent.click(screen.getByTestId("loupeButton"));

  waitFor(() => {
    expect(screen.getAllByText("1234")).toBeDefined();
    expect(screen.getAllByText("2090860")).toBeDefined();
    expect(screen.getAllByText("9876")).toBeDefined();
    expect(screen.getAllByText("9012")).toBeDefined();
    expect(screen.getAllByText("1235")).toBeDefined();
    expect(screen.getAllByText("2090861")).toBeDefined();
    expect(screen.getAllByText("9877")).toBeDefined();
  });

  const boutonRechercher = screen.getByTestId("loupeButton");

  waitFor(() => {
    expect(screen.getByLabelText("Sous-Type")).toBeDefined();
    expect(boutonRechercher).toBeDefined();
  });

  fireEvent.change(screen.getByLabelText("Sous-Type"), {
    target: {
      value: "RDDCO"
    }
  });
  fireEvent.click(boutonRechercher);

  waitFor(() => {
    expect(screen.getAllByText("1234")).toBeDefined();
    expect(screen.getAllByText("2090860")).toBeDefined();
    expect(screen.getAllByText("9876")).toBeDefined();
    expect(screen.getAllByText("9012")).toBeDefined();
    expect(screen.getAllByText("1235")).toBeDefined();
    expect(screen.getAllByText("2090861")).toBeDefined();
    expect(screen.getAllByText("9877")).toBeDefined();
  });
});
