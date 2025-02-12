import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocMentions from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisirProjet/BlocMentions";
describe("BlocMentions", () => {
  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          mentions: { mentions: "" }
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <BlocMentions />
      </Formik>
    );
  };

  describe("Tests d'affichage initial", () => {
    test("Doit afficher le formulaires des autres mentions", () => {
      renderComponent();
      // Vérification des titres
      expect(screen.getByText("Mention(s)")).toBeDefined();
    });
  });

  describe("Tests de saisie des informations de mention", () => {
    test("doit gérer la saisie du texte", async () => {
      renderComponent();
      expect(screen.getByText("Mention(s)")).toBeDefined();
      const mentionsTextArea: HTMLTextAreaElement = screen.getByLabelText("Mention(s)");
      expect(mentionsTextArea).toBeDefined();
      fireEvent.change(mentionsTextArea, {
        target: {
          value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut libero ullamcorper, vulputate nibh in, porttitor justo. Pellentesque ut mollis nisl. Vivamus eget laoreet tortor, ut ultricies augue. Fusce et nulla eu tellus suscipit pharetra."
        }
      });
      await waitFor(() =>
        expect(mentionsTextArea.value).toBe(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut libero ullamcorper, vulputate nibh in, porttitor justo. Pellentesque ut mollis nisl. Vivamus eget laoreet tortor, ut ultricies augue. Fusce et nulla eu tellus suscipit pharetra."
        )
      );
    });

    test("Doit gérer la saisie de taille maximum", async () => {
      renderComponent();
      expect(screen.getByText("Mention(s)")).toBeDefined();
      const mentionsTextArea: HTMLTextAreaElement = screen.getByLabelText("Mention(s)");
      expect(mentionsTextArea).toBeDefined();
      fireEvent.change(mentionsTextArea, { target: { value: "x".repeat(3100) } });
      await waitFor(() => expect(mentionsTextArea.value).toHaveLength(3000));
    });
  });
});
