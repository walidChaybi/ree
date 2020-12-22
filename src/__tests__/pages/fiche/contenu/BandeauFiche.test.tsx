import React from "react";
import * as renderer from "react-test-renderer";
import { BandeauFiche } from "../../../../views/pages/fiche/contenu/BandeauFiche";
import DATA_FICHE from "../data/ficheRC";

test("renders du bandeau d'une fiche RC", () => {
  const component = renderer.create(
    <>
      <BandeauFiche dataBandeau={DATA_FICHE.dataBandeau}></BandeauFiche>
    </>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
