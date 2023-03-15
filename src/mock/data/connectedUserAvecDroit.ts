import { Droit } from "@model/agent/enum/Droit";
import { TypeEntite } from "@model/agent/enum/TypeEntite";
import { IOfficier } from "@model/agent/IOfficier";

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

export const userDroitCreerActeEtabliPerimetreMEAE: IOfficier = {
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
        droits: [{ idDroit: "d12345", nom: Droit.CREER_ACTE_ETABLI }]
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

export const userDroitCreerActeTranscritPerimetreMEAE: IOfficier = {
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
        droits: [{ idDroit: "d12345", nom: Droit.CREER_ACTE_TRANSCRIT }]
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

export const resultatHeaderUtilistateurLaurenceBourdeau = {
  id_sso: "00115467",
  nom: "BOURDEAU",
  prenom: "Laurence",
  trigramme: "LBO",
  mail: "lb@lb.fr",
  profil: "RECE_USER\\; RECE_ADMIN",
  telephone: "0600000000",
  section: "",
  bureau: "bureau",
  departement: "departement",
  sectionConsulaire: "section_consulaire",
  service: "SCEC",
  poste: "poste",
  ministere: "MEAE"
};

export const resultatRequeteUtilistateurLaurenceBourdeau = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-agent-api/v1/utilisateurs/login",
  data: {
    idUtilisateur: "9587453e-c9a5-44da-873f-a046a727e726",
    idArobas: "00115467",
    identifiantArobas: "BOURDEAUL",
    nom: "BOURDEAU",
    prenom: "Laurence",
    mel: "laurence.bourdeau@diplomatie.gouv.fr",
    trigramme: "LBO",
    origineMaj: "Admin",
    dateDebut: 1610496000000,
    dateFin: null,
    dateMaj: 1656340448116,
    entite: {
      idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
      type: "SERVICE",
      code: "SCEC",
      libelleEntite: "Service central d'état civil",
      siteInternet: null,
      hierarchieEntite: [
        {
          entite: null,
          entiteMere: {
            idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
            type: "MINISTERE",
            code: "MEAE",
            libelleEntite: "Ministère de l'Europe et des Affaires Etrangères",
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
      adresseEntite: null,
      estDansSCEC: true
    },
    entitesFillesDirectes: [
      {
        idEntite: "95874527-b387-45bb-acef-4cd697109481",
        type: "DEPARTEMENT",
        code: "BAJ",
        libelleEntite: "Bureau des Affaires Juridiques",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
              type: "SERVICE",
              code: "SCEC",
              libelleEntite: "Service central d'état civil",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                    type: "MINISTERE",
                    code: "MEAE",
                    libelleEntite:
                      "Ministère de l'Europe et des Affaires Etrangères",
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
      {
        idEntite: "9587c724-645c-408c-aa49-9488860c5e44",
        type: "SECTION",
        code: "R 1/3",
        libelleEntite: "Etablissement 1 Redaction 3",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c434-c74e-4740-a613-2e00d6a1cd99",
              type: "BUREAU",
              code: "BR1",
              libelleEntite: "Bureau Rédaction 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587042c-65fd-4d02-8e87-bf19c7e9aa9f",
        type: "BUREAU",
        code: "BTM",
        libelleEntite: "Bureau Transcription du Maghreb",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587aed3-fc8d-4626-9c3a-0802bc331944",
        type: "SECTION",
        code: "Annaba et Constantine",
        libelleEntite: "BTM Annaba et Constantine",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587042c-65fd-4d02-8e87-bf19c7e9aa9f",
              type: "BUREAU",
              code: "BTM",
              libelleEntite: "Bureau Transcription du Maghreb",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587aaea-c346-457f-84ac-02610970457c",
        type: "SECTION",
        code: "Alger",
        libelleEntite: "BTM Alger",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587042c-65fd-4d02-8e87-bf19c7e9aa9f",
              type: "BUREAU",
              code: "BTM",
              libelleEntite: "Bureau Transcription du Maghreb",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587fba8-4fc1-4b20-a69e-a27f4bfd5d63",
        type: "SECTION",
        code: "E 2/3",
        libelleEntite: "Exploitation 2 Section 3",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b969-1ec5-4bb5-8c63-3b263df216f5",
              type: "BUREAU",
              code: "BE2",
              libelleEntite: "Bureau Exploitation 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95874525-2798-4b1c-bc03-c851bbf247ef",
        type: "SECTION",
        code: "E 2/2",
        libelleEntite: "Exploitation 2 Section 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b969-1ec5-4bb5-8c63-3b263df216f5",
              type: "BUREAU",
              code: "BE2",
              libelleEntite: "Bureau Exploitation 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95877fce-8cd0-4262-bf62-23e9022c7711",
        type: "SECTION",
        code: "Suisse et Lichtenstein",
        libelleEntite: "BTE Suisse et Lichtenstein",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587309e-85a3-466b-a77d-5b995b3582b5",
              type: "BUREAU",
              code: "BTE",
              libelleEntite: "Bureau Transcription Européen",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587d4dd-2ea7-46b5-a69a-314ca024adcd",
        type: "SECTION",
        code: "Tunisie",
        libelleEntite: "BTM Tunisie",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587042c-65fd-4d02-8e87-bf19c7e9aa9f",
              type: "BUREAU",
              code: "BTM",
              libelleEntite: "Bureau Transcription du Maghreb",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587b969-1ec5-4bb5-8c63-3b263df216f5",
        type: "BUREAU",
        code: "BE2",
        libelleEntite: "Bureau Exploitation 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
              type: "DEPARTEMENT",
              code: "Exploitation",
              libelleEntite: "Exploitation",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587309e-85a3-466b-a77d-5b995b3582b5",
        type: "BUREAU",
        code: "BTE",
        libelleEntite: "Bureau Transcription Européen",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95873b97-bdd2-41f5-98f3-27ab2a4c979a",
        type: "SECTION",
        code: "BO/CAD",
        libelleEntite: "Bureau d'Ordre / Centre d'Archive et Documentation",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95874527-b387-45bb-acef-4cd697109481",
              type: "DEPARTEMENT",
              code: "BAJ",
              libelleEntite: "Bureau des Affaires Juridiques",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587738b-c406-40f5-a8ae-480843b55753",
        type: "SECTION",
        code: "Départ",
        libelleEntite: "Courrier Départ",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587cd09-88d6-4c25-837d-582d3af86085",
              type: "DEPARTEMENT",
              code: "BAC",
              libelleEntite: "Bureau Accueil et Courrier",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95871cf7-f5c4-40b4-8627-f81cc901023c",
        type: "SECTION",
        code: "Secrétariat ETA",
        libelleEntite: "Secrétariat de l'établissement",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95877d3a-4d07-4276-a549-ebe7a735e07a",
        type: "SECTION",
        code: "R 2/4",
        libelleEntite: "Etablissement 2 Redaction 4",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c2d6-98fd-4a4f-88ea-e676e91d56f5",
              type: "BUREAU",
              code: "BR2",
              libelleEntite: "Bureau Rédaction 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95872a79-072b-4813-9d53-9249b0d618da",
        type: "SECTION",
        code: "E 1/4",
        libelleEntite: "Exploitation 1 Section 4",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587baef-7bde-44f7-bf66-298366f56981",
              type: "BUREAU",
              code: "BE1",
              libelleEntite: "Bureau Exploitation 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "958760ac-85ef-40a0-aba9-b3de2fb6f452",
        type: "SECTION",
        code: "Formation EXP",
        libelleEntite: "Cellule Formation Exploitation",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
              type: "DEPARTEMENT",
              code: "Exploitation",
              libelleEntite: "Exploitation",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587a407-967a-4fcc-9844-97ddff00fd37",
        type: "SECTION",
        code: "Zurich",
        libelleEntite: "BTE Zurich",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587309e-85a3-466b-a77d-5b995b3582b5",
              type: "BUREAU",
              code: "BTE",
              libelleEntite: "Bureau Transcription Européen",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587044b-d574-44f9-8713-c752a7bcafc7",
        type: "BUREAU",
        code: "SLA-BTM/BTE",
        libelleEntite: "Section de Liaison et d'Appui - BTM-BTE",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95878e36-fd27-4a7f-a154-4d309ccb694e",
        type: "SECTION",
        code: "R 1/2",
        libelleEntite: "Etablissement 1 Redaction 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c434-c74e-4740-a613-2e00d6a1cd99",
              type: "BUREAU",
              code: "BR1",
              libelleEntite: "Bureau Rédaction 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95871ed1-4a0a-4b2f-9da3-9b0bd6a32991",
        type: "SECTION",
        code: "Accueil",
        libelleEntite: "BAC Accueil",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587cd09-88d6-4c25-837d-582d3af86085",
              type: "DEPARTEMENT",
              code: "BAC",
              libelleEntite: "Bureau Accueil et Courrier",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587cd09-88d6-4c25-837d-582d3af86085",
        type: "DEPARTEMENT",
        code: "BAC",
        libelleEntite: "Bureau Accueil et Courrier",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
              type: "SERVICE",
              code: "SCEC",
              libelleEntite: "Service central d'état civil",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                    type: "MINISTERE",
                    code: "MEAE",
                    libelleEntite:
                      "Ministère de l'Europe et des Affaires Etrangères",
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
      {
        idEntite: "9587c434-c74e-4740-a613-2e00d6a1cd99",
        type: "BUREAU",
        code: "BR1",
        libelleEntite: "Bureau Rédaction 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95878165-3f27-4a23-8ad4-51b0fcc3193f",
        type: "SECTION",
        code: "Fraude",
        libelleEntite: "Secteur Fraude",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95874527-b387-45bb-acef-4cd697109481",
              type: "DEPARTEMENT",
              code: "BAJ",
              libelleEntite: "Bureau des Affaires Juridiques",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587ac58-468c-4902-b320-071f4c5dd23d",
        type: "SECTION",
        code: "E 1/2",
        libelleEntite: "Exploitation 1 Section 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587baef-7bde-44f7-bf66-298366f56981",
              type: "BUREAU",
              code: "BE1",
              libelleEntite: "Bureau Exploitation 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "958784e3-8b21-42c8-aef2-a064d7ab1c67",
        type: "SECTION",
        code: "R 2/3",
        libelleEntite: "Etablissement 2 Redaction 3",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c2d6-98fd-4a4f-88ea-e676e91d56f5",
              type: "BUREAU",
              code: "BR2",
              libelleEntite: "Bureau Rédaction 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95870f50-b0a7-48bc-94d7-daf8e367fbe1",
        type: "SECTION",
        code: "S 2",
        libelleEntite: "Secteur 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95874527-b387-45bb-acef-4cd697109481",
              type: "DEPARTEMENT",
              code: "BAJ",
              libelleEntite: "Bureau des Affaires Juridiques",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95874987-66ba-4fcc-ac99-4327c7964331",
        type: "DEPARTEMENT",
        code: "BAG",
        libelleEntite: "Bureau des Affaires Générales",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
              type: "SERVICE",
              code: "SCEC",
              libelleEntite: "Service central d'état civil",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                    type: "MINISTERE",
                    code: "MEAE",
                    libelleEntite:
                      "Ministère de l'Europe et des Affaires Etrangères",
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
      {
        idEntite: "9587b18b-e150-445d-8206-50fb2142d3e5",
        type: "SECTION",
        code: "R 1/4",
        libelleEntite: "Etablissement 1 Redaction 4",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c434-c74e-4740-a613-2e00d6a1cd99",
              type: "BUREAU",
              code: "BR1",
              libelleEntite: "Bureau Rédaction 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587470f-f389-4622-a570-2e49e43c3cc2",
        type: "SECTION",
        code: "Formation ETA",
        libelleEntite: "Cellule Formation Etablissement",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "958727ef-5ff3-4ff4-94d8-1fffdc107b4b",
        type: "SECTION",
        code: "S 1",
        libelleEntite: "Secteur 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95874527-b387-45bb-acef-4cd697109481",
              type: "DEPARTEMENT",
              code: "BAJ",
              libelleEntite: "Bureau des Affaires Juridiques",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587b0af-9b19-4a24-b7a3-650e9985ca52",
        type: "SECTION",
        code: "R 2/1",
        libelleEntite: "Etablissement 2 Redaction 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c2d6-98fd-4a4f-88ea-e676e91d56f5",
              type: "BUREAU",
              code: "BR2",
              libelleEntite: "Bureau Rédaction 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95871586-c2bd-4765-97d7-5cfcf50a3710",
        type: "SECTION",
        code: "E 2/1",
        libelleEntite: "Exploitation 2 Section 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b969-1ec5-4bb5-8c63-3b263df216f5",
              type: "BUREAU",
              code: "BE2",
              libelleEntite: "Bureau Exploitation 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587aa6c-8a9a-442b-8a6b-e529c8b005c9",
        type: "SECTION",
        code: "Oran",
        libelleEntite: "BTM Oran",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587042c-65fd-4d02-8e87-bf19c7e9aa9f",
              type: "BUREAU",
              code: "BTM",
              libelleEntite: "Bureau Transcription du Maghreb",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95878060-de19-4d22-b53b-e06c77d5b4c0",
        type: "SECTION",
        code: "Luxembourg",
        libelleEntite: "BTE Luxembourg",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587309e-85a3-466b-a77d-5b995b3582b5",
              type: "BUREAU",
              code: "BTE",
              libelleEntite: "Bureau Transcription Européen",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587da22-b358-43c9-bff2-dd6f27978c83",
        type: "SECTION",
        code: "Secrétariat EXP",
        libelleEntite: "Secrétariat de l'exploitation",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
              type: "DEPARTEMENT",
              code: "Exploitation",
              libelleEntite: "Exploitation",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587cd7b-9833-4bfb-b6db-0113d8f80cff",
        type: "SECTION",
        code: "Monaco",
        libelleEntite: "BTE Monaco",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587309e-85a3-466b-a77d-5b995b3582b5",
              type: "BUREAU",
              code: "BTE",
              libelleEntite: "Bureau Transcription Européen",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
        type: "DEPARTEMENT",
        code: "Etablissement",
        libelleEntite: "Etablissement",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
              type: "SERVICE",
              code: "SCEC",
              libelleEntite: "Service central d'état civil",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                    type: "MINISTERE",
                    code: "MEAE",
                    libelleEntite:
                      "Ministère de l'Europe et des Affaires Etrangères",
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
      {
        idEntite: "9587887d-da56-432e-9a26-4d1b59804eda",
        type: "SECTION",
        code: "Secrétariat BAC",
        libelleEntite: "Secrétariat BAC",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587cd09-88d6-4c25-837d-582d3af86085",
              type: "DEPARTEMENT",
              code: "BAC",
              libelleEntite: "Bureau Accueil et Courrier",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
        type: "DEPARTEMENT",
        code: "Exploitation",
        libelleEntite: "Exploitation",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
              type: "SERVICE",
              code: "SCEC",
              libelleEntite: "Service central d'état civil",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                    type: "MINISTERE",
                    code: "MEAE",
                    libelleEntite:
                      "Ministère de l'Europe et des Affaires Etrangères",
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
      {
        idEntite: "9587c2d6-98fd-4a4f-88ea-e676e91d56f5",
        type: "BUREAU",
        code: "BR2",
        libelleEntite: "Bureau Rédaction 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587cc33-86fb-4ba9-ae16-4278f7bc3d18",
        type: "SECTION",
        code: "Maroc",
        libelleEntite: "BTM Maroc",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587042c-65fd-4d02-8e87-bf19c7e9aa9f",
              type: "BUREAU",
              code: "BTM",
              libelleEntite: "Bureau Transcription du Maghreb",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587f1bd-6e35-4153-a0f6-f8b80cc57e5a",
        type: "SECTION",
        code: "R 2/2",
        libelleEntite: "Etablissement 2 Redaction 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c2d6-98fd-4a4f-88ea-e676e91d56f5",
              type: "BUREAU",
              code: "BR2",
              libelleEntite: "Bureau Rédaction 2",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587ee6f-219d-4cc1-9f4f-4da2055eaf77",
        type: "SECTION",
        code: "Secrétariat SCEC",
        libelleEntite: "Secrétariat du SCEC",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
              type: "SERVICE",
              code: "SCEC",
              libelleEntite: "Service central d'état civil",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                    type: "MINISTERE",
                    code: "MEAE",
                    libelleEntite:
                      "Ministère de l'Europe et des Affaires Etrangères",
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
      {
        idEntite: "958740c1-ed87-4731-9261-dfd074e592b7",
        type: "BUREAU",
        code: "SLA-BR",
        libelleEntite: "Section de Liaison et d'Appui - BR1-BR2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
              type: "DEPARTEMENT",
              code: "Etablissement",
              libelleEntite: "Etablissement",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95873422-02d3-4f13-8265-660a278d8942",
        type: "SECTION",
        code: "R 1/1",
        libelleEntite: "Etablissement 1 Redaction 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587c434-c74e-4740-a613-2e00d6a1cd99",
              type: "BUREAU",
              code: "BR1",
              libelleEntite: "Bureau Rédaction 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587f6cd-5805-4408-845f-24bfcbf935a4",
                    type: "DEPARTEMENT",
                    code: "Etablissement",
                    libelleEntite: "Etablissement",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "958779fe-8b26-446c-82e8-e52db38b0a78",
        type: "SECTION",
        code: "E 3/1",
        libelleEntite: "Exploitation 3 Section 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95876ee7-aebf-43ff-8598-b0f7030abbb7",
              type: "BUREAU",
              code: "BE3",
              libelleEntite: "Bureau Exploitation 3",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95872040-9279-4b64-95af-3dc801e05abe",
        type: "SECTION",
        code: "Arrivée",
        libelleEntite: "Courrier Arrivée",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587cd09-88d6-4c25-837d-582d3af86085",
              type: "DEPARTEMENT",
              code: "BAC",
              libelleEntite: "Bureau Accueil et Courrier",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587baef-7bde-44f7-bf66-298366f56981",
        type: "BUREAU",
        code: "BE1",
        libelleEntite: "Bureau Exploitation 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
              type: "DEPARTEMENT",
              code: "Exploitation",
              libelleEntite: "Exploitation",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95875e54-3adc-413f-acc4-e1a2978abc90",
        type: "SECTION",
        code: "E 3/3",
        libelleEntite: "Exploitation 3 Section 3",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95876ee7-aebf-43ff-8598-b0f7030abbb7",
              type: "BUREAU",
              code: "BE3",
              libelleEntite: "Bureau Exploitation 3",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "95879274-25fe-43ae-a6c0-7ca39a067716",
        type: "SECTION",
        code: "E 3/2",
        libelleEntite: "Exploitation 3 Section 2",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95876ee7-aebf-43ff-8598-b0f7030abbb7",
              type: "BUREAU",
              code: "BE3",
              libelleEntite: "Bureau Exploitation 3",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587cee3-3f8b-4b13-82cc-21ddae941084",
        type: "SECTION",
        code: "Nationalité",
        libelleEntite: "Secteur Nationalité",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95874527-b387-45bb-acef-4cd697109481",
              type: "DEPARTEMENT",
              code: "BAJ",
              libelleEntite: "Bureau des Affaires Juridiques",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "95876ee7-aebf-43ff-8598-b0f7030abbb7",
        type: "BUREAU",
        code: "BE3",
        libelleEntite: "Bureau Exploitation 3",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
              type: "DEPARTEMENT",
              code: "Exploitation",
              libelleEntite: "Exploitation",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "958774e9-f7d2-41bb-90b0-f627b81abc2d",
        type: "BUREAU",
        code: "SLA",
        libelleEntite: "Section de Liaison et d'Appui",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
              type: "DEPARTEMENT",
              code: "Exploitation",
              libelleEntite: "Exploitation",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                    type: "SERVICE",
                    code: "SCEC",
                    libelleEntite: "Service central d'état civil",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "95878007-0256-49a7-9d61-1bd506baa82f",
                          type: "MINISTERE",
                          code: "MEAE",
                          libelleEntite:
                            "Ministère de l'Europe et des Affaires Etrangères",
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
                    adresseEntite: null,
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
      {
        idEntite: "9587fb82-59e4-4a8c-a914-173204c163cb",
        type: "SECTION",
        code: "E 1/1",
        libelleEntite: "Exploitation 1 Section 1",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587baef-7bde-44f7-bf66-298366f56981",
              type: "BUREAU",
              code: "BE1",
              libelleEntite: "Bureau Exploitation 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      },
      {
        idEntite: "9587e220-b5e6-484e-96a5-9c667d636576",
        type: "SECTION",
        code: "E 1/3",
        libelleEntite: "Exploitation 1 Section 3",
        siteInternet: null,
        hierarchieEntite: [
          {
            entite: null,
            entiteMere: {
              idEntite: "9587baef-7bde-44f7-bf66-298366f56981",
              type: "BUREAU",
              code: "BE1",
              libelleEntite: "Bureau Exploitation 1",
              siteInternet: null,
              hierarchieEntite: [
                {
                  entite: null,
                  entiteMere: {
                    idEntite: "95878ce0-8cfb-456e-a296-f100685ac064",
                    type: "DEPARTEMENT",
                    code: "Exploitation",
                    libelleEntite: "Exploitation",
                    siteInternet: null,
                    hierarchieEntite: [
                      {
                        entite: null,
                        entiteMere: {
                          idEntite: "9587b5bd-659c-456a-a798-b60e913bb51b",
                          type: "SERVICE",
                          code: "SCEC",
                          libelleEntite: "Service central d'état civil",
                          siteInternet: null,
                          hierarchieEntite: [
                            {
                              entite: null,
                              entiteMere: {
                                idEntite:
                                  "95878007-0256-49a7-9d61-1bd506baa82f",
                                type: "MINISTERE",
                                code: "MEAE",
                                libelleEntite:
                                  "Ministère de l'Europe et des Affaires Etrangères",
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
                          adresseEntite: null,
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
            }
          }
        ],
        utilisateur: null,
        memoCourrier: [],
        adresseEntite: null,
        estDansSCEC: true
      }
    ],
    habilitations: [
      {
        idHabilitation: "ac41bc07-0397-42c1-a7d6-a0e6d64be3bb",
        typeDelegation: null,
        roleDelegant: null,
        villePosteConsulaire: null,
        libelleEntiteDelegant: null,
        dateDebut: 1649343483000,
        dateFin: null,
        profil: {
          idProfil: "9587e4cd-25d3-4070-87b7-a9fef1ca42c9",
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
                idDroit: "9587a054-82e0-43a6-a645-ad3f4cfe0972",
                nom: "CREER_ACTE_ETABLI",
                profilDroit: null
              },
              profil: null
            }
          ]
        },
        utilisateurs: null,
        perimetre: {
          id: "4c09fa58-b2df-4c0a-bccb-f2ac62fe7a3c",
          nom: "MEAE",
          description: "MEAE",
          estActif: true,
          listePays: "Ministère de l'Europe et des Affaires Etrangères",
          listeIdTypeRegistre: []
        }
      },
      {
        idHabilitation: "a66386ea-be53-45c3-83b2-d19b184a521e",
        typeDelegation: null,
        roleDelegant: null,
        villePosteConsulaire: null,
        libelleEntiteDelegant: null,
        dateDebut: 1649343483822,
        dateFin: null,
        profil: {
          idProfil: "5ee71274-3206-4aac-812c-20cf9d28735b",
          nom: {
            idNomenclature: "1be73477-5bb1-429d-abba-974d129bff97",
            categorie: "TYPE_PROFIL",
            code: "DROIT_SAISIR_REQUETE",
            libelle: "Droit saisier requête",
            estActif: true
          },
          habilitation: null,
          profilDroit: [
            {
              droit: {
                idDroit: "241c40a0-4acd-4b61-87d1-57da9c524f70",
                nom: "SAISIR_REQUETE",
                profilDroit: null
              },
              profil: null
            }
          ]
        },
        utilisateurs: null,
        perimetre: {
          id: "4c09fa58-b2df-4c0a-bccb-f2ac62fe7a3c",
          nom: "MEAE",
          description: "MEAE",
          estActif: true,
          listePays: "Ministère de l'Europe et des Affaires Etrangères",
          listeIdTypeRegistre: []
        }
      },
      {
        idHabilitation: "4c7d0207-b295-4a3a-baa2-1d3dc8dd4384",
        typeDelegation: null,
        roleDelegant: null,
        villePosteConsulaire: null,
        libelleEntiteDelegant: null,
        dateDebut: 1649757362592,
        dateFin: null,
        profil: {
          idProfil: "9587bec7-68f8-4c2a-bba6-9fc418f99114",
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
                idDroit: "9587292f-40b4-4203-a236-70397d157ca9",
                nom: "INFORMER_USAGER",
                profilDroit: null
              },
              profil: null
            }
          ]
        },
        utilisateurs: null,
        perimetre: {
          id: "4c09fa58-b2df-4c0a-bccb-f2ac62fe7a3c",
          nom: "MEAE",
          description: "MEAE",
          estActif: true,
          listePays: "Ministère de l'Europe et des Affaires Etrangères",
          listeIdTypeRegistre: []
        }
      },
      {
        idHabilitation: "95878f6f-1bd0-4bca-9c49-42b34742e991",
        typeDelegation: null,
        roleDelegant: null,
        villePosteConsulaire: null,
        libelleEntiteDelegant: null,
        dateDebut: 1610550201823,
        dateFin: null,
        profil: {
          idProfil: "958791fc-2982-4e39-bd12-eda9f4b63247",
          nom: {
            idNomenclature: "4a977892-4a0b-411c-84ac-d7ea11f8da7f",
            categorie: "TYPE_PROFIL",
            code: "SIGNER_DELIVRER",
            libelle: "Signer, délivrer",
            estActif: true
          },
          habilitation: null,
          profilDroit: [
            {
              droit: {
                idDroit: "95875619-5434-4b1a-848e-cacf525147d8",
                nom: "DELIVRER",
                profilDroit: null
              },
              profil: null
            },
            {
              droit: {
                idDroit: "95875b98-6f5d-4e14-b349-c463ef10586b",
                nom: "SIGNER",
                profilDroit: null
              },
              profil: null
            }
          ]
        },
        utilisateurs: null,
        perimetre: {
          id: "4c09fa58-b2df-4c0a-bccb-f2ac62fe7a3c",
          nom: "MEAE",
          description: "MEAE",
          estActif: true,
          listePays: "Ministère de l'Europe et des Affaires Etrangères",
          listeIdTypeRegistre: []
        }
      },
      {
        idHabilitation: "fa075e48-e879-4ed6-a217-324c50f50970",
        typeDelegation: null,
        roleDelegant: null,
        villePosteConsulaire: null,
        libelleEntiteDelegant: null,
        dateDebut: 1649757362558,
        dateFin: null,
        profil: {
          idProfil: "9587caf6-e714-4eba-8a89-6810f1fbc7a3",
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
                idDroit: "958725bd-3233-4c66-9e57-9493b046bf68",
                nom: "CONSULTER",
                profilDroit: null
              },
              profil: null
            }
          ]
        },
        utilisateurs: null,
        perimetre: {
          id: "4c09fa58-b2df-4c0a-bccb-f2ac62fe7a3c",
          nom: "MEAE",
          description: "MEAE",
          estActif: true,
          listePays: "Ministère de l'Europe et des Affaires Etrangères",
          listeIdTypeRegistre: []
        }
      }
    ],
    fonctionAgent: {
      idFonctionAgent: "9587f070-e865-4126-b2fb-c2d99fe7c89f",
      libelleFonction: "chargé de mission",
      utilisateur: null
    },
    actif: true,
    signatureManuscrite: {
      idSignature: "3aaa5774-bdf1-44e1-956a-f416fb0ecd3e",
      contenu: "base64"
    },
    memoCourrier: [],
    titreHonorifique: []
  }
};

export const resultatHeaderUtilistateurLeBiannic = {
  id_sso: "04663316",
  nom: "LE BIANNIC",
  prenom: "Johann",
  trigramme: "JLC",
  mail: "jlb@jlb.fr",
  profil: "RECE_USER\\; RECE_ADMIN",
  telephone: "0600000000",
  section: "",
  bureau: "bureau",
  departement: "departement",
  sectionConsulaire: "section_consulaire",
  service: "SCEC",
  poste: "poste",
  ministere: "MEAE"
};

export const resultatRequeteUtilistateurLeBiannic = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-agent-api/v1/utilisateurs/login",
  data: {
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
          id: "d0c4bb7c-26c2-4bf1-b3e3-0ad013bc9467",
          nom: "ETA X",
          description: "Acquisition par décret",
          estActif: true,
          listePays: null,
          listeIdTypeRegistre: ["b7c4278d-e9ff-4374-b0e9-11c3c81824b2"]
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
          id: "d0c4bb7c-26c2-4bf1-b3e3-0ad013bc9467",
          nom: "ETA X",
          description: "Acquisition par décret",
          estActif: true,
          listePays: null,
          listeIdTypeRegistre: ["b7c4278d-e9ff-4374-b0e9-11c3c81824b2"]
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
          id: "d0c4bb7c-26c2-4bf1-b3e3-0ad013bc9467",
          nom: "ETA X",
          description: "Acquisition par décret",
          estActif: true,
          listePays: null,
          listeIdTypeRegistre: ["b7c4278d-e9ff-4374-b0e9-11c3c81824b2"]
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
          id: "d0c4bb7c-26c2-4bf1-b3e3-0ad013bc9467",
          nom: "ETA X",
          description: "Acquisition par décret",
          estActif: true,
          listePays: null,
          listeIdTypeRegistre: ["b7c4278d-e9ff-4374-b0e9-11c3c81824b2"]
        }
      },
      {
        idHabilitation: "f4e76b2f-3601-475c-8323-2cf073b44187",
        typeDelegation: null,
        roleDelegant: null,
        villePosteConsulaire: null,
        libelleEntiteDelegant: null,
        dateDebut: 1634625595000,
        dateFin: null,
        profil: {
          idProfil: "f1346ddd-1702-4e7d-bb1f-bd490a66bec4",
          nom: {
            idNomenclature: "1be73477-5bb1-429d-abba-974d129bff97",
            categorie: "TYPE_PROFIL",
            code: "DROIT_SAISIR_REQUETE",
            libelle: "Droit saisier requête",
            estActif: true
          },
          habilitation: null,
          profilDroit: [
            {
              droit: {
                idDroit: "f1346ea2-5958-41b6-a478-d536b4e2f4cd",
                nom: "SAISIR_REQUETE",
                profilDroit: null
              },
              profil: null
            }
          ],
          droit: null
        },
        utilisateurs: null,
        perimetre: {
          id: "4c09fa58-b2df-4c0a-bccb-f2ac62fe7a3c",
          nom: "MEAE",
          description: "MEAE",
          estActif: true,
          listePays: null,
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
  }
};
