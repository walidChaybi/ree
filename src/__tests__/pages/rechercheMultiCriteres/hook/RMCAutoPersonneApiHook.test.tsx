import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import {
    IRMCAutoPersonneParams,
    useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { act, render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { requeteCreationTranscription } from "../../../../mock/data/requeteCreationTranscription";



interface HookConsumerRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerRMCAutoPersonne: React.FC<
  HookConsumerRMCAutoPersonneProps
> = props => {
  const [rmcAutoPersonneParams, setRmcAutoPersonneParams] =
    useState<IRMCAutoPersonneParams>();
  const resultatRMCAutoPersonne = useRMCAutoPersonneApiAvecCacheHook(
    rmcAutoPersonneParams
  );

  useEffect(() => {
    if (props.requete) {
      const titulaire = getPostulantNationaliteOuTitulaireActeTranscritDresse(
        props.requete
      );
      if (titulaire) {
        setRmcAutoPersonneParams(
          mapTitulaireVersRMCAutoPersonneParams(titulaire)
        );
      }
    }
  }, [props.requete]);

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

describe("Test du custom hook useRMCAutoPersonneApiAvecCacheHook", () => {
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
