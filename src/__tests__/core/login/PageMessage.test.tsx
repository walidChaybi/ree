import { PageMessage } from "@core/login/PageMessage";
import { render, screen } from "@testing-library/react";
import { getLibelle } from "@util/Utils";
import React from "react";

test("renders message page Login", () => {
  render(<PageMessage message={getLibelle("Connexion en cours ...")} />);
  const textElement = screen.getByText(/Connexion en cours .../i);
  expect(textElement).toBeDefined();
});
