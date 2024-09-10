import {
  FenetreDocumentReponse,
  onClose
} from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/document/FenetreDocumentReponse";
import { render, waitFor } from "@testing-library/react";
import { beforeAll, expect, test, vi } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

test.skip("renders Fenetre Document réponse fonctionne correctement", () => {
  const toggle = vi.fn();

  render(
    <FenetreDocumentReponse
      toggleFenetre={toggle}
      nom="Journal d'Anne Franck"
      numRequete="69"
    />
  );

  waitFor(() => {
    expect(toggle).not.toHaveBeenCalled();
  });
});

test("onClose", () => {
  const toggleFenetre = vi.fn();
  onClose({
    nom: "string",
    numRequete: "string",
    toggleFenetre
  });
  expect(toggleFenetre).toHaveBeenCalledTimes(1);
});


