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
        nom: "pNom",
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
        nom: "pNom",
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
        nom: "pNom",
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
  ]
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
        nom: "pNom",
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
