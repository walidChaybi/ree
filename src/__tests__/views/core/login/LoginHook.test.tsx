import { setProfilsOfficier, useLoginApi } from "@core/login/LoginHook";
import { render } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, expect, test } from "vitest";

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { officierDataState } = useLoginApi();
  return (
    <div data-testid={officierDataState?.idSSO}>
      {`${officierDataState?.nom} ${officierDataState?.prenom}`}
      <div>{`${officierDataState?.habilitations[0].profil.droits[0].idDroit}`}</div>
    </div>
  );
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

test("monter un composant de test pour vérifier que tout va bien", () => {
  render(<HookConsummer />);
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
});

test("setProfilsOfficier", () => {
  expect(setProfilsOfficier("BEUH\\NOIX")).toStrictEqual(["BEUH\\NOIX"]);
});


