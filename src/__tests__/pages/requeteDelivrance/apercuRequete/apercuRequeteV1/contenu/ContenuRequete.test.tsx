import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import DONNEES_REQUETE from "../../../../../../mock/data/requete";
import { ContenuRequete } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteV1/contenu/ContenuRequete";

test("renders contenu requete avec resumé requete", () => {
  act(() => {
    const contenuRequete = mount(<ContenuRequete requete={DONNEES_REQUETE} />);
    expect(contenuRequete.find(".resume-requete-content")).toHaveLength(2);
  });
});
