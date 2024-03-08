import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import ListesTypesMentionForm from "@pages/requeteMiseAJour/apercuRequete/contenu/MiseAJourMentions/form/ListesTypesMentionForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Formik } from "formik";
import { MemoryRouter } from "react-router-dom";

test("le composant DOIT etre rendu correctement QUAND le type et sous-type sont selectionné ", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Formik initialValues={{}} onSubmit={() => {}}>
          <ListesTypesMentionForm nom={LISTES_TYPES_MENTION} />
        </Formik>
      </MemoryRouter>
    );
  });

  const inputNiveauUn = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
  const inputNiveauDeux = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
  const inputNiveauTrois = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;

  expect(screen.queryByTestId(inputNiveauDeux)).toBeNull();
  expect(screen.queryByTestId(inputNiveauTrois)).toBeNull();

  fireEvent.change(screen.getByTestId(inputNiveauUn), {
    target: { value: "126ad458-fd77-4c8c-bd88-db0b818f7d91" }
  });

  expect(screen.queryByTestId(inputNiveauDeux)).toBeDefined();
  expect(screen.queryByTestId(inputNiveauTrois)).toBeNull();

  fireEvent.change(screen.getByTestId(inputNiveauDeux), {
    target: { value: "b03c0e14-bad0-40a7-a895-8169e2b7f38e" }
  });

  expect(screen.queryByTestId(inputNiveauTrois)).toBeNull();
});

test("le composant DOIT etre rendu correctement QUAND le type, sous-type et le sous sous-type sont selectionné ", async () => {
  render(
    <MemoryRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <ListesTypesMentionForm nom={LISTES_TYPES_MENTION} />
      </Formik>
    </MemoryRouter>
  );

  const inputNiveauUn = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
  const inputNiveauDeux = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
  const inputNiveauTrois = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;

  expect(screen.queryByTestId(inputNiveauDeux)).toBeNull();
  expect(screen.queryByTestId(inputNiveauTrois)).toBeNull();

  fireEvent.change(screen.getByTestId(inputNiveauUn), {
    target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
  });

  expect(screen.getByTestId(inputNiveauDeux)).toBeDefined();
  expect(screen.queryByTestId(inputNiveauTrois)).toBeNull();

  fireEvent.change(screen.getByTestId(inputNiveauDeux), {
    target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
  });

  expect(screen.queryByTestId(inputNiveauTrois)).toBeDefined();

  fireEvent.change(screen.getByTestId(inputNiveauTrois), {
    target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
  });

  await waitFor(() => {
    expect(
      screen.getByDisplayValue("2 Divorce/Séparation/Annulation mariage")
    ).toBeDefined();
    expect(
      screen.getByDisplayValue(
        "2-1 & 2-2 divorce/séparation de corps en France"
      )
    ).toBeDefined();
    expect(screen.getByDisplayValue("2-1 notarié")).toBeDefined();
  });
});
