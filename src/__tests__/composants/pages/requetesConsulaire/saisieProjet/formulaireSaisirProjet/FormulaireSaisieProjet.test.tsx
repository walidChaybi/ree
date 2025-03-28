import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { describe } from "vitest";

describe.skip("test du formulaire saisie projet acte transcrit de naissance", async () => {
  const projetActeTranscription = {
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
      neDansLeMariage: true
    },
    titulaires: [
      {
        nomActeEtranger: "Xi-phun bin",
        nom: "Xi phun bin",
        ordre: 1,
        prenoms: ["lao", "xiar", "sehoo"],
        sexe: "FEMININ",
        naissance: { jour: "03", mois: "12", annee: "2024", heure: "", minute: "" },
        domicile: { ville: "Bejin", region: "China", pays: "Chine", voie: "Place du riz" },
        filiations: [
          {
            lienParente: LienParente.PARENT,
            ordre: 1,
            nom: "Greenwald",
            sexe: "MASCULIN",
            naissance: { pays: null, ville: null, region: null, arrondissement: null, annee: 2000, mois: 10, jour: 10 },
            age: null,
            prenoms: ["cassandra"],
            sansProfession: true,
            profession: "",
            domicile: { pays: "France", ville: "Marseille", region: "13", arrondissement: "13", adresse: "11 place du boulodrôme" }
          },
          {
            lienParente: "PARENT",
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
              jour: null
            },
            age: 34,
            prenoms: ["Maman"],
            sansProfession: false,
            profession: "Artiste",
            domicileCommun: true
          }
        ],
        nomPartie1: "Xi",
        nomPartie2: "phun bin"
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
      adresseEnregistrement: { ville: "Pekin", region: "china", pays: "Chine" },
      redacteur: "Ambassador",
      referenceEtComplement: "ref.2024.12.pek",
      mentions: "il est fait mention de..."
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
      identiteTransmetteur: "PERE"
    },
    analyseMarginales: [
      { titulaires: [{ ordre: 1, nom: "Xi phun bin", nomPartie1: "Xi", nomPartie2: "phun bin", prenoms: ["lao", "xiar", "sehoo"] }] }
    ],
    nature: "NAISSANCE",
    numeroDossierNational: null,
    visibiliteArchiviste: "NON",
    declarant: { identiteDeclarant: "PERE" }
  } as unknown as IProjetActeTranscritDto;
  MockApi.deployer(
    CONFIG_POST_PROJET_ACTE_TRANSCRIPTION,
    { body: projetActeTranscription },

    { data: projetActeTranscription, codeHttp: 201 }
  );
  MockApi.deployer(
    CONFIG_PATCH_STATUT_REQUETE_CREATION,
    {
      path: {
        idRequete: "91d13aad-c023-4a6d-b88c-18f277061ca2"
      },
      query: {
        statut: StatutRequete.getKey(StatutRequete.A_SIGNER)
      }
    },

    {}
  ).debugAppels();
  // test.skip("Blagh", async () => {
  //   render(
  //     <FormulaireSaisieProjet
  //       requete={mesRequetesConsulaire[0].id}
  //       numeroDossierNational={""}
  //     />
  //   );
  //   screen.debug();

  //   const inputNomRetenuOEC = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
  //   const inputDateAnneeTitulaire = screen.getAllByPlaceholderText("AAAA")[0];
  //   const inputRadioSexeTitulaire = screen.getAllByLabelText("Féminin")[0];
  //   const inputNomParent1 = screen.getByRole("textbox", { name: /parents.parent1.nom/i });
  //   const inputRadioSexeParent1 = screen.getAllByLabelText("Féminin")[1];

  //   await waitFor(() => {
  //     expect(inputNomRetenuOEC).toBeDefined();
  //     expect(inputDateAnneeTitulaire).toBeDefined();
  //     expect(inputRadioSexeTitulaire).toBeDefined();
  //     expect(inputNomParent1).toBeDefined();
  //     expect(inputRadioSexeParent1).toBeDefined();
  //   });

  //   await userEvent.type(inputNomRetenuOEC, "Nico");
  //   await userEvent.type(inputDateAnneeTitulaire, "2000");
  //   await userEvent.click(inputNomRetenuOEC);
  //   await userEvent.type(inputNomParent1, "Papa");
  //   await userEvent.click(inputRadioSexeParent1);
  //   const boutonEnregistrer = screen.getByRole("button", { name: /Enregistrer et visualiser/i });

  //   userEvent.click(boutonEnregistrer);
  //   const succes = vi.spyOn(messageManager, "showSuccessAndClose");
  //   await waitFor(() => {
  //     expect(succes).toHaveBeenCalled();
  //     // screen.debug();
  //   });
  // });
});
