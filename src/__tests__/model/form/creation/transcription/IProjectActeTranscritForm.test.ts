import { projetActe, projetActeNaissancePatchDto, projetActeNaissancePostDto } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { IProjetActeTranscritPostDto } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { ELienParente } from "@model/etatcivil/enum/ELienParente";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
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
      lieuNaissance: {
        preposition: "A",
        ville: "Bejin",
        region: "China",
        pays: "Chine",
        adresse: "Place du riz"
      }
    },
    declarant: {
      identite: "PERE",
      complement: "",
      nom: "",
      prenomsChemin: PrenomsForm.valeursInitiales(),
      sexe: "INCONNU",
      age: "",
      qualite: "",
      profession: "",
      sansProfession: false,
      domicile: {
        typeLieu: "Inconnu"
      }
    },
    parents: {
      parent1: {
        sexe: "MASCULIN",
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
          departement: "",
          arrondissement: "",
          pays: "",
          etatProvince: "",
          preposition: "A"
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
          etatProvince: "",
          preposition: "A"
        },
        renseignerAge: false,
        age: ""
      },
      parent2: {
        sexe: "FEMININ",
        nom: "Xi Phun Bin",
        prenomsChemin: PrenomsForm.depuisStringDto(["Maman"]),
        dateNaissance: {
          jour: "",
          mois: "",
          annee: "1966"
        },
        lieuNaissance: {
          typeLieu: "France",
          ville: "Nantes",
          departement: "loire atlantique",
          arrondissement: "",
          pays: "",
          etatProvince: "",
          preposition: "A"
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
        pays: "Chine",
        preposition: "A"
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
      identiteTransmetteur: "LE_REQUERANT",
      phraseSignature: "Titres Honorifiques, Qualité, Fonction,",
      libelleDecret: ""
    },
    autresEnonciations: {
      enonciations: "tewt tewxt"
    },
    soumissionFormulaire: {
      avecEnregistrement: false,
      action: null,
      avecMajStatut: false,
      apresEnregistrement: false
    }
  };
  test("DOIT retourner les bonnes valeurs lors de l'appel de versDtoPost", () => {
    expect(ProjetActeNaissanceTranscriptionForm.versDtoPost(saisieProjetActeTranscriptionForm, requeteCreationTranscription)).toStrictEqual(
      projetActeNaissancePostDto
    );
  });

  test("DOIT retourner les bonnes valeurs lors de l'appel de versDtoPatch", () => {
    expect(
      ProjetActeNaissanceTranscriptionForm.versDtoPatch(saisieProjetActeTranscriptionForm, projetActe!, requeteCreationTranscription)
    ).toStrictEqual(projetActeNaissancePatchDto);
  });

  test("DOIT faire le mapping correctement avec les valeurs initiales", () => {
    const valeursInitialesProjetActe = ProjetActeNaissanceTranscriptionForm.valeursInitiales(requeteCreationTranscription, projetActe);

    const valeursInitialesAttendues: IProjetActeTranscritForm = {
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
        lieuNaissance: {
          preposition: "A",
          ville: "Nantes",
          region: "",
          pays: "France",
          adresse: ""
        }
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
            departement: "Loire-atlantique",
            etatProvince: "",
            pays: "France",
            typeLieu: "France",
            ville: "Nantes",
            preposition: "A"
          },
          lieuNaissance: {
            arrondissement: "",
            departement: "Loire-atlantique",
            etatProvince: "",
            pays: "France",
            typeLieu: "France",
            ville: "Nantes",
            preposition: "A"
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
            ville: "",
            preposition: "A"
          },
          lieuNaissance: {
            arrondissement: "",
            departement: "",
            etatProvince: "",
            pays: "",
            typeLieu: "Inconnu",
            ville: "",
            preposition: "A"
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
        age: "52",
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
          arrondissement: "",
          preposition: "A"
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
          pays: "",
          preposition: "A"
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
        identiteTransmetteur: "LE_REQUERANT",
        phraseSignature: "Titres Honorifiques, Qualité, Fonction,",
        libelleDecret: ""
      },
      soumissionFormulaire: {
        avecEnregistrement: false,
        action: null,
        avecMajStatut: false,
        apresEnregistrement: false
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
      lieuNaissance: {
        preposition: "A",
        ville: "",
        region: "",
        pays: "",
        adresse: ""
      }
    },
    declarant: {
      identite: "TIERS",
      nom: "LeTiers",
      prenomsChemin: PrenomsForm.depuisStringDto(["Prenom"]),
      sexe: "MASCULIN",
      age: "45",
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
        sexe: "MASCULIN",
        nom: "Patamob",
        prenomsChemin: PrenomsForm.depuisStringDto(["cassandra"]),
        dateNaissance: {
          jour: "",
          mois: "",
          annee: "1966"
        },
        lieuNaissance: {
          typeLieu: "Étranger",
          ville: "Pekin",
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
        sexe: "FEMININ",
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
      },
      domicileCommun: false
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
        pays: "Chine",
        etatProvince: "",
        preposition: "A"
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
      identiteTransmetteur: "LE_REQUERANT",
      phraseSignature: "Titres Honorifiques, Qualité, Fonction,",
      libelleDecret: ""
    },
    autresEnonciations: {
      enonciations: "RAS"
    },
    soumissionFormulaire: {
      avecEnregistrement: false,
      action: null,
      avecMajStatut: false,
      apresEnregistrement: false
    }
  };

  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu donné 'TIERS'", () => {
    const projetActeTranscriptionTiers: IProjetActeTranscritPostDto = {
      acteEtranger: {
        adresseEnregistrement: {
          pays: "Chine",
          ville: "Pekin",
          region: undefined,
          prepositionLieu: "A"
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
          arrondissement: undefined,
          pays: "Chine",
          region: "china",
          ville: "Pekin",
          voie: "21 jump street",
          prepositionLieu: undefined
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
        sansProfession: undefined,
        sexe: "MASCULIN"
      },
      evenement: {
        annee: 2025,
        heure: 9,
        jour: 19,
        minute: 42,
        mois: 1,
        neDansLeMariage: true,
        pays: undefined,
        region: undefined,
        ville: undefined,
        voie: undefined,
        prepositionLieu: undefined
      },
      formuleFinale: {
        autresPieces: undefined,
        identiteDemandeur: "TIERS",
        identiteTransmetteur: "LE_REQUERANT",
        legalisation: "APOSTILLE",
        modeDepot: "TRANSMISE",
        nomDemandeur: "nomDemandeur",
        pieceProduite: "COPIE",
        prenomDemandeur: "Prenom, Demandeur",
        qualiteDemandeur: "Agent"
      },
      mentions: [],
      titulaires: [
        {
          filiations: [
            {
              age: 34,
              domicile: {
                arrondissement: undefined,
                voie: undefined,
                pays: undefined,
                ville: undefined,
                region: undefined,
                prepositionLieu: undefined
              },
              domicileCommun: undefined,
              lienParente: ELienParente.PARENT,
              naissance: {
                annee: 1966,
                departement: undefined,
                heure: undefined,
                jour: undefined,
                minute: undefined,
                mois: undefined,
                pays: "Chine",
                arrondissement: undefined,
                region: undefined,
                ville: "Pekin",
                prepositionLieu: undefined
              },
              nom: "Patamob",
              ordre: 1,
              prenoms: ["cassandra"],
              profession: "sculpteur",
              sansProfession: false,
              sexe: "MASCULIN"
            },
            {
              age: undefined,
              domicile: {
                arrondissement: undefined,
                pays: "France",
                region: "loire atlantique",
                ville: "Nantes",
                voie: "36 tour Lu",
                prepositionLieu: undefined
              },
              domicileCommun: undefined,
              lienParente: ELienParente.PARENT,
              naissance: {
                annee: 2000,
                departement: "Loire atlantique",
                heure: undefined,
                jour: 10,
                minute: undefined,
                mois: 10,
                pays: "France",
                region: "Loire atlantique",
                ville: "Nantes",
                arrondissement: undefined,
                prepositionLieu: undefined
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
            heure: 9,
            jour: 19,
            minute: 42,
            mois: 1,
            pays: undefined,
            voie: undefined,
            neDansLeMariage: true,
            region: undefined,
            ville: undefined,
            prepositionLieu: undefined
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
      nature: "NAISSANCE",
      typeRegistre: {
        id: "7a091a3b-6835-4824-94fb-527d62926d45",
        poste: "CASABLANCA"
      }
    };
    expect(
      ProjetActeNaissanceTranscriptionForm.versDtoPost(saisieProjetActeTranscriptionTiers, requeteCreationTranscription)
    ).toStrictEqual(projetActeTranscriptionTiers);
  });
});
