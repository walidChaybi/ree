import {
  OfficierContext,
  officierContextMock
} from "@core/contexts/OfficierContext";
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
          <OfficierContext.Provider value={officierContextMock}>
            <AccueilPage />
          </OfficierContext.Provider>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    const titleElements = screen.getByText("Accueil");
    expect(titleElements).toBeInTheDocument();
    const textElements = screen.getByText(/Bienvenue*/i);
    expect(textElements).toBeInTheDocument();
    const badge = screen.getByText("2");
    expect(badge).toBeInTheDocument();
  });
});


