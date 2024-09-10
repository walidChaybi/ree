import { render, screen, waitFor } from "@testing-library/react";
import {
  CHROME,
  FIREFOX,
  SeulementNavigateur
} from "@util/detectionNavigateur/DetectionNavigateur";
import { expect, test } from "vitest";

test("Attendu: la détection du browser FIREFOX s'effectue correctement", () => {
  const navigator = { userAgent: "Firefox xxxx" };

  Object.defineProperty(window, "navigator", {
    value: navigator,
    writable: true
  });
  render(
    <SeulementNavigateur navigateurs={[FIREFOX]}>
      Navigateur Firefox
    </SeulementNavigateur>
  );
  waitFor(() => {
    expect(screen.getByText("Navigateur Firefox")).toBeDefined();
  });
});

test("Attendu: la détection d'un browser non FIREFOX s'effectue correctement", () => {
  const navigator = { userAgent: "Fake" };

  Object.defineProperty(window, "navigator", {
    value: navigator,
    writable: true
  });

  render(
    <SeulementNavigateur navigateurs={[FIREFOX]}>
      Navigateur Firefox
    </SeulementNavigateur>
  );
  waitFor(() => {
    expect(screen.getByText(/Navigateur non autorisé/)).toBeDefined();
  });
});

test("Attendu: la détection du browser FIREFOX ou CHROME s'effectue correctement", () => {
  const navigator = { userAgent: "Chrome xxxx" };

  Object.defineProperty(window, "navigator", {
    value: navigator,
    writable: true
  });
  render(
    <SeulementNavigateur navigateurs={[FIREFOX, CHROME]}>
      Navigateur Firefox
    </SeulementNavigateur>
  );
  waitFor(() => {
    expect(screen.getByText("Navigateur Firefox")).toBeDefined();
  });
});

test("Attendu: la détection d'un browser autre que FIREFOX ou CHROME s'effectue correctement", () => {
  const navigator = { userAgent: "Fake" };

  Object.defineProperty(window, "navigator", {
    value: navigator,
    writable: true
  });
  render(
    <SeulementNavigateur navigateurs={[FIREFOX, CHROME]}>
      Navigateur Firefox
    </SeulementNavigateur>
  );
  waitFor(() => {
    expect(screen.getByText(/Navigateur non autorisé/)).toBeDefined();
  });
});
