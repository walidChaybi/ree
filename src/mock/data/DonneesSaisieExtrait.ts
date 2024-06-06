import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";

export const extraitSaisiAEnvoyer = {
  natureActe: "NAISSANCE",
  evenementActe: {
    lieuReprise: "Tijuana, Basse-Californie (Mexique)",
    ville: "Tijuana",
    arrondissement: "",
    region: "Basse-Californie",
    pays: "Mexique",
    annee: 2000,
    mois: 12,
    jour: 7
  },
  titulaire1: {
    nom: "Ozaur",
    nomPartie1: "",
    nomPartie2: "",
    typeDeclarationConjointe: "ABSENCE_DECLARATION",
    prenoms: ["Amandine"],
    sexe: "FEMININ",
    naissance: {
      lieuReprise: "Tijuana, Basse-Californie (Mexique)",
      ville: "Tijuana",
      arrondissement: "",
      region: "Basse-Californie",
      pays: "Mexique",
      annee: 2000,
      mois: 12,
      jour: 7
    },
    filiations: [
      {
        nom: "De La Vega",
        prenoms: ["Madeleine"],
        sexe: "FEMININ",
        naissance: {
          lieuReprise: "",
          ville: "",
          arrondissement: "",
          region: "",
          pays: "FRANCE"
        },
        lienParente: "PARENT",
        ordre: 1
      },
      {
        nom: "De La Vega",
        prenoms: ["Diego"],
        sexe: "MASCULIN",
        naissance: {
          lieuReprise: "",
          ville: "",
          arrondissement: "",
          region: "",
          pays: "FRANCE"
        },
        lienParente: "PARENT",
        ordre: 2
      }
    ]
  },
  idAnalyseMarginale: "a053f47f-7f62-4fda-8d6c-f745a7648b1c"
} as unknown as IExtraitSaisiAEnvoyer;

export const acteExtraitSaisie = {
  id: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
  dateInitialisation: null,
  dateCreation: 1304330400000,
  modeCreation: "DRESSE",
  statut: "VALIDE",
  dateStatut: 1380362400000,
  nature: "NAISSANCE",
  numero: "101",
  numeroBisTer: "552",
  nomOec: "MENARD",
  prenomOec: "MARC",
  dateDerniereDelivrance: "2014-01-24T11:00:00.000Z",
  dateDerniereMaj: "2003-01-18T11:00:00.000Z",
  visibiliteArchiviste: "NON",
  evenement: {
    minute: null,
    heure: null,
    jour: 7,
    mois: 12,
    annee: 2000,
    voie: null,
    ville: "Benoit",
    arrondissement: "",
    region: "Basse-Californie",
    pays: "Mexique",
    lieuReprise: ""
  },
  mentions: [],
  titulaires: [
    {
      nom: "PAPADOPOULOS",
      prenoms: ["Ronna"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 796,
      sexe: "FEMININ",
      naissance: {
        minute: null,
        heure: null,
        jour: 7,
        mois: 12,
        annee: 2000,
        voie: null,
        ville: "Benoit",
        arrondissement: "",
        region: "Basse-Californie",
        pays: "Mexique",
        lieuReprise: ""
      },
      profession: "VENDEUR",
      age: null,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: null,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "De La Vega",
          sexe: "MASCULIN",
          naissance: {
            minute: null,
            heure: null,
            jour: null,
            mois: null,
            annee: null,
            voie: null,
            ville: "",
            arrondissement: "",
            region: "",
            pays: "FRANCE",
            lieuReprise: ""
          },
          profession: "CHIMISTE",
          age: null,
          domicile: {
            voie: "50 route d'amboli",
            ville: "Djibouti",
            arrondissement: null,
            region: null,
            pays: "DJIBOUTI"
          },
          prenoms: ["Diego"]
        },
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "De La Vega",
          sexe: "FEMININ",
          naissance: {
            minute: null,
            heure: null,
            jour: null,
            mois: null,
            annee: null,
            voie: null,
            ville: "",
            arrondissement: "",
            region: "",
            pays: "FRANCE",
            lieuReprise: ""
          },
          profession: "Scrum Master",
          age: null,
          domicile: {
            voie: "La belle Hacienda",
            ville: "Mexico",
            arrondissement: null,
            region: null,
            pays: "Mexique"
          },
          prenoms: ["Madeleine"]
        }
      ],
      typeDeclarationConjointe: "AUCUNE",
      nomPartie1: null,
      nomPartie2: null,
      nomAvantMariage: null,
      nomApresMariage: null,
      nomDernierConjoint: null,
      prenomsDernierConjoint: null
    }
  ],
  piecesAnnexes: [],
  alerteActes: [],
  personnes: [
    {
      id: "e7114c57-d00d-48ad-bbee-af2b01e2da6a",
      nom: "Ozaur",
      sexe: {
        _libelle: "Féminin"
      },
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      naissance: {
        minute: null,
        heure: null,
        jour: 7,
        mois: 12,
        annee: 2000,
        voie: null,
        ville: "Benoit",
        arrondissement: "",
        region: "Basse-Californie",
        pays: "Mexique",
        lieuReprise: ""
      },
      autresNoms: [],
      prenoms: ["Emerson"],
      autresPrenoms: [],
      parents: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "De La Vega",
          prenoms: []
        },
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "De La Vega",
          prenoms: []
        }
      ],
      enfants: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Rose",
          prenoms: ["Jean-pierre", "Michel"]
        }
      ],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [],
      lieuNaissance: {
        arrondissement: "",
        pays: "Mexique",
        region: "Basse-Californie",
        ville: "Benoit"
      },
      dateNaissance: {
        jour: 7,
        mois: 12,
        annee: 2000
      }
    },
    {
      id: "923a10fb-0b15-452d-83c0-d24c76d1d777",
      nom: "De La Vega",
      sexe: {
        _libelle: "Féminin"
      },
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      naissance: {
        minute: null,
        heure: null,
        jour: null,
        mois: null,
        annee: null,
        voie: null,
        ville: "",
        arrondissement: "",
        region: "",
        pays: "FRANCE",
        lieuReprise: ""
      },
      autresNoms: [],
      prenoms: [],
      autresPrenoms: [],
      parents: [],
      enfants: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Ozaur",
          prenoms: ["Emerson"]
        }
      ],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [],
      lieuNaissance: {
        arrondissement: "",
        pays: "FRANCE",
        region: "",
        ville: ""
      },
      dateNaissance: {
        jour: null,
        mois: null,
        annee: null
      }
    },
    {
      id: "923a10fb-0b15-452d-83c0-d24c76d1d888",
      nom: "De La Vega",
      sexe: {
        _libelle: "Masculin"
      },
      nationalite: {
        _libelle: "Étrangère",
        _nom: "ETRANGERE"
      },
      naissance: {
        minute: null,
        heure: null,
        jour: null,
        mois: null,
        annee: null,
        voie: null,
        ville: "",
        arrondissement: "",
        region: "",
        pays: "FRANCE",
        lieuReprise: ""
      },
      autresNoms: [],
      prenoms: [],
      autresPrenoms: [],
      parents: [],
      enfants: [
        {
          id: null,
          typeLienParente: "DIRECT",
          nom: "Ozaur",
          prenoms: ["Emerson"]
        }
      ],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [],
      lieuNaissance: {
        arrondissement: "",
        pays: "FRANCE",
        region: "",
        ville: ""
      },
      dateNaissance: {
        jour: null,
        mois: null,
        annee: null
      }
    }
  ],
  estReecrit: null,
  registre: {
    id: "7a777e9b-ecc3-4c62-b80d-a017bfa335b5",
    famille: "PAC",
    pocopa: "ORAN",
    annee: 2010,
    support1: "support 1",
    support2: "support 2",
    numeroDernierActe: "4564",
    pvOuverture: "pv_ouverture",
    dateOuverture: [1950, 11, 21],
    pvFermeture: "pv_fermeture",
    dateFermeture: [1981, 9, 21],
    decret2017: false,
    type: {
      id: "658d9694-1e12-486c-a36d-da1aeb2a29b3",
      famille: "MAR",
      pocopa: "pocopa",
      paysPocopa: "ARGENTINE",
      dateRattachement: [1999, 9, 23],
      dateTransfertScec: [1974, 2, 14],
      gereScec: false,
      estOuvert: false,
      description: ""
    }
  },
  motifAnnulation: "",
  dateInitialisationprojet: null,
  numeroProjet: "c4",
  corpsExtraitRectifications: [],
  corpsImage: null,
  corpsTexte: null,
  analyseMarginales: [
    {
      id: "a053f47f-7f62-4fda-8d6c-f745a7648b1c",
      dateDebut: "2019-12-26T11:00:00.000Z",
      dateFin: "2023-11-19T23:00:00.000Z",
      nomOec: "Lens",
      prenomOec: "Alexis",
      motifModification: "CHANGEMENT_PRENOM",
      titulaires: [
        {
          nom: "Ozaur",
          prenoms: ["Amandine"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 1,
          sexe: {
            _libelle: "Non renseigné"
          },
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: [],
          typeDeclarationConjointe: {
            _libelle: "aucune"
          },
          nomPartie1: "ABSENCE_VALIDEE",
          nomPartie2: "",
          nomAvantMariage: null,
          nomApresMariage: null,
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        }
      ]
    }
  ],
  type: "TEXTE"
} as unknown as IFicheActe;

export const requeteExtraitSaisie = {
  id: "f0ea8f29-ddcd-494b-86e4-0a58f6990c96",
  numero: "RRMHSX",
  dateCreation: 1655207655084,
  canal: {
    _libelle: "Courrier",
    _nom: "COURRIER"
  },
  type: {
    _libelle: "Délivrance",
    _nom: "DELIVRANCE"
  },
  statutCourant: {
    statut: {
      _libelle: "À signer",
      _nom: "A_SIGNER"
    },
    dateEffet: 1655207682066,
    raisonStatut: null
  },
  titulaires: [
    {
      id: "f0ea8213-afc6-4cc4-b458-4dcf7504f28c",
      position: 1,
      nomNaissance: "PRODESK",
      nomUsage: null,
      anneeNaissance: 1990,
      moisNaissance: 6,
      jourNaissance: 25,
      villeNaissance: "V",
      codePostalNaissance: null,
      arrondissementNaissance: null,
      villeEtrangereNaissance: null,
      regionNaissance: null,
      paysNaissance: "V",
      sexe: "INCONNU",
      nationalite: {
        _libelle: "Non renseignée",
        _nom: "INCONNUE"
      },
      prenoms: [
        {
          id: "f0ea97a6-5d50-4e13-83dc-26e77d498715",
          numeroOrdre: 1,
          prenom: "Elodie",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: null
    }
  ],
  requerant: {
    id: "f0ead748-20ae-46e3-8c8e-aa060e795817",
    dateCreation: 1655207655084,
    nomFamille: "PRODESK",
    prenom: "Elodie",
    courriel: null,
    telephone: null,
    adresse: {
      id: "f0ea22e6-4fc1-4076-baa5-563bdb960b1b",
      ligne2: "",
      ligne3: "",
      ligne4: "7 ALLÉE DES PLUVIERS",
      ligne5: "",
      codePostal: "44830",
      ville: "BOUAYE",
      pays: ""
    },
    lienRequerant: {
      id: "f0ea0584-0a94-496d-bea8-d397424613a5",
      lien: {
        _libelle: "Titulaire"
      },
      natureLien: null
    },
    qualiteRequerant: {
      qualite: {
        _libelle: "Particulier",
        _nom: "PARTICULIER"
      },
      utilisateurRece: null,
      particulier: null,
      mandataireHabilite: {},
      autreProfessionnel: null,
      institutionnel: {}
    }
  },
  idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
  idService: "6737f85c-6207-4174-8825-d5f65d757e4f",
  actions: [
    {
      id: "f0ea29fc-ed21-4409-b650-ac12581ec83a",
      numeroOrdre: 3,
      libelle: "À signer",
      dateAction: 1655207682054,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
      trigramme: "LBO"
    },
    {
      id: "f0eade91-ff3e-4296-92d7-dfef9fb59e0c",
      numeroOrdre: 2,
      libelle: "Prise en charge",
      dateAction: 1655207655042,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
      trigramme: "LBO"
    },
    {
      id: "f0eac43a-7c66-4b09-bdbc-2930bb22d0ab",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      dateAction: 1655207654918,
      idUtilisateur: "67374c0f-17a0-4673-aa7d-4ae94c424162",
      trigramme: "LBO"
    }
  ],
  observations: [],
  piecesJustificatives: [],
  numeroRequeteOrigine: null,
  sousType: {
    _libelle: "Délivrance Extrait/Copie courrier",
    _nom: "RDC",
    _libelleCourt: "Délivrance E/C (c)"
  },
  documentDemande: {
    _libelle: "Extrait avec filiation",
    _code: "EXTRAIT_AVEC_FILIATION",
    _categorie: "DOCUMENT_DELIVRANCE",
    _texteLibre: null,
    _categorieDocumentDelivrance: "Extrait avec filiation"
  },
  nbExemplaireImpression: 1,
  provenanceRequete: {
    provenance: {
      _libelle: "Courrier",
      _nom: "COURRIER"
    },
    provenancePlanete: null,
    provenanceRece: null,
    provenanceServicePublic: null
  },
  evenement: {
    id: "f0eaf66d-01b9-45d5-8e4e-3e305aa6ccd6",
    natureActe: {
      _libelle: "Naissance"
    },
    jour: 25,
    mois: 6,
    annee: 1990,
    ville: "V",
    pays: "V"
  },
  motif: {
    _libelle: "Certificat de nationalité française"
  },
  complementMotif: null,
  choixDelivrance: {
    _libelle: "Délivrer E/C - Extrait avec filiation",
    _nom: "DELIVRER_EC_EXTRAIT_AVEC_FILIATION"
  },
  documentsReponses: [
    {
      id: "f0ead362-4f62-49ed-ba5d-e0ad8ff69c7a",
      nom: "Délivrance d'acte (116)",
      typeDocument: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      mimeType: "application/pdf",
      taille: 47264,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift:
        "f0ea8f29-ddcd-494b-86e4-0a58f6990c96_f0eaa306-e904-45b2-9e1c-3fbc5662cbec.pdf",
      conteneurSwift: "documents-delivres-2022-6",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 0
    },
    {
      id: "011577eb-0d9a-4e77-81a8-2da76baf7b7f",
      nom: "Extrait copie avec filiation",
      typeDocument: "28580709-06dd-4df2-bf6e-70a9482940a1",
      mimeType: "application/pdf",
      taille: 20280,
      avecCtv: false,
      nbPages: 1,
      orientation: "Portrait",
      referenceSwift:
        "f0ea8f29-ddcd-494b-86e4-0a58f6990c96_01155c0e-574e-40fe-92b7-871e24e834d8.pdf",
      conteneurSwift: "documents-delivres-2022-6",
      validation: "O",
      idActe: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
      optionsCourrier: [],
      mentionsRetirees: [],
      ordre: 1
    }
  ]
} as unknown as IRequeteDelivrance;
