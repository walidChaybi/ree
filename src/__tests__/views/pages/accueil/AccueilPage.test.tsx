import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expect, test } from "vitest";

test("renders page d'accueil", () => {
  render(
    <>
      <Router>
        <MockRECEContextProvider>
          <AccueilPage />
        </MockRECEContextProvider>
      </Router>
    </>
  );

  waitFor(() => {
    expect(document.title).toBe("Accueil");
    const textElements = screen.getByText(/Bienvenue*/i);
    expect(textElements).toBeDefined();
    const badge = screen.getByText("2");
    expect(badge).toBeDefined();
  });
});
