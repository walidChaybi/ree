import requeteDelivrance from "@mock/data/requeteDelivrance";
import { useRMCAutoRequeteApiHook } from "@pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

test("Test useRMCAutoRequeteApiHook", async () => {
  const params = {
    requete: requeteDelivrance,
    range: "0-105"
  };

  const HookConsummerRequete: React.FC = () => {
    const { dataRMCAutoRequete } = useRMCAutoRequeteApiHook(params?.requete, params?.range);
    return <div data-testid="idRequete">{dataRMCAutoRequete?.[0]?.idRequete}</div>;
  };

  render(<HookConsummerRequete />);
  await waitFor(() => expect(screen.getByTestId("idRequete").textContent).toBe("54ddf213-d9b7-4747-8e92-68c220f66de3"));
});
