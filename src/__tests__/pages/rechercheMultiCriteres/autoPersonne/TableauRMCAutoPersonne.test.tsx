import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import {
    IRMCAutoPersonneParams,
    useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TableauRMCAutoPersonne } from "@pages/rechercheMultiCriteres/autoPersonne/TableauRMCAutoPersonne";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { requeteCreationTranscription } from "../../../../mock/data/requeteCreation";



interface HookConsumerTableauRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerTableauRMCAutoPersonne: React.FC<
  HookConsumerTableauRMCAutoPersonneProps
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

  return <TableauRMCAutoPersonne data={resultatRMCAutoPersonne ?? []} />;
};

test("Attendu: L'affichage du tableau de la RMC Personne s'affiche correctement.", async () => {
  const requete = mappingRequeteCreation(requeteCreationTranscription);
  await act(async () => {
    render(<HookConsumerTableauRMCAutoPersonne requete={requete} />);
  });

  await waitFor(() => {
    // Colonnes tableau
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Autres noms")).toBeInTheDocument();
    expect(screen.getByText("Prénoms")).toBeInTheDocument();
    expect(screen.getByText("Sexe")).toBeInTheDocument();
    expect(screen.getByText("Date de naissance")).toBeInTheDocument();
    expect(screen.getByText("Lieu de naissance")).toBeInTheDocument();
    expect(screen.getByText("Nature")).toBeInTheDocument();
    expect(screen.getByText("Référence")).toBeInTheDocument();
    expect(screen.getByText("Statut / Type")).toBeInTheDocument();

    // Données tableau
    expect(screen.getAllByText("Philips")).toBeDefined();
    expect(screen.getByText("PHILIPS")).toBeInTheDocument();
    expect(screen.getAllByText("Yann")).toBeDefined();
    expect(screen.getAllByText("M")).toBeDefined();
    expect(screen.getAllByText("13/04/1980")).toBeDefined();
    expect(screen.getAllByText("Barcelone (Espagne)")).toBeDefined();
    expect(screen.getAllByText("Naissance")).toBeDefined();
    expect(screen.getByText("PACS - 2011 - 1234580")).toBeInTheDocument();
    expect(screen.getByText("PACS - 2021 - 1234581")).toBeInTheDocument();
    expect(screen.getByText("RC - 2020 - 10")).toBeInTheDocument();
    expect(screen.getByText("RC - 2020 - 11")).toBeInTheDocument();
    expect(screen.getByText("RCA - 2020 - 4010")).toBeInTheDocument();
    expect(screen.getByText("ACQ.X.1951.1.681ABC")).toBeInTheDocument();
    expect(screen.getAllByText("Inscription")).toBeDefined();
    expect(screen.getAllByText("Validé")).toBeDefined();
  });
});
