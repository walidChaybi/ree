import { TypeEntite } from "../../model/agent/enum/TypeEntite";
import { Droit } from "../../model/Droit";
import { IOfficierSSOApi } from "../../model/IOfficierSSOApi";

export const userDroitConsulterArchive: IOfficierSSOApi = {
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
  service: "serviceConnectedUser",
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

export const userDroitConsulterConsulterArchive: IOfficierSSOApi = {
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
  service: "serviceConnectedUser",
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

export const userDroitConsulterPerimetreMEAE: IOfficierSSOApi = {
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
  service: "serviceConnectedUser",
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

export const userDroitConsulterPerimetreTUNIS: IOfficierSSOApi = {
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
  service: "serviceConnectedUser",
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

export const userDroitnonCOMEDEC: IOfficierSSOApi = {
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
  service: "serviceConnectedUser",
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

export const userDroitCOMEDEC: IOfficierSSOApi = {
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
  service: "serviceConnectedUser",
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
