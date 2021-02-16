import React from "react";
import * as renderer from "react-test-renderer";
import { RMCActeInscriptionPage } from "../../../views/pages/rechercheMultiCriteres/RMCActeInscriptionPage";

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", () => {
  const component = renderer.create(<RMCActeInscriptionPage />);
  expect(component.toJSON()).toMatchSnapshot();
});
