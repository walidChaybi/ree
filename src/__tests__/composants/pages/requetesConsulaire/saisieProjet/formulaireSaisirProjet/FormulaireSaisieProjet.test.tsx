import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import messageManager from "@util/messageManager";
import { describe, expect, test, vi } from "vitest";

import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";

/** TODO: Réparation des TU le Lundi 31 Mars @ Adrien_Bonvin */
describe.skip("test du formulaire saisie projet acte transcrit de naissance", async () => {
  const projetActeTranscription: IProjetActeTranscritDto = {
    modeCreation: TypeRedactionActe.TRANSCRIT,
    evenement: {
      annee: 2024,
      mois: 12,
      jour: 3,
      heure: null,
      minute: null,
      pays: "Chine",
      ville: "Bejin",
      region: "China",
      neDansLeMariage: true,
      arrondissement: null,
      departement: null,
      voie: null
    },
    titulaires: [
      {
        nomActeEtranger: "Xi-phun bin",
        nom: "Xi phun bin",
        ordre: 1,
        prenoms: ["lao", "xiar", "sehoo"],
        sexe: "FEMININ",
        naissance: {
          jour: 3,
          mois: 12,
          annee: 2024,
          heure: null,
          minute: null,
          pays: "Chine",
          ville: "Bejin",
          region: "China",
          neDansLeMariage: true,
          arrondissement: null,
          departement: null,
          voie: null
        },
        domicile: { ville: "Bejin", region: "China", pays: "Chine", voie: "Place du riz", arrondissement: null },
        nomPartie1: "Xi",
        nomPartie2: "phun bin",
        filiations: [
          {
            lienParente: LienParente.PARENT,
            ordre: 1,
            nom: "Greenwald",
            sexe: "MASCULIN",
            naissance: {
              pays: null,
              ville: null,
              region: null,
              arrondissement: null,
              annee: 2000,
              mois: 10,
              jour: 10,
              departement: null,
              heure: null,
              minute: null,
              voie: null,
              neDansLeMariage: null
            },
            age: null,
            prenoms: ["cassandra"],
            sansProfession: true,
            profession: "",
            domicile: { pays: "France", ville: "Marseille", region: "13", arrondissement: "13", voie: "11 place du boulodrôme" },
            domicileCommun: null
          },
          {
            lienParente: LienParente.PARENT,
            ordre: 2,
            nom: "Xi Phun Bin",
            sexe: "FEMININ",
            naissance: {
              pays: "France",
              ville: "Nantes",
              region: "loire atlantique",
              arrondissement: null,
              annee: null,
              mois: null,
              jour: null,
              departement: null,
              heure: null,
              minute: null,
              neDansLeMariage: null,
              voie: null
            },
            domicile: null,
            age: 34,
            prenoms: ["Maman"],
            sansProfession: false,
            profession: "Artiste",
            domicileCommun: true
          }
        ],
        pasDePrenom: null,
        reconnuPar: null
      }
    ],
    acteEtranger: {
      texteEnonciations: "tewt tewxt",
      typeActeEtranger: "ACTE_DRESSE",
      typeActe: null,
      cadreNaissance: "NE_DANS_LE_MARIAGE",
      jourEnregistrement: "15",
      moisEnregistrement: "12",
      anneeEnregistrement: "2024",
      adresseEnregistrement: { ville: "Pekin", region: "china", pays: "Chine", arrondissement: null, voie: null },
      redacteur: "Ambassador",
      mentions: "il est fait mention de...",
      complement: null,
      reference: null
    },
    formuleFinale: {
      identiteDemandeur: "PERE",
      nomDemandeur: null,
      prenomDemandeur: "",
      qualiteDemandeur: null,
      piecesProduites: "COPIES",
      legalisation: "LEGALISATION",
      autresPieces: "passeport",
      modeDepot: "REMISE",
      identiteTransmetteur: "PERE",
      nomTransmetteur: null
    },
    analyseMarginales: [
      {
        titulaires: [
          {
            nomActeEtranger: "Xi-phun bin",
            nom: "Xi phun bin",
            ordre: 1,
            prenoms: ["lao", "xiar", "sehoo"],
            sexe: "FEMININ",
            naissance: {
              jour: 3,
              mois: 12,
              annee: 2024,
              heure: null,
              minute: null,
              pays: "Chine",
              ville: "Bejin",
              region: "China",
              neDansLeMariage: true,
              arrondissement: null,
              departement: null,
              voie: null
            },
            domicile: { ville: "Bejin", region: "China", pays: "Chine", voie: "Place du riz", arrondissement: null },
            nomPartie1: "Xi",
            nomPartie2: "phun bin",
            filiations: [
              {
                lienParente: LienParente.PARENT,
                ordre: 1,
                nom: "Greenwald",
                sexe: "MASCULIN",
                naissance: {
                  pays: null,
                  ville: null,
                  region: null,
                  arrondissement: null,
                  annee: 2000,
                  mois: 10,
                  jour: 10,
                  departement: null,
                  heure: null,
                  minute: null,
                  voie: null,
                  neDansLeMariage: null
                },
                age: null,
                prenoms: ["cassandra"],
                sansProfession: true,
                profession: "",
                domicile: { pays: "France", ville: "Marseille", region: "13", arrondissement: "13", voie: "11 place du boulodrôme" },
                domicileCommun: null
              },
              {
                lienParente: LienParente.PARENT,
                ordre: 2,
                nom: "Xi Phun Bin",
                sexe: "FEMININ",
                naissance: {
                  pays: "France",
                  ville: "Nantes",
                  region: "loire atlantique",
                  arrondissement: null,
                  annee: null,
                  mois: null,
                  jour: null,
                  departement: null,
                  heure: null,
                  minute: null,
                  neDansLeMariage: null,
                  voie: null
                },
                domicile: null,
                age: 34,
                prenoms: ["Maman"],
                sansProfession: false,
                profession: "Artiste",
                domicileCommun: true
              }
            ],
            pasDePrenom: null,
            reconnuPar: null
          }
        ],
        id: null,
        dateDebut: null,
        nomOec: null,
        prenomOec: null,
        motifModification: null
      }
    ],
    nature: "NAISSANCE",
    visibiliteArchiviste: "NON",
    declarant: {
      identiteDeclarant: "PERE",
      adresseDomicile: null,
      age: null,
      complementDeclarant: null,
      nom: "Greenwald",
      prenoms: [{ prenom: "cassandra", numeroOrdre: 1 }],
      profession: null,
      qualite: null,
      sansProfession: null,
      sexe: "MASCULIN"
    },
    mentions: null
  };
  const requete: IRequeteCreationTranscription = {
    id: "5ff091d6-261d-4902-a8cf-2bfe12627768",
    numeroFonctionnel: "QEILP1",
    dateCreation: 1743420490945,
    canal: TypeCanal.COURRIER,
    type: TypeRequete.CREATION,
    actions: [
      {
        id: "5ff03513-2f01-4d87-8c02-981580de66ca",
        numeroOrdre: 3,
        libelle: "Saisie du projet",
        dateAction: 1743420507211,
        idUtilisateur: "80fb7690-58a1-11ef-8a47-0800276b552b",
        trigramme: "Skywalker Anakin",
        nomUtilisateur: "",
        prenomUtilisateur: ""
      },
      {
        id: "5ff0fbea-01bb-42b2-ba76-29df5ddcbaf0",
        numeroOrdre: 2,
        libelle: "Prise en charge",
        dateAction: 1743420490946,
        idUtilisateur: "80fb7690-58a1-11ef-8a47-0800276b552b",
        trigramme: "Skywalker Anakin",
        nomUtilisateur: "",
        prenomUtilisateur: ""
      },
      {
        id: "5ff0f3bc-0866-4918-87c1-227a57bec415",
        numeroOrdre: 1,
        libelle: "Saisie de la requete",
        dateAction: 1743420490946,
        idUtilisateur: "80fb7690-58a1-11ef-8a47-0800276b552b",
        trigramme: "Skywalker Anakin",
        nomUtilisateur: "",
        prenomUtilisateur: ""
      }
    ],
    titulaires: [
      {
        id: "5ff0a431-84f5-408f-bc25-044848853125",
        position: 1,
        nomNaissance: "Xi-phun bin",
        anneeNaissance: 2024,
        moisNaissance: 12,
        jourNaissance: 3,
        villeNaissance: "Bejin",
        regionNaissance: "China",
        paysNaissance: "Chine",
        lieuNaissanceFormate: "Bejin, China (Chine)",
        dateNaissanceFormatee: "03/12/2024",
        sexe: "FEMININ",
        nationalite: Nationalite.INCONNUE,
        prenoms: [
          {
            numeroOrdre: 1,
            prenom: "liao"
          },
          {
            numeroOrdre: 2,
            prenom: "xiar"
          },
          {
            numeroOrdre: 3,
            prenom: "sehoo"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
        nationalites: [],
        prenomsDemande: [],
        suiviDossiers: []
      },
      {
        id: "5ff0663f-b3c7-470f-b3be-0a79f17a635d",
        position: 2,
        nomNaissance: "Greenwald",
        anneeNaissance: 2000,
        moisNaissance: 10,
        jourNaissance: 10,
        dateNaissanceFormatee: "10/10/2000",
        sexe: "MASCULIN",
        nationalite: Nationalite.FRANCAISE,
        prenoms: [
          {
            numeroOrdre: 1,
            prenom: "cassandra"
          }
        ],
        parentsTitulaire: [],
        evenementUnions: [],
        typeObjetTitulaire: TypeObjetTitulaire.FAMILLE,
        nationalites: [],
        prenomsDemande: [],
        suiviDossiers: [],
        qualite: QualiteFamille.PARENT
      }
    ],
    idUtilisateur: "80fb7690-58a1-11ef-8a47-0800276b552b",
    idService: "95878007-0256-49a7-9d61-1bd506baa82f",
    piecesJustificatives: [],
    requerant: {
      id: "5ff0cca9-b18d-4771-9f31-584aa7dced33",
      dateCreation: new Date(1743420490882),
      nomFamille: "",
      nomUsage: "",
      prenom: "",
      lienRequerant: {
        id: "5ff01daa-b3bc-4640-981d-b56b65245512",
        lien: TypeLienRequerant.PERE_MERE
      },
      qualiteRequerant: {
        qualite: Qualite.PARTICULIER
      }
    },
    observations: [],
    lienRequerant: {
      typeLienRequerant: TypeLienRequerantCreation.PERE_MERE
    },
    sousType: SousTypeCreation.RCTC,
    provenance: Provenance.COURRIER,
    documentsPj: [],
    personnesSauvegardees: [],
    natureActeTranscrit: ENatureActeTranscrit.NAISSANCE_MINEUR,
    villeRegistre: "PEKIN",
    numero: "QEILP1",
    statutCourant: {
      statut: StatutRequete.EN_TRAITEMENT,
      dateEffet: 1743420507272,
      raisonStatut: ""
    }
  };
  const succes = vi.spyOn(messageManager, "showSuccessAndClose");
  const erreur = vi.spyOn(messageManager, "showErrorAndClose");

  MockApi.deployer(CONFIG_POST_PROJET_ACTE_TRANSCRIPTION, undefined, { data: projetActeTranscription, codeHttp: 201 });
  MockApi.deployer(
    CONFIG_PATCH_STATUT_REQUETE_CREATION,
    {
      path: {
        idRequete: "5ff091d6-261d-4902-a8cf-2bfe12627768"
      },
      query: {
        statut: StatutRequete.getKey(StatutRequete.A_SIGNER)
      }
    },
    { data: "success" }
  ).debugAppels();
  test("Doit enregister le formulaire de saisie de projet d'acte", async () => {
    render(<FormulaireSaisieProjet requete={requete} />);

    const inputNomRetenuOEC = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    const inputDateAnneeTitulaire = screen.getAllByPlaceholderText("AAAA")[0];
    const inputRadioSexeTitulaire = screen.getAllByLabelText("Féminin")[0];
    const inputNomParent1 = screen.getByRole("textbox", { name: /parents.parent1.nom/i });
    const inputRadioSexeParent1 = screen.getAllByLabelText("Féminin")[1];

    await waitFor(() => {
      expect(inputNomRetenuOEC).toBeDefined();
      expect(inputDateAnneeTitulaire).toBeDefined();
      expect(inputRadioSexeTitulaire).toBeDefined();
      expect(inputNomParent1).toBeDefined();
      expect(inputRadioSexeParent1).toBeDefined();
    });

    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");
    screen.debug();

    const boutonEnregistrer = screen.getByRole("button", { name: /Enregistrer et visualiser/i });

    expect(boutonEnregistrer).toBeDefined();
    await userEvent.click(boutonEnregistrer);
    await waitFor(() => {
      expect(succes).toHaveBeenCalled();
    });
  });
  MockApi.stopMock();
});
