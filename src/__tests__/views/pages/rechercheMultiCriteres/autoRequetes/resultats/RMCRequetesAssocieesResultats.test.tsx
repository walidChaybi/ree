import {
  userDroitCreerActeEtabliPerimetreMEAE,
  userDroitCreerActeTranscritPerimetreMEAE,
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
  getApercuRequeteSimple,
  utilisateurADroitOuvrirRequete
} from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCTableauRequetesAssociees";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";

describe("RMCRequetesAssocieesResultats", () => {
  test("DOIT rendre le titre du tableau des requêtes associées aux titulaires d'une requêtes de délivrance", async () => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          requeteDelivrance.id
        )
      );

      render(
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <RMCRequetesAssocieesResultats requete={requeteDelivrance} />
          </Route>
        </Router>
      );
    });
  });

  test("DOIT rendre le titre du tableau des requêtes associées aux titulaires d'une requêtes d'information", async () => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          requeteInformation.id
        )
      );

      render(
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <RMCRequetesAssocieesResultats requete={requeteInformation} />
          </Route>
        </Router>
      );
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
      entite: { estDansSCEC: true },
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
            nom: "MEAE",
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
      entite: { estDansSCEC: true },
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
            nom: "MEAE",
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
    storeRece.utilisateurCourant = userDroitCreerActeTranscritPerimetreMEAE;
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
      entite: { estDansSCEC: true },
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
            nom: "MEAE",
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
      entite: { estDansSCEC: true },
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
            nom: "MEAE",
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
    storeRece.utilisateurCourant = userDroitCreerActeEtabliPerimetreMEAE;
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

    await act(async () => {
      const history = createMemoryHistory();
      const { container } = render(
        <Router history={history}>
          {getApercuRequeteSimple(requeteSelectionnee)}
        </Router>
      );

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

    await act(async () => {
      const history = createMemoryHistory();
      const { container } = render(
        <Router history={history}>
          {getApercuRequeteSimple(requeteSelectionnee)}
        </Router>
      );

      expect(
        container.getElementsByClassName(
          "ApercuReqCreationEtablissementSimplePage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT retourner le bon composant d'aperçu simple d'une requête de création de transcription", async () => {
    storeRece.utilisateurCourant = userDroitCreerActeTranscritPerimetreMEAE;
    const requeteSelectionnee = {
      idRequete: "7b448d64-add5-4dbd-8041-b7081ea7bc86",
      numeroFonctionnel: "numero",
      type: TypeRequete.CREATION.libelle,
      sousType: "Acte Transcrit (d)"
    } as IInfoRequeteSelectionnee;

    await act(async () => {
      const history = createMemoryHistory();
      const { container } = render(
        <Router history={history}>
          {getApercuRequeteSimple(requeteSelectionnee)}
        </Router>
      );

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

    await act(async () => {
      const history = createMemoryHistory();
      const { container } = render(
        <Router history={history}>
          {getApercuRequeteSimple(requeteSelectionnee)}
        </Router>
      );

      expect(container.getElementsByClassName("ApercuRequete").length).toBe(1);
    });
  });
});
