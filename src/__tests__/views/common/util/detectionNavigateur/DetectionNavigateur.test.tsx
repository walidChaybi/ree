import { render, screen, waitFor } from "@testing-library/react";
import {
  CHROME,
  FIREFOX,
  SeulementNavigateur
} from "@util/detectionNavigateur/DetectionNavigateur";

test("Attendu: la détection du browser FIREFOX s'effectue correctement", async () => {
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
  await waitFor(() => {
    expect(screen.getByText("Navigateur Firefox")).toBeInTheDocument();
  });
});

test("Attendu: la détection d'un browser non FIREFOX s'effectue correctement", async () => {
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
  await waitFor(() => {
    expect(screen.getByText(/Navigateur non autorisé/)).toBeInTheDocument();
  });
});

test("Attendu: la détection du browser FIREFOX ou CHROME s'effectue correctement", async () => {
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
  await waitFor(() => {
    expect(screen.getByText("Navigateur Firefox")).toBeInTheDocument();
  });
});

test("Attendu: la détection d'un browser autre que FIREFOX ou CHROME s'effectue correctement", async () => {
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
  await waitFor(() => {
    expect(screen.getByText(/Navigateur non autorisé/)).toBeInTheDocument();
  });
});
