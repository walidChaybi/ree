import { MandataireRc } from "@model/etatcivil/enum/MandataireRc";
import { getPanelsRc } from "@pages/fiche/hook/constructionComposants/rcrca/FicheRcUtils";
import { waitFor } from "@testing-library/react";
import request from "superagent";
import mockRC from "../../../../../mock/data/RC.json";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

test("ficheUtils rc works", async () => {
  const panels = getPanelsRc(mockRC.data);
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(5);
  expect(panels.panels[0].title).toBe("Visualisation du RC");
});

test("peupleMandataireRc", async () => {
  await MandataireRc.init();
  const mandataires = MandataireRc.getAllEnumsAsOptions();
  await waitFor(() => {
    expect(mandataires).toBeDefined();
    expect(mandataires).toHaveLength(4);
  });
});

afterAll(() => {
  superagentMock.unset();
});
