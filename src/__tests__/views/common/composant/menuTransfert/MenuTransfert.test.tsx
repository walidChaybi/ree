import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { idRequeteRDCSC, requeteRDCSC } from "@mock/data/requeteDelivrance";
import { requeteInformation } from "@mock/data/requeteInformation";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { ETypeService } from "@model/agent/enum/ETypeService";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe("Test MenuTransfert", () => {
  const listeUtilisateurs = [
    {
      service: { estDansScec: true, idService: "123" } as IService,
      prenom: "",
      nom: "str1",
      habilitations: [
        {
          profil: {
            droits: [{ nom: Droit.DELIVRER } as IDroit]
          } as IProfil
        } as IHabilitation
      ],
      idUtilisateur: "1234"
    } as IUtilisateur,
    {
      service: { estDansScec: true, idService: "1234" } as IService,
      prenom: "",
      nom: "str2",
      habilitations: [
        {
          profil: {
            droits: [{ nom: Droit.DELIVRER } as IDroit]
          } as IProfil
        } as IHabilitation
      ],
      idUtilisateur: "12345"
    } as IUtilisateur,
    {
      service: { estDansScec: true, idService: "1234" } as IService,
      prenom: "",
      nom: "str3",
      habilitations: [
        {
          profil: {
            droits: [{ nom: Droit.INFORMER_USAGER } as IDroit]
          } as IProfil
        } as IHabilitation
      ],
      idUtilisateur: "12345"
    } as IUtilisateur
  ];

  const listeServices = [
    {
      idService: "1234",
      type: ETypeService.BUREAU,
      code: "1234",
      libelleService: "str1",
      estDansScec: true
    },
    {
      idService: "12345",
      type: ETypeService.DEPARTEMENT,
      code: "12345",
      libelleService: "str2",
      estDansScec: true
    }
  ];

  const routerAvecContexte = (router: any, utilisateurs?: IUtilisateur[], services?: IService[]): any => {
    return (
      <MockRECEContextProvider
        utilisateurs={utilisateurs}
        services={services}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );
  };

  const afficheComposant = (utilisateurs?: IUtilisateur[], services?: IService[]) => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: (
            <MenuTransfert
              idRequete={requeteRDCSC.id}
              typeRequete={requeteRDCSC.type}
              idUtilisateurRequete="111"
              sousTypeRequete={requeteRDCSC.sousType}
              estTransfert={true}
            />
          )
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
    );

    render(routerAvecContexte(router, utilisateurs, services));
  };

  test("renders du bloc Menu Transfert ouvert", async () => {
    afficheComposant(listeUtilisateurs);

    await waitFor(() => {
      expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeTruthy();
    });

    const menuTransfert = screen.getByText("Transférer");
    const choixService = screen.getByText(/À un service+/);
    const choixOEC = screen.getByText(/À un officier de l'état civil+/);

    await waitFor(() => {
      expect(menuTransfert).toBeDefined();
      expect(choixService).toBeDefined();
      expect(choixOEC).toBeDefined();
    });
  });

  test("check popin service", async () => {
    afficheComposant(listeUtilisateurs);

    let choixService: HTMLElement;

    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);

    choixService = screen.getByText(/À un service+/);
    fireEvent.click(choixService);

    const valider: HTMLButtonElement = screen.getByText(/Valider+/);
    const annuler: HTMLButtonElement = screen.getByText(/Annuler+/);
    const title = screen.getByText(/Transfert à un service+/);

    await waitFor(() => {
      expect(valider).toBeDefined();
      expect(valider.disabled).toBeTruthy();
      expect(title).toBeDefined();
    });

    const autocomplete: HTMLInputElement = screen.getByTestId("optionChoisie");

    await waitFor(() => {
      expect(autocomplete).toBeDefined();
    });

    fireEvent.click(annuler);
  });

  test("check popin agent", async () => {
    afficheComposant(listeUtilisateurs);

    let choixService: HTMLElement;

    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);

    choixService = screen.getByText(/À un officier de l'état civil+/);
    fireEvent.click(choixService);

    const valider: HTMLButtonElement = screen.getByText(/Valider+/);
    const title = screen.getByText("Transfert à un officier de l'état civil");

    await waitFor(() => {
      expect(valider).toBeDefined();
      expect(valider.disabled).toBeTruthy();
      expect(title).toBeDefined();
    });

    const autocomplete: HTMLInputElement = screen.getByTestId("optionChoisie");

    await waitFor(() => {
      expect(autocomplete).toBeDefined();
    });
  });

  test("check autocomplete service", async () => {
    afficheComposant(undefined, listeServices);
    const menuTransfert = screen.getByText("Transférer");

    await waitFor(() => {
      expect(menuTransfert).toBeDefined();
    });

    fireEvent.click(menuTransfert);

    const choixService = screen.getByText(/À un service+/);
    await waitFor(() => {
      expect(choixService).toBeDefined();
    });

    fireEvent.click(choixService);

    const autocomplete = screen.getByTestId("optionChoisie");
    const inputChampRecherche: HTMLInputElement = screen.getByTestId("inputChampRecherche");

    await waitFor(() => {
      expect(autocomplete).toBeDefined();
      expect(inputChampRecherche).toBeDefined();
    });

    autocomplete.focus();

    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
    const str1 = screen.getByText("str1");

    await waitFor(() => {
      expect(str1).toBeDefined();
      expect(screen.getByText("str2")).toBeDefined();
    });

    fireEvent.click(str1);

    const valider: HTMLButtonElement = screen.getByText("Valider");

    await waitFor(() => {
      expect(inputChampRecherche.value).toStrictEqual("str1");
      expect(valider.disabled).toBeFalsy();
    });

    const reset = screen.getByTitle("Vider le champ");

    await waitFor(() => {
      expect(reset).toBeDefined();
    });

    fireEvent.click(reset);

    await waitFor(() => {
      expect(valider.disabled).toBeTruthy();
    });
  });

  test("check autocomplete agent", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: (
            <MenuTransfert
              idRequete={requeteRDCSC.id}
              typeRequete={requeteRDCSC.type}
              idUtilisateurRequete="111"
              sousTypeRequete={requeteRDCSC.sousType}
              estTransfert={true}
            />
          )
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <EspaceDelivrancePage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCSC)]
    );

    render(routerAvecContexte(router, listeUtilisateurs));

    const menuTransfert = screen.getByText("Transférer");

    await waitFor(() => {
      expect(menuTransfert).toBeDefined();
    });

    fireEvent.click(menuTransfert);

    const choixService = screen.getByText(/À un officier de l'état civil+/);

    await waitFor(() => {
      expect(choixService).toBeDefined();
    });

    fireEvent.click(choixService);

    const autocomplete = screen.getByTestId("optionChoisie");
    const inputChampRecherche: HTMLInputElement = screen.getByTestId("inputChampRecherche");

    await waitFor(() => {
      expect(autocomplete).toBeDefined();
      expect(inputChampRecherche).toBeDefined();
    });

    autocomplete.focus();
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });

    const str1 = screen.getByText("str1");
    await waitFor(() => {
      expect(str1).toBeDefined();
      expect(screen.getByText("str2")).toBeDefined();
    });

    fireEvent.click(str1);

    const valider: HTMLButtonElement = screen.getByText("Valider");

    await waitFor(() => {
      expect(inputChampRecherche.value).toStrictEqual("str1 ");
      expect(valider.disabled).toBeFalsy();
    });

    fireEvent.click(valider);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
    });
  });

  test("renders du bloc Menu Transfert fermer ", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: (
            <MenuTransfert
              idRequete={requeteInformation.id}
              typeRequete={requeteInformation.type}
              idUtilisateurRequete="111"
              sousTypeRequete={requeteInformation.sousType}
              estTransfert={true}
              menuFermer={false}
            />
          )
        },
        {
          path: URL_MES_REQUETES_INFORMATION,
          element: <EspaceInformationPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, requeteInformation.id)]
    );

    render(routerAvecContexte(router, listeUtilisateurs));

    let menuTransfert = screen.getByText("Transférer");

    await waitFor(() => {
      expect(menuTransfert).toBeDefined();
    });

    fireEvent.click(menuTransfert);

    let choixService = screen.getByText(/À un service+/);
    let choixOEC = screen.getByText(/À un officier de l'état civil+/);

    await waitFor(() => {
      expect(choixService).toBeDefined();
      expect(choixOEC).toBeDefined();
    });

    fireEvent.click(choixOEC);

    const autocomplete = screen.getByTestId("optionChoisie");
    const inputChampRecherche: HTMLInputElement = screen.getByTestId("inputChampRecherche");

    await waitFor(() => {
      expect(autocomplete).toBeDefined();
      expect(inputChampRecherche).toBeDefined();
    });

    autocomplete.focus();

    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });

    const OEC = screen.getByText("str3");

    await waitFor(() => {
      expect(OEC).toBeDefined();
    });

    fireEvent.click(OEC);

    const valider: HTMLButtonElement = screen.getByText("Valider");

    await waitFor(() => {
      expect(valider).toBeDefined();
    });

    fireEvent.click(valider);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
    });
  });
});
