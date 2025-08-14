import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import { BoutonTerminerApresImpression } from "../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonTerminerApresImpression";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION } from "../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import { idRequeteRDCSC } from "../../../../mock/data/requeteDelivrance";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idService: "11",
  sousType: SousTypeDelivrance.RDC,
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
  documentsReponses: [{ idRc: "123456789" }, { idRca: "123456789" }, { idPacs: "123456789" }]
} as IRequeteDelivrance;

const URL_APERCU_REQUETE = LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url, { idRequeteParam: "idRequete" });

test("est à A_VALIDER et provient de COURRIER", () => {
  const { getByText } = render(
    <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}>
      <MemoryRouter initialEntries={[URL_APERCU_REQUETE]}>
        <BoutonTerminerApresImpression requete={requeteTestCOURRIER}></BoutonTerminerApresImpression>
      </MemoryRouter>
    </MockRECEContextProvider>
  );

  const bouttonSigner = getByText(/Terminer après impression locale/i) as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonSigner.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonSigner);
});
