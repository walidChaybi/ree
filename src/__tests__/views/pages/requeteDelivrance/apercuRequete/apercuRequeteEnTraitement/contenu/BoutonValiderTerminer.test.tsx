import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { idRequeteRDCSC } from "@mock/data/requeteDelivrance";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { BoutonValiderTerminer } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/contenu/BoutonValiderTerminer";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import {
  createTestingRouter,
  elementAvecContexte
} from "../../../../../../__tests__utils__/testsUtil";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idService: "11",
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_VALIDER,
    dateEffet: 1577923200000
  },
  idUtilisateur: "idUtilisateurConnectedUser",
  provenanceRequete: { provenance: Provenance.COURRIER },
  titulaires: [
    {
      id: "0",
      position: 0,
      nationalite: Nationalite.FRANCAISE,
      nomNaissance: "Garcia",
      prenoms: [
        {
          prenom: "Hugo",
          numeroOrdre: 1
        }
      ],
      jourNaissance: 31,
      moisNaissance: 12,
      anneeNaissance: 1981,
      sexe: Sexe.MASCULIN.libelle
    }
  ],
  documentsReponses: [
    { idRc: "123456789" },
    { idRca: "123456789" },
    { idPacs: "123456789" }
  ]
} as IRequeteDelivrance;

test("est à A_VALIDER et provient de COURRIER", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        element: (
          <BoutonValiderTerminer
            requete={requeteTestCOURRIER}
          ></BoutonValiderTerminer>
        )
      },
      {
        path: "*",
        element: <></>
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const bouttonSigner = screen.getByText(
    /Valider et terminer/i
  ) as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonSigner.disabled).toBeFalsy();
  });
});
