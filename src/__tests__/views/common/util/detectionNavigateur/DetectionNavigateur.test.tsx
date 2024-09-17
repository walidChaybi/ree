import { render } from "@testing-library/react";
import {
  CHROME,
  FIREFOX,
  SeulementNavigateur
} from "@util/detectionNavigateur/DetectionNavigateur";
import { describe, expect, test } from "vitest";

describe("Test détection du navigateur", () => {
  test("Attendu: la détection du browser FIREFOX s'effectue correctement", () => {
    const navigator = { userAgent: "Firefox xxxx" };

    Object.defineProperty(window, "navigator", {
      value: navigator,
      writable: true
    });

    const { getByText } = render(
      <SeulementNavigateur navigateurs={[FIREFOX]}>
        Navigateur Firefox
      </SeulementNavigateur>
    );

    expect(getByText("Navigateur Firefox")).toBeDefined();
  });

  test("Attendu: la détection d'un browser non FIREFOX s'effectue correctement", () => {
    const navigator = { userAgent: "Fake" };

    Object.defineProperty(window, "navigator", {
      value: navigator,
      writable: true
    });

    const { getByText } = render(
      <SeulementNavigateur navigateurs={[FIREFOX]}>
        Navigateur Firefox
      </SeulementNavigateur>
    );

    expect(getByText(/Navigateur non autorisé/)).toBeDefined();
  });

  test("Attendu: la détection du browser FIREFOX ou CHROME s'effectue correctement", () => {
    const navigator = { userAgent: "Chrome xxxx" };

    Object.defineProperty(window, "navigator", {
      value: navigator,
      writable: true
    });

    const { getByText } = render(
      <SeulementNavigateur navigateurs={[FIREFOX, CHROME]}>
        Navigateur Firefox
      </SeulementNavigateur>
    );

    expect(getByText("Navigateur Firefox")).toBeDefined();
  });

  test("Attendu: la détection d'un browser autre que FIREFOX ou CHROME s'effectue correctement", () => {
    const navigator = { userAgent: "Fake" };

    Object.defineProperty(window, "navigator", {
      value: navigator,
      writable: true
    });

    const { getByText } = render(
      <SeulementNavigateur navigateurs={[FIREFOX, CHROME]}>
        Navigateur Firefox
      </SeulementNavigateur>
    );

    expect(getByText(/Navigateur non autorisé/)).toBeDefined();
  });
});
