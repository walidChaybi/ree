import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
let container: Element | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

test("renders page d'accueil", async () => {
  act(() => {
    render(
      <>
        <Router>
          <MockRECEContextProvider>
            <AccueilPage />
          </MockRECEContextProvider>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(document.title).toBe("Accueil");
    const textElements = screen.getByText(/Bienvenue*/i);
    expect(textElements).toBeInTheDocument();
    const badge = screen.getByText("2");
    expect(badge).toBeInTheDocument();
  });
});
