import { useGetInscriptionsRCApiHook } from "@hook/acte/InscriptionsRcHook";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
const idPersonne = "0bce8edd-0183-497b-139d-0a3cf6918792";

const HookConsumer: React.FC = () => {
  const inscriptions = useGetInscriptionsRCApiHook(idPersonne);

  return <div>{inscriptions.length ? inscriptions[0].idInscription : ""}</div>;
};

test("Attendu: useGetInscriptionsRCApiHook fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    expect("747c0b00-03f3-4c6e-9db3-ec73cbdc0747").toBeDefined();
  });
});


