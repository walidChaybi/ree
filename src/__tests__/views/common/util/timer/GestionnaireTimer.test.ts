import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import { expect, test, vi } from "vitest";

function wait(ms: number) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

test("Attendu: le déclanchement d'un timer via l'objet gestionnaireTimer fonctionne correctement", () => {
  vi.useFakeTimers();
  let nbCalled = 0;
  const fctTest = function () {
    nbCalled++;
  };
  gestionnaireTimer.declencherTimer("testTimer", 0, false, fctTest);
  vi.runAllTimers();
  expect(nbCalled).toBe(1);
});

test("Attendu: l'annulation d'un timer via l'objet gestionnaireTimer fonctionne correctement", () => {
  vi.useFakeTimers();
  let nbCalled = 0;
  const fctTest = function () {
    nbCalled++;
    throw new Error("error");
  };

  gestionnaireTimer.declencherTimer("testTimer2", 0, true, fctTest);
  gestionnaireTimer.annuleTimer("testTimer2");
  vi.runAllTimers();
  expect(nbCalled).toBe(0);
});
