import { IActeEtranger } from "@model/etatcivil/acte/projetActe/IActeEtrangerProjetActe";
import { IAnalyseMarginaleDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IAnalyseMarginaleDto";
import { IDeclarantDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IDeclarantDto";
import { IFormuleFinaleDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IFormuleFinaleDto";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { IProjetActeTranscritForm } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { describe, expect, test } from "vitest";
import { mapProjetActeTranscritFormVersDto } from "../../../../../../../composants/pages/requetesConsulaire/saisieProjet/mapping/mapProjetActeTranscritFormVersDto";

/** TODO: Réparation des TU le Lundi 31 Mars @ Adrien_Bonvin */
describe.skip("test des fonction de mapping de la saisie projet d'acte transcrit", () => {
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
      prenomsChemin: {
        prenom1: "lao",
        prenom2: "xiar",
        prenom3: "sehoo"
      },
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
      prenomsChemin: {
        prenom1: "",
        nombrePrenomsAffiches: 1
      },
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
        prenomsChemin: {
          prenom1: "cassandra"
        },
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
        prenomsChemin: {
          prenom1: "Maman"
        },
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
      typeActeAutre: "",
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
      prenomsChemin: {
        prenom1: ""
      },
      qualite: "",
      piecesProduites: "COPIES",
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
      typeActe: null,
      cadreNaissance: "NE_DANS_LE_MARIAGE",
      jourEnregistrement: "15",
      moisEnregistrement: "12",
      anneeEnregistrement: "2024",
      adresseEnregistrement: { ville: "Pekin", region: "china", pays: "Chine" },
      redacteur: "Ambassador",
      referenceEtComplement: "ref.2024.12.pek",
      mentions: "il est fait mention de..."
    };
    expect(resultat.acteEtranger).toStrictEqual(acteEtrangerProjetActe);
  });
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'formule finale' au format attendu", () => {
    const formuleFinaleProjetActe: IFormuleFinaleDto = {
      identiteDemandeur: "PERE",
      nomDemandeur: null,
      prenomDemandeur: "",
      qualiteDemandeur: null,
      piecesProduites: "COPIES",
      legalisation: "LEGALISATION",
      autresPieces: "passeport",
      modeDepot: "REMISE",
      identiteTransmetteur: "PERE",
      nomTransmetteur: null,
      idFormuleFinale: null
    };
    expect(resultat.formuleFinale).toStrictEqual(formuleFinaleProjetActe);
  });
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'declarant' au format attendu", () => {
    const declarantProjetActe: IDeclarantDto = {
      identiteDeclarant: "PERE",
      adresseDomicile: null,
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
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'analyse Marginales' au format attendu", () => {
    const analyseMarginalesProjetActe: IAnalyseMarginaleDto[] = [
      {
        titulaires: [
          {
            ordre: 1,
            nom: "Xi phun bin",
            nomPartie1: "Xi",
            nomPartie2: "phun bin",
            prenoms: ["lao", "xiar", "sehoo"],
            domicile: null,
            filiations: null,
            naissance: null,
            nomActeEtranger: null,
            pasDePrenom: null,
            reconnuPar: null,
            sexe: null
          }
        ],
        dateDebut: null,
        id: null,
        motifModification: null,
        nomOec: null,
        prenomOec: null,
        dateFin: null
      }
    ];
    expect(resultat.analyseMarginales).toStrictEqual(analyseMarginalesProjetActe);
  });
  test("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu", () => {
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
        voie: "Place du riz",
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
              naissance: { pays: null, ville: null, region: null, arrondissement: null, voie: null, annee: 2000, mois: 10, jour: 10 },
              age: null,
              prenoms: ["cassandra"],
              sansProfession: true,
              profession: "",
              domicile: { pays: "France", ville: "Marseille", region: "13", arrondissement: "13", voie: "11 place du boulodrôme" }
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
                voie: "hopital chu nantes",
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

    expect(resultat).toStrictEqual(projetActeTranscription);
  });
});
describe.skip("test des fonction de mapping de la saisie projet d'acte transcrit TIERS", () => {
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
      prenomsChemin: {
        prenom1: "Consulaire"
      },
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
      prenomsChemin: {
        prenom1: "Prenom",
        nombrePrenomsAffiches: 1
      },
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
        prenomsChemin: {
          prenom1: "cassandra"
        },
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
        prenomsChemin: {
          prenom1: "Maman"
        },
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
      typeActeAutre: "acte divers",
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
      prenomsChemin: {
        prenom1: "Prenom",
        prenom2: "Demandeur"
      },
      qualite: "Agent",
      piecesProduites: "COPIE",
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
    const projetActeTranscriptionTiers = {
      modeCreation: "TRANSCRIT",
      evenement: { annee: 2025, mois: 1, jour: 19, heure: 9, minute: 42, pays: "", ville: "", region: "", neDansLeMariage: true },
      titulaires: [
        {
          nomActeEtranger: "greenwald",
          nom: "prenomUn prenomDeux prenomTrois",
          ordre: 1,
          prenoms: ["Consulaire"],
          sexe: "FEMININ",
          naissance: { jour: "19", mois: "01", annee: "2025", heure: "09", minute: "42" },
          domicile: null,
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              nom: "Patamob",
              sexe: "MASCULIN",
              naissance: { pays: "Chine", ville: "Pekin", region: "", arrondissement: null, annee: null, mois: null, jour: null },
              age: 34,
              prenoms: ["cassandra"],
              sansProfession: false,
              profession: "sculpteur",
              domicile: { pays: null, ville: null, region: null, arrondissement: null, voie: "" }
            },
            {
              lienParente: "PARENT",
              ordre: 2,
              nom: "Patamob",
              sexe: "FEMININ",
              naissance: {
                pays: "France",
                ville: "Nantes",
                region: "Loire atlantique",
                arrondissement: null,
                annee: 2000,
                mois: 10,
                jour: 10
              },
              age: null,
              prenoms: ["Maman"],
              sansProfession: false,
              profession: "UX Designer",
              domicile: { pays: "France", ville: "Nantes", region: "loire atlantique", arrondissement: null, voie: "36 tour Lu" },
              domicileCommun: false
            }
          ],
          nomPartie1: "prenomUn prenomDeux",
          nomPartie2: "prenomTrois"
        }
      ],
      acteEtranger: {
        texteEnonciations: "RAS",
        typeActeEtranger: "AUTRE",
        typeActe: "acte divers",
        cadreNaissance: "NE_DANS_LE_MARIAGE",
        jourEnregistrement: "12",
        moisEnregistrement: "01",
        anneeEnregistrement: "2025",
        adresseEnregistrement: { ville: "Pekin", region: null, pays: "Chine" },
        redacteur: "officier",
        referenceEtComplement: "REF.2454.14245",
        mentions: "RAS"
      },
      formuleFinale: {
        identiteDemandeur: "TIERS",
        nomDemandeur: "nomDemandeur",
        prenomDemandeur: "Prenom,Demandeur",
        qualiteDemandeur: "Agent",
        piecesProduites: "COPIE",
        legalisation: "APOSTILLE",
        autresPieces: null,
        modeDepot: "TRANSMISE",
        identiteTransmetteur: "TIERS"
      },
      analyseMarginales: [
        {
          titulaires: [
            {
              ordre: 1,
              nom: "prenomUn prenomDeux prenomTrois",
              nomPartie1: "prenomUn prenomDeux",
              nomPartie2: "prenomTrois",
              prenoms: ["Consulaire"]
            }
          ]
        }
      ],
      nature: "NAISSANCE",
      numeroDossierNational: null,
      visibiliteArchiviste: "NON",
      declarant: {
        identiteDeclarant: "TIERS",
        nom: "LeTiers",
        prenom: ["Prenom"],
        sexe: "MASCULIN",
        age: "45",
        qualite: "La grand frère",
        profession: "plombier",
        sansProfession: false
      }
    } as unknown as IProjetActeTranscritDto;

    expect(resultatTiers).toStrictEqual(projetActeTranscriptionTiers);
  });
});
describe.skip("test des fonctions non testée précedement", () => {
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
      prenomsChemin: {
        prenom1: "Consulaire"
      },
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
      prenomsChemin: {
        prenom1: "",
        nombrePrenomsAffiches: 1
      },
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
        prenomsChemin: {
          prenom1: ""
        },
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
      prenomsChemin: {
        prenom1: "Prenom",
        prenom2: "Demandeur"
      },
      qualite: "Agent",
      piecesProduites: "COPIE",
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
  test.only("mappingSaisieProjetTitulaireFormVersProjetActe doit renvoyer l'objet 'projetActeTranscription' au format attendu", () => {
    const projetActeTranscriptionNull = {
      modeCreation: "TRANSCRIT",
      evenement: {
        annee: 2025,
        mois: null,
        jour: null,
        heure: null,
        minute: null,
        pays: null,
        ville: null,
        region: null,
        voie: null,
        neDansLeMariage: true
      },
      titulaires: [
        {
          nomActeEtranger: "greenwald",
          nom: "prenomUn prenomDeux prenomTrois",
          ordre: 1,
          prenoms: ["Consulaire"],
          sexe: "FEMININ",
          naissance: { jour: "", mois: "", annee: "2025", heure: "", minute: "" },
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
              lienParente: "PARENT",
              naissance: {
                annee: null,
                arrondissement: null,

                jour: null,
                mois: null,
                pays: null,
                region: null,
                ville: null,
                voie: null
              },
              nom: "Patamob",
              ordre: 1,

              prenoms: [],
              profession: "",
              sansProfession: true,
              sexe: "MASCULIN"
            }
          ],
          nomPartie1: null,
          nomPartie2: null
        }
      ],
      acteEtranger: {
        texteEnonciations: "",
        typeActeEtranger: null,
        typeActe: null,
        cadreNaissance: "NE_DANS_LE_MARIAGE",
        jourEnregistrement: null,
        anneeEnregistrement: null,
        moisEnregistrement: null,
        redacteur: null,
        referenceEtComplement: "",
        adresseEnregistrement: { ville: null, region: null, pays: null },
        mentions: null
      },
      formuleFinale: {
        identiteDemandeur: "TIERS",
        nomDemandeur: "nomDemandeur",
        prenomDemandeur: "Prenom,Demandeur",
        qualiteDemandeur: "Agent",
        piecesProduites: "COPIE",
        legalisation: "APOSTILLE",
        autresPieces: null,
        modeDepot: "TRANSMISE",
        identiteTransmetteur: "TIERS"
      },
      analyseMarginales: [
        {
          titulaires: [
            {
              ordre: 1,
              nom: "prenomUn prenomDeux prenomTrois",
              nomPartie1: "",
              nomPartie2: "",
              prenoms: ["Consulaire"]
            }
          ]
        }
      ],
      nature: "NAISSANCE",
      numeroDossierNational: null,
      visibiliteArchiviste: "NON",
      declarant: {
        identiteDeclarant: "TIERS",
        nom: "LeTiers",
        prenom: [],
        sexe: "MASCULIN",
        age: "",
        qualite: "",
        profession: "",
        sansProfession: true
      }
    } as unknown as IProjetActeTranscritDto;

    expect(resultatTiers).toStrictEqual(projetActeTranscriptionNull);
  });
});
