import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import ListesTypesMentionForm from "@pages/requeteMiseAJour/apercuRequete/contenu/MiseAJourMentions/form/ListesTypesMentionForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { MemoryRouter } from "react-router-dom";

const LISTE_TYPE_MENTION_NIVEAU_UN = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
const LISTE_TYPE_MENTION_NIVEAU_DEUX = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
const LISTE_TYPE_MENTION_NIVEAU_TROIS = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;

test("le composant DOIT etre rendu correctement QUAND le type et sous-type sont selectionné ", async () => {
  render(
    <MemoryRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <ListesTypesMentionForm
          nom={LISTES_TYPES_MENTION}
          natureActe={NatureActe.NAISSANCE}
        />
      </Formik>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)
    ).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN), {
    target: { value: "126ad458-fd77-4c8c-bd88-db0b818f7d91" }
  });

  await waitFor(() => {
    expect(
      screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)
    ).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX), {
    target: { value: "b03c0e14-bad0-40a7-a895-8169e2b7f38e" }
  });

  await waitFor(() => {
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)
    ).not.toBeInTheDocument();
  });
});

test("le composant DOIT etre rendu correctement QUAND le type, sous-type et le sous sous-type sont selectionné ", async () => {
  render(
    <MemoryRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <ListesTypesMentionForm
          nom={LISTES_TYPES_MENTION}
          natureActe={NatureActe.NAISSANCE}
        />
      </Formik>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)
    ).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN), {
    target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
  });

  await waitFor(() => {
    expect(
      screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)
    ).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX), {
    target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
  });

  await waitFor(() => {
    expect(
      screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS), {
    target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
  });

  await waitFor(() => {
    expect(
      screen.getByDisplayValue("2 Divorce/Séparation/Annulation mariage")
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(
        "2-1 & 2-2 divorce/séparation de corps en France"
      )
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("2-1 notarié")).toBeInTheDocument();
  });
});
