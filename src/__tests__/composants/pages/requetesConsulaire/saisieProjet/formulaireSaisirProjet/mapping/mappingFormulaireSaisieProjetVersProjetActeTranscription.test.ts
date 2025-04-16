import { IActeEtranger } from "@model/etatcivil/acte/projetActe/IActeEtrangerProjetActe";
import { IDeclarantDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IDeclarantDto";
import { IFormuleFinaleDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IFormuleFinaleDto";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { describe, expect, test } from "vitest";
import { mapProjetActeTranscritFormVersDto } from "../../../../../../../composants/pages/requetesConsulaire/saisieProjet/mapping/mapProjetActeTranscritFormVersDto";

describe("test des fonction de mapping de la saisie projet d'acte transcrit", () => {
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
      secable: true,
      villeNaissance: "Bejin",
      regionNaissance: "China",
      paysNaissance: "Chine",
      adresseNaissance: "Place du riz"
    },
    declarant: {
      identite: "PERE",
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
          departement: "13",
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
      identiteDemandeur: "PERE",
      nom: "",
      prenomsChemin: PrenomsForm.valeursInitiales(),
      qualite: "",
      pieceProduite: "COPIES",
      autresPieces: "passeport",
      legalisationApostille: "LEGALISATION",
      modeDepot: "REMISE",
      identiteTransmetteur: "Identique au demandeur"
    },
    autresEnonciations: {
      enonciations: "tewt tewxt"
    }
  };
  const resultat = mapProjetActeTranscritFormVersDto(saisieProjetActeTranscriptionForm);

  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'acte etranger' au format attendu", () => {
    const acteEtrangerProjetActe: IActeEtranger = {
      texteEnonciations: "tewt tewxt",
      typeActeEtranger: "ACTE_DRESSE",
      infoTypeActe: null,
      cadreNaissance: "NE_DANS_LE_MARIAGE",
      jourEnregistrement: "15",
      moisEnregistrement: "12",
      anneeEnregistrement: "2024",
      adresseEnregistrement: { ville: "Pekin", region: "china", pays: "Chine", arrondissement: null, voie: null },
      redacteur: "Ambassador",
      reference: "ref.2024.12.pek",
      complement: "ref.2024.12.pek",
      mentions: "il est fait mention de..."
    };
    expect(resultat.acteEtranger).toStrictEqual(acteEtrangerProjetActe);
  });
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'formule finale' au format attendu", () => {
    const formuleFinaleProjetActe: IFormuleFinaleDto = {
      identiteDemandeur: "PERE",
      nomDemandeur: null,
      prenomDemandeur: null,
      qualiteDemandeur: null,
      pieceProduite: "COPIES",
      legalisation: "LEGALISATION",
      autresPieces: "passeport",
      modeDepot: "REMISE",
      identiteTransmetteur: "PERE",
      nomTransmetteur: null
    };
    expect(resultat.formuleFinale).toStrictEqual(formuleFinaleProjetActe);
  });
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'declarant' au format attendu", () => {
    const declarantProjetActe: IDeclarantDto = {
      identiteDeclarant: "PERE",
      adresseDomicile: {
        arrondissement: null,
        pays: null,
        region: null,
        ville: null,
        voie: null
      },
      age: null,
      complementDeclarant: null,
      nom: null,
      prenoms: null,
      profession: null,
      qualite: null,
      sansProfession: null,
      sexe: null
    };
    expect(resultat.declarant).toStrictEqual(declarantProjetActe);
  });
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu", () => {
    const projetActeTranscription: IProjetActeTranscritDto = {
      acteEtranger: {
        adresseEnregistrement: {
          arrondissement: null,
          pays: "Chine",
          region: "china",
          ville: "Pekin",
          voie: null
        },
        anneeEnregistrement: "2024",
        cadreNaissance: "NE_DANS_LE_MARIAGE",
        complement: "ref.2024.12.pek",
        jourEnregistrement: "15",
        mentions: "il est fait mention de...",
        moisEnregistrement: "12",
        redacteur: "Ambassador",
        reference: "ref.2024.12.pek",
        texteEnonciations: "tewt tewxt",
        infoTypeActe: null,
        typeActeEtranger: "ACTE_DRESSE"
      },
      analyseMarginales: null,
      declarant: {
        adresseDomicile: {
          arrondissement: null,
          pays: null,
          region: null,
          ville: null,
          voie: null
        },
        age: null,
        complementDeclarant: null,
        identiteDeclarant: "PERE",
        nom: null,
        prenoms: null,
        profession: null,
        qualite: null,
        sansProfession: null,
        sexe: null
      },
      evenement: {
        annee: 2024,
        arrondissement: null,
        departement: null,
        heure: null,
        jour: 3,
        minute: null,
        mois: 12,
        neDansLeMariage: true,
        pays: "Chine",
        region: "China",
        ville: "Bejin",
        voie: "Place du riz"
      },
      formuleFinale: {
        autresPieces: "passeport",
        identiteDemandeur: "PERE",
        identiteTransmetteur: "PERE",
        legalisation: "LEGALISATION",
        modeDepot: "REMISE",
        nomDemandeur: null,
        nomTransmetteur: null,
        pieceProduite: "COPIES",
        prenomDemandeur: null,
        qualiteDemandeur: null
      },
      mentions: null,
      modeCreation: "TRANSCRIT",
      nature: "NAISSANCE",
      titulaires: [
        {
          domicile: {
            arrondissement: null,
            pays: "Chine",
            region: "China",
            ville: "Bejin",
            voie: "Place du riz"
          },
          filiations: [
            {
              age: null,
              domicile: {
                arrondissement: "13",
                pays: "France",
                region: "13",
                ville: "Marseille",
                voie: "11 place du boulodrôme"
              },
              domicileCommun: null,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: 2000,
                arrondissement: null,
                departement: null,
                heure: null,
                jour: 10,
                minute: null,
                mois: 10,
                neDansLeMariage: null,
                pays: null,
                region: null,
                ville: null,
                voie: null
              },
              nom: "Greenwald",
              ordre: 1,
              prenoms: ["cassandra"],
              profession: null,
              sansProfession: true,
              sexe: "MASCULIN"
            },
            {
              age: 34,
              domicile: null,
              domicileCommun: true,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: null,
                arrondissement: null,
                departement: "loire atlantique",
                heure: null,
                jour: null,
                minute: null,
                mois: null,
                neDansLeMariage: null,
                pays: "France",
                region: "loire atlantique",
                ville: "Nantes",
                voie: "hopital chu nantes"
              },
              nom: "Xi Phun Bin",
              ordre: 2,
              prenoms: ["Maman"],
              profession: "Artiste",
              sansProfession: false,
              sexe: "FEMININ"
            }
          ],
          naissance: {
            annee: 2024,
            arrondissement: null,
            departement: null,
            heure: null,
            jour: 3,
            minute: null,
            mois: 12,
            neDansLeMariage: true,
            pays: "Chine",
            region: "China",
            ville: "Bejin",
            voie: "Place du riz"
          },
          nom: "Xi phun bin",
          nomActeEtranger: "Xi-phun bin",
          nomPartie1: "Xi",
          nomPartie2: "phun bin",
          ordre: 1,
          pasDePrenom: false,
          prenoms: ["lao", "xiar", "sehoo"],
          reconnuPar: null,
          sexe: "FEMININ"
        }
      ],
      visibiliteArchiviste: "NON"
    };

    expect(resultat).toStrictEqual(projetActeTranscription);
  });
});
describe("test des fonction de mapping de la saisie projet d'acte transcrit TIERS", () => {
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
      secable: null,
      villeNaissance: "",
      regionNaissance: "",
      paysNaissance: "",
      adresseNaissance: ""
    },
    declarant: {
      identite: "TIERS",
      nom: "LeTiers",
      prenomsChemin: PrenomsForm.depuisStringDto(["Prenom"]),
      sexe: Sexe.MASCULIN.libelle.toUpperCase(),
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
      identiteTransmetteur: "Identique au demandeur"
    },
    autresEnonciations: {
      enonciations: "RAS"
    }
  };
  const resultatTiers = mapProjetActeTranscritFormVersDto(saisieProjetActeTranscriptionTiers);
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu donné 'TIERS'", () => {
    const projetActeTranscriptionTiers: IProjetActeTranscritDto = {
      acteEtranger: {
        adresseEnregistrement: {
          arrondissement: null,
          pays: "Chine",
          region: null,
          ville: "Pekin",
          voie: null
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
      analyseMarginales: null,
      declarant: {
        adresseDomicile: {
          arrondissement: null,
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
        arrondissement: null,
        departement: null,
        heure: 9,
        jour: 19,
        minute: 42,
        mois: 1,
        neDansLeMariage: true,
        pays: null,
        region: null,
        ville: null,
        voie: null
      },
      formuleFinale: {
        autresPieces: null,
        identiteDemandeur: "TIERS",
        identiteTransmetteur: "TIERS",
        legalisation: "APOSTILLE",
        modeDepot: "TRANSMISE",
        nomDemandeur: "nomDemandeur",
        nomTransmetteur: "nomDemandeur",
        pieceProduite: "COPIE",
        prenomDemandeur: "Prenom,Demandeur",
        qualiteDemandeur: "Agent"
      },
      mentions: null,
      modeCreation: "TRANSCRIT",
      nature: "NAISSANCE",
      titulaires: [
        {
          domicile: null,
          filiations: [
            {
              age: 34,
              domicile: {
                arrondissement: null,
                pays: null,
                region: null,
                ville: null,
                voie: null
              },
              domicileCommun: null,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: null,
                arrondissement: null,
                departement: null,
                heure: null,
                jour: null,
                minute: null,
                mois: null,
                neDansLeMariage: null,
                pays: "Chine",
                region: null,
                ville: "Pekin",
                voie: null
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
                arrondissement: null,
                pays: "France",
                region: "loire atlantique",
                ville: "Nantes",
                voie: "36 tour Lu"
              },
              domicileCommun: null,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: 2000,
                arrondissement: null,
                departement: "Loire atlantique",
                heure: null,
                jour: 10,
                minute: null,
                mois: 10,
                neDansLeMariage: null,
                pays: "France",
                region: "Loire atlantique",
                ville: "Nantes",
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
            arrondissement: null,
            departement: null,
            heure: 9,
            jour: 19,
            minute: 42,
            mois: 1,
            neDansLeMariage: true,
            pays: null,
            region: null,
            ville: null,
            voie: null
          },
          nom: "prenomUn prenomDeux prenomTrois",
          nomActeEtranger: "greenwald",
          nomPartie1: "prenomUn prenomDeux",
          nomPartie2: "prenomTrois",
          ordre: 1,
          pasDePrenom: false,
          prenoms: ["Consulaire"],
          reconnuPar: null,
          sexe: "FEMININ"
        }
      ],
      visibiliteArchiviste: "NON"
    };
    expect(resultatTiers).toStrictEqual(projetActeTranscriptionTiers);
  });
});
describe("test des fonctions non testée précedement", () => {
  const saisieProjetActeTranscriptionNull: IProjetActeTranscritForm = {
    titulaire: {
      nomActeEtranger: "greenwald",
      nomRetenuOEC: "prenomUn prenomDeux prenomTrois",
      nomSouhaite: "",
      nomSecable: {
        nomPartie1: "",
        nomPartie2: "",
        secable: false
      },
      prenomsChemin: PrenomsForm.depuisStringDto(["Consulaire"]),
      sexe: "FEMININ",
      dateNaissance: {
        jour: "",
        mois: "",
        annee: "2025",
        heure: "",
        minute: ""
      },
      secable: false,
      villeNaissance: null,
      regionNaissance: null,
      paysNaissance: null,
      adresseNaissance: null
    },
    declarant: {
      identite: "TIERS",
      nom: "LeTiers",
      prenomsChemin: PrenomsForm.depuisStringDto(["Toto"]),
      sexe: Sexe.MASCULIN.libelle.toUpperCase(),
      age: null,
      qualite: "",
      profession: "",
      sansProfession: true,
      domicile: {
        typeLieu: "Inconnu"
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
          typeLieu: "Inconnu"
        },
        sansProfession: true,
        profession: "",
        domicile: {
          typeLieu: "Inconnu"
        },
        renseignerAge: false
      },
      parent2: {}
    },
    acteEtranger: {
      referenceComplement: ""
    },
    mentions: {},
    formuleFinale: {
      identiteDemandeur: "TIERS",
      nom: "nomDemandeur",
      prenomsChemin: PrenomsForm.depuisStringDto(["Prenom", "Demandeur"]),
      qualite: "Agent",
      pieceProduite: "COPIE",
      autresPieces: "",
      legalisationApostille: "APOSTILLE",
      modeDepot: "TRANSMISE",
      identiteTransmetteur: "Identique au demandeur"
    },
    autresEnonciations: {
      enonciations: ""
    }
  };
  const resultatTiers = mapProjetActeTranscritFormVersDto(saisieProjetActeTranscriptionNull);
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu", () => {
    const projetActeTranscriptionNull: IProjetActeTranscritDto = {
      acteEtranger: {
        adresseEnregistrement: {
          arrondissement: null,
          pays: null,
          region: null,
          ville: null,
          voie: null
        },
        anneeEnregistrement: null,
        cadreNaissance: "NE_DANS_LE_MARIAGE",
        complement: null,
        jourEnregistrement: null,
        mentions: null,
        moisEnregistrement: null,
        redacteur: null,
        reference: null,
        texteEnonciations: null,
        infoTypeActe: null,
        typeActeEtranger: null
      },
      analyseMarginales: null,
      declarant: {
        adresseDomicile: {
          arrondissement: null,
          pays: null,
          region: null,
          ville: null,
          voie: null
        },
        age: null,
        complementDeclarant: "Chez qui...",
        identiteDeclarant: "TIERS",
        nom: "LeTiers",
        prenoms: [
          {
            numeroOrdre: 1,
            prenom: "Toto"
          }
        ],
        profession: null,
        qualite: null,
        sansProfession: true,
        sexe: "MASCULIN"
      },
      evenement: {
        annee: 2025,
        arrondissement: null,
        departement: null,
        heure: null,
        jour: null,
        minute: null,
        mois: null,
        neDansLeMariage: true,
        pays: null,
        region: null,
        ville: null,
        voie: null
      },
      formuleFinale: {
        autresPieces: null,
        identiteDemandeur: "TIERS",
        identiteTransmetteur: "TIERS",
        legalisation: "APOSTILLE",
        modeDepot: "TRANSMISE",
        nomDemandeur: "nomDemandeur",
        nomTransmetteur: "nomDemandeur",
        pieceProduite: "COPIE",
        prenomDemandeur: "Prenom,Demandeur",
        qualiteDemandeur: "Agent"
      },
      mentions: null,
      modeCreation: "TRANSCRIT",
      nature: "NAISSANCE",
      titulaires: [
        {
          domicile: null,
          filiations: [
            {
              age: null,
              domicile: {
                arrondissement: null,
                pays: null,
                region: null,
                ville: null,
                voie: null
              },
              domicileCommun: null,
              lienParente: LienParente.PARENT,
              naissance: {
                annee: null,
                arrondissement: null,
                departement: null,
                heure: null,
                jour: null,
                minute: null,
                mois: null,
                neDansLeMariage: null,
                pays: null,
                region: null,
                ville: null,
                voie: null
              },
              nom: "Patamob",
              ordre: 1,
              prenoms: ["cassandra"],
              profession: null,
              sansProfession: true,
              sexe: "MASCULIN"
            }
          ],
          naissance: {
            annee: 2025,
            arrondissement: null,
            departement: null,
            heure: null,
            jour: null,
            minute: null,
            mois: null,
            neDansLeMariage: true,
            pays: null,
            region: null,
            ville: null,
            voie: null
          },
          nom: "prenomUn prenomDeux prenomTrois",
          nomActeEtranger: "greenwald",
          nomPartie1: null,
          nomPartie2: null,
          ordre: 1,
          pasDePrenom: false,
          prenoms: ["Consulaire"],
          reconnuPar: null,
          sexe: "FEMININ"
        }
      ],
      visibiliteArchiviste: "NON"
    };
    expect(resultatTiers).toStrictEqual(projetActeTranscriptionNull);
  });
});
