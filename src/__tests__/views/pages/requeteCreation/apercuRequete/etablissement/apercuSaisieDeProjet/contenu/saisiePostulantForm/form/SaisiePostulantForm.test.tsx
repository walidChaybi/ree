import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { SaisiePostulantForm } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/SaisiePostulantForm";
import { mappingTitulairesVersFormulairePostulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DEUX, UN, ZERO } from "@util/Utils";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../../../../../../mock/context/MockRECEContextProvider";
import { DOCUMENT_DELIVRANCE } from "../../../../../../../../../mock/data/NomenclatureDocumentDelivrance";
import { PAYS_SECABILITE } from "../../../../../../../../../mock/data/NomenclaturePaysSecabilite";
import { TYPE_PIECE_JUSTIFICATIVE } from "../../../../../../../../../mock/data/NomenclatureTypePieceJustificative";
import { requeteCreationEtablissementSaisieProjet } from "../../../../../../../../../mock/data/requeteCreationEtablissement";
import "../../../../../../../../../mock/element/IntersectionObserver";

describe("Test du bloc Postulant de l'onglet Postulant", () => {
  PaysSecabilite.init(PAYS_SECABILITE);
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  TypePieceJustificative.init(TYPE_PIECE_JUSTIFICATIVE);

  const afficheComposantSaisiePostulantForm = (titulaires: ITitulaireRequeteCreation[], avancement?: AvancementProjetActe): void => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <SaisiePostulantForm
              postulant={titulaires[ZERO]}
              estProjetExistant={false}
              onSubmitSaisieProjetForm={() => {}}
              avancementProjet={avancement}
              valeursForm={mappingTitulairesVersFormulairePostulant(titulaires[ZERO], titulaires[UN], titulaires[DEUX], "NAISSANCE")}
              affichageActualiserEtVisualiser={true}
            />
          )
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/er5ez456-354v-461z-c5fd-162md289m74h/a272ec8a-1351-4edd-99b8-03004292a9d2`
      ]
    );

    render(
      <MockRECEContextProvider>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );
  };

  test("DOIT afficher et renseigner les champs du bloc postulant QUAND le formulaire est affiché", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    afficheComposantSaisiePostulantForm(requete.titulaires!);

    const champNom: HTMLInputElement[] = screen.getAllByLabelText("Nom");
    const champPrenom: HTMLInputElement[] = screen.getAllByLabelText("Prénom");
    const champIdentite: HTMLInputElement = screen.getByLabelText("Identité avant décret");
    const champSexe = screen.getAllByLabelText("Masculin")[0] as HTMLInputElement;
    const champJourNaissance = screen.getAllByText("Date de naissance")[0].nextElementSibling as HTMLInputElement;
    const champMoisNaissance = champJourNaissance.nextElementSibling?.nextElementSibling as HTMLInputElement;
    const champAnneeNaissance = champMoisNaissance.nextElementSibling?.nextElementSibling as HTMLInputElement;
    const champVille = screen.getAllByLabelText("Ville")[0] as HTMLInputElement;
    const champEtat = screen.getAllByLabelText("Etat, canton, province")[0] as HTMLInputElement;
    const champPays = screen.getAllByLabelText("Pays")[0] as HTMLInputElement;
    const champNeMariage: HTMLInputElement = screen.getByLabelText("Non");

    expect(champNom[0].value).toBe("NOMNAISSANCE");
    expect(screen.getByText("Nom sécable")).toBeDefined();
    expect(screen.queryByText("1re partie")).toBeNull();
    expect(screen.getByText("Pas de prénom")).toBeDefined();
    expect(champPrenom[0].value).toBe("Prenom");
    expect(champNom[1].value).toBe("NOMFRANCISATION");
    expect(champPrenom[1].value).toBe("Prenomfrancisation");
    expect(champIdentite.value).toBe("");
    expect(champSexe.checked).toBeTruthy();
    expect(champJourNaissance.value).toBe("01");
    expect(champMoisNaissance.value).toBe("02");
    expect(champAnneeNaissance.value).toBe("2000");
    expect(champVille.value).toBe("Villenaissance");
    expect(champEtat.value).toBe("");
    expect(champPays.value).toBe("Paysnaissance");
    expect(champNeMariage.checked).toBeTruthy();
    expect(screen.getByText("Adopté par")).toBeDefined();
  });

  test("DOIT afficher un message d'attention QUAND le sexe est indéterminé", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    afficheComposantSaisiePostulantForm(requete.titulaires!);

    expect(screen.queryByText("Attention, sexe indéterminé")).toBeNull();

    fireEvent.click(screen.getAllByLabelText("Indéterminé")[0]);

    expect(screen.getByText("Attention, sexe indéterminé")).toBeDefined();
  });

  test("DOIT afficher un message d'attention QUAND le postulant n'a pas de jour et mois de naissance", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    requete.titulaires![0].retenueSdanf!.jourNaissance = undefined;
    requete.titulaires![0].retenueSdanf!.moisNaissance = undefined;
    afficheComposantSaisiePostulantForm(requete.titulaires!);

    const champJourNaissance = screen.getAllByText("Date de naissance")[0].nextElementSibling as HTMLInputElement;

    expect(screen.getByText("Jour et mois valorisés par défaut")).toBeDefined();

    fireEvent.input(champJourNaissance, {
      target: {
        value: "1"
      }
    });

    expect(screen.queryByText("Jour et mois valorisés par défaut")).toBeNull();
  });

  test("DOIT rendre la sécabilité du nom sans message d'attention QUAND il y a seulement 2 vocables", async () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    requete.titulaires![0].retenueSdanf!.nomNaissance = "Test1 Test2";
    requete.titulaires![0].retenueSdanf!.paysNaissance = "Cuba";
    afficheComposantSaisiePostulantForm(requete.titulaires!);

    await waitFor(() => {
      const champNomPartie1: HTMLInputElement = screen.getByLabelText("1re partie");
      const champNomPartie2: HTMLInputElement = screen.getByLabelText("2nde partie");

      expect(champNomPartie1.value).toBe("TEST1");
      expect(champNomPartie2.value).toBe("TEST2");
      expect(screen.queryByText("Nom avec plus de deux vocables")).toBeNull();
    });
  });

  test("DOIT afficher un message d'attention QUAND le pays de naissance est sécable et que le nom a plus de 2 vocables", async () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    requete.titulaires![0].retenueSdanf!.nomNaissance = "Test1 Test2 Test3";
    requete.titulaires![0].retenueSdanf!.paysNaissance = "Cuba";
    afficheComposantSaisiePostulantForm(requete.titulaires!);

    const champNomPartie1: HTMLInputElement = screen.getByLabelText("1re partie");
    const champNomPartie2: HTMLInputElement = screen.getByLabelText("2nde partie");

    await waitFor(() => {
      expect(champNomPartie1.value).toBe("TEST1");
      expect(champNomPartie2.value).toBe("TEST2 TEST3");
      expect(screen.getByText("Nom avec plus de deux vocables")).toBeDefined();
    });
  });

  test("DOIT afficher le formulaire d'acquisition QUAND l'avancement est a signer'.", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    afficheComposantSaisiePostulantForm(requete.titulaires!, AvancementProjetActe.ACTE_A_SIGNER);
    expect(screen.queryByTitle("Acquisition")).toBeDefined();
  });

  test("NE DOIT PAS afficher le formulaire d'acquisition QUAND l'avancement est a saisir'.", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    afficheComposantSaisiePostulantForm(requete.titulaires!, AvancementProjetActe.A_SAISIR);
    expect(screen.queryByTitle("Acquisition")).toBeNull();
  });

  test("NE DOIT PAS afficher le formulaire d'acquisition QUAND l'avancement est en cours'.", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    afficheComposantSaisiePostulantForm(requete.titulaires!, AvancementProjetActe.EN_COURS);
    expect(screen.queryByTitle("Acquisition")).toBeNull();
  });

  test("NE DOIT PAS afficher le formulaire d'acquisition QUAND l'avancement est valide'.", () => {
    const requete = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet);
    afficheComposantSaisiePostulantForm(requete.titulaires!, AvancementProjetActe.VALIDE);
    expect(screen.queryByTitle("Acquisition")).toBeNull();
  });
});
