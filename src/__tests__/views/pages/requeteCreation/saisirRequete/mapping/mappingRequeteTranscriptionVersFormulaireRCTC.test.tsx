import {
  requeteCreationEtablissement,
  requeteCreationTranscription
} from "@mock/data/requeteCreation";
import { IEvenementUnion } from "@model/requete/IEvenementUnion";
import { INationalite } from "@model/requete/INationalite";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import {
  estCheckboxCochee,
  getDateEvenement,
  getDateNaissance,
  getInformationsLieuNaissance,
  getLieuEvenement,
  getNationalites,
  getTitulaireActeTranscitDresseEtDePositionUn,
  mappingRequeteTranscriptionVersForumlaireRCTC,
  pasDeNomOuFalse,
  pasDePrenomOuFalse,
  saisieAdresse,
  saisieEvenementMariage,
  saisieEvenementReconnaissance,
  saisieParent,
  saisieRequerant,
  saisieRequete,
  saisieTitulaire
} from "@pages/requeteCreation/saisirRequete/mapping/mappingRequeteTranscriptionVersFormulaireRCTC";
import { IdentiteFormDefaultValues } from "@pages/requeteCreation/saisirRequete/sousForm/identite/IdentiteTitulaireForm";
import { ParentFormDefaultValues } from "@pages/requeteCreation/saisirRequete/sousForm/parent/ParentsForm";
import { RequerantFormDefaultValue } from "@pages/requeteCreation/saisirRequete/sousForm/requerant/RequerantForm";
import { AdresseFormDefaultValues } from "@widget/formulaire/adresse/AdresseForm";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { NationalitesFormDefaultValues } from "@widget/formulaire/nationalites/NationalitesForm";

describe("Mapping d'une requête de trancsription vers le formulaire dans le cas d'un update", () => {
  test("DOIT retourner 'OUI' QUAND l'année est présente et 'NON' QUAND est n'est pas présente", async () => {
    let checkboxCochee = estCheckboxCochee(1980);

    expect(checkboxCochee).toEqual("OUI");

    checkboxCochee = estCheckboxCochee();

    expect(checkboxCochee).toEqual("NON");
  });

  test("DOIT retourner l'objet d'évenement de date QUAND il est présent ou les defaults values", async () => {
    const evenement = {
      jour: 1,
      mois: 1,
      annee: 1980
    } as IEvenementUnion;

    let dateEvenement = getDateEvenement(evenement);

    let dateEvenementAttendu = {
      jour: 1,
      mois: 1,
      annee: 1980
    };

    expect(dateEvenement).toEqual(dateEvenementAttendu);

    dateEvenement = getDateEvenement(undefined);

    expect(dateEvenement).toEqual(DateDefaultValues);
  });

  test("DOIT retourner l'objet d'évenement de date QUAND il est présent ou les defaults values", async () => {
    const titulaire = {
      jourNaissance: 1,
      moisNaissance: null,
      anneeNaissance: 1981
    } as any as ITitulaireRequeteCreation;

    let dateNaissance = getDateNaissance(titulaire);

    let dateNaissanceAttendu = {
      jour: 1,
      mois: "",
      annee: 1981
    };

    expect(dateNaissance).toEqual(dateNaissanceAttendu);

    dateNaissance = getDateNaissance(undefined);

    expect(dateNaissance).toEqual(DateDefaultValues);
  });

  test("DOIT retourner le lieu de l'evenement", async () => {
    let lieuEvement;
    lieuEvement = getLieuEvenement("FRANCE");

    let lieuEvenementAttendu = "FRANCE";

    expect(lieuEvement).toEqual(lieuEvenementAttendu);

    lieuEvement = getLieuEvenement("TUNIS");

    lieuEvenementAttendu = "ETRANGER";

    expect(lieuEvement).toEqual(lieuEvenementAttendu);

    lieuEvement = getLieuEvenement(undefined);

    lieuEvenementAttendu = "INCONNU";

    expect(lieuEvement).toEqual(lieuEvenementAttendu);
  });

  test("DOIT retourner les bonnes informations du lieu de naissance", async () => {
    const titulaire = {
      villeNaissance: "Paris",
      arrondissementNaissance: "5",
      regionNaissance: null,
      paysNaissance: "France"
    } as any as ITitulaireRequeteCreation;

    const informationsLieuNaissance = getInformationsLieuNaissance(titulaire);

    const informationsLieuNaissanceAttendu = {
      villeNaissance: "Paris",
      arrondissementNaissance: "5",
      regionNaissance: "",
      paysNaissance: "France"
    };

    expect(informationsLieuNaissance).toEqual(informationsLieuNaissanceAttendu);
  });

  test("DOIT retourner les nationalités ou defaultValues", async () => {
    const nationalites = [
      { id: "1", nationalite: "Française" },
      { id: "2", nationalite: "Tunisienne" }
    ] as INationalite[];

    let nationalitesAttendu = {
      nationalite1: "Française",
      nationalite2: "Tunisienne",
      nationalite3: undefined
    };

    expect(getNationalites(nationalites)).toEqual(nationalitesAttendu);

    expect(getNationalites([])).toEqual(NationalitesFormDefaultValues);
  });

  test("DOIT retourner l'objet Formik de saisie de mariage correctement", async () => {
    const evenement = {
      id: "4b016bb8-171d-4a69-9c38-563cdf808b4d",
      jour: 1,
      mois: 2,
      annee: 2000,
      pays: "Tunisie",
      ville: "Tunis"
    } as IEvenementUnion;

    const evenementAttendu = {
      identifiant: "4b016bb8-171d-4a69-9c38-563cdf808b4d",
      parentMarie: "OUI",
      dateMariage: {
        jour: 1,
        mois: 2,
        annee: 2000
      },
      lieuDuMariage: "ETRANGER",
      villeDeMariage: "Tunis",
      paysDuMariage: "Tunisie"
    };

    expect(saisieEvenementMariage(evenement)).toEqual(evenementAttendu);
  });

  test("DOIT retourner l'objet Formik de saisie d'évenement de reconnaissance correctement", async () => {
    const evenementReconnaissance = {
      id: "cdd2b0e6-3f6e-4c67-8026-f8dd0628d4bd",
      jour: 1,
      mois: 2,
      annee: 2001,
      pays: "Tunisie",
      ville: "Tunis",
      region: undefined
    } as IEvenementUnion;

    const evenementAttendu = {
      identifiant: "cdd2b0e6-3f6e-4c67-8026-f8dd0628d4bd",
      titulaireReconnu: "OUI",
      dateReconnaissance: {
        jour: 1,
        mois: 2,
        annee: 2001
      },
      lieuActeReconnaissance: "ETRANGER",
      villeReconnaissance: "Tunis",
      regionEtatReconnaissance: "",
      departementReconnaissance: "",
      paysReconnaissance: "Tunisie"
    };

    expect(saisieEvenementReconnaissance(evenementReconnaissance)).toEqual(
      evenementAttendu
    );
  });

  test("DOIT retourner l'objet Formik de saisie de requête correctement", async () => {
    const requete = {
      natureActeTranscrit:
        NatureActeTranscription.getEnumFor("NAISSANCE_MINEUR"),
      lienRequerant: {
        typeLienRequerant: "TITULAIRE"
      },
      villeRegistre: "registre"
    } as any as IRequeteCreation;

    const saisieRequeteAttendu = {
      lienRequerant: "TITULAIRE",
      natureActe: "NAISSANCE_MINEUR",
      registre: { cle: "registre", libelle: "registre" }
    };

    expect(saisieRequete(requete)).toEqual(saisieRequeteAttendu);
  });

  test("DOIT retourner l'objet Formik de saisie du requerant correctement ou les DefaultValues", async () => {
    const saisieRequerantAttendu = {
      adresse: {
        complementDestinataire: "ligne2",
        complementPointGeo: "ligne3",
        voie: "ligne4",
        lieuDit: "ligne5",
        codePostal: "codePostal",
        commune: "ville",
        pays: "pays",
        numeroTelephone: "telephone",
        adresseCourriel: "courriel"
      },
      nomUsage: "nomUsage",
      prenom: "prenom",
      nom: "nomFamille",
      autreAdresseCourriel: "courrielAutreContact@gmail.com",
      autreNumeroTelephone: "0212456512"
    };

    expect(saisieRequerant(requeteCreationEtablissement.requerant)).toEqual(
      saisieRequerantAttendu
    );

    expect(saisieRequerant(undefined)).toEqual(RequerantFormDefaultValue);
  });

  test("DOIT retourner l'objet Formik de saisie du titulaire correctement ou les DefaultValues", async () => {
    const saisieTitulaireAttendu = {
      identifiant: "3ed9efe4-c196-4888-8ffe-938f37a5f73f",
      noms: {
        pasDeNomActeEtranger: "false",
        nomActeEtranger: "nomNaissance",
        nomSouhaiteActeFR: "nomSouhaite"
      },
      sexe: "MASCULIN",
      pasDePrenomConnu: "false",
      prenoms: {
        prenom1: "prenom",
        prenom2: "",
        prenom3: "",
        prenom4: "",
        prenom5: "",
        prenom6: "",
        prenom7: "",
        prenom8: "",
        prenom9: "",
        prenom10: "",
        prenom11: "",
        prenom12: ""
      },
      dateNaissance: {
        jour: 1,
        mois: 2,
        annee: 2000
      },
      naissance: {
        villeNaissance: "villeNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance"
      }
    };

    expect(
      saisieTitulaire(requeteCreationTranscription.titulaires?.[0])
    ).toEqual(saisieTitulaireAttendu);

    expect(saisieTitulaire(undefined)).toEqual(IdentiteFormDefaultValues);
  });

  test("DOIT retourner l'objet Formik de saisie des parents correctement ou les DefaultValues", async () => {
    const saisieParentAttendu = {
      identifiant: "3ed9efe4-c196-4888-8ffe-938f37a5f73a",
      pasDeNomConnu: "false",
      nom: "Dupont",
      sexe: "MASCULIN",
      pasDePrenomConnu: "false",
      prenoms: {
        prenom1: "Michel",
        prenom2: "",
        prenom3: "",
        prenom4: "",
        prenom5: "",
        prenom6: "",
        prenom7: "",
        prenom8: "",
        prenom9: "",
        prenom10: "",
        prenom11: "",
        prenom12: ""
      },
      dateNaissance: {
        jour: 1,
        mois: 1,
        annee: 1990
      },
      naissance: {
        villeNaissance: "villeNaissance",
        arrondissementNaissance: "arrondissementNaissance",
        regionNaissance: "regionNaissance",
        paysNaissance: "paysNaissance",
        departementNaissance: "regionNaissance",
        lieuNaissance: "ETRANGER"
      },
      paysStatutRefugie: "",
      paysOrigine: "",
      nationalites: {
        nationalite1: "nationalite",
        nationalite2: undefined,
        nationalite3: undefined
      }
    };

    expect(saisieParent(requeteCreationTranscription.titulaires?.[1])).toEqual(
      saisieParentAttendu
    );

    expect(saisieParent(undefined)).toEqual(ParentFormDefaultValues);
  });

  test("DOIT retourner le titulaire acte transcrit dresse de position 1", async () => {
    const titulaireActeTranscritDressePositionUn =
      getTitulaireActeTranscitDresseEtDePositionUn(
        requeteCreationTranscription.titulaires
      );

    expect(titulaireActeTranscritDressePositionUn?.nomNaissance).toEqual(
      "nomNaissance"
    );
  });

  test("DOIT retourner l'adresse ou les DefaultValues QUAND le requerant n'est pas présent", async () => {
    expect(saisieAdresse(undefined)).toEqual(AdresseFormDefaultValues);
  });

  test("DOIT retourner ['pasDePrenomConnu'] QUAND le premier prénom vaut SPC", async () => {
    const pasDePrenomOuFalseCheckbox = pasDePrenomOuFalse(undefined);

    expect(pasDePrenomOuFalseCheckbox).toEqual(["pasDePrenomConnu"]);

    expect(pasDePrenomOuFalse("SPC")).toEqual(["pasDePrenomConnu"]);
  });

  test("DOIT retourner ['pasDeNomConnu'] QUAND le premier prénom vaut SNP", async () => {
    expect(pasDeNomOuFalse("SNP", "pasDeNomConnu")).toEqual(["pasDeNomConnu"]);
  });

  test("DOIT retourner un objet vide QUAND la requête n'est pas présente", async () => {
    const mapping = mappingRequeteTranscriptionVersForumlaireRCTC(undefined);

    expect(mapping).toEqual({});
  });
});
