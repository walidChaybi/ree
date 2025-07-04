import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { describe, expect, test } from "vitest";

describe("Test du modèle Utilisateur", () => {
  test("Création IUtilisateur depuis DTO", () => {
    expect(Utilisateur.depuisDto({})).toBeNull();

    let utilisateur = Utilisateur.depuisDto({ idUtilisateur: "idUtilisateur" });
    expect({
      id: utilisateur?.id,
      prenomNom: utilisateur?.prenomNom,
      idService: utilisateur?.idService,
      estDuSCEC: utilisateur?.estDuSCEC
    }).toStrictEqual({
      id: "idUtilisateur",
      prenomNom: "",
      idService: "",
      estDuSCEC: false
    });

    utilisateur = Utilisateur.depuisDto({ idUtilisateur: "idUtilisateur", prenom: "Prénom" });
    expect({
      id: utilisateur?.id,
      prenomNom: utilisateur?.prenomNom,
      idService: utilisateur?.idService,
      estDuSCEC: utilisateur?.estDuSCEC
    }).toStrictEqual({
      id: "idUtilisateur",
      prenomNom: "Prénom",
      idService: "",
      estDuSCEC: false
    });

    utilisateur = Utilisateur.depuisDto({ idUtilisateur: "idUtilisateur", nom: "NOM" });
    expect({
      id: utilisateur?.id,
      prenomNom: utilisateur?.prenomNom,
      idService: utilisateur?.idService,
      estDuSCEC: utilisateur?.estDuSCEC
    }).toStrictEqual({
      id: "idUtilisateur",
      prenomNom: "NOM",
      idService: "",
      estDuSCEC: false
    });

    utilisateur = Utilisateur.depuisDto({ idUtilisateur: "idUtilisateur", prenom: "Prénom", nom: "NOM" });
    expect({
      id: utilisateur?.id,
      prenomNom: utilisateur?.prenomNom,
      idService: utilisateur?.idService,
      estDuSCEC: utilisateur?.estDuSCEC
    }).toStrictEqual({
      id: "idUtilisateur",
      prenomNom: "Prénom NOM",
      idService: "",
      estDuSCEC: false
    });

    utilisateur = Utilisateur.depuisDto({
      idUtilisateur: "idUtilisateur",
      prenom: "Prénom",
      nom: "NOM",
      service: { idService: "idService", libelleService: "Libellé service", estDansScec: false, hierarchieService: [] }
    });
    expect({
      id: utilisateur?.id,
      prenomNom: utilisateur?.prenomNom,
      idService: utilisateur?.idService,
      estDuSCEC: utilisateur?.estDuSCEC
    }).toStrictEqual({
      id: "idUtilisateur",
      prenomNom: "Prénom NOM",
      idService: "idService",
      estDuSCEC: false
    });

    utilisateur = Utilisateur.depuisDto({
      idUtilisateur: "idUtilisateur",
      prenom: "Prénom",
      nom: "NOM",
      service: { idService: "idService", libelleService: "Libellé service", estDansScec: true, hierarchieService: [] }
    });
    expect({
      id: utilisateur?.id,
      prenomNom: utilisateur?.prenomNom,
      idService: utilisateur?.idService,
      estDuSCEC: utilisateur?.estDuSCEC
    }).toStrictEqual({
      id: "idUtilisateur",
      prenomNom: "Prénom NOM",
      idService: "idService",
      estDuSCEC: true
    });
  });

  test("Méthodes IUtilisateur", () => {
    let utilisateur = MockUtilisateurBuilder.utilisateur({ idUtilisateur: "idUtilisateur", prenom: "test", nom: "TEST" })
      .avecAttributs({ idService: "idService" })
      .avecDroit(Droit.CONSULTER, { perimetres: [Perimetre.TOUS_REGISTRES] })
      .avecDroit(Droit.DELIVRER, { surIdsTypeRegistre: ["idTypeRegistre"] })
      .generer();

    expect(
      utilisateur.estHabilitePour({ leDroit: Droit.CONSULTER }) &&
        utilisateur.estHabilitePour({ leDroit: Droit.CONSULTER, surLePerimetre: Perimetre.TOUS_REGISTRES }) &&
        utilisateur.estHabilitePour({ leDroit: Droit.CONSULTER, surUnDesPerimetres: [Perimetre.TOUS_REGISTRES] }) &&
        utilisateur.estHabilitePour({ leDroit: Droit.DELIVRER, pourIdTypeRegistre: "idTypeRegistre" }) &&
        utilisateur.estHabilitePour({ unDesDroits: [Droit.CONSULTER] }) &&
        utilisateur.estHabilitePour({ unDesDroits: [Droit.CONSULTER], surLePerimetre: Perimetre.TOUS_REGISTRES }) &&
        utilisateur.estHabilitePour({ unDesDroits: [Droit.DELIVRER], pourIdTypeRegistre: "idTypeRegistre" }) &&
        utilisateur.estHabilitePour({ tousLesDroits: [Droit.CONSULTER, Droit.DELIVRER] })
    ).toBeTruthy();

    expect(
      utilisateur.estHabilitePour({ leDroit: Droit.CONSULTER_ARCHIVES }) ||
        utilisateur.estHabilitePour({ leDroit: Droit.CONSULTER, surLePerimetre: "perimetre" }) ||
        utilisateur.estHabilitePour({ leDroit: Droit.CONSULTER, surUnDesPerimetres: ["perimetre"] }) ||
        utilisateur.estHabilitePour({ unDesDroits: [Droit.CONSULTER_ARCHIVES] }) ||
        utilisateur.estHabilitePour({ tousLesDroits: [Droit.CONSULTER_ARCHIVES] })
    ).toBeFalsy();

    expect(utilisateur.estDansUnDesServices(["autreIdService"])).toBeFalsy();
    expect(utilisateur.estDansUnDesServices(["autreIdService", "idService"])).toBeTruthy();
  });

  test("Création TUtilisateurConnecte depuis DTO", () => {
    let utilisateur = UtilisateurConnecte.depuisDto({
      idArobas: "idArobasUtilisateur"
    });
    expect(utilisateur).toBeNull();

    utilisateur = UtilisateurConnecte.depuisDto({
      idUtilisateur: "idUtilisateur"
    });
    expect(utilisateur).toBeNull();

    utilisateur = UtilisateurConnecte.depuisDto({
      idArobas: "idArobasUtilisateur",
      idUtilisateur: "idUtilisateur",
      fonctionAgent: { libelleFonction: "fonction utilisateur" },
      service: {
        idService: "idService",
        libelleService: "Libellé service",
        estDansScec: true,
        hierarchieService: [
          {
            serviceParent: {
              idService: "idServiceParent1",
              libelleService: "Libellé service parent 1",
              estDansScec: true,
              hierarchieService: [
                {
                  serviceParent: {
                    idService: "idServiceParent2",
                    libelleService: "Libellé service parent 2",
                    estDansScec: false,
                    hierarchieService: []
                  }
                }
              ]
            }
          }
        ]
      },
      servicesFilsDirects: [
        { idService: "idServiceFils1", libelleService: "Libellé service fils 1", estDansScec: true, hierarchieService: [] },
        { idService: "idServiceFils2", libelleService: "Libellé service fils 2", estDansScec: true, hierarchieService: [] }
      ]
    });
    expect({
      id: utilisateur?.id,
      idArobas: utilisateur?.idArobas,
      fonction: utilisateur?.fonction,
      idServicesParent: utilisateur?.idServicesParent,
      idServicesFils: utilisateur?.idServicesFils,
      optionsServicesFils: utilisateur?.optionsServicesFils
    }).toStrictEqual({
      id: "idUtilisateur",
      idArobas: "idArobasUtilisateur",
      fonction: "fonction utilisateur",
      idServicesParent: ["idServiceParent1", "idServiceParent2"],
      idServicesFils: ["idServiceFils1", "idServiceFils2"],
      optionsServicesFils: [
        { cle: "idServiceFils1", libelle: "Libellé service fils 1" },
        { cle: "idServiceFils2", libelle: "Libellé service fils 2" }
      ]
    });
  });

  test("Récupération d'un utilisateur connecté vide (inconnu)", () => {
    const utilisateurInconnu = UtilisateurConnecte.inconnu();
    const { estHabilitePour, estDansUnDesServices, ...attributsUtilisateurInconnu } = utilisateurInconnu;

    expect(attributsUtilisateurInconnu).toStrictEqual({
      idArobas: "",
      id: "",
      prenomNom: "",
      fonction: "",
      habilitations: {},
      idService: "",
      estDuSCEC: false,
      idServicesParent: [],
      idServicesFils: [],
      optionsServicesFils: []
    });

    expect(utilisateurInconnu.estHabilitePour({ leDroit: Droit.CONSULTER }) && utilisateurInconnu.estDansUnDesServices([""])).toBeFalsy();
  });
});
