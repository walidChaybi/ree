import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import PartieGaucheSaisieProjet from "../../../../../composants/pages/requetesConsulaire/saisieProjet/PartieGaucheSaisieProjet";
import { EEventState } from "../../../../../hooks/EventHook";
import ModeleTexte, { EModeleTexteDocument } from "../../../../../utils/ModeleTexte";

describe("PartieGaucheSaisieProjet - Tests du composant", () => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({ disconnect: () => {}, observe: () => {}, unobserve: () => {} }));

  const requete: IRequeteCreationTranscription = {
    id: "5ff091d6-261d-4902-a8cf-2bfe12627768",
    numeroFonctionnel: "QEILP1",
    dateCreation: 1743420490945,
    canal: TypeCanal.COURRIER,
    type: TypeRequete.CREATION,
    actions: [],
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

  beforeAll(() => {
    ModeleTexte.enregistrerModeleTexteDocument(EModeleTexteDocument.PROJET_NAISSANCE_MINEUR, "Test modele");
  });

  afterAll(() => {
    ModeleTexte.reinitialiserModelesTexte();
  });

  test("Doit rendre composant PartieGaucheSaisieProjet", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <PartieGaucheSaisieProjet
          requete={requete}
          estModeConsultation={false}
        />
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { valeurTest: "" } }));

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit changer d'onglet et rendre l'aperçu du projet", () => {
    const { container } = render(
      <MockRECEContextProvider>
        <PartieGaucheSaisieProjet
          requete={requete}
          estModeConsultation={false}
        />
      </MockRECEContextProvider>
    );

    fireEvent(document, new CustomEvent(EEventState.APERCU_PROJET_ACTE, { detail: { valeurTest: "" } }));
    fireEvent.click(screen.getByText("Aperçu du projet"));

    expect(container.firstChild).toMatchSnapshot();
  });
});
