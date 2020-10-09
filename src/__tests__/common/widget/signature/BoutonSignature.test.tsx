import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BoutonSignature } from "../../../../views/common/widget/signature/BoutonSignature";

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders message indisponibilité", async () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[]}
      reloadData={() => {
        return null;
      }}
    />
  );
  await waitFor(() => {
    const linkElement = screen.getByText(
      /Le service de signature électronique est indisponible/i
    );
    expect(linkElement).toBeInTheDocument();
  });
});
