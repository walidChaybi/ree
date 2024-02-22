import { useInformationsActeApiHook } from "@hook/acte/ActeApiHook";
import { act, render, waitFor } from "@testing-library/react";
import React from "react";

const hookParams = {
  idActe: "923a10fb-0b15-452d-83c0-d24c76d1d19d"
};
const HookConsummerActe: React.FC = () => {
  const acteApiHookResultat = useInformationsActeApiHook(hookParams);

  return (
    <>
      {acteApiHookResultat && (
        <div data-testid={"test-fiche-hook-acte"}>
          {acteApiHookResultat.acte?.id}
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour une fiche acte", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerActe />);

    await waitFor(() => {
      expect(getByTestId("test-fiche-hook-acte").textContent).toEqual(
        "923a10fb-0b15-452d-83c0-d24c76d1d19d"
      );
    });
  });
});


