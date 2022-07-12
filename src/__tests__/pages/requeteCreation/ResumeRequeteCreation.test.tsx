import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { requeteCreationSansRequerantAvecInfosSpecifiquesEtInformationsTitulaireEtUnEnfantMajeur } from "../../../mock/data/requeteCreation";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import ResumeRequeteCreation from "../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/components/ResumeRequeteCreation";
import {
  INFOS,
  resume as Labels
} from "../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/Labels";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/mappingIRequeteCreationVersResumeRequeteCreationProps";
import { mappingRequeteCreation } from "../../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
const superagentMock = require("superagent-mock")(request, configRequetes);

const renduResumeRequeteCreation = async () => {
  await act(async () => {
    render(
      <ResumeRequeteCreation
        {...mappingIRequeteCreationVersResumeRequeteCreationProps(
          mappingRequeteCreation(
            requeteCreationSansRequerantAvecInfosSpecifiquesEtInformationsTitulaireEtUnEnfantMajeur
          )
        )}
      />
    );
  });
};

test("Attendu: La requête doit contenir un et un seul titulaire postulant, obligatoirement", async () => {
  await renduResumeRequeteCreation();

  const itemTitulaire = screen.queryAllByText(
    Labels.titulaire
  ) as HTMLDivElement[];

  await waitFor(() => expect(itemTitulaire.length).toBe(1));
  await waitFor(() => expect(itemTitulaire[0]).toBeInTheDocument());
});

test(`Attendu: Les titulaires famille de types X ont un bloc par X existant, et sont numérotés dans le titre ("X 1", "X 2", "X 3"...)`, async () => {
  await renduResumeRequeteCreation();

  const itemEffetCollectif1 = screen.queryByText(
    `${Labels.effetCollectif} 1`
  ) as HTMLDivElement;
  const itemEffetCollectif2 = screen.queryByText(
    `${Labels.effetCollectif} 2`
  ) as HTMLDivElement;
  const itemEnfantMajeur = screen.queryByText(
    Labels.enfant.majeur
  ) as HTMLDivElement;

  await waitFor(() => expect(itemEffetCollectif1).toBeInTheDocument());
  await waitFor(() => expect(itemEffetCollectif2).toBeInTheDocument());
  await waitFor(() => expect(itemEnfantMajeur).toBeInTheDocument());
});

test(`Attendu: Si une valeur est undefined / vide / null, la ligne correspondante n'est pas affichée`, async () => {
  await renduResumeRequeteCreation();

  const itemInstitutionnel = screen.queryByText(
    Labels.institutionnel
  ) as HTMLDivElement;

  await waitFor(() => expect(itemInstitutionnel).not.toBeInTheDocument());
});

test("Attendu: les onglets informations spécifiques / requérant / informations (titulaire) / enfant majeur / fraterie sont fermés par défaut", async () => {
  await renduResumeRequeteCreation();

  const itemInfosSpecifiques = screen.getByText(
    Labels.infos.specifiques
  ) as HTMLDivElement;
  const itemsInformations = screen.getAllByText(INFOS) as HTMLDivElement[];
  const itemsEnfantMajeur = screen.getAllByText(
    Labels.enfant.majeur
  ) as HTMLDivElement[];

  await waitFor(() => {
    expect(itemInfosSpecifiques.classList.contains("Mui-expanded")).toBeFalsy();
    itemsInformations.forEach(itemInformations =>
      expect(itemInformations.classList.contains("Mui-expanded")).toBeFalsy()
    );
    itemsEnfantMajeur.forEach(itemEnfantMajeur =>
      expect(itemEnfantMajeur.classList.contains("Mui-expanded")).toBeFalsy()
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
