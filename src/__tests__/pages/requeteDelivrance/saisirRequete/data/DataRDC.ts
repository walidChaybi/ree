import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { CreationRequeteRDC } from "../../../../../views/pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRDCPageModel";

export const RequeteRDCTitulaire = {
  futurStatut: StatutRequete.PRISE_EN_CHARGE,
  refus: false,
  saisie: {
    requete: {
      natureActe: "DECES",
      documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      nbExemplaire: 1,
      motif: "DECLARATION_ACQUISITION_DE_NATIONALITE_FRANCAISE",
      complementMotif: ""
    },
    evenement: {
      dateEvenement: {
        jour: "",
        mois: "",
        annee: "1990"
      },
      villeEvenement: "Nantes",
      paysEvenement: "France"
    },
    titulaire1: {
      noms:{

        nomNaissance: "NOM",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "Prenom1",
          prenom2: "Prenom2",
          prenom3: "Prenom3"
        }
      },
      parent2: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    titulaire2: {
      noms:{
        nomNaissance: "",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parent2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    requerant: {
      typeRequerant: "TITULAIRE",
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
        nomNaissance: "",
        nomUsage: "",
        prenom: ""
      }
    },
    mandant: {
      typeMandant: "",
      nom: "",
      prenom: "",
      raisonSociale: ""
    },
    lienTitulaire: {
      lien: "TITULAIRE",
      natureLien: ""
    },
    adresse: {
      voie: "Voie",
      lieuDit: "Lieu-dit",
      complementDestinataire: "complement",
      complementPointGeo: "",
      codePostal: "44000",
      commune: "Commune",
      pays: "Pays",
      adresseCourriel: "adresse@courriel.com",
      numeroTelephone: "0505050505"
    }
  }
} as CreationRequeteRDC;

export const RequeteRDCMandataire = {
  futurStatut: StatutRequete.PRISE_EN_CHARGE,
  refus: false,
  saisie: {
    requete: {
      natureActe: "DECES",
      documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      nbExemplaire: 1,
      motif: "DECLARATION_ACQUISITION_DE_NATIONALITE_FRANCAISE",
      complementMotif: ""
    },
    evenement: {
      dateEvenement: {
        jour: "",
        mois: "",
        annee: "1990"
      },
      villeEvenement: "Nantes",
      paysEvenement: "France"
    },
    titulaire1: {
      noms:{
        nomNaissance: "NOM",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "Prenom1",
          prenom2: "Prenom2",
          prenom3: "Prenom3"
        }
      },
      parent2: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    titulaire2: {
      noms:{
        nomNaissance: "",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parent2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    requerant: {
      typeRequerant: "MANDATAIRE",
      mandataire: {
        type: "AVOCAT",
        nature: "",
        raisonSociale: "Raison sociale",
        nom: "NOM",
        prenom: "Prenom"
      },
      institutionnel: {
        type: "",
        nature: "",
        nomInstitution: "",
        nom: "",
        prenom: ""
      },
      particulier: {
        nomNaissance: "",
        nomUsage: "",
        prenom: ""
      }
    },
    mandant: {
      typeMandant: "",
      nom: "",
      prenom: "",
      raisonSociale: ""
    },
    lienTitulaire: {
      lien: "TITULAIRE",
      natureLien: ""
    },
    adresse: {
      voie: "Voie",
      lieuDit: "Lieu-dit",
      complementDestinataire: "complement",
      complementPointGeo: "",
      codePostal: "44000",
      commune: "Commune",
      pays: "Pays",
      adresseCourriel: "adresse@courriel.com",
      numeroTelephone: "0505050505"
    }
  }
} as CreationRequeteRDC;

export const RequeteRDCInstitutionnel = {
  futurStatut: StatutRequete.A_TRAITER,
  refus: true,
  saisie: {
    requete: {
      natureActe: "DECES",
      documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      nbExemplaire: 1,
      motif: "DECLARATION_ACQUISITION_DE_NATIONALITE_FRANCAISE",
      complementMotif: ""
    },
    evenement: {
      dateEvenement: {
        jour: "",
        mois: "",
        annee: "1990"
      },
      villeEvenement: "Nantes",
      paysEvenement: "France"
    },
    titulaire1: {
      noms:{
        nomNaissance: "NOM",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "Prenom1",
          prenom2: "Prenom2",
          prenom3: "Prenom3"
        }
      },
      parent2: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    titulaire2: {
      noms:{
        nomNaissance: "",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parent2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    requerant: {
      typeRequerant: "INSTITUTIONNEL",
      institutionnel: {
        type: "MAIRIE",
        nature: "",
        nomInstitution: "NOM INSTITUTION",
        nom: "NOM REPRESENTANT",
        prenom: "Prenom representant"
      }
    },
    mandant: {
      typeMandant: "",
      nom: "",
      prenom: "",
      raisonSociale: ""
    },
    lienTitulaire: {
      lien: "",
      natureLien: ""
    },
    adresse: {
      voie: "Voie",
      lieuDit: "Lieu-dit",
      complementDestinataire: "complement",
      complementPointGeo: "",
      codePostal: "44000",
      commune: "Commune",
      pays: "Pays",
      adresseCourriel: "adresse@courriel.com",
      numeroTelephone: "0505050505"
    }
  }
} as CreationRequeteRDC;

export const RequeteRDCParticulier = {
  futurStatut: StatutRequete.BROUILLON,
  refus: false,
  saisie: {
    requete: {
      natureActe: "DECES",
      documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      nbExemplaire: 1,
      motif: "DECLARATION_ACQUISITION_DE_NATIONALITE_FRANCAISE",
      complementMotif: ""
    },
    evenement: {
      dateEvenement: {
        jour: "",
        mois: "",
        annee: "1990"
      },
      villeEvenement: "Nantes",
      paysEvenement: "France"
    },
    titulaire1: {
      noms:{
        nomNaissance: "NOM",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "Prenom1",
          prenom2: "Prenom2",
          prenom3: "Prenom3"
        }
      },
      parent2: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    titulaire2: {
      noms:{
        nomNaissance: "",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parent2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    requerant: {
      typeRequerant: "PARTICULIER",
      particulier: {
        nomNaissance: "NOM",
        nomUsage: "NOM USAGE",
        prenom: "Prenom"
      }
    },
    mandant: {
      typeMandant: "",
      nom: "",
      prenom: "",
      raisonSociale: ""
    },
    lienTitulaire: {
      lien: "TITULAIRE",
      natureLien: ""
    },
    adresse: {
      voie: "Voie",
      lieuDit: "Lieu-dit",
      complementDestinataire: "complement",
      complementPointGeo: "",
      codePostal: "44000",
      commune: "Commune",
      pays: "Pays",
      adresseCourriel: "adresse@courriel.com",
      numeroTelephone: "0505050505"
    }
  }
} as CreationRequeteRDC;

export const RequeteRDCAutreProfessionnnel = {
  futurStatut: StatutRequete.PRISE_EN_CHARGE,
  refus: false,
  saisie: {
    requete: {
      natureActe: "DECES",
      documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      nbExemplaire: 1,
      motif: "DECLARATION_ACQUISITION_DE_NATIONALITE_FRANCAISE",
      complementMotif: ""
    },
    evenement: {
      dateEvenement: {
        jour: "",
        mois: "",
        annee: "1990"
      },
      villeEvenement: "Nantes",
      paysEvenement: "France"
    },
    titulaire1: {
      noms:{
        nomNaissance: "NOM",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "Prenom1",
          prenom2: "Prenom2",
          prenom3: "Prenom3"
        }
      },
      parent2: {
        nomNaissance: "NOM",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    titulaire2: {
      noms:{
        nomNaissance: "",
        nomUsage: "",
      },
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
      nationalite: "INCONNUE",
      parent1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parent2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    requerant: {
      typeRequerant: "AUTRE_PROFESSIONNEL",
      autreProfessionnel: {
        nature: "Nature",
        raisonSociale: "",
        nom: "NOM",
        prenom: "Prenom"
      }
    },
    mandant: {
      typeMandant: "",
      nom: "",
      prenom: "",
      raisonSociale: ""
    },
    lienTitulaire: {
      lien: "",
      natureLien: ""
    },
    adresse: {
      voie: "Voie",
      lieuDit: "Lieu-dit",
      complementDestinataire: "complement",
      complementPointGeo: "",
      codePostal: "44000",
      commune: "Commune",
      pays: "Pays",
      adresseCourriel: "adresse@courriel.com",
      numeroTelephone: "0505050505"
    }
  }
} as CreationRequeteRDC;
