import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { BoutonsTerminerOuRelecture } from "../../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonsTerminerOuRelecture";
import { createTestingRouter, elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";
import { acte } from "../../../../../mock/data/ficheEtBandeau/ficheActe";
import { userDroitnonCOMEDEC } from "../../../../../mock/data/mockConnectedUserAvecDroit";
import { idRequeteRDCSC } from "../../../../../mock/data/requeteDelivrance";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idService: "11",
  type: TypeRequete.DELIVRANCE,
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_SIGNER,
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
  sousType: SousTypeDelivrance.RDD
} as IRequeteDelivrance;

describe("BoutonTerminerOuRelecture - ", () => {
  test("Render page avec boutons agent", () => {
    const router = createTestingRouter(
      [
        {
          path: "/test",
          element: (
            <BoutonsTerminerOuRelecture
              requete={{
                ...requeteTestCOURRIER,
                statutCourant: {
                  statut: StatutRequete.TRANSMISE_A_VALIDEUR,
                  dateEffet: 0
                }
              }}
              acte={acte}
            ></BoutonsTerminerOuRelecture>
          )
        },
        {
          path: "*",
          element: <></>
        }
      ],
      ["/test"]
    );

    const { getByText } = render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC));

    expect(getByText("Reprendre le traitement")).toBeDefined();
    expect(getByText("Relecture")).toBeDefined();
  });

  test("Render page avec boutons valideur", () => {
    const router = createTestingRouter(
      [
        {
          path: "/test",
          element: (
            <BoutonsTerminerOuRelecture
              requete={{
                ...requeteTestCOURRIER,
                sousType: SousTypeDelivrance.RDCSD,
                statutCourant: {
                  statut: StatutRequete.A_SIGNER,
                  dateEffet: 0
                }
              }}
              acte={acte}
            ></BoutonsTerminerOuRelecture>
          )
        },
        {
          path: "*",
          element: <></>
        }
      ],
      ["/test"]
    );

    const { getByText } = render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC));

    expect(getByText("Autres actions")).toBeDefined();
  });
});
