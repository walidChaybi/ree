import { projetActeNaissanceDto, projetActeNaissancePatchDto, projetActeNaissancePostDto } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import {
  IProjetActeTranscritForm,
  ProjetActeNaissanceTranscriptionForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { describe, expect, test } from "vitest";

describe("Test des fonctions de mapping versDto et valeurs initiales", () => {
  const saisieProjetActeTranscriptionForm: IProjetActeTranscritForm = {
    titulaire: {
      nomActeEtranger: "Xi-phun bin",
      nomRetenuOEC: "Xi phun bin",
      nomSouhaite: "xiPhunBin",
      nomSecable: {
        nomPartie1: "Xi",
        nomPartie2: "phun bin",
        secable: false
      },
      prenomsChemin: PrenomsForm.depuisStringDto(["lao", "xiar", "sehoo"]),
      sexe: "FEMININ",
      dateNaissance: {
        jour: "03",
        mois: "12",
        annee: "2024",
        heure: "",
        minute: ""
      },
      villeNaissance: "Bejin",
      regionNaissance: "China",
      paysNaissance: "Chine",
      adresseNaissance: "Place du riz"
    },
    declarant: {
      identite: "TIERS",
      nom: "",
      prenomsChemin: PrenomsForm.valeursInitiales(),
      sexe: null,
      age: null,
      qualite: "",
      profession: "",
      sansProfession: false,
      domicile: {
        typeLieu: "Inconnu"
      }
    },
    parents: {
      parent1: {
        id: "c7651e32-560b-4227-be01-0c88a299b69c",
        position: 1,
        sexe: "MASCULIN",
        nomNaissance: "Greenwald",
        nom: "Greenwald",
        prenomsChemin: PrenomsForm.depuisStringDto(["cassandra"]),
        dateNaissance: {
          jour: "10",
          mois: "10",
          annee: "2000"
        },
        lieuNaissance: {
          typeLieu: "Inconnu",
          ville: "",
          adresse: "",
          departement: "",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        sansProfession: true,
        profession: "",
        domicile: {
          typeLieu: "France",
          ville: "Marseille",
          adresse: "11 place du boulodrôme",
          departement: "departement",
          arrondissement: "13",
          pays: "",
          etatProvince: ""
        },
        renseignerAge: false,
        age: ""
      },
      parent2: {
        id: "",
        position: 0,
        sexe: "FEMININ",
        nomNaissance: "",
        nom: "Xi Phun Bin",
        prenomsChemin: PrenomsForm.depuisStringDto(["Maman"]),
        dateNaissance: {
          jour: "",
          mois: "",
          annee: ""
        },
        lieuNaissance: {
          typeLieu: "France",
          ville: "Nantes",
          adresse: "hopital chu nantes",
          departement: "loire atlantique",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        sansProfession: false,
        profession: "Artiste",
        domicile: {
          typeLieu: "France",
          ville: "Marseille",
          adresse: "11 place du boulodrôme",
          departement: "13",
          arrondissement: "13",
          pays: "",
          etatProvince: ""
        },
        renseignerAge: true,
        age: "34"
      },
      domicileCommun: true
    },
    acteEtranger: {
      typeActe: "ACTE_DRESSE",
      referenceComplement: "ref.2024.12.pek",
      infoTypeActe: "",
      dateEnregistrement: {
        jour: "15",
        mois: "12",
        annee: "2024"
      },
      lieuEnregistrement: {
        ville: "Pekin",
        etatProvince: "china",
        pays: "Chine"
      },
      redacteur: "Ambassador"
    },
    mentions: {
      mentions: "il est fait mention de..."
    },
    formuleFinale: {
      identiteDemandeur: "PARENT_1",
      nom: "",
      prenomsChemin: PrenomsForm.valeursInitiales(),
      qualite: "",
      pieceProduite: "COPIES",
      autresPieces: "passeport",
      legalisationApostille: "LEGALISATION",
      modeDepot: "REMISE",
      identiteTransmetteur: "LE_REQUERANT"
    },
    autresEnonciations: {
      enonciations: "tewt tewxt"
    }
  };

  const projetActe = ProjetActeTranscrit.depuisDto(projetActeNaissanceDto);
  test("DOIT retourner les bonnes valeurs lors de l'appel de versDtoPost", () => {
    expect(ProjetActeNaissanceTranscriptionForm.versDtoPost(saisieProjetActeTranscriptionForm)).toStrictEqual(projetActeNaissancePostDto);
  });

  test("DOIT retourner les bonnes valeurs lors de l'appel de versDtoPatch", () => {
    expect(ProjetActeNaissanceTranscriptionForm.versDtoPatch(saisieProjetActeTranscriptionForm, projetActe!)).toStrictEqual(
      projetActeNaissancePatchDto
    );
  });

  test("DOIT faire le mapping correctement avec les valeurs initiales", () => {
    const valeursInitialesProjetActe = ProjetActeNaissanceTranscriptionForm.valeursInitiales(requeteCreationTranscription, projetActe);

    const valeursInitialesAttendues = {
      titulaire: {
        nomActeEtranger: "Toto",
        nomRetenuOEC: "Jo",
        nomSouhaite: "",
        nomSecable: {
          nomPartie1: "",
          nomPartie2: "",
          secable: false
        },
        prenomsChemin: {
          nombrePrenomsAffiches: 1,
          prenom1: "Michel",
          prenom10: "",
          prenom11: "",
          prenom12: "",
          prenom13: "",
          prenom14: "",
          prenom15: "",
          prenom2: "",
          prenom3: "",
          prenom4: "",
          prenom5: "",
          prenom6: "",
          prenom7: "",
          prenom8: "",
          prenom9: ""
        },
        sexe: "MASCULIN",
        dateNaissance: {
          jour: "12",
          mois: "10",
          annee: "1966",
          heure: "10",
          minute: "10"
        },
        villeNaissance: "Nantes",
        regionNaissance: "",
        paysNaissance: "France",
        adresseNaissance: ""
      },
      parents: {
        parent1: {
          age: "12",
          dateNaissance: {
            annee: "2010",
            jour: "05",
            mois: "05"
          },
          domicile: {
            adresse: "",
            arrondissement: "",
            departement: "",
            etatProvince: "",
            pays: "France",
            typeLieu: "France",
            ville: ""
          },
          lieuNaissance: {
            adresse: "",
            arrondissement: "",
            departement: undefined,
            etatProvince: "",
            pays: "France",
            typeLieu: "France",
            ville: "Nantes"
          },
          nom: "Perez",
          prenomsChemin: {
            nombrePrenomsAffiches: 1,
            prenom1: "Joseph",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: "",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: ""
          },
          profession: "Banquier",
          renseignerAge: false,
          sansProfession: true,
          sexe: "MASCULIN"
        },
        parent2: {
          age: "",
          dateNaissance: {
            annee: "",
            jour: "",
            mois: ""
          },
          domicile: {
            adresse: "",
            arrondissement: "",
            departement: "",
            etatProvince: "",
            pays: "",
            typeLieu: "Inconnu",
            ville: ""
          },
          lieuNaissance: {
            adresse: "",
            arrondissement: "",
            departement: undefined,
            etatProvince: "",
            pays: "",
            typeLieu: "Inconnu",
            ville: ""
          },
          nom: "",
          prenomsChemin: {
            nombrePrenomsAffiches: 1,
            prenom1: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: "",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: ""
          },
          profession: "",
          renseignerAge: false,
          sansProfession: false,
          sexe: ""
        },
        domicileCommun: false
      },
      declarant: {
        identite: "TIERS",
        nom: "Garcion",
        prenomsChemin: {
          nombrePrenomsAffiches: 1,
          prenom1: "Patrick",
          prenom10: "",
          prenom11: "",
          prenom12: "",
          prenom13: "",
          prenom14: "",
          prenom15: "",
          prenom2: "",
          prenom3: "",
          prenom4: "",
          prenom5: "",
          prenom6: "",
          prenom7: "",
          prenom8: "",
          prenom9: ""
        },
        sexe: "INCONNU",
        age: 52,
        qualite: "le copain",
        profession: "",
        sansProfession: false,
        domicile: {
          typeLieu: "Étranger",
          ville: "Tunis",
          departement: "",
          etatProvince: "",
          pays: "Tunisie",
          adresse: "",
          arrondissement: ""
        },
        complement: ""
      },
      autresEnonciations: {
        enonciations: ""
      },
      acteEtranger: {
        typeActe: "ACTE_DRESSE",
        infoTypeActe: "",
        dateEnregistrement: {
          jour: "",
          mois: "",
          annee: ""
        },
        lieuEnregistrement: {
          ville: "",
          etatProvince: "",
          pays: ""
        },
        redacteur: "redacteur acte",
        referenceComplement: "referenceComplement acte"
      },
      mentions: {
        mentions: ""
      },
      formuleFinale: {
        identiteDemandeur: "PARENT_1",
        nom: "nom formule finale",
        prenomsChemin: {
          nombrePrenomsAffiches: 2,
          prenom1: "Rachid",
          prenom2: "Antoine",
          prenom10: "",
          prenom11: "",
          prenom12: "",
          prenom13: "",
          prenom14: "",
          prenom15: "",
          prenom3: "",
          prenom4: "",
          prenom5: "",
          prenom6: "",
          prenom7: "",
          prenom8: "",
          prenom9: ""
        },
        qualite: "",
        pieceProduite: "COPIE",
        autresPieces: "",
        legalisationApostille: "",
        modeDepot: "TRANSMISE",
        identiteTransmetteur: "LE_REQUERANT"
      }
    };

    expect(valeursInitialesProjetActe).toStrictEqual(valeursInitialesAttendues);
  });
});
describe("Test des fonctions de mapping de la saisie projet d'acte transcrit TIERS", () => {
  const saisieProjetActeTranscriptionTiers: IProjetActeTranscritForm = {
    titulaire: {
      nomActeEtranger: "greenwald",
      nomRetenuOEC: "prenomUn prenomDeux prenomTrois",
      nomSouhaite: "",
      nomSecable: {
        nomPartie1: "prenomUn prenomDeux",
        nomPartie2: "prenomTrois",
        secable: true
      },
      prenomsChemin: PrenomsForm.depuisStringDto(["Consulaire"]),
      sexe: "FEMININ",
      dateNaissance: {
        jour: "19",
        mois: "01",
        annee: "2025",
        heure: "09",
        minute: "42"
      },
      villeNaissance: "",
      regionNaissance: "",
      paysNaissance: "",
      adresseNaissance: ""
    },
    declarant: {
      identite: "TIERS",
      nom: "LeTiers",
      prenomsChemin: PrenomsForm.depuisStringDto(["Prenom"]),
      sexe: "MASCULIN",
      age: 45,
      qualite: "La grand frère",
      profession: "plombier",
      sansProfession: false,
      domicile: {
        typeLieu: "Étranger",
        ville: "Pekin",
        etatProvince: "china",
        pays: "Chine",
        adresse: "21 jump street"
      },
      complement: "Chez qui..."
    },
    parents: {
      parent1: {
        id: "c7e0e767-438c-4e42-83c1-e0c74d6bbd9d",
        position: 1,
        sexe: "MASCULIN",
        nomNaissance: "Patamob",
        nom: "Patamob",
        prenomsChemin: PrenomsForm.depuisStringDto(["cassandra"]),
        dateNaissance: {
          jour: "",
          mois: "",
          annee: ""
        },
        lieuNaissance: {
          typeLieu: "Étranger",
          ville: "Pekin",
          adresse: "",
          departement: "",
          arrondissement: "",
          pays: "Chine",
          etatProvince: ""
        },
        sansProfession: false,
        profession: "sculpteur",
        domicile: {
          typeLieu: "Inconnu",
          ville: "",
          adresse: "",
          departement: "",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        renseignerAge: true,
        age: "34"
      },
      parent2: {
        id: "",
        position: 0,
        sexe: "FEMININ",
        nomNaissance: "",
        nom: "Patamob",
        prenomsChemin: PrenomsForm.depuisStringDto(["Maman"]),
        dateNaissance: {
          jour: "10",
          mois: "10",
          annee: "2000"
        },
        lieuNaissance: {
          typeLieu: "France",
          ville: "Nantes",
          adresse: "",
          departement: "Loire atlantique",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        sansProfession: false,
        profession: "UX Designer",
        domicile: {
          typeLieu: "France",
          ville: "Nantes",
          adresse: "36 tour Lu",
          departement: "loire atlantique",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        renseignerAge: false,
        age: ""
      }
    },
    acteEtranger: {
      typeActe: "AUTRE",
      referenceComplement: "REF.2454.14245",
      infoTypeActe: "acte divers",
      dateEnregistrement: {
        jour: "12",
        mois: "01",
        annee: "2025"
      },
      lieuEnregistrement: {
        ville: "Pekin",
        pays: "Chine"
      },
      redacteur: "officier"
    },
    mentions: {
      mentions: "RAS"
    },
    formuleFinale: {
      identiteDemandeur: "TIERS",
      nom: "nomDemandeur",
      prenomsChemin: PrenomsForm.depuisStringDto(["Prenom", "Demandeur"]),
      qualite: "Agent",
      pieceProduite: "COPIE",
      autresPieces: "",
      legalisationApostille: "APOSTILLE",
      modeDepot: "TRANSMISE",
      identiteTransmetteur: "LE_REQUERANT"
    },
    autresEnonciations: {
      enonciations: "RAS"
    }
  };

  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu donné 'TIERS'", () => {
    const projetActeTranscriptionTiers = {
      acteEtranger: {
        adresseEnregistrement: {
          pays: "Chine",
          ville: "Pekin",
          region: ""
        },
        anneeEnregistrement: "2025",
        cadreNaissance: "NE_DANS_LE_MARIAGE",
        complement: "REF.2454.14245",
        jourEnregistrement: "12",
        mentions: "RAS",
        moisEnregistrement: "01",
        redacteur: "officier",
        reference: "REF.2454.14245",
        texteEnonciations: "RAS",
        infoTypeActe: "acte divers",
        typeActeEtranger: "AUTRE"
      },
      analyseMarginales: [],
      declarant: {
        adresseDomicile: {
          arrondissement: "",
          pays: "Chine",
          region: "china",
          ville: "Pekin",
          voie: "21 jump street"
        },
        age: 45,
        complementDeclarant: "Chez qui...",
        identiteDeclarant: "TIERS",
        nom: "LeTiers",
        prenoms: [
          {
            numeroOrdre: 1,
            prenom: "Prenom"
          }
        ],
        profession: "plombier",
        qualite: "La grand frère",
        sansProfession: null,
        sexe: "MASCULIN"
      },
      evenement: {
        annee: 2025,
        departement: null,
        heure: 9,
        jour: 19,
        minute: 42,
        mois: 1,
        neDansLeMariage: true,
        pays: null,
        region: null,
        ville: null,
        arrondissement: null,
        voie: null
      },
      formuleFinale: {
        autresPieces: "",
        identiteDemandeur: "TIERS",
        identiteTransmetteur: "LE_REQUERANT",
        legalisation: "APOSTILLE",
        modeDepot: "TRANSMISE",
        nomDemandeur: "nomDemandeur",
        nomTransmetteur: "nomDemandeur",
        pieceProduite: "COPIE",
        prenomDemandeur: "Prenom, Demandeur",
        qualiteDemandeur: "Agent"
      },
      mentions: [],
      titulaires: [
        {
          domicile: null,
          filiations: [
            {
              age: 34,
              domicile: {
                arrondissement: undefined,
                voie: undefined,
                pays: "",
                ville: "",
                region: ""
              },
              domicileCommun: null,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: null,
                departement: null,
                heure: null,
                jour: null,
                minute: null,
                mois: null,
                neDansLeMariage: null,
                pays: "Chine",
                arrondissement: null,
                voie: null,
                region: null,
                ville: "Pekin"
              },
              nom: "Patamob",
              ordre: 1,
              prenoms: ["cassandra"],
              profession: "sculpteur",
              sansProfession: false,
              sexe: "MASCULIN"
            },
            {
              age: null,
              domicile: {
                arrondissement: undefined,
                pays: "France",
                region: "loire atlantique",
                ville: "Nantes",
                voie: "36 tour Lu"
              },
              domicileCommun: null,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: 2000,
                departement: "Loire atlantique",
                heure: null,
                jour: 10,
                minute: null,
                mois: 10,
                neDansLeMariage: null,
                pays: "France",
                region: "Loire atlantique",
                ville: "Nantes",
                arrondissement: null,
                voie: null
              },
              nom: "Patamob",
              ordre: 2,
              prenoms: ["Maman"],
              profession: "UX Designer",
              sansProfession: false,
              sexe: "FEMININ"
            }
          ],
          naissance: {
            annee: 2025,
            departement: null,
            heure: 9,
            jour: 19,
            minute: 42,
            mois: 1,
            neDansLeMariage: true,
            pays: null,
            arrondissement: null,
            voie: null,
            region: null,
            ville: null
          },
          nom: "prenomUn prenomDeux prenomTrois",
          nomActeEtranger: "greenwald",
          nomPartie1: "prenomUn prenomDeux",
          nomPartie2: "prenomTrois",
          ordre: 1,
          pasDePrenom: false,
          prenoms: ["Consulaire"],
          sexe: "FEMININ"
        }
      ],
      visibiliteArchiviste: "NON",
      modeCreation: ETypeRedactionActe.TRANSCRIT,
      nature: "NAISSANCE"
    };
    expect(ProjetActeNaissanceTranscriptionForm.versDtoPost(saisieProjetActeTranscriptionTiers)).toStrictEqual(
      projetActeTranscriptionTiers
    );
  });
});
