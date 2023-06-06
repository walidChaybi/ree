import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

const REQUETE = mappingRequeteCreation(requeteCreationTranscription);

function TestHook() {
  const {
    resultatRMCAutoPersonne,
    dataActesInscriptionsSelectionnes,
    dataPersonnesSelectionnees
  } = useDataTableauxOngletRMCPersonne(REQUETE);

  return (
    <>
      {resultatRMCAutoPersonne &&
        resultatRMCAutoPersonne.map((resultat, idxPersonne) => (
          <div key={idxPersonne}>
            <div
              key={`personne-${idxPersonne}`}
              data-testid={`personneRMC-${idxPersonne}`}
            >
              {resultat.personne.idPersonne}
            </div>
            {resultat.actesInscriptions.map(
              (acteInscription, idxActeInscription) => (
                <div
                  key={`personne-${idxActeInscription}`}
                  data-testid={`acteInscriptionRMC-${idxPersonne}-${idxActeInscription}`}
                >
                  {acteInscription.idActeInscription}
                </div>
              )
            )}
          </div>
        ))}
      {dataPersonnesSelectionnees &&
        dataPersonnesSelectionnees.map((data, idxPersonne) => (
          <div
            key={`personneSelectionnee-${idxPersonne}`}
            data-testid={`personneSelectionnee-${idxPersonne}`}
          >
            {data.idPersonne}
          </div>
        ))}
      {dataActesInscriptionsSelectionnes &&
        dataActesInscriptionsSelectionnes.map((data, idxActeInscription) => (
          <div
            key={`acteInscriptionSelectionne-${idxActeInscription}`}
            data-testid={`acteInscriptionSelectionne-${idxActeInscription}`}
          >
            {data.idActeInscription}
          </div>
        ))}
    </>
  );
}

describe("Test le fonctionnement du hook récupérant les données nécessaires pour l'onglet RMC.", () => {
  test("DOIT exécuter une RMC AUTO Personne sur le titulaire de la requête.", async () => {
    render(<TestHook />);

    await waitFor(() => {
      expect(screen.getByTestId("personneRMC-0").textContent).toBe(
        "e7114c54-d00d-48ad-bbee-af2b01e2da7d"
      );
      expect(screen.getByTestId("acteInscriptionRMC-0-0").textContent).toBe(
        "89c9d030-26h7-41d3-bdde-8b4dcc0420da"
      );
    })
  });

  test("DOIT récupérer les personnes sauvegardees.", async () => {
    render(<TestHook />);

    await waitFor(() => {
      expect(screen.getByTestId("personneSelectionnee-0").textContent).toBe(
        "e7114c54-d00d-48ad-bbee-af2b01e2da7a"
      );
      expect(screen.getByTestId("personneSelectionnee-1").textContent).toBe(
        "e7114c54-d00d-48ad-bbee-af2b01e2da7c"
      );
    })
  });

  test("DOIT récupérer les actes ou inscriptions sauvegardes.", async () => {
    render(<TestHook />);

    await waitFor(() => {
      expect(screen.getByTestId("acteInscriptionSelectionne-0").textContent).toBe(
        "c8cbe885-fbd7-4d35-af99-10c827b0238b"
      );
      expect(screen.getByTestId("acteInscriptionSelectionne-1").textContent).toBe(
        "747cd416-fcf5-4490-b540-59a89b7f5123"
      );
    })
  });
});
