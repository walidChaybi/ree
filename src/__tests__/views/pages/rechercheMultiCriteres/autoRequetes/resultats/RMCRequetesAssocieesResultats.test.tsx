import requeteDelivrance from "@mock/data/requeteDelivrance";
import { IDroit } from "@model/agent/Habilitation";
import { INomenclatureAgentApi } from "@model/agent/INomenclatureAgentApi";
import {
  IOfficier,
  aDroitConsulterApercuRequeteInformation,
  aDroitConsulterRequeteCreation,
  aDroitConsulterRequeteDelivrance
} from "@model/agent/IOfficier";
import { IPerimetre } from "@model/agent/IPerimetre";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  RMCRequetesAssocieesResultats,
  criteresAvecDonneesTitulaireSuffisantes,
  determinerCriteresRMCAutoRequeteDepuisTitulaire
} from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import {
  IInfoRequeteSelectionnee,
  getApercuRequeteEtablissementOuTranscription,
  utilisateurADroitOuvrirRequete
} from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCTableauRequetesAssociees";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID
} from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { SNP } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";
import {
  userDroitCreerActeEtabliPerimetreTousRegistres,
  userDroitCreerActeTranscritPerimetreTousRegistres,
  userDroitDelivrer,
  userDroitInformerUsager
} from "../../../../../mock/data/mockConnectedUserAvecDroit";
import { requeteInformation } from "../../../../../mock/data/requeteInformation";

describe("RMCRequetesAssocieesResultats", () => {
  test.skip("DOIT rendre le titre du tableau des requêtes associées aux titulaires d'une requêtes d'information", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <RMCRequetesAssocieesResultats requete={requeteInformation} />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, requeteInformation.id)]
    );

    render(<RouterProvider router={router} />);

    waitFor(() => {
      expect(screen.getByText("Autres requêtes associées au titulaire")).toBeDefined();
    });
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de délivrance", () => {
    const utilisateurConnecteMock = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "Young Ashley",
      service: { estDansScec: true },
      habilitations: [
        {
          idHabilitation: "idHabilitation",
          profil: {
            idProfil: "idProfil",
            nom: {
              idNomenclature: "string",
              categorie: "string",
              code: "string",
              libelle: "string",
              estActif: true
            } as INomenclatureAgentApi,
            droits: [
              {
                idDroit: "idDroit",
                nom: "DELIVRER"
              } as IDroit
            ]
          },
          perimetre: {
            idPerimetre: "idPerimetre",
            description: "descPérimètre",
            estActif: true,
            listePays: ["paysPérimètre"],
            nom: "TOUS_REGISTRES",
            listeIdTypeRegistre: ["idlisteIdTypeRegistre"]
          } as IPerimetre
        }
      ]
    } as IOfficier;

    const aDroitConsulter = aDroitConsulterRequeteDelivrance(utilisateurConnecteMock);

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de création Etablissement", () => {
    const utilisateurConnecteMock = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "Young Ashley",
      service: { estDansScec: true },
      habilitations: [
        {
          idHabilitation: "idHabilitation",
          profil: {
            idProfil: "idProfil",
            nom: {
              idNomenclature: "string",
              categorie: "string",
              code: "string",
              libelle: "string",
              estActif: true
            } as INomenclatureAgentApi,
            droits: [
              {
                idDroit: "idDroit",
                nom: "CREER_ACTE_ETABLI"
              } as IDroit
            ]
          },
          perimetre: {
            idPerimetre: "idPerimetre",
            description: "descPérimètre",
            estActif: true,
            listePays: ["paysPérimètre"],
            nom: "TOUS_REGISTRES",
            listeIdTypeRegistre: ["idlisteIdTypeRegistre"]
          } as IPerimetre
        }
      ]
    } as IOfficier;
    const libelleCourtEtablissement = "Acte Etab X (d)";
    const aDroitConsulter = aDroitConsulterRequeteCreation(libelleCourtEtablissement, utilisateurConnecteMock);

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de création Transcription", () => {
    const utilisateurConnecteMock = userDroitCreerActeTranscritPerimetreTousRegistres;
    const libelleCourtTranscription = "Acte Transcrit (c)";
    const aDroitConsulter = aDroitConsulterRequeteCreation(libelleCourtTranscription, utilisateurConnecteMock);

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner false QUAND l'utilisateur n'a le droit de consulter une requête de création Transcription", () => {
    const utilisateurConnecteSansDroitTranscritMock = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "Young Ashley",
      service: { estDansScec: true },
      habilitations: [
        {
          idHabilitation: "idHabilitation",
          profil: {
            idProfil: "idProfil",
            nom: {
              idNomenclature: "string",
              categorie: "string",
              code: "string",
              libelle: "string",
              estActif: true
            } as INomenclatureAgentApi,
            droits: [
              {
                idDroit: "idDroit",
                nom: "CREER_ACTE_ETABLI"
              } as IDroit
            ]
          },
          perimetre: {
            idPerimetre: "idPerimetre",
            description: "descPérimètre",
            estActif: true,
            listePays: ["paysPérimètre"],
            nom: "TOUS_REGISTRES",
            listeIdTypeRegistre: ["idlisteIdTypeRegistre"]
          } as IPerimetre
        }
      ]
    } as IOfficier;

    const libelleCourtTranscription = "Acte Transcrit (c)";
    const aDroitConsulter = aDroitConsulterRequeteCreation(libelleCourtTranscription, utilisateurConnecteSansDroitTranscritMock);

    expect(aDroitConsulter).toBe(false);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête d'information'", () => {
    const utilisateurConnecteAvecDroitInformerUsagerMock = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "Young Ashley",
      service: { estDansScec: true },
      habilitations: [
        {
          idHabilitation: "idHabilitation",
          profil: {
            idProfil: "idProfil",
            nom: {
              idNomenclature: "string",
              categorie: "string",
              code: "string",
              libelle: "string",
              estActif: true
            } as INomenclatureAgentApi,
            droits: [
              {
                idDroit: "idDroit",
                nom: "INFORMER_USAGER"
              } as IDroit
            ]
          },
          perimetre: {
            idPerimetre: "idPerimetre",
            description: "descPérimètre",
            estActif: true,
            listePays: ["paysPérimètre"],
            nom: "TOUS_REGISTRES",
            listeIdTypeRegistre: ["idlisteIdTypeRegistre"]
          } as IPerimetre
        }
      ]
    } as IOfficier;

    const aDroitConsulter = aDroitConsulterApercuRequeteInformation(utilisateurConnecteAvecDroitInformerUsagerMock);

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de création'", () => {
    const sousTypeRequete = "Acte Etab X (d)";

    const aDroitConsulter = utilisateurADroitOuvrirRequete(
      TypeRequete.CREATION.libelle,
      sousTypeRequete,
      userDroitCreerActeEtabliPerimetreTousRegistres
    );

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de délivrance'", () => {
    const aDroitConsulter = utilisateurADroitOuvrirRequete(TypeRequete.DELIVRANCE.libelle, "", userDroitDelivrer);

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à pas le droit de consulter une requête d'information'", () => {
    const aDroitConsulter = utilisateurADroitOuvrirRequete(TypeRequete.INFORMATION.libelle, "", userDroitInformerUsager);

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner le composant d'aperçu simple d'une requête de délivrance", () => {
    const requeteSelectionnee = {
      idRequete: "7b448d64-add5-4dbd-8041-b7081ea7bc86",
      numeroFonctionnel: "numero",
      type: TypeRequete.DELIVRANCE.libelle,
      sousType: "sousType"
    } as IInfoRequeteSelectionnee;

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: <ApercuRequetePage idRequeteAAfficher={requeteSelectionnee?.idRequete} />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID, requeteSelectionnee.idRequete)]
    );

    const { container } = render(elementAvecContexte(<RouterProvider router={router} />, userDroitInformerUsager));

    expect(container.getElementsByClassName("ApercuRequete").length).toBe(1);
  });
  test("DOIT retourner le bon composant d'aperçu simple d'une requête de création d'établissement", () => {
    const requeteSelectionnee = {
      idRequete: "7b448d64-add5-4dbd-8041-b7081ea7bc86",
      numeroFonctionnel: "numero",
      type: TypeRequete.CREATION.libelle,
      sousType: "Acte Etab X (d)"
    } as IInfoRequeteSelectionnee;

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
          element: getApercuRequeteEtablissementOuTranscription(requeteSelectionnee)
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID, requeteSelectionnee.idRequete)]
    );

    const { container } = render(elementAvecContexte(<RouterProvider router={router} />, userDroitInformerUsager));

    expect(container.getElementsByClassName("ApercuReqCreationEtablissementSimplePage").length).toBe(1);
  });

  test("DOIT retourner le bon composant d'aperçu simple d'une requête de création de transcription", () => {
    const requeteSelectionnee = {
      idRequete: "7b448d64-add5-4dbd-8041-b7081ea7bc86",
      numeroFonctionnel: "numero",
      type: TypeRequete.CREATION.libelle,
      sousType: "Acte Transcrit (d)"
    } as IInfoRequeteSelectionnee;

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
          element: getApercuRequeteEtablissementOuTranscription(requeteSelectionnee)
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID, requeteSelectionnee.idRequete)]
    );

    const { container } = render(
      elementAvecContexte(<RouterProvider router={router} />, userDroitCreerActeTranscritPerimetreTousRegistres)
    );

    expect(container.getElementsByClassName("ApercuReqCreationTranscriptionSimplePage").length).toBe(1);
  });

  test("DOIT retourner le bon composant d'aperçu simple d'une requête d'information'", () => {
    const requeteSelectionnee = {
      idRequete: "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856",
      numeroFonctionnel: "numero",
      type: TypeRequete.INFORMATION.libelle,
      sousType: "Information"
    } as IInfoRequeteSelectionnee;

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: <ApercuReqInfoPage idRequeteAAfficher={requeteSelectionnee?.idRequete} />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID, requeteSelectionnee.idRequete)]
    );

    const { container } = render(elementAvecContexte(<RouterProvider router={router} />, userDroitInformerUsager));
    expect(container.getElementsByClassName("ApercuRequete").length).toBe(1);
  });

  test("determinerCriteresRMCAuto DOIT extraire les critères de RMC auto requête QUAND une requête est fournie", () => {
    const res = determinerCriteresRMCAutoRequeteDepuisTitulaire(requeteDelivrance.titulaires);

    expect(res).toStrictEqual({
      criteres: [
        {
          nomTitulaire: "Prodesk",
          prenomTitulaire: "Elodie",
          jourNaissance: "25",
          moisNaissance: "6",
          anneeNaissance: "1990"
        },
        {
          nomTitulaire: "Daniel",
          prenomTitulaire: "Jack",
          jourNaissance: "25",
          moisNaissance: "6",
          anneeNaissance: "1990"
        }
      ]
    });
  });

  test("criteresAvecDonneesTitulaireSuffisantes DOIT renvoyer false QUAND les critères de recherche portent sur un titulaire sans nom patronymique, sans date de naissance et sans prénom", () => {
    expect(
      criteresAvecDonneesTitulaireSuffisantes([
        {
          nomTitulaire: SNP,
          prenomTitulaire: undefined,
          jourNaissance: undefined,
          moisNaissance: undefined,
          anneeNaissance: undefined
        }
      ])
    ).toBeFalsy();
  });

  test("criteresAvecDonneesTitulaireSuffisantes DOIT renvoyer true QUAND les critères de recherche portent sur un titulaire sans nom patronymique, avec date de naissance et avec prénom", () => {
    expect(
      criteresAvecDonneesTitulaireSuffisantes([
        {
          nomTitulaire: SNP,
          prenomTitulaire: "prenom",
          jourNaissance: "12",
          moisNaissance: "12",
          anneeNaissance: "2012"
        }
      ])
    ).toBeTruthy();
  });
});
