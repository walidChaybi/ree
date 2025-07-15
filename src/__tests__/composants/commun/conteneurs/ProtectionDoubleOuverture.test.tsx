import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ProtectionDoubleOuverture from "../../../../composants/commun/conteneurs/ProtectionDoubleOuverture";

describe("Test du composant Protection Double Ouverture", () => {
  test("Le page s'ouvre si seule instance", async () => {
    render(
      <ProtectionDoubleOuverture>
        <div>{"Application ouverte"}</div>
      </ProtectionDoubleOuverture>
    );

    await waitFor(() => expect(screen.getByText("Application ouverte")).toBeDefined());
  });

  test("La page ne s'ouvre pas si une autre instance lui répond", async () => {
    render(
      <ProtectionDoubleOuverture>
        <div>{"Application ouverte"}</div>
      </ProtectionDoubleOuverture>
    );

    dispatchEvent(new StorageEvent("storage", { key: "RECE_deja_ouvert", newValue: "test" }));

    await waitFor(() => expect(screen.getByText("L'application est déjà ouverte sur cet ordinateur")).toBeDefined());
  });
});
