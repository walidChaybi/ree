import { TRAITEMENT_GET_DONNEES_CONTEXT } from "@api/traitements/RECEContext/TraitementGetDonneesContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import request from "superagent";
import { afterAll, describe, expect, test } from "vitest";
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";

describe("Test du traitement de récupération des données du context RECE", () => {
  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: "http://localhost/rece/rece-agent-api/v1(.*)",
      fixtures: (match: any) => {
        switch (match[1]) {
          case "/utilisateurs/all?lite=false&range=0-100":
            return { data: [{ idUtilisateur: "test-id-utilisateur" }] };
          case "/utilisateurs/all?lite=false&range=1-100":
            return { data: [{ idUtilisateur: "test-id-utilisateur-2" }] };
          case "/service/all?range=0-100":
            return { data: [{ idService: "test-id-service" }] };
          case "/service/all?range=1-100":
            return { data: [{ idService: "test-id-service-2" }] };
          default:
            return;
        }
      },
      get: (match: any, data: any) => {
        return {
          body: data,
          header: {
            link: (match[1] ?? "").includes("0-100") ? 'rel="next"' : ""
          }
        };
      }
    }
  ]);

  const EN_COURS = "en-cours";
  const PAS_EN_COURS = "pas-en-cours";
  const LANCER = "lancer";

  const ComposantTest: React.FC = () => {
    const { lancerTraitement, traitementEnCours } = useTraitementApi(TRAITEMENT_GET_DONNEES_CONTEXT);

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

  test("Le traitement s'effectue correctement", async () => {
    render(<ComposantTest />);

    expect(screen.getByText(PAS_EN_COURS)).toBeDefined();

    fireEvent.click(screen.getByText(LANCER));

    expect(screen.getByText(EN_COURS)).toBeDefined();

    await waitFor(() => expect(screen.getByText(PAS_EN_COURS)).toBeDefined());
  });

  afterAll(() => {
    superagentMock.unset();
  });
});
