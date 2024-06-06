import { BesoinUsager } from "@model/requete/enum/BesoinUsager";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { ObjetRequete } from "@model/requete/enum/ObjetRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";

export const requeteInformation: IRequeteInformation = {
  id: "bbd05aed-8ea9-45ba-a7d7-b8d55ad1085c",
  numero: "A23R75",
  dateCreation: 1634712114000,
  canal: TypeCanal.INTERNET,
  type: TypeRequete.INFORMATION,
  actions: [],
  titulaires: [],
  idUtilisateur: "3114021b-a908-4725-a237-fc8807441013",
  idService: "67379d0b-ba6a-44eb-900e-a45d1b0264bc",
  requerant: {
    id: "bbd0b63b-519e-4443-b80b-f590a3f8cd5b",
    dateCreation: new Date("1634716866000"),
    nomFamille: "GOLADE",
    prenom: "Larry",
    courriel: "pointeau.louis@wanadoo.fr",
    telephone: "",
    adresse: {
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      codePostal: "310 GL24",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "France"
    },
    qualiteRequerant: {
      autreProfessionnel: undefined,
      institutionnel: undefined,
      mandataireHabilite: undefined,
      particulier: undefined,
      qualite: Qualite.PARTICULIER,
      utilisateurRece: undefined
    },
    lienRequerant: undefined
  },
  observations: [],
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE,
    dateEffet: 1637842737982,
    raisonStatut: ""
  },
  sousType: SousTypeInformation.INFORMATION,
  objet: ObjetRequete.DEMANDE_COPIE_ACTE,
  complementObjet: ComplementObjetRequete.COPIE_ACTE_NON_RECUE,
  commentaire: "test commentaire",
  provenanceRequete: Provenance.INTERNET,
  numeroRequeteLiee: "ABC123",
  idRequeteLiee: undefined,
  piecesComplementInformation: undefined,
  besoinUsager: BesoinUsager.POSER_QUESTION_DEMANDE_EN_COURS
};

export const requeteInformationCompletion: IRequeteInformation = {
  id: "bbd05aed-8ea9-45ba-a7d7-b8d55ad1085c",
  numero: "A23R75",
  dateCreation: 1634712114000,
  canal: TypeCanal.INTERNET,
  type: TypeRequete.INFORMATION,
  actions: [],
  titulaires: [],
  idUtilisateur: "3114021b-a908-4725-a237-fc8807441013",
  idService: "67379d0b-ba6a-44eb-900e-a45d1b0264bc",
  requerant: {
    id: "bbd0b63b-519e-4443-b80b-f590a3f8cd5b",
    dateCreation: new Date("1634716866000"),
    nomFamille: "GOLADE",
    prenom: "Larry",
    courriel: "pointeau.louis@wanadoo.fr",
    telephone: "",
    adresse: {
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      codePostal: "310 GL24",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
      pays: "France"
    },
    qualiteRequerant: {
      autreProfessionnel: undefined,
      institutionnel: undefined,
      mandataireHabilite: undefined,
      particulier: undefined,
      qualite: Qualite.PARTICULIER,
      utilisateurRece: undefined
    },
    lienRequerant: undefined
  },
  observations: [],
  statutCourant: {
    statut: StatutRequete.PRISE_EN_CHARGE,
    dateEffet: 1637842737982,
    raisonStatut: ""
  },
  sousType: SousTypeInformation.COMPLETION_REQUETE_EN_COURS,
  objet: ObjetRequete.COMPLETION_REQUETE_EN_COURS,
  complementObjet: ComplementObjetRequete.REPONSE_LIBRE_AGENT,
  commentaire: "test commentaire",
  provenanceRequete: Provenance.INTERNET,
  numeroRequeteLiee: "ABC123",
  idRequeteLiee: undefined,
  piecesComplementInformation: undefined,
  besoinUsager: BesoinUsager.COMPLETER_DEMANDE
};
