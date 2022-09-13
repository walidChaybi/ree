import { useGenerationCourrierHook } from "@hook/requete/GenerationCourrierHook";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idDocumentsReponse } from "../../../../../../mock/data/DocumentReponse";
import {
  OptionsChoisiesCourrier17,
  RequeteRDDCourrier17,
  SaisieCourrier17
} from "../../../../../../mock/data/SaisieCourrier";
import { configComposition } from "../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [
  configComposition[0],
  configEtatcivil[0],
  configRequetes[0]
]);

const saisieCourrier = SaisieCourrier17;
const requete = RequeteRDDCourrier17;
const optionsChoisies = OptionsChoisiesCourrier17;

const params = {
  saisieCourrier,
  optionsChoisies,
  requete,
  mettreAJourStatut: true
};

const HookConsummer: React.FC = () => {
  const res = useGenerationCourrierHook(params);

  return (
    <>
      <div data-testid="resulatIdDoc">
        {res?.idDocumentReponse && (
          <>{`idDocumentReponse=${res?.idDocumentReponse}`}</>
        )}
      </div>
    </>
  );
};

beforeAll(() => {
  DocumentDelivrance.init();
});

test("Attendu: la génération d'un courrier s'effectue correctement", async () => {
  render(<HookConsummer></HookConsummer>);
  const resulatIdDoc = screen.getByTestId("resulatIdDoc");

  await waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(
      `idDocumentReponse=${idDocumentsReponse[0]}`
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
