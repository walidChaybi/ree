import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { CreationRequeteRDCSC } from "../../../../../views/pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRDCSCPageModel";

export const RequeteRDCSCInteresse = {
  futurStatut: StatutRequete.PRISE_EN_CHARGE,
  refus: false,
  saisie: {
    document: "34da88e2-c5c7-4324-ac8e-b35193352e64",
    interesse: {
      nomFamille: "",
      nomUsage: "",
      prenoms: {
        prenom1: "",
        prenom2: "",
        prenom3: ""
      },
      sexe: "INCONNU",
      naissance: {
        dateEvenement: {
          jour: "",
          mois: "",
          annee: "1990"
        },
        villeEvenement: "Nantes",
        paysEvenement: "France"
      },
      nationalite: "INCONNUE"
    },
    requerant: {
      typeRequerant: "INTERESSE",
      mandataire: {
        type: "",
        nature: "",
        raisonSociale: "",
        nom: "",
        prenom: ""
      },
      institutionnel: {
        type: "",
        nature: "",
        nomInstitution: "",
        nom: "",
        prenom: ""
      },
      particulier: {
        nomFamille: "",
        nomUsage: "",
        prenom: ""
      }
    },
    adresse: {
      voie: "",
      lieuDit: "",
      complementDestinataire: "",
      complementPointGeo: "",
      codePostal: "",
      commune: "",
      pays: "",
      adresseCourriel: "",
      numeroTelephone: ""
    },
    piecesJointes: [
      {
        base64File: {
          fileName: "test.pdf",
          base64String: "base64",
          extension: "pdf",
          mimeType: "application/pdf",
          taille: 123
        }
      }
    ]
  }
} as CreationRequeteRDCSC;

export const RequeteRDCSCMandataire = {
  futurStatut: StatutRequete.PRISE_EN_CHARGE,
  refus: false,
  saisie: {
    document: "34da88e2-c5c7-4324-ac8e-b35193352e64",
    interesse: {
      nomFamille: "",
      nomUsage: "",
      prenoms: {
        prenom1: "",
        prenom2: "",
        prenom3: ""
      },
      sexe: "INCONNU",
      naissance: {
        dateEvenement: {
          jour: "",
          mois: "",
          annee: "1990"
        },
        villeEvenement: "Nantes",
        paysEvenement: "France"
      },
      nationalite: "INCONNUE"
    },
    requerant: {
      typeRequerant: "MANDATAIRE",
      mandataire: {
        type: "",
        nature: "",
        raisonSociale: "",
        nom: "",
        prenom: ""
      },
      institutionnel: {
        type: "",
        nature: "",
        nomInstitution: "",
        nom: "",
        prenom: ""
      },
      particulier: {
        nomFamille: "",
        nomUsage: "",
        prenom: ""
      }
    },
    adresse: {
      voie: "",
      lieuDit: "",
      complementDestinataire: "",
      complementPointGeo: "",
      codePostal: "",
      commune: "",
      pays: "",
      adresseCourriel: "",
      numeroTelephone: ""
    },
    piecesJointes: [
      {
        base64File: {
          fileName: "test.pdf",
          base64String: "base64",
          extension: "pdf",
          mimeType: "application/pdf",
          taille: 123
        }
      }
    ]
  }
} as CreationRequeteRDCSC;

export const RequeteRDCSCInstitutionnel = {
  futurStatut: StatutRequete.A_TRAITER,
  refus: true,
  saisie: {
    document: "34da88e2-c5c7-4324-ac8e-b35193352e64",
    interesse: {
      nomFamille: "",
      nomUsage: "",
      prenoms: {
        prenom1: "",
        prenom2: "",
        prenom3: ""
      },
      sexe: "INCONNU",
      naissance: {
        dateEvenement: {
          jour: "",
          mois: "",
          annee: "1990"
        },
        villeEvenement: "Nantes",
        paysEvenement: "France"
      },
      nationalite: "INCONNUE"
    },
    requerant: {
      typeRequerant: "INSTITUTIONNEL",
      mandataire: {
        type: "",
        nature: "",
        raisonSociale: "",
        nom: "",
        prenom: ""
      },
      institutionnel: {
        type: "",
        nature: "",
        nomInstitution: "",
        nom: "",
        prenom: ""
      },
      particulier: {
        nomFamille: "",
        nomUsage: "",
        prenom: ""
      }
    },
    adresse: {
      voie: "",
      lieuDit: "",
      complementDestinataire: "",
      complementPointGeo: "",
      codePostal: "",
      commune: "",
      pays: "",
      adresseCourriel: "",
      numeroTelephone: ""
    },
    piecesJointes: [
      {
        base64File: {
          fileName: "test.pdf",
          base64String: "base64",
          extension: "pdf",
          mimeType: "application/pdf",
          taille: 123
        }
      }
    ]
  }
} as CreationRequeteRDCSC;

export const RequeteRDCSCParticulier = {
  futurStatut: StatutRequete.BROUILLON,
  refus: false,
  saisie: {
    document: "34da88e2-c5c7-4324-ac8e-b35193352e64",
    interesse: {
      nomFamille: "",
      nomUsage: "",
      prenoms: {
        prenom1: "",
        prenom2: "",
        prenom3: ""
      },
      sexe: "INCONNU",
      naissance: {
        dateEvenement: {
          jour: "",
          mois: "",
          annee: "1990"
        },
        villeEvenement: "Nantes",
        paysEvenement: "France"
      },
      nationalite: "INCONNUE"
    },
    requerant: {
      typeRequerant: "PARTICULIER",
      mandataire: {
        type: "",
        nature: "",
        raisonSociale: "",
        nom: "",
        prenom: ""
      },
      institutionnel: {
        type: "",
        nature: "",
        nomInstitution: "",
        nom: "",
        prenom: ""
      },
      particulier: {
        nomFamille: "",
        nomUsage: "",
        prenom: ""
      }
    },
    adresse: {
      voie: "",
      lieuDit: "",
      complementDestinataire: "",
      complementPointGeo: "",
      codePostal: "",
      commune: "",
      pays: "",
      adresseCourriel: "",
      numeroTelephone: ""
    },
    piecesJointes: [
      {
        base64File: {
          fileName: "test.pdf",
          base64String: "base64",
          extension: "pdf",
          mimeType: "application/pdf",
          taille: 123
        }
      }
    ]
  }
} as CreationRequeteRDCSC;
