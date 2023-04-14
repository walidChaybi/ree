import {
    IDerniereDelivranceActeParams,
    useDerniereDelivranceActeApiHook
} from "@hook/acte/DerniereDelivranceActeApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

const params2: IDerniereDelivranceActeParams = {
  idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235b"
};

const HookConsumer2: React.FC = () => {
  const res = useDerniereDelivranceActeApiHook(params2);

  return <div>{res?.resultat?.toString()}</div>;
};

test("Attendu: DerniereDelivrance fonctionne correctement", async () => {
  render(<HookConsumer2 />);

  await waitFor(() => {
    expect(screen.getByText("true")).toBeDefined();
  });
});


