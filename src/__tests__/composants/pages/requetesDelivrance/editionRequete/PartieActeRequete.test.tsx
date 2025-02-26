import { IUtilisateur } from "@model/agent/IUtilisateur";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PartieActeRequete from "../../../../../composants/pages/requetesDelivrance/editionRequete/partieActeRequete/PartieActeRequete";
import EditionDelivranceContextProvider from "../../../../../contexts/EditionDelivranceContextProvider";
import MockRECEContextProvider from "../../../../mock/context/MockRECEContextProvider";
import { TYPE_ALERTE } from "../../../../mock/data/NomenclatureTypeAlerte";

describe("PartieActeRequete", () => {
  TypeAlerte.init(TYPE_ALERTE);

  const idActe = "b41079a5-9e8f-478a-b04c-c4c2ac671123";
  const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";

  const mockedUseNavigate = vi.fn();
  vi.mock("react-router-dom", async () => {
    const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate
    };
  });

  test("Affiche les deux onglets lorsque les deux id existent", async () => {
    render(
      <MockRECEContextProvider utilisateurs={[{} as IUtilisateur]}>
        <EditionDelivranceContextProvider
          idRequeteParam={idRequete}
          idActeParam={idActe}
        >
          <PartieActeRequete
            ongletActif={""}
            setOngletActif={() => {}}
          />
        </EditionDelivranceContextProvider>
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Acte registre")).toBeDefined();
      expect(screen.getByText("Requête")).toBeDefined();
    });
  });

  test("N'affiche rien si l'id requete n'existe pas", async () => {
    render(
      <EditionDelivranceContextProvider
        idRequeteParam={""}
        idActeParam={idActe}
      >
        <PartieActeRequete
          ongletActif={""}
          setOngletActif={() => {}}
        />
      </EditionDelivranceContextProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Acte registre")).toBeNull();
      expect(screen.queryByText("Requête")).toBeNull();
    });
  });

  test("change l'onglet actif lors du clic sur un autre onglet", async () => {
    render(
      <MockRECEContextProvider utilisateurs={[{} as IUtilisateur]}>
        <EditionDelivranceContextProvider
          idRequeteParam={idRequete}
          idActeParam={idActe}
        >
          <PartieActeRequete
            ongletActif={""}
            setOngletActif={() => {}}
          />
        </EditionDelivranceContextProvider>
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Acte registre").classList.contains("onglet-actif")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Requête"));
    expect(screen.getByText("Requête").classList.contains("onglet-actif")).toBeDefined();
  });
});
