import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import FilAriane from "../../../../composants/miseEnPage/corpsDePage/FilAriane";
import GestionnaireFilAriane from "../../../../utils/GestionnaireFilAriane";

describe("Test du composant FilAriane", () => {
  test("le composant fonctionne correctement", async () => {
    const { container } = render(
      <MemoryRouter>
        <FilAriane />
      </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot();

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau 1", url: "/niveau-1", niveau: 1 });
    await waitFor(() => expect(screen.getByText("Niveau 1")).toBeDefined());
    expect(container.firstChild).toMatchSnapshot();

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau 2", url: "/niveau-2", niveau: 2 });
    await waitFor(() => expect(screen.getByText("Niveau 2")).toBeDefined());
    expect(container.firstChild).toMatchSnapshot();

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau 1 bis", url: "/niveau-1-bis", niveau: 1 });
    await waitFor(() => expect(screen.getByText("Niveau 1 bis")).toBeDefined());
    expect(container.firstChild).toMatchSnapshot();

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau inconnu", url: "/niveau-inconnu" });
    await waitFor(() => expect(screen.queryByText("Niveau 1 bis")).toBeNull());
    expect(container.firstChild).toMatchSnapshot();

    GestionnaireFilAriane.ajoutElement({ titre: "Niveau 2 bis", url: "/niveau-2-bis", niveau: 1 });
    await waitFor(() => expect(screen.getByText("Niveau 2 bis")).toBeDefined());
    expect(container.firstChild).toMatchSnapshot();
  });
});
