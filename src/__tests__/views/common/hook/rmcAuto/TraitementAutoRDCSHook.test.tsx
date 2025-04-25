import {
  ITraitementAutoRDCSParams,
  estEligibleAuTraitementAutoRDCS,
  useTraitementAutoRDCSHook
} from "@hook/rmcAuto/TraitementAutoRDCSHook";
import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { userDroitCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { requeteRDCSC, requeteRDCSCCertificatSituationRCA } from "@mock/data/requeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import {
  ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import React from "react";
import { RouterProvider } from "react-router";
import request from "superagent";
import { describe, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";

describe("Test TraitementAutoRDCSHook", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  const traitementAutoRDCSParams: ITraitementAutoRDCSParams = {
    requete: {
      idRequete: "34da88e2-c5c7-4324-ac8e-b35193352e64",
      sousType: SousTypeDelivrance.RDCSC.libelle,
      document: "d08e2228-1a02-478f-939e-db5dd5ac6999",
      titulaires: [{ nom: "George" }],
      requerant: { id: "idRequerant", dateCreation: new Date(), qualiteRequerant: { qualite: Qualite.UTILISATEUR_RECE } }
    } as IRequeteTableauDelivrance,
    urlCourante: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "34da88e2-c5c7-4324-ac8e-b35193352e64"),
    dataRMCAutoActe: [],
    dataRMCAutoInscription: []
  };

  const HookTraitementAutoApercuRequete: React.FC = () => {
    useTraitementAutoRDCSHook(traitementAutoRDCSParams);
    return <div>Échec !</div>;
  };

  require("superagent-mock")(request, [
    {
      pattern: `http://localhost/rece/rece-requete-api/v2/requetes/delivrance/34da88e2-c5c7-4324-ac8e-b35193352e64/document`,

      fixtures: function (match: any) {
        if (match) {
          return { data: "OK" };
        }
      },

      patch: function (_: any, data: any) {
        return {
          body: { data: ["123456"] }
        };
      }
    }
  ]);

  test('Test useRMCAutoHook : redirection à partir de "Apercu Requêtes (prise en charge)"', async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: elementAvecContexte(<HookTraitementAutoApercuRequete />, userDroitCOMEDEC)
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
          element: <div>Succès !</div>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID.replace(ID, traitementAutoRDCSParams.requete.idRequete)]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Succès !")).toBeDefined();
    });
  });
});

describe("Test fonctions utiles", () => {
  test("QUAND une des conditions n'est pas remplie (ex: NATIONALITE = FRANCAISE) DOIT retourner false", () => {
    const result = estEligibleAuTraitementAutoRDCS(requeteRDCSC);

    expect(result).toBeFalsy();
  });

  test("QUAND la requête est éligible DOIT retourner true", () => {
    const result = estEligibleAuTraitementAutoRDCS(requeteRDCSCCertificatSituationRCA);

    expect(result).toBeTruthy();
  });
});
