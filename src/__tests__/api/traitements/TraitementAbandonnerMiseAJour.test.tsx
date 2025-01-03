import TRAITEMENT_ABANDONNER_MISE_A_JOUR from "@api/traitements/TraitementAbandonnerMiseAJour";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useTraitementApi from "../../../hooks/api/TraitementApiHook";

describe("Test du traitement Abondon d'une requête de mise à jour", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const EN_COURS = "en-cours";
  const PAS_EN_COURS = "pas-en-cours";
  const BOUTON_SANS_PARAM_ACTE = "sans-param-acte";
  const BOUTON_SANS_PARAM_REQUETE = "sans-param-requete";
  const BOUTON_SANS_AM_ENREGISTREE = "sans-am-enregistree";
  const BOUTON_AVEC_AM_ENREGISTREE = "avec-am-enregistree";
  const BOUTON_AVEC_MENTIONS_ENREGISTREE = "avec-mentions-enregistree";

  const ComposantTest = () => {
    const { lancerTraitement, traitementEnCours } = useTraitementApi(TRAITEMENT_ABANDONNER_MISE_A_JOUR);

    return (
      <>
        <div>{traitementEnCours ? EN_COURS : PAS_EN_COURS}</div>

        <button
          type="button"
          onClick={() =>
            lancerTraitement({ parametres: { idActe: "", idRequete: "test", miseAJourEffectuee: false, estMiseAJourAvecMentions: false } })
          }
        >
          {BOUTON_SANS_PARAM_ACTE}
        </button>

        <button
          type="button"
          onClick={() =>
            lancerTraitement({ parametres: { idActe: "test", idRequete: "", miseAJourEffectuee: false, estMiseAJourAvecMentions: false } })
          }
        >
          {BOUTON_SANS_PARAM_REQUETE}
        </button>

        <button
          type="button"
          onClick={() =>
            lancerTraitement({
              parametres: {
                idActe: "test-id-acte",
                idRequete: "test-id-requete",
                miseAJourEffectuee: false,
                estMiseAJourAvecMentions: false
              }
            })
          }
        >
          {BOUTON_SANS_AM_ENREGISTREE}
        </button>

        <button
          type="button"
          onClick={() =>
            lancerTraitement({
              parametres: {
                idActe: "test-id-acte",
                idRequete: "test-id-requete",
                miseAJourEffectuee: true,
                estMiseAJourAvecMentions: false
              }
            })
          }
        >
          {BOUTON_AVEC_AM_ENREGISTREE}
        </button>

        <button
          type="button"
          onClick={() =>
            lancerTraitement({
              parametres: {
                idActe: "test-id-acte",
                idRequete: "test-id-requete",
                miseAJourEffectuee: true,
                estMiseAJourAvecMentions: true
              }
            })
          }
        >
          {BOUTON_AVEC_MENTIONS_ENREGISTREE}
        </button>
      </>
    );
  };

  test("Le traitement fonctionne correctement", async () => {
    render(<ComposantTest />);

    expect(screen.getByText(PAS_EN_COURS)).toBeDefined();

    fireEvent.click(screen.getByText(BOUTON_SANS_PARAM_ACTE));
    expect(screen.getByText(PAS_EN_COURS)).toBeDefined();

    fireEvent.click(screen.getByText(BOUTON_SANS_PARAM_REQUETE));
    expect(screen.getByText(PAS_EN_COURS)).toBeDefined();

    fireEvent.click(screen.getByText(BOUTON_SANS_AM_ENREGISTREE));
    expect(screen.getByText(EN_COURS)).toBeDefined();
    await waitFor(() => {
      expect(screen.getByText(PAS_EN_COURS)).toBeDefined();
    });

    fireEvent.click(screen.getByText(BOUTON_AVEC_AM_ENREGISTREE));
    expect(screen.getByText(EN_COURS)).toBeDefined();
    await waitFor(() => {
      expect(screen.getByText(PAS_EN_COURS)).toBeDefined();
    });

    fireEvent.click(screen.getByText(BOUTON_AVEC_MENTIONS_ENREGISTREE));
    await waitFor(() => {
      expect(screen.getByText(PAS_EN_COURS)).toBeDefined();
    });
  });
});
