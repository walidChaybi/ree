import { TRAITEMENT_GET_NOMENCLATURES } from "@api/traitements/RECEContext/TraitementGetNomenclatures";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";

describe("Test du traitement de récupération des nomenclatures", () => {
  const EN_COURS = "en-cours";
  const PAS_EN_COURS = "pas-en-cours";
  const LANCER = "lancer";

  const ComposantTest: React.FC = () => {
    const { lancerTraitement, traitementEnCours } = useTraitementApi(TRAITEMENT_GET_NOMENCLATURES);

    return (
      <div>
        <div>{traitementEnCours ? EN_COURS : PAS_EN_COURS}</div>
        <button
          type="button"
          onClick={() => lancerTraitement()}
        >
          {LANCER}
        </button>
      </div>
    );
  };

  test("Le traitement fonctionne correctement", async () => {
    render(<ComposantTest />);

    expect(screen.getByText(PAS_EN_COURS)).toBeDefined();

    fireEvent.click(screen.getByText(LANCER));

    expect(screen.getByText(EN_COURS)).toBeDefined();

    await waitFor(() => expect(screen.getByText(PAS_EN_COURS)).toBeDefined());
  });
});
