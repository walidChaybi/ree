import { CONFIG_GET_MODELE_TEXTE } from "@api/configurations/etatCivil/acte/transcription/GetModeleTexteConfigApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PartieGaucheSaisieProjet from "../../../../../composants/pages/requetesConsulaire/saisieProjet/PartieGaucheSaisieProjet";

describe("PartieGaucheSaisieProjet - Tests du composant", () => {
  test("Doit afficher correctement le composant", async () => {
    MockApi.deployer(CONFIG_GET_MODELE_TEXTE);

    const { container } = render(
      <MockRECEContextProvider>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={mappingRequeteCreation(requeteCreationTranscription)}
          mettreAJourDonneesContext={vi.fn()}
        >
          <PartieGaucheSaisieProjet estModeConsultation={true} />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    expect(container.firstChild).toMatchSnapshot();
    MockApi.stopMock();
  });
});
