import { IPersonnesSauvegardeesParams, usePersonnesSauvegardeesApiHook } from "@hook/personnes/PersonnesSauvegardeesApiHook";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import request from "superagent";
import { afterAll, describe, expect, test } from "vitest";
import { requeteCreationTranscription } from "../../../../mock/data/requeteCreationTranscription";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

afterAll(() => {
  superagentMock.unset();
});

interface HookConsumerPersonnesSauvegardeesProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerPersonnesSauvegardees: React.FC<HookConsumerPersonnesSauvegardeesProps> = props => {
  const [personnesSauvegardeesParams, setPersonnesSauvegardeesParams] = useState<IPersonnesSauvegardeesParams>();
  const resultatPersonnesSauvegardees = usePersonnesSauvegardeesApiHook(personnesSauvegardeesParams);

  useEffect(() => {
    setPersonnesSauvegardeesParams({
      idPersonnes: props.requete.personnesSauvegardees.map(personne => personne.idPersonne)
    });
  }, [props.requete]);

  return (
    <>
      {resultatPersonnesSauvegardees?.length && (
        <>
          <div data-testid="test-personne-sauvegardee-alpha">
            <span>{resultatPersonnesSauvegardees[0].idPersonne}</span>
          </div>
          <div data-testid="test-personne-sauvegardee-beta">
            <span>{resultatPersonnesSauvegardees[1].idPersonne}</span>
          </div>
        </>
      )}
    </>
  );
};

describe("Test du custom hook useRMCAutoPersonneApiAvecCacheHook", () => {
  test("DOIT obtenir un resultat de la part du web service", () => {
    const requete = mappingRequeteCreation(requeteCreationTranscription);
    render(<HookConsumerPersonnesSauvegardees requete={requete} />);

    waitFor(() => {
      expect(screen.getByTestId("test-personne-sauvegardee-alpha").textContent).toEqual("e7114c54-d00d-48ad-bbee-af2b01e2da7a");
      expect(screen.getByTestId("test-personne-sauvegardee-beta").textContent).toEqual("e7114c54-d00d-48ad-bbee-af2b01e2da7c");
    });
  });
});
