import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import MiseAJourForm from "@model/form/miseAJour/MiseAJourForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import ChampTexte from "../../../../../../composants/commun/champs/ChampTexte";
import { IMentionMiseAJour } from "../../../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import TableauMentions from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/TableauMentions";
import { EditionMiseAJourContext, IEditionMiseAJourContext } from "../../../../../../contexts/EditionMiseAJourContextProvider";
import { createTestingRouter, elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";

describe("Test AnalyseMarginaleForm", () => {
  TypeMention.init(TYPE_MENTION);
  const MockPartieFormulaire = ({
    mentions,
    motif = "",
    miseAJourEffectuee = false
  }: {
    mentions: IMentionMiseAJour[];
    motif?: string;
    miseAJourEffectuee?: boolean;
  }) => {
    return (
      <Formik<MiseAJourForm>
        onSubmit={() => {}}
        initialValues={MiseAJourForm.depuisFormulaire({
          mentions: [],
          analyseMarginale: {
            nom: "PRODESK",
            nomSecable: false,
            nomPartie1: "",
            nomPartie2: "",
            prenoms: { prenom1: "Elodie", prenom2: "Margaux", prenom3: "Sara" },
            motif: motif
          }
        })}
      >
        {({ setFieldValue }) => (
          <>
            <TableauMentions setAfficherOngletAnalyseMarginale={() => {}} />

            <ChampTexte
              className="champs-motif"
              name="analyseMarginale.motif"
              libelle="Motif"
              type="text"
            />
            <button
              onClick={() => {
                setFieldValue("mentions", mentions);
              }}
            >
              Ajouter Mention
            </button>
          </>
        )}
      </Formik>
    );
  };

  const avecContexteMiseAJour = ({
    mentions,
    motif = "",
    miseAJourEffectuee = false
  }: {
    mentions: IMentionMiseAJour[];
    motif?: string;
    miseAJourEffectuee?: boolean;
  }) =>
    createTestingRouter(
      [
        {
          path: "/",
          element: elementAvecContexte(
            <EditionMiseAJourContext.Valeurs.Provider value={{ miseAJourEffectuee: miseAJourEffectuee } as IEditionMiseAJourContext}>
              <MockPartieFormulaire
                mentions={mentions}
                motif={motif}
                miseAJourEffectuee={miseAJourEffectuee}
              />
            </EditionMiseAJourContext.Valeurs.Provider>
          )
        }
      ],
      ["/"]
    );

  const mentionAffectantAM: IMentionMiseAJour = {
    texte: "",
    idTypeMention: "9371400b-2a08-4dc6-8b11-fdb4eb118413",
    affecteAnalyseMarginale: true
  };

  test("QUAND une mention affectant l'analyse marginale est saisie ALORS le motif comprend le numéro de mention", async () => {
    render(
      <RouterProvider
        router={avecContexteMiseAJour({
          mentions: [mentionAffectantAM],
          motif: "ne pas afficher",
          miseAJourEffectuee: false
        })}
      />
    );

    await userEvent.click(screen.getByText<HTMLButtonElement>("Ajouter Mention"));

    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>("textbox", { name: /analyseMarginale.motif/i }).value).toStrictEqual(
        `Suite à apposition de mention ${TypeMention.getTypeMentionById(mentionAffectantAM.idTypeMention)?.libelle.split(" ")[0]}`
      );
    });
  });

  test("QUAND deux mentions affectant l'analyse marginale sont saisies ALORS le motif est vide", async () => {
    render(
      <RouterProvider
        router={avecContexteMiseAJour({
          mentions: [mentionAffectantAM, mentionAffectantAM],
          motif: "ne pas afficher",
          miseAJourEffectuee: false
        })}
      />
    );

    await userEvent.click(screen.getByText<HTMLButtonElement>("Ajouter Mention"));

    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>("textbox", { name: /analyseMarginale.motif/i }).value).toStrictEqual("");
    });
  });

  test("QUAND une mention affectant l'analyse marginale est modifiée après avoir mis à jour ALORS le motif ne change pas", async () => {
    render(
      <RouterProvider router={avecContexteMiseAJour({ mentions: [mentionAffectantAM], motif: "à afficher", miseAJourEffectuee: true })} />
    );

    await userEvent.click(screen.getByText<HTMLButtonElement>("Ajouter Mention"));

    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>("textbox", { name: /analyseMarginale.motif/i }).value).toStrictEqual("à afficher");
    });
  });
});
