import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IRMCAutoPersonneParams, useRMCAutoPersonneApiAvecCacheHook } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { describe, expect, test } from "vitest";
import { requeteCreationTranscription } from "../../../../mock/data/requeteCreationTranscription";

interface HookConsumerRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerRMCAutoPersonne: React.FC<HookConsumerRMCAutoPersonneProps> = props => {
  const [rmcAutoPersonneParams, setRmcAutoPersonneParams] = useState<IRMCAutoPersonneParams>();
  const resultatRMCAutoPersonne = useRMCAutoPersonneApiAvecCacheHook(rmcAutoPersonneParams);

  useEffect(() => {
    if (props.requete) {
      const titulaire = getPostulantNationaliteOuTitulaireActeTranscritDresse(props.requete);
      if (titulaire) {
        setRmcAutoPersonneParams(mapTitulaireVersRMCAutoPersonneParams(titulaire));
      }
    }
  }, [props.requete]);

  return (
    <>
      {resultatRMCAutoPersonne && resultatRMCAutoPersonne.length && (
        <>
          <div data-testid="test-rmc-requete-alpha">{resultatRMCAutoPersonne[0].personne.idPersonne}</div>
        </>
      )}
    </>
  );
};

describe("Test du custom hook useRMCAutoPersonneApiAvecCacheHook", () => {
  test("DOIT obtenir un resultat de la part du web service", () => {
    const requete = mappingRequeteCreation(requeteCreationTranscription);

    render(<HookConsumerRMCAutoPersonne requete={requete} />);

    waitFor(() => {
      expect(screen.getByTestId("test-rmc-requete-alpha").textContent).toEqual("e7114c54-d00d-48ad-bbee-af2b01e2da7d");
    });
  });
});
