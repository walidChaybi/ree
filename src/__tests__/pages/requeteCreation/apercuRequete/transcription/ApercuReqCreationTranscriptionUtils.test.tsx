import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import {} from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionUtils";
import { SANS_PRENOM_CONNU } from "@util/Utils";
test("DOIT retourner 'Sans prénom connu' QUAND 'SPC' est présent dans les prénoms", async () => {
  const titulaire = {
    nomNaissance: ["SNP"],
    prenoms: [{ prenom: "SPC", numeroOrdre: 1 }]
  } as any as ITitulaireRequeteCreation;

  const prenomsFormates = TitulaireRequeteCreation.getPrenomsOuSPC(titulaire);
  expect(prenomsFormates).toBe(SANS_PRENOM_CONNU);
});

test("DOIT retourner les prenoms séparés par une virgules QUAND 'SPC' n'est pas présent", async () => {
  const titulaire = {
    nomNaissance: ["SNP"],
    prenoms: [
      { prenom: "Antoine", numeroOrdre: 1 },
      { prenom: "Arnaud", numeroOrdre: 2 }
    ]
  } as any as ITitulaireRequeteCreation;

  const prenomsFormates = TitulaireRequeteCreation.getPrenomsOuSPC(titulaire);
  expect(prenomsFormates).toBe("Antoine, Arnaud");
});

test("DOIT retourner les parents présent dans le tableau passé en parametre", async () => {
  const titulaires = [
    {
      id: "61b0218a-0a87-43d0-b304-1be2ada73953",
      position: 1,
      nomNaissance: "James",
      nomUsage: null,
      anneeNaissance: 1943,
      moisNaissance: 5,
      jourNaissance: 31,
      villeNaissance: null,
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "61b03f85-550d-4874-9b1b-836e6e3d7aa7",
          numeroOrdre: 1,
          prenom: "Blanchette",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: null,
      nomDemandeIdentification: null,
      courriel: null,
      telephone: null,
      nationalites: [],
      prenomsDemande: [],
      retenueSdanf: null,
      paysStatutRefugie: null,
      paysOrigine: null,
      qualite: QualiteFamille.getEnumFor("PARENT"),
      numeroDossierNational: null,
      demandeEffetCollectif: null,
      valideEffetCollectif: null,
      residence: null,
      parent2Enfant: null,
      enfantTitulaireActeTranscritDresse: null
    },
    {
      id: "61b0218a-0a87-43d0-b384-1be2ada73953",
      position: 2,
      nomNaissance: "James",
      nomUsage: null,
      anneeNaissance: 1943,
      moisNaissance: 5,
      jourNaissance: 31,
      villeNaissance: null,
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "61b03f85-550d-4874-9b1b-836e6e3d7aa7",
          numeroOrdre: 1,
          prenom: "Blanchette",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: null,
      nomDemandeIdentification: null,
      courriel: null,
      telephone: null,
      nationalites: [],
      prenomsDemande: [],
      retenueSdanf: null,
      paysStatutRefugie: null,
      paysOrigine: null,
      qualite: QualiteFamille.getEnumFor("PARENT"),
      numeroDossierNational: null,
      demandeEffetCollectif: null,
      valideEffetCollectif: null,
      residence: null,
      parent2Enfant: null,
      enfantTitulaireActeTranscritDresse: null
    },
    {
      id: "61b0218a-0a87-43d0-b384-1be2ada73953",
      position: 1,
      nomNaissance: "James",
      nomUsage: null,
      anneeNaissance: 1943,
      moisNaissance: 5,
      jourNaissance: 31,
      villeNaissance: null,
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "61b03f85-550d-4874-9b1b-836e6e3d7aa7",
          numeroOrdre: 1,
          prenom: "Blanchette",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: "TITULAIRE_ACTE_TRANSCRIT_DRESSE",
      nomDemandeFrancisation: null,
      nomDemandeIdentification: null,
      courriel: null,
      telephone: null,
      nationalites: [],
      prenomsDemande: [],
      retenueSdanf: null,
      paysStatutRefugie: null,
      paysOrigine: null,
      qualite: QualiteFamille.getEnumFor("ENFANT_MINEUR"),
      numeroDossierNational: null,
      demandeEffetCollectif: null,
      valideEffetCollectif: null,
      residence: null,
      parent2Enfant: null,
      enfantTitulaireActeTranscritDresse: null
    }
  ] as any as ITitulaireRequeteCreation[];

  const parents = TitulaireRequeteCreation.getParentsTries(titulaires);

  expect(parents).toHaveLength(2);
});

test("DOIT retourner les titulaires présent dans le tableau passé en parametre", async () => {
  const titulaires = [
    {
      id: "61b0218a-0a87-43d0-b304-1be2ada73953",
      position: 1,
      nomNaissance: "James",
      nomUsage: null,
      anneeNaissance: 1943,
      moisNaissance: 5,
      jourNaissance: 31,
      villeNaissance: null,
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "61b03f85-550d-4874-9b1b-836e6e3d7aa7",
          numeroOrdre: 1,
          prenom: "Blanchette",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: null,
      nomDemandeIdentification: null,
      courriel: null,
      telephone: null,
      nationalites: [],
      prenomsDemande: [],
      retenueSdanf: null,
      paysStatutRefugie: null,
      paysOrigine: null,
      qualite: QualiteFamille.getEnumFor("PARENT"),
      numeroDossierNational: null,
      demandeEffetCollectif: null,
      valideEffetCollectif: null,
      residence: null,
      parent2Enfant: null,
      enfantTitulaireActeTranscritDresse: null
    },
    {
      id: "61b0218a-0a87-43d0-b384-1be2ada73953",
      position: 2,
      nomNaissance: "James",
      nomUsage: null,
      anneeNaissance: 1943,
      moisNaissance: 5,
      jourNaissance: 31,
      villeNaissance: null,
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "61b03f85-550d-4874-9b1b-836e6e3d7aa7",
          numeroOrdre: 1,
          prenom: "Blanchette",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: "FAMILLE",
      nomDemandeFrancisation: null,
      nomDemandeIdentification: null,
      courriel: null,
      telephone: null,
      nationalites: [],
      prenomsDemande: [],
      retenueSdanf: null,
      paysStatutRefugie: null,
      paysOrigine: null,
      qualite: QualiteFamille.getEnumFor("PARENT"),
      numeroDossierNational: null,
      demandeEffetCollectif: null,
      valideEffetCollectif: null,
      residence: null,
      parent2Enfant: null,
      enfantTitulaireActeTranscritDresse: null
    },
    {
      id: "61b0218a-0a87-43d0-b384-1be2ada73953",
      position: 1,
      nomNaissance: "James",
      nomUsage: null,
      anneeNaissance: 1943,
      moisNaissance: 5,
      jourNaissance: 31,
      villeNaissance: null,
      sexe: "INCONNU",
      nationalite: "INCONNUE",
      prenoms: [
        {
          id: "61b03f85-550d-4874-9b1b-836e6e3d7aa7",
          numeroOrdre: 1,
          prenom: "Blanchette",
          estPrenomFrRetenuSdanf: null
        }
      ],
      parentsTitulaire: [],
      deces: null,
      domiciliation: null,
      evenementUnions: [],
      typeObjetTitulaire: "TITULAIRE_ACTE_TRANSCRIT_DRESSE",
      nomDemandeFrancisation: null,
      nomDemandeIdentification: null,
      courriel: null,
      telephone: null,
      nationalites: [],
      prenomsDemande: [],
      retenueSdanf: null,
      paysStatutRefugie: null,
      paysOrigine: null,
      qualite: QualiteFamille.getEnumFor("ENFANT_MINEUR"),
      numeroDossierNational: null,
      demandeEffetCollectif: null,
      valideEffetCollectif: null,
      residence: null,
      parent2Enfant: null,
      enfantTitulaireActeTranscritDresse: null
    }
  ] as any as ITitulaireRequeteCreation[];

  const titulairesRequete =
    TitulaireRequeteCreation.getTitulairesTries(titulaires);

  expect(titulairesRequete).toHaveLength(1);
});
