/* istanbul ignore file */

import { TypeAutorite } from "@model/etatcivil/enum/TypeAutorite";
import { TypeDecision } from "@model/etatcivil/enum/TypeDecision";

const regionIleDeFrance = "Ile de france";
const regionBoucheDuRhone = "Bouches-du-Rhône";

export const ficheAutoriteJuridictionFranceAvecConfirmation = {
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.JUGEMENT,
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
      nomOnac: "",
      prenomOnac: ""
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
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteJuridictionFranceAvecConfirmationAvecDateEtrangèreRCA = {
  categorie: "RCA",
  decision: {
    dateDecision: 1577059200,
    dateDecisionEtrangere: 1577059200,
    type: TypeDecision.JUGEMENT,
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
      nomOnac: "",
      prenomOnac: ""
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
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      dateDecisionEtrangere: 1577059200,
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteJuridictionEtrangerAvecConfirmation = {
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.JUGEMENT,
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
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
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
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteNotaireFranceAvecConfirmation = {
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.ACTE_NOTARIE,
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
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        type: undefined,
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: "",
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteONACFranceAvecConfirmation = {
  categorie: "RCA",
  decision: {
    dateDecision: 1577059200,
    dateDecisionEtrangere: 1577059200,
    type: TypeDecision.CONVENTION,
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
      nomOnac: "nomOnac",
      prenomOnac: "enomOnac"
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
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      dateDecisionEtrangere: 1577059200,

      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteNotaireEtrangerAvecConfirmation = {
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.ACTE_NOTARIE,
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
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        type: undefined,
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: "",
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteOnaceEtrangerAvecConfirmation = {
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.ACTE_NOTARIE,
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
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: {
      autorite: {
        type: "ONAC",
        ville: "Marseille",
        arrondissement: "10",
        numeroDepartement: "13",
        libelleDepartement: regionBoucheDuRhone,
        pays: "France",
        region: regionIleDeFrance,
        nomNotaire: "nomnotaire",
        prenomNotaire: "prenomnotaire",
        numeroCrpcen: "",
        nomOnac: "",
        prenomOnac: ""
      },
      dateDecision: 1584403200,
      enrolementRg: "enrolementRg",
      enrolementPortalis: "enrolementPortalis",
      type: TypeDecision.ARRET
    }
  }
};

export const ficheAutoriteSansConfirmation = {
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.ACTE_NOTARIE,
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
      nomOnac: "",
      prenomOnac: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: null
  }
};

export const ficheAutoriteOnac = {
  categorie: "RCA",
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.ACTE_NOTARIE,
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
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: null
  }
};

export const ficheNonValide = {
  decision: {
    dateDecision: 1577059200,
    type: null,
    autorite: {
      type: null,
      numeroDepartement: "69",
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "",
      region: regionIleDeFrance,
      arrondissement: "8",
      nomNotaire: "nomnotaire",
      prenomNotaire: "prenomnotaire",
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    },
    enrolementRg: "enrolementRg",
    enrolementPortalis: "enrolementPortalis",
    sourceConfirmation: null
  }
};
