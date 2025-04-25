import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import ListesTypesMentionForm from "@pages/requeteMiseAJour/apercuRequete/contenu/MiseAJourMentions/form/ListesTypesMentionForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { NATURE_MENTION } from "../../../../../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../../../../../mock/data/NomenclatureTypeMention";

describe("Test ListeTypeMentionsForm", () => {
  const LISTE_TYPE_MENTION_NIVEAU_UN = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
  const LISTE_TYPE_MENTION_NIVEAU_DEUX = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
  const LISTE_TYPE_MENTION_NIVEAU_TROIS = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;

  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  test("le composant DOIT etre rendu correctement QUAND le type et sous-type sont selectionné ", async () => {
    render(
      <MemoryRouter>
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
        >
          <ListesTypesMentionForm
            nom={LISTES_TYPES_MENTION}
            natureActe={NatureActe.NAISSANCE}
          />
        </Formik>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN)).toBeDefined();
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)).toBeNull();
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeNull();
    });

    fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN), {
      target: { value: "126ad458-fd77-4c8c-bd88-db0b818f7d91" }
    });

    await waitFor(() => {
      expect(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)).toBeDefined();
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeNull();
    });

    fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX), {
      target: { value: "b03c0e14-bad0-40a7-a895-8169e2b7f38e" }
    });

    await waitFor(() => {
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeNull();
    });
  });

  test("le composant DOIT etre rendu correctement QUAND le type, sous-type et le sous sous-type sont selectionné ", async () => {
    render(
      <MemoryRouter>
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
        >
          <ListesTypesMentionForm
            nom={LISTES_TYPES_MENTION}
            natureActe={NatureActe.NAISSANCE}
          />
        </Formik>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)).toBeNull();
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeNull();
    });

    fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN), {
      target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
    });

    await waitFor(() => {
      expect(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)).toBeDefined();
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeNull();
    });

    fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX), {
      target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
    });

    await waitFor(() => {
      expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeDefined();
    });

    fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS), {
      target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("2 Divorce/Séparation/Annulation mariage")).toBeDefined();
      expect(screen.getByDisplayValue("2-1 & 2-2 divorce/séparation de corps en France")).toBeDefined();
      expect(screen.getByDisplayValue("2-1 notarié")).toBeDefined();
    });
  });
});
