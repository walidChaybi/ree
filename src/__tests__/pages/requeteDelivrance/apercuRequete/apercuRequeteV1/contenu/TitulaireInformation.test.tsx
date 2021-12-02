import { render } from "@testing-library/react";
import React from "react";
import requete from "../../../../../../mock/data/requete.js";
import { TitulaireInformation } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteV1/contenu/TitulaireInformation";

test("render titulaire information", () => {
  const { getByText, container } = render(
    <TitulaireInformation titulaire={requete.titulaires[0]} position={0} />
  );

  const textTitulaire = getByText(/titulaire0/i);
  expect(textTitulaire).toBeDefined();
  expect(container).toMatchSnapshot();
  const date = getByText(/25\/03\/1983/i);
  expect(date).toBeDefined();
});

test("render titulaire information different date", () => {
  const { getByText } = render(
    <TitulaireInformation
      titulaire={{
        ...requete.titulaires[0],
        jourNaissance: 2,
        moisNaissance: 11,
        anneeNaissance: 2020
      }}
      position={0}
    />
  );

  const date = getByText(/02\/11\/2020/i);
  expect(date).toBeDefined();
});
