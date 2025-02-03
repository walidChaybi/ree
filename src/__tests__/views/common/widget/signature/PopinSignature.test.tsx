import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { PopinSignature } from "@widget/signature/PopinSignature";
import { afterEach, expect, test, vi } from "vitest";

afterEach(() => {
  // Réactivation de la log après chaque test (certains tests la désactive car les erreurs logguées sont normales)
  storeRece.logErrorDesactive = false;
});

test("DOIT render de la PopinSignature avec succès", () => {
  render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={() => {}}
      onSuccesSignature={() => {}}
      titre="Titre Popin"
      texte="Texte Popin"
      documentASigner={""}
      etatTraitementSignature={{ termine: false }}
    />
  );
  expect(screen.getByText("Titre Popin")).toBeDefined();
  expect(screen.getByText("Texte Popin")).toBeDefined();
});

test("DOIT appeller la methode de succès QUAND la signature se fait avec succès", () => {
  storeRece.logErrorDesactive = true;
  const onSuccesSignatureMock = vi.fn();

  render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={() => {}}
      onSuccesSignature={onSuccesSignatureMock}
      titre="Cette Popin est ouverte"
      documentASigner={""}
      etatTraitementSignature={{ termine: false }}
    />
  );

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreur: null
        }
      },
      { EventType: "CustomEvent" }
    )
  );

  expect(onSuccesSignatureMock).toHaveBeenCalled();
});

test("DOIT afficher un message d'erreur QUAND la signature échoue", () => {
  storeRece.logErrorDesactive = true;
  const onSuccesSignatureMock = vi.fn();

  const { getByText } = render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={() => {}}
      onSuccesSignature={onSuccesSignatureMock}
      titre={""}
      documentASigner={""}
      etatTraitementSignature={{ termine: false }}
    />
  );

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreur: {
            code: "FONC_3",
            libelle: "Code PIN invalide"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );

  const errorMsg = getByText("Code PIN invalide");
  expect(errorMsg).toBeDefined();
  expect(onSuccesSignatureMock).not.toHaveBeenCalled();

  storeRece.logErrorDesactive = false;
});

test("DOIT fermer la popin QUAND le bouton Annuler est cliqué", () => {
  const setEstOuvertMock = vi.fn();

  render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={setEstOuvertMock}
      onSuccesSignature={() => {}}
      titre={""}
      documentASigner={""}
      etatTraitementSignature={{ termine: false }}
    />
  );

  fireEvent.click(screen.getByText("Annuler"));

  expect(setEstOuvertMock).toHaveBeenCalledWith(false);
});
