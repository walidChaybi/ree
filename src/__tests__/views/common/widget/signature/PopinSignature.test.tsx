import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { PopinSignature } from "@widget/signature/PopinSignature";

test("DOIT render de la PopinSignature avec succès", () => {
  render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={() => {}}
      onSuccesSignature={() => {}}
      titre="Titre Popin"
      texte="Texte Popin"
    />
  );
  expect(screen.getByText("Titre Popin")).toBeInTheDocument();
  expect(screen.getByText("Texte Popin")).toBeInTheDocument();
});

test("DOIT appeller la methode de succès QUAND la signature se fait avec succès", () => {
  storeRece.logErrorOff = true;
  const onSuccesSignatureMock = jest.fn();

  render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={() => {}}
      onSuccesSignature={onSuccesSignatureMock}
      titre="Cette Popin est ouverte"
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
  storeRece.logErrorOff = true;
  const onSuccesSignatureMock = jest.fn();

  const { getByText } = render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={() => {}}
      onSuccesSignature={onSuccesSignatureMock}
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

  storeRece.logErrorOff = false;
});

test("DOIT fermer la popin QUAND le bouton Annuler est cliqué", () => {
  const setEstOuvertMock = jest.fn();

  render(
    <PopinSignature
      estOuvert={true}
      setEstOuvert={setEstOuvertMock}
      onSuccesSignature={() => {}}
    />
  );

  fireEvent.click(screen.getByText("Annuler"));

  expect(setEstOuvertMock).toHaveBeenCalledWith(false);
});
