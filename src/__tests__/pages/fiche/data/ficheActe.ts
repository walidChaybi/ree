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
  dateInitialisation: 1405980000000,
  dateCreation: 1256943600000,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200000,
  nature: new NatureActe("Absence"),
  numero: "410",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800000,
  dateDerniereMaj: 1536357600000,
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
      appositionNumerique: 1606086000000,
      appositionPapier: 1606086000000,
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
  dateInitialisation: 1405980000000,
  dateCreation: 1256943600000,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200000,
  nature: new NatureActe("ABSENCE"),
  numero: "411",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800000,
  dateDerniereMaj: 1536357600000,
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
      appositionNumerique: 1606086000000,
      appositionPapier: 1606086000000,
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
  dateInitialisation: 1405980000000,
  dateCreation: 1256943600000,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200000,
  nature: new NatureActe("Absence"),
  numero: "412",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800000,
  dateDerniereMaj: 1536357600000,
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
      appositionNumerique: 1606086000000,
      appositionPapier: 1606086000000,
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
  dateInitialisation: 1405980000000,
  dateCreation: 1256943600000,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200000,
  nature: new NatureActe("Absence"),
  numero: "413",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800000,
  dateDerniereMaj: 1536357600000,
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
      appositionNumerique: 1606086000000,
      appositionPapier: 1606086000000,
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
  dateInitialisation: 1405980000000,
  dateCreation: 1256943600000,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200000,
  nature: new NatureActe("Absence"),
  numero: "414",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800000,
  dateDerniereMaj: 1536357600000,
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
      appositionNumerique: 1606086000000,
      appositionPapier: 1606086000000,
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
