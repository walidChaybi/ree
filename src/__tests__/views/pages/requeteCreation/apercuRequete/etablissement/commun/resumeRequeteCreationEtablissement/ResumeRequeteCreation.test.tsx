import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import ResumeRequeteCreationEtablissement from "@pages/requeteCreation/apercuRequete/etablissement/commun/resumeRequeteCreationEtablissement/ResumeRequeteCreationEtablissement";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "@pages/requeteCreation/apercuRequete/etablissement/commun/resumeRequeteCreationEtablissement/mappingIRequeteCreationVersResumeRequeteCreationProps";
import { INFOS, resume as Labels } from "@pages/requeteCreation/commun/Labels";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { requeteCreationSansRequerantAvecInfosSpecifiquesEtInformationsTitulaireEtUnEnfantMajeur } from "../../../../../../../mock/data/requeteCreation";
const renduResumeRequeteCreation = () => {
  render(
    <ResumeRequeteCreationEtablissement
      {...mappingIRequeteCreationVersResumeRequeteCreationProps(
        mappingRequeteCreation(requeteCreationSansRequerantAvecInfosSpecifiquesEtInformationsTitulaireEtUnEnfantMajeur)
      )}
    />
  );
};

test("Attendu: La requête doit contenir un et un seul titulaire postulant, obligatoirement", () => {
  renduResumeRequeteCreation();

  const itemTitulaire = screen.queryAllByText(Labels.titulaire) as HTMLDivElement[];

  waitFor(() => {
    expect(itemTitulaire.length).toBe(1);
    expect(itemTitulaire[0]).toBeDefined();
  });
});

test(`Attendu: Les titulaires famille de types X ont un bloc par X existant, et sont numérotés dans le titre ("X 1", "X 2", "X 3"...)`, () => {
  renduResumeRequeteCreation();

  const itemEffetCollectif1 = screen.queryByText(`${Labels.enfantMineurAttenteSDANF} 1`) as HTMLDivElement;
  const itemEffetCollectif2 = screen.queryByText(`${Labels.enfantMineurAttenteSDANF} 2`) as HTMLDivElement;
  const itemEnfantMajeur = screen.queryByText(Labels.enfant.majeur) as HTMLDivElement;

  waitFor(() => {
    expect(itemEffetCollectif1).toBeDefined();
    expect(itemEffetCollectif2).toBeDefined();
    expect(itemEnfantMajeur).toBeDefined();
  });
});

test(`Attendu: Si une valeur est undefined / vide / null, la ligne correspondante n'est pas affichée`, () => {
  renduResumeRequeteCreation();

  const itemInstitutionnel = screen.queryByText(Labels.institutionnel) as HTMLDivElement;

  waitFor(() => expect(itemInstitutionnel).toBeNull());
});

test("Attendu: les onglets informations spécifiques / requérant / informations (titulaire) / enfant majeur / fraterie sont fermés par défaut", () => {
  renduResumeRequeteCreation();

  const itemInfosSpecifiques = screen.getByText(Labels.infos.specifiques) as HTMLDivElement;
  const itemsInformations = screen.getAllByText(INFOS) as HTMLDivElement[];
  const itemsEnfantMajeur = screen.getAllByText(Labels.enfant.majeur) as HTMLDivElement[];

  waitFor(() => {
    expect(itemInfosSpecifiques.classList.contains("Mui-expanded")).toBeFalsy();
    itemsInformations.forEach(itemInformations => expect(itemInformations.classList.contains("Mui-expanded")).toBeFalsy());
    itemsEnfantMajeur.forEach(itemEnfantMajeur => expect(itemEnfantMajeur.classList.contains("Mui-expanded")).toBeFalsy());
  });
});

test("l'onglet 'Informations spécifiques' DOIT afficher l'onglet 'historique SCEC/SDANF' QUAND il y a des actions associés a la requete ", () => {
  renduResumeRequeteCreation();

  const itemHistoriqueScecSdanf = screen.getByText(Labels.historique.scecSdanf) as HTMLDivElement;

  fireEvent.click(itemHistoriqueScecSdanf);

  waitFor(() => {
    expect(screen.getByText("A traiter - 06/07/2022 - Daniel Antoine")).toBeDefined();
    expect(screen.getByText("A Transmettre - 06/07/2022")).toBeDefined();
  });
});
