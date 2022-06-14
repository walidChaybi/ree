import { TypeEntite } from "../../model/agent/enum/TypeEntite";
import { IOfficier } from "../../model/agent/IOfficier";
import { Droit } from "../../model/Droit";

export const userDroitConsulterArchive: IOfficier = {
  idSSO: "idSSOConnectedUser",
  idUtilisateur: "idUtilisateurConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  sectionConsulaire: "sectionConsulaireConnectedUser",
  service: "serviceConnectedUser",
  poste: "posteConnectedUser",
  ministere: "ministereConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [{ idDroit: "d12345", nom: Droit.CONSULTER_ARCHIVES }]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "periNom",
        description: "peirDes",
        estActif: true,
        listePays: ["periPays"],
        listeIdTypeRegistre: ["type1234"]
      }
    }
  ]
};

export const userDroitConsulterConsulterArchive: IOfficier = {
  idSSO: "idSSOConnectedUser",
  idUtilisateur: "idUtilisateurConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  sectionConsulaire: "sectionConsulaireConnectedUser",
  service: "serviceConnectedUser",
  poste: "posteConnectedUser",
  ministere: "ministereConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [
          { idDroit: "d12345", nom: Droit.CONSULTER_ARCHIVES },
          { idDroit: "d12345", nom: Droit.CONSULTER }
        ]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "periNom",
        description: "peirDes",
        estActif: true,
        listePays: ["periPays"],
        listeIdTypeRegistre: ["type1234"]
      }
    }
  ]
};

export const userDroitConsulterPerimetreMEAE: IOfficier = {
  idSSO: "idSSOConnectedUser",
  idUtilisateur: "idUtilisateurConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  sectionConsulaire: "sectionConsulaireConnectedUser",
  service: "serviceConnectedUser",
  poste: "posteConnectedUser",
  ministere: "ministereConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [{ idDroit: "d12345", nom: Droit.CONSULTER }]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "MEAE",
        description: "peirDes",
        estActif: true,
        listePays: ["periPays"],
        listeIdTypeRegistre: []
      }
    }
  ],
  entite: {
    code: "E 1/3",
    idEntite: "6737e047-16cc-4731-9a2e-d2e228f7d75f",
    libelleEntite: "Exploitation 1 Section 3",
    type: TypeEntite.SECTION,
    utilisateur: null
  }
};

export const userDroitConsulterPerimetreTUNIS: IOfficier = {
  idSSO: "idSSOConnectedUser",
  idUtilisateur: "idUtilisateurConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  sectionConsulaire: "sectionConsulaireConnectedUser",
  service: "serviceConnectedUser",
  poste: "posteConnectedUser",
  ministere: "ministereConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [{ idDroit: "d12345", nom: Droit.CONSULTER }]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "TUNIS",
        description: "TUNIS",
        estActif: true,
        listePays: ["TUNISIE"],
        listeIdTypeRegistre: ["b66a9304-48b4-4aa3-920d-6cb27dd76c83"]
      }
    }
  ]
};

export const userDroitnonCOMEDEC: IOfficier = {
  idSSO: "idSSOConnectedUser",
  idUtilisateur: "idUtilisateurConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  sectionConsulaire: "sectionConsulaireConnectedUser",
  service: "serviceConnectedUser",
  poste: "posteConnectedUser",
  ministere: "ministereConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [{ idDroit: "d12345", nom: Droit.DELIVRER }]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "MEAE",
        description: "peirDes",
        estActif: true,
        listePays: ["periPays"],
        listeIdTypeRegistre: []
      }
    }
  ],
  entite: {
    code: "E 1/3",
    idEntite: "1",
    libelleEntite: "Exploitation 1 Section 3",
    type: TypeEntite.SECTION,
    utilisateur: null,
    hierarchieEntite: [
      {
        entite: undefined,
        entiteMere: {
          code: "E 1/3",
          idEntite: "11",
          libelleEntite: "Exploitation 1 Section 3",
          type: TypeEntite.SECTION,
          utilisateur: null
        }
      }
    ]
  },
  entitesFilles: [
    {
      code: "E 1/3",
      idEntite: "111",
      libelleEntite: "Exploitation 1 Section 3",
      type: TypeEntite.SECTION,
      utilisateur: null
    }
  ]
};

export const userDroitCOMEDEC: IOfficier = {
  idSSO: "idSSOConnectedUser",
  idUtilisateur: "idUtilisateurConnectedUser",
  nom: "nomConnectedUser",
  prenom: "prenomConnectedUser",
  trigramme: "trigrammeConnectedUser",
  mail: "mailConnectedUser",
  profils: ["profilConnectedUser"],
  telephone: "telephoneConnectedUser",
  section: "sectionConnectedUser",
  bureau: "bureauConnectedUser",
  departement: "departementConnectedUser",
  sectionConsulaire: "sectionConsulaireConnectedUser",
  service: "serviceConnectedUser",
  poste: "posteConnectedUser",
  ministere: "ministereConnectedUser",
  habilitations: [
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [{ idDroit: "d12345", nom: Droit.DELIVRER_COMEDEC }]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "MEAE",
        description: "peirDes",
        estActif: true,
        listePays: ["periPays"],
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "h12345",
      profil: {
        idProfil: "p12345",
        nom: {
          idNomenclature: "idNomenclature",
          categorie: "TYPE_PROFIL",
          code: "code",
          libelle: "libelle",
          estActif: true
        },
        droits: [{ idDroit: "d12345", nom: Droit.SIGNER }]
      },
      perimetre: {
        idPerimetre: "peri12345",
        nom: "MEAE",
        description: "peirDes",
        estActif: true,
        listePays: ["periPays"],
        listeIdTypeRegistre: []
      }
    }
  ],
  entite: {
    code: "E 1/3",
    idEntite: "1",
    libelleEntite: "Exploitation 1 Section 3",
    type: TypeEntite.SECTION,
    utilisateur: null,
    hierarchieEntite: [
      {
        entite: undefined,
        entiteMere: {
          code: "E 1/3",
          idEntite: "11",
          libelleEntite: "Exploitation 1 Section 3",
          type: TypeEntite.SECTION,
          utilisateur: null
        }
      }
    ]
  },
  entitesFilles: [
    {
      code: "E 1/3",
      idEntite: "111",
      libelleEntite: "Exploitation 1 Section 3",
      type: TypeEntite.SECTION,
      utilisateur: null
    }
  ]
};

export const leBiannic = {
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d55",
  idArobas: "04663316",
  identifiantArobas: "le-biannicj",
  nom: "LE BIANNIC",
  prenom: "Johann",
  mel: "johann.lebiannic@soprasteria.com",
  trigramme: "JLB",
  origineMaj: "init Excel",
  dateDebut: 1594159200000,
  dateFin: null,
  dateMaj: 1594159200000,
  entite: {
    idEntite: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
    type: "SECTION",
    code: "Assistance Informatique",
    libelleEntite: "BAG Assitance Informatique",
    siteInternet: null,
    hierarchieEntite: [
      {
        entite: null,
        entiteMere: {
          idEntite: "67374fe6-877e-440b-804b-e4ae0bed7cc9",
          type: "DEPARTEMENT",
          code: "BAG",
          libelleEntite: "Bureau des Affaires Générales",
          siteInternet: null,
          hierarchieEntite: [
            {
              entite: null,
              entiteMere: {
                idEntite: "6737dca8-2f96-4086-8288-fd1a136a61df",
                type: "SERVICE",
                code: "SCEC",
                libelleEntite: "Service central d'état civil",
                siteInternet: null,
                hierarchieEntite: [
                  {
                    entite: null,
                    entiteMere: {
                      idEntite: "427786f4-dbc2-4762-929c-b80d8f48020e",
                      type: "MINISTERE",
                      code: "MEAE",
                      libelleEntite:
                        "Ministère de l'Europe et des Affaires Étrangères",
                      siteInternet: null,
                      hierarchieEntite: [],
                      utilisateur: null,
                      memoCourrier: [],
                      adresseEntite: null,
                      estDansSCEC: false
                    }
                  }
                ],
                utilisateur: null,
                memoCourrier: [],
                adresseEntite: {
                  idAdresseEntite: "f4e76b2f-3601-475c-832a-2cf073b44001",
                  ville: "Nantes",
                  pays: "France",
                  ligne4: null,
                  ligne6: null,
                  telephone: "0105032653",
                  fax: null,
                  adresseInternet: null
                },
                estDansSCEC: true
              }
            }
          ],
          utilisateur: null,
          memoCourrier: [],
          adresseEntite: null,
          estDansSCEC: true
        }
      }
    ],
    utilisateur: null,
    memoCourrier: [],
    adresseEntite: null,
    estDansSCEC: true
  },
  entitesFillesDirectes: [],
  habilitations: [
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44186",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac926f",
        nom: {
          idNomenclature: "480ad01d-d71e-4b78-85c3-56673006cf45",
          categorie: "TYPE_PROFIL",
          code: "DROIT_INFORMER_USAGER",
          libelle: "Droit informer usager",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b833a",
              nom: "INFORMER_USAGER",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "5c4583d0-77b0-422d-a694-ff4a6f9d04d6",
        nom: "PORT-LOUIS",
        description: "PORT-LOUIS",
        estActif: true,
        listePays: "MAURICE ET SEYCHELLES",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44185",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac926e",
        nom: {
          idNomenclature: "2a711430-ec39-4b1f-8a67-cd2a420179a8",
          categorie: "TYPE_PROFIL",
          code: "DROIT_CREER_PACS",
          libelle: "Droit créer PACS",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b832f",
              nom: "CREER_PACS",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "5c4583d0-77b0-422d-a694-ff4a6f9d04d6",
        nom: "PORT-LOUIS",
        description: "PORT-LOUIS",
        estActif: true,
        listePays: "MAURICE ET SEYCHELLES",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44182",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac926b",
        nom: {
          idNomenclature: "7984cbf0-54bb-4fa0-b55f-c3e08fc77cbb",
          categorie: "TYPE_PROFIL",
          code: "DROIT_CREER_ACTE_TRANSCRIT",
          libelle: "Droit créer acte transcrit",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b832c",
              nom: "CREER_ACTE_TRANSCRIT",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "78007a30-9020-4817-a00c-10af331844eb",
        nom: "TORONTO",
        description: "TORONTO",
        estActif: true,
        listePays: "CANADA",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44184",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac926d",
        nom: {
          idNomenclature: "c1bcb02b-efa6-4cc1-94de-dae2aa03716f",
          categorie: "TYPE_PROFIL",
          code: "DROIT_CREER_ACTE_ETABLI",
          libelle: "Droit créer acte établi",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b832e",
              nom: "CREER_ACTE_ETABLI",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "5c4583d0-77b0-422d-a694-ff4a6f9d04d6",
        nom: "PORT-LOUIS",
        description: "PORT-LOUIS",
        estActif: true,
        listePays: "MAURICE ET SEYCHELLES",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44181",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac926a",
        nom: {
          idNomenclature: "fae810f1-9a25-4583-8c1b-b6767f841209",
          categorie: "TYPE_PROFIL",
          code: "DROIT_METTRE_A_JOUR_RC_RCA_PACS",
          libelle: "Droit mettre à jour RC, RCA, PACS",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b832b",
              nom: "METTRE_A_JOUR_RC_RCA_PACS",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "78007a30-9020-4817-a00c-10af331844eb",
        nom: "TORONTO",
        description: "TORONTO",
        estActif: true,
        listePays: "CANADA",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44187",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac927a",
        nom: {
          idNomenclature: "58bd80fc-b2aa-43e6-8496-46b41cc9c4d0",
          categorie: "TYPE_PROFIL",
          code: "DROIT_CONSULTER",
          libelle: "Droit consulter",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b833b",
              nom: "CONSULTER",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "de663a01-b877-4d4b-b3fd-c79929a0aace",
        nom: "SAINT DOMINGUE",
        description: "SAINT DOMINGUE",
        estActif: true,
        listePays: "R. DOMINICAINE ",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44183",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac926c",
        nom: {
          idNomenclature: "478b8ec1-cc4f-47d0-8fa5-bd0233ffce23",
          categorie: "TYPE_PROFIL",
          code: "DROIT_CREER_ACTE_DRESSE",
          libelle: "Droit créer acte dressé",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b832d",
              nom: "CREER_ACTE_DRESSE",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "5c4583d0-77b0-422d-a694-ff4a6f9d04d6",
        nom: "PORT-LOUIS",
        description: "PORT-LOUIS",
        estActif: true,
        listePays: "MAURICE ET SEYCHELLES",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832b-2cf073b44180",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac925e",
        nom: {
          idNomenclature: "b776753c-7901-4813-8194-b51baccb573a",
          categorie: "TYPE_PROFIL",
          code: "DROIT_ATTRIBUER",
          libelle: "Droit attribuer",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a317-280dea9b8316",
              nom: "ATTRIBUER",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "78007a30-9020-4817-a00c-10af331844eb",
        nom: "TORONTO",
        description: "TORONTO",
        estActif: true,
        listePays: "CANADA",
        listeIdTypeRegistre: []
      }
    },
    {
      idHabilitation: "f4e76b2f-3601-475c-832a-2cf073b44180",
      typeDelegation: null,
      roleDelegant: null,
      villePosteConsulaire: null,
      libelleEntiteDelegant: null,
      dateDebut: 1592660395000,
      dateFin: null,
      profil: {
        idProfil: "6737fcd4-2fc8-42d3-bac2-5190dfac925f",
        nom: {
          idNomenclature: "b9f30e0f-a429-4583-85bc-2dbc4f7278dc",
          categorie: "TYPE_PROFIL",
          code: "DROIT_METTRE_A_JOUR_ACTE",
          libelle: "Droit mettre à jour acte",
          estActif: true
        },
        habilitation: null,
        profilDroit: [
          {
            droit: {
              idDroit: "6737451d-7c1b-4807-a31b-280dea9b832a",
              nom: "METTRE_A_JOUR_ACTE",
              profilDroit: null
            },
            profil: null
          }
        ]
      },
      utilisateurs: null,
      perimetre: {
        id: "78007a30-9020-4817-a00c-10af331844eb",
        nom: "TORONTO",
        description: "TORONTO",
        estActif: true,
        listePays: "CANADA",
        listeIdTypeRegistre: []
      }
    }
  ],
  fonctionAgent: {
    idFonctionAgent: "46fc0471-8724-47c7-80c0-c30595581627",
    libelleFonction: "chef de bureau",
    utilisateur: null
  },
  actif: true,
  signatureManuscrite: null,
  memoCourrier: [],
  titreHonorifique: []
};