import React from "react";
import DONNEES_REQUETE from "../../../api/mock/data/requete";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { RequetesServicePage } from "../../../views/pages/espaceDelivrance/RequetesServicePage";

test("renders Page requete with all elements", () => {
  act(() => {
    const history = createMemoryHistory();
    history.push("mesrequetes/req2", {
      data: [
        { ...DONNEES_REQUETE, idRequete: "req1" },
        { ...DONNEES_REQUETE, idRequete: "req2" },
        { ...DONNEES_REQUETE, idRequete: "req3" }
      ]
    });

    const component = mount(
      <>
        <Router history={history}>
          <RequetesServicePage
            match={{
              isExact: true,
              path: "",
              url: "",
              params: { idRequete: "req2" }
            }}
            history={history}
            location={history.location}
          />
        </Router>
      </>
    );

    expect(component).toMatchSnapshot();
  });
});
