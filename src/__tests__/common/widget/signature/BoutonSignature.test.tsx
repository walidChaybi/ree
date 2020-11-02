import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BoutonSignature } from "../../../../views/common/widget/signature/BoutonSignature";
import { BoutonAvecValidationPopin } from "../../../../views/common/widget/BoutonAvecValidationPopin";

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
