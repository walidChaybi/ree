import { FicheRcDecisionNotaire } from "@mock/data/ficheRC";
import { ficheRca } from "@mock/data/ficheRCA";
import { ETypeDecision } from "@model/etatcivil/enum/ETypeDecision";
import { TypeAutorite } from "@model/etatcivil/enum/TypeAutorite";
import { IFicheRcDto, IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";

const regionIleDeFrance = "Ile de france";
const regionBoucheDuRhone = "Bouches-du-Rhône";

export const ficheAutoriteJuridictionFranceAvecConfirmation: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "JUGEMENT",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",

      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: "",
      titreOnac: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        typeAutorite: TypeAutorite.JURIDICTION,
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: "",
        titreOnac: ""
      },
      dateDecision: [2020, 3, 17],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA: IFicheRcaDto = {
  ...ficheRca.data,
  categorie: "RCA",
  decision: {
    dateDecision: [2019, 12, 23],
    dateDecisionEtrangere: [2019, 12, 23],
    type: "JUGEMENT",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",

      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        typeAutorite: TypeAutorite.JURIDICTION,
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      dateDecisionEtrangere: [2019, 12, 23],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteJuridictionEtrangerAvecConfirmation: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "JUGEMENT",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "",
      libelleDepartement: "",
      ville: "Berlin",
      pays: "Allemagne",
      region: "Berlin-Brandebourg",
      arrondissement: "",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        typeAutorite: TypeAutorite.JURIDICTION,
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteNotaireFranceAvecConfirmation: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "ACTE_NOTARIE",
    autorite: {
      typeAutorite: TypeAutorite.NOTAIRE,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteONACFranceAvecConfirmation: IFicheRcaDto = {
  ...ficheRca.data,
  categorie: "RCA",
  decision: {
    dateDecision: [2019, 12, 23],
    dateDecisionEtrangere: [2019, 12, 23],
    type: "CONVENTION",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: "",
      titreOnac: "nomOnac"
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        typeAutorite: TypeAutorite.JURIDICTION,
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      dateDecisionEtrangere: [2019, 12, 23],

      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteNotaireEtrangerAvecConfirmation: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "ACTE_NOTARIE",
    autorite: {
      typeAutorite: TypeAutorite.NOTAIRE,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lausanne",
      pays: "Suisse",
      region: "Vaud",
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteOnaceEtrangerAvecConfirmation: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "ACTE_NOTARIE",
    autorite: {
      typeAutorite: TypeAutorite.ONAC,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lausanne",
      pays: "Suisse",
      region: "Vaud",
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: ""
      },
      dateDecision: [2020, 3, 17],
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: "ARRET"
    }
  }
};

export const ficheAutoriteSansConfirmation: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "ACTE_NOTARIE",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis"
  }
};

export const ficheAutoriteOnac: IFicheRcaDto = {
  ...ficheRca.data,
  categorie: "RCA",
  decision: {
    dateDecision: [2019, 12, 23],
    type: "ACTE_NOTARIE",
    autorite: {
      typeAutorite: TypeAutorite.ONAC,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: "",
      titreOnac: "titreOnac"
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis"
  }
};

export const ficheNonValide: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  decision: {
    dateDecision: [2019, 12, 23],
    type: "" as keyof typeof ETypeDecision,
    autorite: {
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "",
      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis"
  }
};
