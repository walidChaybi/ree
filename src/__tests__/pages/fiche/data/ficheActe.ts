import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";

export const bandeauActe: IBandeauFiche = {
  titreFenetre: "NAISSANCE-DUPE-N°2020-123456",
  categorie: "acte",
  identifiant: "123456",
  registre: "ACQ.DX.2020.123456..01133",
  annee: "20220",
  numero: "123456",
  statutsFiche: [],
  personnes: [{ prenom: "Laurent", nom: "Dupe" }],
  dateDerniereMaj: "07/01/2021",
  dateDerniereDelivrance: "07/01/2021"
};

export const acte: any = {
  id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "410",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "a41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b14c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      appositionNumerique: 1606086000,
      appositionPapier: 1606086000,
      statut: "TODO",
      delivrable: false,
      nomOec: "Screens",
      prenomOec: "Gabriellia",
      piecesAnnexes: [
        {
          nom: "DOC1",
          type: "docx"
        }
      ]
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon",
        ville: "Saint-Pierre",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles2",
        arrondissement: null,
        voie: "7 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "16 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [{ prenom: "Laurent", nom: "Dupe" }],
  compositionCorps: [
    {
      texte: null,
      image: null,
      noPage: 1
    },
    {
      texte: null,
      image: null,
      noPage: 3
    },
    {
      texte: "corps d'acte4",
      image: null,
      noPage: null
    },
    {
      texte: null,
      image: null,
      noPage: 2
    }
  ]
};

export const acte1: any = {
  id: "d8708d77-a359-4553-be72-1eb5f246d4dc",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("ABSENCE"),
  numero: "411",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b24c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      appositionNumerique: 1606086000,
      appositionPapier: 1606086000,
      statut: "TODO",
      delivrable: false,
      nomOec: "Screens",
      prenomOec: "Gabriellia",
      piecesAnnexes: [
        {
          nom: "DOC1",
          type: "docx"
        }
      ]
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles3",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon2",
        ville: "Saint-Pierre2",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles4",
        arrondissement: null,
        voie: "17 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "6 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [],
  compositionCorps: [
    {
      texte: null,
      image: null,
      noPage: 1
    },
    {
      texte: null,
      image: null,
      noPage: 3
    },
    {
      texte: "corps d'acte2",
      image: null,
      noPage: null
    },
    {
      texte: null,
      image: null,
      noPage: 2
    }
  ]
};

export const acte2: any = {
  id: "2748bb45-22cd-41ea-90db-0483b8ffc8a8",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "412",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "c41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b34c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1922,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      appositionNumerique: 1606086000,
      appositionPapier: 1606086000,
      statut: "TODO",
      delivrable: false,
      nomOec: "Screens",
      prenomOec: "Gabriellia",
      piecesAnnexes: [
        {
          nom: "DOC1",
          type: "docx"
        }
      ]
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles5",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon3",
        ville: "Saint-Pierre3",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles6",
        arrondissement: null,
        voie: "27 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "26 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [],
  compositionCorps: [
    {
      texte: null,
      image: null,
      noPage: 1
    },
    {
      texte: null,
      image: null,
      noPage: 3
    },
    {
      texte: "corps d'acte5",
      image: null,
      noPage: null
    },
    {
      texte: null,
      image: null,
      noPage: 2
    }
  ]
};

export const acte3: any = {
  id: "d8708d77-a359-4553-be72-1eb5f246d4db",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "413",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "d41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b44c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      appositionNumerique: 1606086000,
      appositionPapier: 1606086000,
      statut: "TODO",
      delivrable: false,
      nomOec: "Screens",
      prenomOec: "Gabriellia",
      piecesAnnexes: [
        {
          nom: "DOC1",
          type: "docx"
        }
      ]
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles7",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon4",
        ville: "Saint-Pierre4",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles8",
        arrondissement: null,
        voie: "37 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "116 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [],
  compositionCorps: [
    {
      texte: null,
      image: null,
      noPage: 1
    },
    {
      texte: null,
      image: null,
      noPage: 3
    },
    {
      texte: "corps d'acte3",
      image: null,
      noPage: null
    },
    {
      texte: null,
      image: null,
      noPage: 2
    }
  ]
};

export const acte4: any = {
  id: "2748bb45-22cd-41ea-90db-0483b8ffc8a9",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "414",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "f41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b54c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1922,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      appositionNumerique: 1606086000,
      appositionPapier: 1606086000,
      statut: "TODO",
      delivrable: false,
      nomOec: "Screens",
      prenomOec: "Gabriellia",
      piecesAnnexes: [
        {
          nom: "DOC1",
          type: "docx"
        }
      ]
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles9",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon5",
        ville: "Saint-Pierre5",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles10",
        arrondissement: null,
        voie: "47 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "169 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [
    {
      complementDescription: "petit test de description",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390ab5",
        nom: "TYPE_ALERTE",
        code: "DELIVRANCE_RESERVE_PREUVE",
        libelle:
          "Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint",
        type: "A délivrer sous conditions",
        sousType: "Divers - délivrer sous conditions "
      },
      dateCreation: 1552863600000,
      trigrammeUtilisateur: "MLA"
    },
    {
      complementDescription: "ça c'est pas délivrable",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390aaa",
        nom: "TYPE_ALERTE",
        code: "ATTENTE_NUMERISATION",
        libelle: "En attente de nouvelle numérisation",
        type: "A ne pas délivrer",
        sousType: "Divers - ne pas délivrer"
      },
      dateCreation: 1552863600000,
      trigrammeUtilisateur: "AHE"
    },
    {
      complementDescription: "description 2 de l'alerte",
      typeAlerte: {
        id: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
        nom: "TYPE_ALERTE",
        code: "INFORMATION_SAGA",
        libelle: "Information SAGA",
        type: "Description SAGA",
        sousType: "Repris SAGA"
      },
      dateCreation: 1552863600000,
      trigrammeUtilisateur: "RECE"
    },
    {
      complementDescription: "description 1 de l'alerte",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390ab0",
        nom: "TYPE_ALERTE",
        code: "PROBLEME_FONCTIONNEL",
        libelle: "Problème fonctionnel",
        type: "Problème fonctionnel",
        sousType: "Problème fonctionnel"
      },
      dateCreation: 1552863600000,
      trigrammeUtilisateur: "MVI"
    },
    {
      complementDescription:
        "et encore une description avec du blabla et encore du blabla. Qu'est ce qu'elle est longue. Et une autre phrase. Aller une dernière",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390ab9",
        nom: "TYPE_ALERTE",
        code: "ACTE_NON_NUMERISE",
        libelle: "Acte pas encore numérisé",
        type: "Acte non exploitable",
        sousType: "Acte non exploitable"
      },
      dateCreation: 1552863600000,
      trigrammeUtilisateur: "NSL"
    }
  ],
  personnes: [],
  compositionCorps: [
    {
      texte: null,
      image: null,
      noPage: 1
    },
    {
      texte: null,
      image: null,
      noPage: 3
    },
    {
      texte: "corps d'acte",
      image: null,
      noPage: null
    },
    {
      texte: null,
      image: null,
      noPage: 2
    }
  ]
};
