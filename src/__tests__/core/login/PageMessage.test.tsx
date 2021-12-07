import { render, screen } from "@testing-library/react";
import React from "react";
import { getLibelle } from "../../../views/common/util/Utils";
import { PageMessage } from "../../../views/core/login/PageMessage";

test("renders message page Login", () => {
  render(<PageMessage message={getLibelle("Connexion en cours ...")} />);
  const textElement = screen.getByText(/Connexion en cours .../i);
  expect(textElement).toBeDefined();
});
