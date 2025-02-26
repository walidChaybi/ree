import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { mappingOfficier } from "@model/agent/IOfficier";
import { IPerimetre } from "@model/agent/IPerimetre";
import { IService } from "@model/agent/IService";
import { IUtilisateur, mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { ETypeService } from "@model/agent/enum/ETypeService";
import { Perimetre } from "@model/agent/enum/Perimetre";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { RequetesServiceCreation } from "@pages/requeteCreation/espaceCreation/RequetesServiceCreation";
import { statutsRequetesCreation } from "@pages/requeteCreation/espaceCreation/params/EspaceCreationParams";
import { URL_REQUETES_CREATION_SERVICE, URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UN } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { act, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import IHabilitationDto from "../../../../../dto/etatcivil/agent/IHabilitationDto";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../mock/context/MockRECEContextProvider";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "../../../../mock/data/mockConnectedUserAvecDroit";

const utilisateurs = [
  {
    idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
    prenom: "Ashley",
    nom: "Young",
    trigramme: "Young Ashley",
    habilitations: [
      {
        idHabilitation: "123",
        profil: {
          droits: [{ nom: Droit.CREER_ACTE_ETABLI } as IDroit]
        } as IProfil,
        perimetre: {
          nom: Perimetre.TOUS_REGISTRES,
          listeIdTypeRegistre: ["meae"]
        } as IPerimetre
      } as IHabilitation
    ],
    service: {
      idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
      type: ETypeService.SECTION,
      code: "Assistance Informatique",
      libelleService: "BAG Assitance Informatique"
    } as IService
  } as IUtilisateur
] as IUtilisateur[];

const utilisateurConnecte = mappingOfficier(resultatHeaderUtilistateurLeBiannic, resultatRequeteUtilistateurLeBiannic.data);
utilisateurConnecte.habilitations = mapHabilitationsUtilisateur(
  resultatRequeteUtilistateurLeBiannic.data.habilitations as unknown as IHabilitationDto[]
);

const routerAvecContexte = (router: any): any => {
  return (
    <MockRECEContextProvider
      utilisateurConnecte={utilisateurConnecte}
      utilisateurs={utilisateurs}
    >
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const HookConsummer: React.FC = () => {
  const [popinAttribuerAOuvert, setPopinAttribuerAOuvert] = useState<boolean>(false);
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CREATION_SERVICE,
        element: (
          <RequetesServiceCreation
            queryParametersPourRequetes={queryParametersPourRequetes}
            popinAttribuerAOuvert={popinAttribuerAOuvert}
            setPopinAttribuerAOuvert={setPopinAttribuerAOuvert}
          />
        )
      },
      {
        path: getUrlWithParam(
          URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          "c9b817ca-1899-450e-9f04-979541946011"
        ),
        element: <></>
      }
    ],
    [URL_REQUETES_CREATION_SERVICE]
  );

  return routerAvecContexte(router);
};

test.skip("DOIT afficher le tableau des requêtes de service à vide QUAND on arrive sur la page", () => {
  render(<HookConsummer />);

  waitFor(() => {
    // Attendu: les titres des colonnes sont corrects
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getAllByText("Priorisation")[1]).toBeDefined();
    expect(screen.getByText("Postulant/Déclarant")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Attribuée à")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getAllByText("Statut")[1]).toBeDefined();

    // Attendu: les données sont présentes
    expect(screen.queryByText("B-2-8GRZFCS3P")).toBeNull();
    expect(screen.queryByText("YRQFLU")).toBeNull();
  });

  fireEvent.click(screen.getByTestId("loupeButton"));

  waitFor(() => {
    expect(screen.getByText("B-2-8GRZFCS3P")).toBeDefined();
    expect(screen.getByText("YRQFLU")).toBeDefined();
  });
});

test("DOIT effectuer correctement le tri sur les requêtes de service QUAND on tri par une colonne", () => {
  render(<HookConsummer />);

  expect(screen.getAllByText("Statut")[1]).toBeDefined();

  fireEvent.click(screen.getAllByText("Statut")[1]);

  expect(screen.getAllByText("Statut")[1]).toBeDefined();
});

test.skip("DOIT correctement afficher l'attribution des requêtes de service QUAND on clique sur attribuer à", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CREATION_SERVICE,
        element: <EspaceCreationPage selectedTab={UN} />
      }
    ],
    [URL_REQUETES_CREATION_SERVICE]
  );
  act(async () => {
    render(routerAvecContexte(router));
  });

  fireEvent.click(screen.getByTestId("loupeButton"));

  const getColonnesOfficierEtCheckbox = (requete: HTMLElement) => ({
    colonneOfficier: requete.childNodes.item(6) as HTMLElement,
    colonneCheckbox: requete.childNodes.item(7).firstChild?.firstChild?.firstChild as HTMLInputElement
  });

  expect(screen.getByTestId("c9b817ca-1899-450e-9f04-979541946011")).toBeDefined();
  expect(screen.getByTestId("54ddf213-d9b7-4747-8e92-68c220f66de3")).toBeDefined();

  const boutonAttribuerA = screen.getByText(/Attribuer à/i);
  const getPopinAttribution = (): HTMLElement | null => screen.queryByText(/Attribuer à un officier de l'état civil/i);
  const requeteAlpha = getColonnesOfficierEtCheckbox(screen.getByTestId("c9b817ca-1899-450e-9f04-979541946011"));
  const requeteBeta = getColonnesOfficierEtCheckbox(screen.getByTestId("54ddf213-d9b7-4747-8e92-68c220f66de3"));

  expect(boutonAttribuerA).toBeDefined();
  expect(getPopinAttribution()).not.toBeDefined();
  expect(requeteAlpha.colonneCheckbox.checked).not.toBeTruthy();
  expect(requeteBeta.colonneCheckbox.checked).not.toBeTruthy();

  fireEvent.click(requeteAlpha.colonneCheckbox);
  fireEvent.click(boutonAttribuerA);

  const boutonValider: HTMLInputElement = screen.getByText("Valider");

  expect(requeteAlpha.colonneCheckbox.checked).toBeTruthy();
  expect(requeteBeta.colonneCheckbox.checked).not.toBeTruthy();

  expect(getPopinAttribution()).toBeDefined();
  expect(boutonValider.disabled).toBeTruthy();

  const autocomplete = screen.getAllByTestId("autocomplete")[2];
  const champRecherche: HTMLInputElement = screen.getByLabelText("TransfertPopin");
  autocomplete.focus();

  fireEvent.change(champRecherche, {
    target: { value: "Y" }
  });

  const libelle: HTMLInputElement = screen.getByText("Young Ashley");

  expect(libelle.disabled).toBeTruthy();

  fireEvent.click(screen.getByText("Young Ashley"));
  fireEvent.click(screen.getByText("Valider"));

  expect(getPopinAttribution()).not.toBeDefined();
});

test.skip("DOIT rendre possible le click sur une requête", () => {
  render(<HookConsummer />);

  fireEvent.click(screen.getByTestId("loupeButton"));

  let requete: HTMLElement;

  waitFor(() => {
    expect(screen.getByText("B-2-8GRZFCS3P")).toBeDefined();
  });

  requete = screen.getByText("B-2-8GRZFCS3P");
  fireEvent.click(requete);
});

test("DOIT pouvoir rechercher une requete via son numero NATALi", () => {
  render(<HookConsummer />);

  const input = screen.getByPlaceholderText("Rechercher un dossier Natali");
  const boutonRechercher = screen.getByTestId("loupeButton");

  fireEvent.change(input, { target: { value: "2022X 200178" } });
  fireEvent.click(boutonRechercher);

  expect(screen.queryByText("B-2-8GRZFCS3P")).toBeNull();
  expect(screen.queryByText("YRQFLU")).toBeNull();
  expect(screen.queryByText("2022X 200178")).toBeNull();
});
