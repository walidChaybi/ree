import TRAITEMENT_CHARGER_REQUETE_ET_ACTE from "@api/traitements/requeteDelivrance/edition/TraitementChargerRequeteEtActe";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import request from "superagent";
import { afterAll, describe, expect, test } from "vitest";
import useTraitementApi from "../../../../../hooks/api/TraitementApiHook";

describe("Test du traitement chargement requête et acte édition délivrance", () => {
  const donneesTest = {
    LANCER: "lancer",
    ETAT: "etat",
    REQUETE: "requete",
    ACTE: "acte",
    ID_REQUETE_DOC: "id-requete-avec-doc",
    ID_REQUETE_SANS_DOC: "id-requete-sans-doc",
    ID_ACTE: "id-acte",
    OK: "ok",
    KO: "ko",
    NON_LANCE: "non-lance"
  };

  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: "http://localhost/rece/(rece-requete-api/v2/requetes|rece-etatcivil-api/v1/acte)/(.*)",
      fixtures: (match: any) => {
        switch (match[2]) {
          case donneesTest.ID_REQUETE_DOC:
            return {
              data: {
                id: "id-requete",
                documentsReponses: [{ idActe: donneesTest.ID_ACTE }],
                statut: {},
                titulaires: [],
                requerant: {},
                actions: []
              }
            };
          case donneesTest.ID_REQUETE_SANS_DOC:
            return {
              data: {
                id: "id-requete",
                statut: {},
                titulaires: [],
                requerant: {},
                actions: []
              }
            };
          case `${donneesTest.ID_ACTE}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true`:
            return { data: { id: "id-acte", personnes: [], titulaires: [] } };
          default:
            return;
        }
      },
      get: (_: any, data: any) => ({
        body: data
      })
    }
  ]);

  const TraitementConsumer: React.FC<{
    chargement: "les-deux" | "requete" | "acte";
    idRequete: string;
    idActe?: string;
    sansParam?: boolean;
  }> = ({ chargement, idRequete, idActe, sansParam = false }) => {
    const { lancerTraitement } = useTraitementApi(TRAITEMENT_CHARGER_REQUETE_ET_ACTE);
    const [etatRequeteActe, setEtatRequeteActe] = useState({
      lance: donneesTest.NON_LANCE,
      requete: donneesTest.NON_LANCE,
      acte: donneesTest.NON_LANCE
    });

    return (
      <div>
        <div title={donneesTest.ETAT}>{etatRequeteActe.lance}</div>
        <div title={donneesTest.REQUETE}>{etatRequeteActe.requete}</div>
        <div title={donneesTest.ACTE}>{etatRequeteActe.acte}</div>
        <button
          type="button"
          title={donneesTest.LANCER}
          onClick={() =>
            lancerTraitement({
              ...(sansParam ? {} : { parametres: { idRequete: idRequete, idActe: idActe, chargement: chargement } }),
              apresSucces: resultat =>
                setEtatRequeteActe({
                  lance: donneesTest.OK,
                  requete: resultat.requete ? donneesTest.OK : donneesTest.KO,
                  acte: resultat.acte ? donneesTest.OK : donneesTest.KO
                })
            })
          }
        ></button>
      </div>
    );
  };

  test("Le traitement sans paramètre ne fait rien", async () => {
    render(
      <MockRECEContextProvider>
        <TraitementConsumer
          chargement="les-deux"
          idRequete={donneesTest.ID_REQUETE_DOC}
          sansParam
        />
      </MockRECEContextProvider>
    );

    expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.NON_LANCE);
    fireEvent.click(screen.getByTitle(donneesTest.LANCER));
    await waitFor(() => expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.OK));
    expect(screen.getByTitle(donneesTest.REQUETE).innerHTML).toBe(donneesTest.KO);
    expect(screen.getByTitle(donneesTest.ACTE).innerHTML).toBe(donneesTest.KO);
  });

  test("Le traitement charge la requête et l'acte depuis les documents requête", async () => {
    render(
      <MockRECEContextProvider>
        <TraitementConsumer
          chargement="les-deux"
          idRequete={donneesTest.ID_REQUETE_DOC}
        />
      </MockRECEContextProvider>
    );

    fireEvent.click(screen.getByTitle(donneesTest.LANCER));
    await waitFor(() => expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.OK));
    expect(screen.getByTitle(donneesTest.REQUETE).innerHTML).toBe(donneesTest.OK);
    expect(screen.getByTitle(donneesTest.ACTE).innerHTML).toBe(donneesTest.OK);
  });

  test("Le traitement charge la requête et non l'acte sans id connu", async () => {
    render(
      <MockRECEContextProvider>
        <TraitementConsumer
          chargement="les-deux"
          idRequete={donneesTest.ID_REQUETE_SANS_DOC}
        />
      </MockRECEContextProvider>
    );

    fireEvent.click(screen.getByTitle(donneesTest.LANCER));
    await waitFor(() => expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.OK));
    expect(screen.getByTitle(donneesTest.REQUETE).innerHTML).toBe(donneesTest.OK);
    expect(screen.getByTitle(donneesTest.ACTE).innerHTML).toBe(donneesTest.KO);
  });

  test("Le traitement charge uniquement la requête", async () => {
    render(
      <MockRECEContextProvider>
        <TraitementConsumer
          chargement="requete"
          idRequete={donneesTest.ID_REQUETE_DOC}
        />
      </MockRECEContextProvider>
    );

    fireEvent.click(screen.getByTitle(donneesTest.LANCER));
    await waitFor(() => expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.OK));
    expect(screen.getByTitle(donneesTest.REQUETE).innerHTML).toBe(donneesTest.OK);
    expect(screen.getByTitle(donneesTest.ACTE).innerHTML).toBe(donneesTest.KO);
  });

  test("Le traitement charge uniquement l'acte", async () => {
    render(
      <MockRECEContextProvider>
        <TraitementConsumer
          chargement="acte"
          idRequete={donneesTest.ID_REQUETE_DOC}
          idActe={donneesTest.ID_ACTE}
        />
      </MockRECEContextProvider>
    );

    fireEvent.click(screen.getByTitle(donneesTest.LANCER));
    await waitFor(() => expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.OK));
    expect(screen.getByTitle(donneesTest.REQUETE).innerHTML).toBe(donneesTest.KO);
    expect(screen.getByTitle(donneesTest.ACTE).innerHTML).toBe(donneesTest.OK);
  });

  test("Le traitement ne charge pas l'acte si pas d'id", async () => {
    render(
      <MockRECEContextProvider>
        <TraitementConsumer
          chargement="acte"
          idRequete={donneesTest.ID_REQUETE_DOC}
        />
      </MockRECEContextProvider>
    );

    fireEvent.click(screen.getByTitle(donneesTest.LANCER));
    await waitFor(() => expect(screen.getByTitle(donneesTest.ETAT).innerHTML).toBe(donneesTest.OK));
    expect(screen.getByTitle(donneesTest.REQUETE).innerHTML).toBe(donneesTest.KO);
    expect(screen.getByTitle(donneesTest.ACTE).innerHTML).toBe(donneesTest.KO);
  });

  afterAll(() => {
    superagentMock.unset();
  });
});
