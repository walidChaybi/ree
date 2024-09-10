import { useGenerationCourrierHook } from "@hook/requete/GenerationCourrierHook";
import { idDocumentsReponse } from "@mock/data/DocumentReponse";
import {
  OptionsChoisiesCourrier17,
  RequeteRDDCourrier17,
  SaisieCourrier17
} from "@mock/data/SaisieCourrier";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

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

test("Attendu: la génération d'un courrier s'effectue correctement", () => {
  render(<HookConsummer></HookConsummer>);
  const resulatIdDoc = screen.getByTestId("resulatIdDoc");

  waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(
      `idDocumentReponse=${idDocumentsReponse[0]}`
    );
  });
});
