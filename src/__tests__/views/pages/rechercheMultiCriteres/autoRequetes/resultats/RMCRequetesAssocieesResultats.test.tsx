import {
  userDroitCreerActeEtabliPerimetreTousRegistres,
  userDroitCreerActeTranscritPerimetreTousRegistres,
  userDroitDelivrer,
  userDroitInformerUsager
} from "@mock/data/connectedUserAvecDroit";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { requeteInformation } from "@mock/data/requeteInformation";
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
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
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
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe("RMCRequetesAssocieesResultats", () => {
  test("DOIT rendre le titre du tableau des requêtes associées aux titulaires d'une requêtes de délivrance", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <RMCRequetesAssocieesResultats requete={requeteDelivrance} />
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          requeteDelivrance.id
        )
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });
  });

  test("DOIT rendre le titre du tableau des requêtes associées aux titulaires d'une requêtes d'information", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          element: (
            <RMCRequetesAssocieesResultats requete={requeteInformation} />
          )
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          requeteInformation.id
        )
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Autres requêtes associées au titulaire")
      ).toBeDefined();
    });
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de délivrance", async () => {
    storeRece.utilisateurCourant = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "FOO",
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

    const aDroitConsulter = aDroitConsulterRequeteDelivrance();

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de création Etablissement", async () => {
    storeRece.utilisateurCourant = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "FOO",
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
    const aDroitConsulter = aDroitConsulterRequeteCreation(
      libelleCourtEtablissement
    );

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de création Transcription", async () => {
    storeRece.utilisateurCourant =
      userDroitCreerActeTranscritPerimetreTousRegistres;
    const libelleCourtTranscription = "Acte Transcrit (c)";
    const aDroitConsulter = aDroitConsulterRequeteCreation(
      libelleCourtTranscription
    );

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner false QUAND l'utilisateur n'a le droit de consulter une requête de création Transcription", async () => {
    const utilisateurSansDroitTranscrit = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "FOO",
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

    storeRece.utilisateurCourant = utilisateurSansDroitTranscrit;
    const libelleCourtTranscription = "Acte Transcrit (c)";
    const aDroitConsulter = aDroitConsulterRequeteCreation(
      libelleCourtTranscription
    );

    expect(aDroitConsulter).toBe(false);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête d'information'", async () => {
    const utilisateurAvecDroitInformerUsager = {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "FOO",
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

    storeRece.utilisateurCourant = utilisateurAvecDroitInformerUsager;
    const aDroitConsulter = aDroitConsulterApercuRequeteInformation();

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de création'", async () => {
    storeRece.utilisateurCourant =
      userDroitCreerActeEtabliPerimetreTousRegistres;
    const sousTypeRequete = "Acte Etab X (d)";

    const aDroitConsulter = utilisateurADroitOuvrirRequete(
      TypeRequete.CREATION.libelle,
      sousTypeRequete
    );

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à le droit de consulter une requête de délivrance'", async () => {
    storeRece.utilisateurCourant = userDroitDelivrer;

    const aDroitConsulter = utilisateurADroitOuvrirRequete(
      TypeRequete.DELIVRANCE.libelle,
      ""
    );

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner true QUAND l'utilisateur à pas le droit de consulter une requête d'information'", async () => {
    storeRece.utilisateurCourant = userDroitInformerUsager;

    const aDroitConsulter = utilisateurADroitOuvrirRequete(
      TypeRequete.INFORMATION.libelle,
      ""
    );

    expect(aDroitConsulter).toBe(true);
  });

  test("DOIT retourner le composant d'aperçu simple d'une requête de délivrance", async () => {
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
          element: (
            <ApercuRequetePage
              idRequeteAAfficher={requeteSelectionnee?.idRequete}
            />
          )
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          requeteSelectionnee.idRequete
        )
      ]
    );

    await act(async () => {
      const { container } = render(<RouterProvider router={router} />);

      expect(container.getElementsByClassName("ApercuRequete").length).toBe(1);
    });
  });

  test("DOIT retourner le bon composant d'aperçu simple d'une requête de création d'établissement", async () => {
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
          element:
            getApercuRequeteEtablissementOuTranscription(requeteSelectionnee)
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
          requeteSelectionnee.idRequete
        )
      ]
    );

    await act(async () => {
      const { container } = render(<RouterProvider router={router} />);

      expect(
        container.getElementsByClassName(
          "ApercuReqCreationEtablissementSimplePage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT retourner le bon composant d'aperçu simple d'une requête de création de transcription", async () => {
    storeRece.utilisateurCourant =
      userDroitCreerActeTranscritPerimetreTousRegistres;
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
          element:
            getApercuRequeteEtablissementOuTranscription(requeteSelectionnee)
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
          requeteSelectionnee.idRequete
        )
      ]
    );

    await act(async () => {
      const { container } = render(<RouterProvider router={router} />);

      expect(
        container.getElementsByClassName(
          "ApercuReqCreationTranscriptionSimplePage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT retourner le bon composant d'aperçu simple d'une requête d'information'", async () => {
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
          element: (
            <ApercuReqInfoPage
              idRequeteAAfficher={requeteSelectionnee?.idRequete}
            />
          )
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          requeteSelectionnee.idRequete
        )
      ]
    );

    await act(async () => {
      const { container } = render(<RouterProvider router={router} />);

      expect(container.getElementsByClassName("ApercuRequete").length).toBe(1);
    });
  });
});
