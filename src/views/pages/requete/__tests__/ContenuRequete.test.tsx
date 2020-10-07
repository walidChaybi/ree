import React from "react";

import DONNEES_REQUETE from "../../../../api/mock/data/requete";
import { ContenuRequete } from "../visualisation/ContenuRequete";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

test("renders contenu requete avec resumé requete", () => {
  act(() => {
    const contenuRequete = mount(<ContenuRequete requete={DONNEES_REQUETE} />);
    expect(contenuRequete.find(".resume-requete-content")).toHaveLength(2);
  });
});
