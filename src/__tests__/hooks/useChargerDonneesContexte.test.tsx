import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useChargerDonneesContexte from "../../hooks/useChargerDonneesContexte";

describe("Test du Hook charger données contexte global de l'application", () => {
  test("Aucun appel si utilisateur non connecté", async () => {
    const { result } = renderHook(() => useChargerDonneesContexte(false));

    await waitFor(() => expect(result.current.utilisateurs).toStrictEqual([]));
    expect(result.current.services).toStrictEqual([]);
    expect(result.current.decrets).toStrictEqual([]);
  });
});
