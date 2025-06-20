import { act, fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ListeMentionsFormulaire from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/ListeMentionsFormulaire/ListeMentionsFormulaire";

import { EEventState } from "../../../../../../hooks/EventHook";

describe("Test du formulaire ListeMentionsFormulaire. (intégration avec événements)", () => {
  const setDonneesMentions = vi.fn();
  const setAfficherAnalyseMarginale = vi.fn();
  const setMotif = vi.fn();

  const renderListeMentionsFormulaire = async () => {
    let rendered: ReturnType<typeof render>;
    await act(async () => {
      rendered = render(
        <ListeMentionsFormulaire
          setDonneesMentions={setDonneesMentions}
          setAfficherAnalyseMarginale={setAfficherAnalyseMarginale}
          setMotif={setMotif}
        />
      );
    });

    return rendered!;
  };

  const renderSnapshot = async (): Promise<ChildNode | null> => {
    const { container } = await renderListeMentionsFormulaire();
    return container.firstChild;
  };

  test("Doit afficher le formulaire avec les valeurs par défaut et correspondre au snapshot", async () => {
    const snapshot = await renderSnapshot();
    expect(snapshot).toMatchSnapshot();
  });

  test("Doit appeler les fonctions de mise à jour avec les bonnes données à la soumission", async () => {
    const { container } = await renderListeMentionsFormulaire();

    const eventAjoutMention = new CustomEvent(EEventState.ENREGISTRER_MENTION, {
      detail: {
        index: null,
        mention: {
          idTypeMention: "idMention1",
          texte: "Mention 1",
          affecteAnalyseMarginale: false
        }
      }
    });

    fireEvent(document, eventAjoutMention);

    expect(container.firstChild).toMatchSnapshot();

    expect(setDonneesMentions).toHaveBeenCalledTimes(0);
    expect(setAfficherAnalyseMarginale).toHaveBeenCalled();
    expect(setMotif).toHaveBeenCalled();

    const form = container.querySelector("form");

    await act(async () => {
      fireEvent.submit(form!);
    });

    expect(setDonneesMentions).toHaveBeenCalledTimes(2);

    const valeursEnvoyee = setDonneesMentions.mock.calls[0][0];

    expect(valeursEnvoyee).toMatchObject([
      {
        idTypeMention: "idMention1",
        texte: "Mention 1.",
        affecteAnalyseMarginale: false
      }
    ]);
  });
});
