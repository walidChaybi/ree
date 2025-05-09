import { IPostProjetActeTranscrit } from "@api/traitements/projetActe/transcription/TraitementProjetActeTranscrit";
import { userDroitSignerActe } from "@mock/data/mockConnectedUserAvecDroit";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
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
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import messageManager from "@util/messageManager";
import { describe, expect, test, vi } from "vitest";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";
import { elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";

const mockAppelerCompositionPdf = vi.fn();
const mockAppelEnregistrerRequeteApi = vi.fn();
const mockAppelPatchCreationStatutRequete = vi.fn();

vi.mock("@api/traitements/projetActe/transcription/TraitementProjetActeTranscrit", () => ({
  default: {
    Lancer: (terminerTraitement: () => void) => {
      const lancer = (parametres?: IPostProjetActeTranscrit): void => {
        if (parametres && parametres.projetActe) {
          mockAppelEnregistrerRequeteApi(parametres.projetActe);

          mockAppelPatchCreationStatutRequete({
            idRequete: parametres.idRequete,
            statut: "A_SIGNER"
          });
        }
        terminerTraitement();
      };

      return {
        lancer,
        erreurTraitement: { enEchec: false },
        reponseTraitement: {
          projetActe: {},
          pdf: {
            contenu: "ZmFrZVBkZkJhc2U2NA==",
            nbPages: 1
          }
        }
      };
    }
  }
}));

mockAppelerCompositionPdf({
  nature_acte: "",
  texte_corps_acte: "",
  titulaires: ""
});

/** TODO: Réparation des TU le Lundi 31 Mars @ Adrien_Bonvin */
describe("test du formulaire saisie projet acte transcrit de naissance", async () => {
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
        suiviDossiers: [{ idSuiviDossier: "123", anneeEvenement: "2003", avancement: AvancementProjetActe.A_SAISIR }]
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
  const erreur = vi.spyOn(messageManager, "showError");

  test("Doit afficher le formulaire de saisie de projet d'acte", async () => {
    const { container } = render(<FormulaireSaisieProjet requete={requete} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT appeler composition à la soumission du formulaire", async () => {
    render(elementAvecContexte(<FormulaireSaisieProjet requete={requete} />, userDroitSignerActe));

    const inputNomRetenuOEC = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonEnregistrer = screen.getByRole("button", { name: /Terminer et signer/i });

    expect(boutonEnregistrer).toBeDefined();
    await userEvent.click(boutonEnregistrer);

    expect(mockAppelerCompositionPdf).toHaveBeenCalledTimes(1);
  });

  test.skip("Doit enregistrer et composer le PDF acte de naissance", async () => {
    render(elementAvecContexte(<FormulaireSaisieProjet requete={requete} />, userDroitSignerActe));

    const inputNomRetenuOEC = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonEnregistrer = screen.getByRole("button", { name: /Terminer et signer/i });

    expect(boutonEnregistrer).toBeDefined();
    await userEvent.click(boutonEnregistrer);
    await waitFor(() => {
      expect(succes).toHaveBeenCalledTimes(1);
      expect(succes).toHaveBeenCalledWith("Le projet d'acte a bien été enregistré");
      expect(erreur).not.toHaveBeenCalled();

      expect(mockAppelEnregistrerRequeteApi).toHaveBeenCalledTimes(1);

      expect(mockAppelerCompositionPdf).toHaveBeenCalledTimes(1);

      expect(mockAppelPatchCreationStatutRequete).toHaveBeenCalledTimes(1);
      expect(mockAppelPatchCreationStatutRequete).toHaveBeenCalledWith(
        expect.objectContaining({
          idRequete: requete.id,
          statut: "A_SIGNER"
        })
      );
    });
  });
});
