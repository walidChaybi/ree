import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useRMCAutoPersonneApiHook } from "@pages/rechercheMultiCriteres/autoPersonne/hook/RMCAutoPersonneApiHook";
import { mappingRequeteCreation } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { requeteCreationTranscription } from "../../../../mock/data/requeteCreationTranscription";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

afterAll(() => {
  superagentMock.unset();
});

interface HookConsumerRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerRMCAutoPersonne: React.FC<
  HookConsumerRMCAutoPersonneProps
> = props => {
  const { resultatRMCAutoPersonne } = useRMCAutoPersonneApiHook(props.requete);

  return (
    <>
      {resultatRMCAutoPersonne && resultatRMCAutoPersonne.length && (
        <>
          <div data-testid="test-rmc-requete-alpha">
            {resultatRMCAutoPersonne[0].idPersonne}
          </div>
          <div data-testid="test-rmc-requete-beta">
            {resultatRMCAutoPersonne[2].idPersonne}
          </div>
          <div data-testid="test-rmc-requete-delta">
            {resultatRMCAutoPersonne[7].idPersonne}
          </div>
        </>
      )}
    </>
  );
};

describe("Test du custom hook useRMCAutoPersonneApiHook", () => {
  test("DOIT obtenir un resultat de la part du web service", async () => {
    const requete = mappingRequeteCreation(requeteCreationTranscription);
    await act(async () => {
      render(<HookConsumerRMCAutoPersonne requete={requete} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("test-rmc-requete-alpha").textContent).toEqual(
        "e7114c54-d00d-48ad-bbee-af2b01e2da7a"
      );
      expect(screen.getByTestId("test-rmc-requete-beta").textContent).toEqual(
        "e7114c54-d00d-48ad-bbee-af2b01e2da7b"
      );
      expect(screen.getByTestId("test-rmc-requete-delta").textContent).toEqual(
        "e7114c54-d00d-48ad-bbee-af2b01e2da7d"
      );
    });
  });
});
