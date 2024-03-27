import { ReponseEnregistrementProjetActe } from "@mock/data/ProjetActe";
import { ActeAnalyseMarginales } from "../data/ActeAnalyseMarginales";
import {
  ReponseAppelAddAlerteActe,
  ReponseAppelGetAlertesActe
} from "../data/Alertes";
import { acteExtraitSaisie } from "../data/DonneesSaisieExtrait";
import {
  ficheActe1,
  ficheActe2,
  ficheActeAvecGenreIndetermine,
  ficheActeAvecImage,
  ficheActeAvecTitulaireMultiple,
  ficheActeDeces2,
  ficheActeEC,
  ficheActeMariage,
  ficheActeMariage2,
  idFicheActe1,
  idFicheActe2,
  idFicheActeMariage
} from "../data/ficheActe";
import {
  acte,
  acte1,
  acte2,
  acte3,
  acte4,
  acte5,
  acteMariage,
  acteMariageElectronique,
  acteNaissance,
  acteNationalite
} from "../data/ficheEtBandeau/ficheActe";
import { fichePacs, idFichePacs } from "../data/fichePacs";
import { inscriptionsRc } from "../data/ficheRC";
import {
  ficheRca,
  FicheRcaDecisionJuridictionEtrangere,
  idFicheRca
} from "../data/ficheRCA";
import { imagePngVideBase64 } from "../data/ImagePng";
import { listeDeuxPersonnes } from "../data/listePersonnes";
import {
  EnregistrerMentionsResultat,
  mentions,
  mentionsPlurilingues
} from "../data/mentions";
import { decrets } from "../data/NomenclatureEtatCivilDecrets";
import {
  ReponseAppelNomenclatureMandataire,
  ReponseAppelNomenclatureNatureMention,
  ReponseAppelNomenclatureNatureRC,
  ReponseAppelNomenclatureNatureRCA,
  ReponseAppelNomenclaturePopinSignature,
  ReponseAppelNomenclatureTypeAlerte,
  ReponseAppelNomenclatureTypeMention
} from "../data/nomenclatures";
import { pacsModificationNotaire } from "../data/PACS";
import mockRC from "../data/RC.json";
import mockRCA from "../data/RCA.json";
import {
  ReponseAppelRMCActe,
  ReponseAppelRMCActe4DernierResultats,
  ReponseAppelRMCActe4PremiersResultats
} from "../data/RMCActe";
import {
  RMCAutoPersonneResponseAlpha,
  RMCAutoPersonneResponseBeta
} from "../data/RMCAutoPersonne";
import {
  ReponseAppelRMCInscription,
  ReponseAppelRMCInscription4DernierResultats,
  ReponseAppelRMCInscription4PremiersResultats
} from "../data/RMCInscription";
import { getTitulairesActeAPI } from "../data/Titulaire";
import { actesInscriptionsSauvegardes } from "./../data/actesInscriptionsSauvegardes";

export const NORESULT = "NORESULT";

export const configEtatcivil = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-etatcivil-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      if (
        match[1] === "/repertoirecivil/rc/7566e16c-2b0e-11eb-adc1-0242ac120002"
      ) {
        return { data: mockRC.data };
      }

      if (
        match[1] === "/repertoirecivil/rca/135e4dfe-9757-4d5d-8715-359c6e73289b"
      ) {
        return { data: mockRCA.data };
      }

      if (
        match[1] === "/repertoirecivil/rca/215e4dfe-9757-4d5d-8715-359c6e73288c"
      ) {
        return { data: FicheRcaDecisionJuridictionEtrangere };
      }

      if (match[1] === `/repertoirecivil/rca/${idFicheRca}`) {
        return { ...ficheRca };
      }

      if (
        match[1] === "/repertoirecivil/rc/135e4dfe-9757-4d5d-8715-359c6e73289b"
      ) {
        return { data: FicheRcaDecisionJuridictionEtrangere };
      }

      if (match[1] === `/repertoirecivil/pacs/${idFichePacs}`) {
        return { ...fichePacs };
      }

      if (
        match[1] === "/acte/6e89c1c1-16c4-4e40-9b72-7b567270b26f/saisieExtrait"
      ) {
        return { data: null };
      }

      if (
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&recupereImagesEtTexte=true" ||
        match[1] ===
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&recupereImagesEtTexte=true"
      ) {
        return { data: acteNationalite };
      }

      if (
        match[1] ===
          "/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0" ||
        match[1] ===
          "/repertoirecivil/pacs/85160d6e-893b-47c2-a9a8-b25573189f0c"
      ) {
        return { data: pacsModificationNotaire.data };
      } else if (
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&recupereImagesEtTexte=true" ||
        match[1] === "/acte/d8708d77-a359-4553-be72-1eb5f246d4da/resume" ||
        match[1] === "/acte/f9279c00-5d2b-11ea-bc55-0242ac130004/resume" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true"
      ) {
        return { data: acte };
      } else if (
        match[1] ===
          "/acte/d8708d77-a359-4553-be72-1eb5f246d4dc/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true" ||
        match[1] ===
          "/acte/d8708d77-a359-4553-be72-1eb5f246d4dc/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true"
      ) {
        return { data: acte1 };
      } else if (
        match[1] ===
        "/acte/6e89c1c1-16c4-4e40-9b72-7b567270b26f/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: acteExtraitSaisie };
      } else if (
        match[1] === "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a8/resume" ||
        match[1] ===
          "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a8/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true" ||
        match[1] ===
          "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a8/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true"
      ) {
        return { data: acte2 };
      } else if (
        match[1] === "/acte/d8708d77-a359-4553-be72-1eb5f246d4db/resume" ||
        match[1] ===
          "/acte/d8708d77-a359-4553-be72-1eb5f246d4db/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true" ||
        match[1] ===
          "/acte/d8708d77-a359-4553-be72-1eb5f246d4db/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true" ||
        match[1] ===
          "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a9/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true"
      ) {
        return { data: acte3 };
      } else if (
        match[1] === "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a9/resume" ||
        match[1] ===
          "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a9/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true"
      ) {
        return { data: acte4 };
      } else if (
        match[1] ===
        "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: acte5 };
      } else if (
        match[1] ===
        "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: ficheActeEC.data };
      } else if (
        match[1] ===
        "/acte/b45079a5-9e8f-488a-b07c-c4c2az613121/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: ficheActeAvecTitulaireMultiple.data };
      } else if (
        match[1] ===
        "/acte/b45079a5-9e8f-478a-b07c-c4c2az671123/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: ficheActeAvecGenreIndetermine.data };
      } else if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: ficheActeMariage.data };
      } else if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c2ac671348/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: acteMariage };
      } else if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c2ac671349/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: acteMariageElectronique };
      } else if (
        match[1] ===
        "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: acteNaissance };
      } else if (
        match[1] ===
        "/acte/923a10fb-0b15-452d-83c0-d24c76d1d19d/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true"
      ) {
        return { data: ActeAnalyseMarginales };
      } else if (
        match[1] === "/acte/0bce8edd-0183-495b-939d-0b3cf6918792/resume"
      ) {
        return { data: ficheActeMariage2.data };
      } else if (
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134c/resume"
      ) {
        return { data: ficheActeDeces2.data };
      }

      if (
        match[1] ===
        "/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d/resume?recupereImagesEtTexte=true"
      ) {
        return ficheActeAvecImage;
      }

      /////////////////////////////////////////////////////////////////////
      // Mention
      if (
        match[1] ===
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions?statut=SIGNEE" &&
        context.method === "get"
      ) {
        return {
          data: mentions.map(mention => ({ ...mention, statut: "SIGNEE" }))
        };
      }
      if (
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" &&
        context.method === "get"
      ) {
        return { data: mentions };
      }
      if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/mentions?statut=BROUILLON"
      ) {
        return { data: mentions };
      }
      if (
        match[1] ===
          "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/mentions?statut=SIGNEE" &&
        context.method === "get"
      ) {
        return { data: mentions };
      }
      if (
        match[1] ===
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/mentions?statut=SIGNEE" &&
        context.method === "get"
      ) {
        return { data: mentionsPlurilingues };
      }
      if (
        (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" ||
          match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235b/mentions" ||
          match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/mentions" ||
          match[1] ===
            "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/corpstexte?type=EXTRAIT_AVEC_FILIATION") &&
        context.method === "post"
      ) {
        return { data: true };
      }

      if (
        (match[1] === "/acte/b00ebeb2-8ddc-4928-b99e-b06a248d21ae/mentions" ||
          match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/mentions") &&
        context.method === "put"
      ) {
        return EnregistrerMentionsResultat;
      }

      /////////////////////////////////////////////////////////////////////
      // nombre de titulaires utilisé pour les sur l'apercu en prise en chage
      if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/count/titulaire"
      ) {
        return ficheActe1;
      }

      // acte corps image
      if (
        [
          "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/corps-image",
          "/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d/corps-image",
          "/acte/b41079a3-9e8d-478c-b04c-c4c2ac47134f/corps-image",
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/corps-image",
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b/corps-image",
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/corps-image",
          "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/corps-image",
          "/acte/b45079a5-9e8f-488a-b07c-c4c2az613121/corps-image",
          "/acte/b45079a5-9e8f-478a-b07c-c4c2az671123/corps-image",
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/corps-image"
        ].includes(match[1])
      ) {
        return {
          headers: [
            {
              "Content-Disposition": 'filename="unfichier.pdf"'
            },
            {
              "content-type": "application/pdf"
            }
          ],
          body: "contenubase64dupdf"
        };
      }

      // Donnees pour composition acte texte et acte repris.
      if (
        [
          "/acte/885bdb13-d995-4dbd-93cb-a7a3b2eee5c8/donnees-pour-composition-acte-texte",
          "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/donnees-pour-composition-acte-texte",
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/donnees-pour-composition-acte-texte",
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/donnees-pour-composition-acte-texte",
          "/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d/donnees-pour-composition-acte-texte",
          "/acte/b41079a3-9e8d-478c-b04c-c4c2ac47134f/donnees-pour-composition-acte-texte",
          "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/donnees-pour-composition-acte-texte",
          "/acte/b45079a5-9e8f-478a-b07c-c4c2az671123/donnees-pour-composition-acte-texte",
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/donnees-pour-composition-acte-texte",
          "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/donnees-pour-composition-acte-repris",
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/donnees-pour-composition-acte-repris",
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b/donnees-pour-composition-acte-repris"
        ].includes(match[1])
      ) {
        return {
          body: {
            reference_acte: null,
            nature_acte: "DONNEES SAISIES SUR CET ACTE",
            titulaires: null,
            texte_corps_acte:
              "Nom                : BEDROS\nPrénoms            : Balli\nSexe               : masculin\nné le              : huit mars mil neuf cent cinquante neuf\nà                  : Soueida (Syrie)\n\nNom du père        : BEDROS\nPrénoms            : Médard\nné en              : 1929\nà                  : Michrefa (Syrie)\n\nNom de la mère     : MARDAM BEK\nPrénoms            : Nadira\nnée en             : 1935\nà                  : Lattaquieh (Syrie)\n\nAdresse            : 61, rue des Migneaux - 78300 POISSY\nFrançais par       : Déclaration d'acquisition souscrite le 1er octobre 1991\n                     (Art. 37-1 du code de la Nationalité Française) \n\n                     Acte établi par Nous, Rafik MALAKIAN,\nofficier de l'état civil du service central d'état civil du ministère\ndes affaires étrangères - (loi n°78-731 du 12 juillet 1978).\n\n          Nantes, le 11 juin 1996",
            mentions: ""
          }
        };
      }

      /////////////////////////////////////////////////////////////////////
      // actes utilisés pour le test de pagination (avec changement de plage)
      if (
        match[1] ===
          `/acte/${idFicheActe1}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true` ||
        match[1] ===
          `/acte/${idFicheActe1}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false` ||
        match[1] ===
          `/acte/${idFicheActe1}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true` ||
        match[1] ===
          `/acte/${idFicheActe1}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true`
      ) {
        return ficheActe1;
      }

      if (
        match[1] === `/acte/${idFicheActe2}/resume` ||
        match[1] ===
          `/acte/${idFicheActe2}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&isConsultation=true` ||
        match[1] ===
          `/acte/${idFicheActe2}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=false&isConsultation=true`
      ) {
        return ficheActe2;
      }
      /////////////////////////////////////////////////////////////////////

      if (
        match[1] ===
          `/acte/${idFicheActeMariage}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true` ||
        match[1] ===
          `/acte/${idFicheActeMariage}/resume?remplaceIdentiteTitulaireParIdentiteTitulaireAM=true&recupereImagesEtTexte=true`
      ) {
        return ficheActeMariage;
      }

      if (
        match[1] === `/acte/${idFicheActeMariage}/resume` ||
        match[1] ===
          `/acte/${idFicheActeMariage}/resume?recupereImagesEtTexte=true` ||
        match[1] ===
          "/acte/0bce8edd-0183-495b-939d-0b3cf6918792/resume?recupereImagesEtTexte=true"
      ) {
        return ficheActeMariage;
      }

      if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134c/resume?recupereImagesEtTexte=true"
      ) {
        return ficheActeDeces2;
      }

      // RMC Acte
      if (match[1] === "/acte/rmc?range=0-100") {
        // RMC Acte Manuelle suite RMC Auto (vue ApercuRequetePriseEnChargePartieDroite)
        if (params?.nomTitulaire === NORESULT) {
          return {
            headers: {
              "content-range": "0-105/0",
              link: ""
            },
            data: { registres: [] }
          };
        }
        // RMC Acte Manuelle (vue RMCActeInscriptionPage)
        else {
          return {
            headers: {
              "content-range":
                "0-15/" + ReponseAppelRMCActe.data.registres.length,
              link: '<http://localhost:80/rece/rece-etatcivil-api/acte/rmc?range=0-100>;rel="next"'
            },
            data: ReponseAppelRMCActe.data
          };
        }
      }

      // RMC Inscription
      if (match[1] === "/repertoirecivil/rmc?range=0-105") {
        // RMC Inscription Manuelle suite RMC Auto (vue ApercuRequetePriseEnChargePartieDroite)
        if (params?.nomTitulaire === NORESULT) {
          return {
            headers: {
              "content-range": "0-105/0",
              link: ""
            },
            data: { repertoiresCiviles: [] }
          };
        }
        // RMC Inscription Manuelle (vue RMCActeInscriptionPage)
        else {
          return {
            headers: {
              "content-range":
                "0-15/" +
                ReponseAppelRMCInscription.data.repertoiresCiviles.length,
              link: '<http://localhost:80/rece/rece-etatcivil-api/repertoirecivil/rmc?range=0-105>;rel="next"'
            },
            data: ReponseAppelRMCInscription.data
          };
        }
      }

      ////////////////////////////////////////////////////////////////////////
      // RMC Inscription: test de pagination (avec changement de plage) sur les fiches RC/RCA/PACS
      if (match[1] === "/repertoirecivil/rmc?range=0-4") {
        return ReponseAppelRMCInscription4PremiersResultats;
      }
      if (match[1] === "/repertoirecivil/rmc?range=1-4") {
        return ReponseAppelRMCInscription4DernierResultats;
      }

      // RMC Acte: test de pagination (avec changement de plage) sur les fiches Acte
      if (match[1] === "/acte/rmc?range=0-4") {
        return ReponseAppelRMCActe4PremiersResultats;
      }
      if (match[1] === "/acte/rmc?range=1-4") {
        return ReponseAppelRMCActe4DernierResultats;
      }

      ///////////////
      // Personnes //
      ///////////////

      // RMC
      if (match[1] === "/personne/rmcauto?range=0-25") {
        if (params.nomTitulaire === "dupont") {
          return RMCAutoPersonneResponseBeta;
        }
        return RMCAutoPersonneResponseAlpha;
      }

      // Incriptions RC
      if (match[1] === "/personne/0bce8edd-0183-497b-139d-0a3cf6918792/rc") {
        return inscriptionsRc;
      }

      /////////////////
      // Projet acte //
      /////////////////

      if (match[1] === "/projetacte") {
        return ReponseEnregistrementProjetActe;
      }

      if (
        match[1] ===
        "/projetacte/d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca/composer-document-final"
      ) {
        return { data: "documentFinalSigneEncodeEnBase64", status: 200 };
      }

      if (
        match[1] ===
        "/projetacte/d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca/integrer-acte-signe"
      ) {
        return { status: 200 };
      }
      /////////////////
      // Signature //
      /////////////////
      if (
        match[1] ===
        "/acte/885bdb13-d995-4dbd-93cb-a7a3b2eee5c8/recomposer-document-final"
      ) {
        return {
          data: "documentFinalActeSigneResponseTypeBlob"
        };
      }

      // Actes / inscriptions sauvegardes
      if (match[1] === "/projetacte/actesinscriptionssauvegardes") {
        return { data: actesInscriptionsSauvegardes };
      }

      if (
        match[1] ===
        "/personne/listePersonne?ids=e7114c54-d00d-48ad-bbee-af2b01e2da7a&ids=e7114c54-d00d-48ad-bbee-af2b01e2da7c"
      ) {
        return listeDeuxPersonnes;
      }

      if (
        match[1] ===
        "/acte/a5187320-d722-4673-abd7-a73ed41ad8c1/composer-document-mentions-ulterieures"
      ) {
        return {
          data: "documentMentionsUlterieuresSigneEncodeEnBase64",
          status: 200
        };
      }

      ////////////////////////////////////////////////////////////////////////

      if (match[1] === "/nomenclature/NATURE_RC") {
        return { data: ReponseAppelNomenclatureNatureRC.data };
      }

      if (match[1] === "/nomenclature/NATURE_RCA") {
        return { data: ReponseAppelNomenclatureNatureRCA.data };
      }

      if (match[1] === "/nomenclature/MANDATAIRE") {
        return { data: ReponseAppelNomenclatureMandataire.data };
      }

      if (match[1] === "/nomenclature/TYPE_ALERTE") {
        return { data: ReponseAppelNomenclatureTypeAlerte.data };
      }

      if (match[1] === "/nomenclature/NATURE_MENTION") {
        return { data: ReponseAppelNomenclatureNatureMention.data };
      }

      if (match[1] === "/nomenclature/POPIN_SIGNATURE") {
        return { data: ReponseAppelNomenclaturePopinSignature.data };
      }

      if (match[1] === "/nomenclature/typemention") {
        return { data: ReponseAppelNomenclatureTypeMention.data };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=t&familleRegistre=CSL&nombreResultatsMax=15&estOuvert=true"
      ) {
        return {
          data: [
            "TORONTO",
            "TOURANE",
            "TOURNAI",
            "TOKYO",
            "TULEAR",
            "TUNIS",
            "TURIN",
            "TURIN ET GENES"
          ]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=t&nombreResultatsMax=15"
      ) {
        return {
          data: [
            "TORONTO",
            "TOURANE",
            "TOURNAI",
            "TOKYO",
            "TULEAR",
            "TUNIS",
            "TURIN",
            "TURIN ET GENES"
          ]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=t&familleRegistre=ACQ&nombreResultatsMax=15"
      ) {
        return {
          data: [
            "TORONTO",
            "TOURANE",
            "TOURNAI",
            "TOKYO",
            "TULEAR",
            "TUNIS",
            "TURIN",
            "TURIN ET GENES"
          ]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=tu&nombreResultatsMax=15"
      ) {
        return {
          data: ["TULEAR", "TUNIS", "TURIN", "TURIN ET GENES"]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=tun&nombreResultatsMax=15"
      ) {
        return {
          data: ["TUNIS"]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=tuni&nombreResultatsMax=15"
      ) {
        return {
          data: ["TUNIS"]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=tunis&nombreResultatsMax=15"
      ) {
        return {
          data: ["TUNIS"]
        };
      }

      if (
        match[1] ===
        "/acte/pocopas/debutentPar?debutPocopa=t&familleRegistre=ACQ&nombreResultatsMax=15"
      ) {
        return {
          data: ["TOKYO"]
        };
      }

      if (String(match[1]).startsWith("/acte/pocopas/debutentPar")) {
        return {
          data: ["TUNIS"]
        };
      }

      if (match[1] === "/acte/rmcauto?range=0-100") {
        return {
          headers: {
            "content-range":
              "0-15/" + ReponseAppelRMCActe.data.registres.length,
            link: '<http://localhost:80/rece/rece-etatcivil-api/acte/rmcauto?range=0-100>;rel="next"'
          },
          data: ReponseAppelRMCActe.data
        };
      }

      if (match[1] === "/repertoirecivil/rmcauto?range=0-105") {
        return {
          headers: {
            "content-range":
              "0-15/" +
              ReponseAppelRMCInscription.data.repertoiresCiviles.length,
            link: '<http://localhost:80/rece/rece-etatcivil-api/repertoirecivil/rmcauto?range=0-105>;rel="next"'
          },
          data: ReponseAppelRMCInscription.data
        };
      }

      if (
        match[1] ===
        "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/dernieredelivrance"
      ) {
        return { data: true };
      }

      if (match[1] === "/repertoirecivil/datedernieredelivrance") {
        return { data: null };
      }

      if (match[1].startsWith("/repertoirecivil/decrets")) {
        return { data: decrets };
      }

      if (
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/alertes" ||
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/alertes" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134a/alertes" ||
        match[1] === "/acte/b41079a5-9e8f-478a-b04c-c4c2ac671123/alertes" ||
        match[1] === "/acte/b45079a5-9e8f-488a-b07c-c4c2az613121/alertes" ||
        match[1] === "/acte/b45079a5-9e8f-478a-b07c-c4c2az671123/alertes" ||
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235e/alertes" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b/alertes" ||
        match[1] === "/acte/885bdb13-d995-4dbd-93cb-a7a3b2eee5c8/alertes" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c4ey86537g/alertes"
      ) {
        return { data: ReponseAppelGetAlertesActe.data };
      }

      if (match[1] === "/acte/alerte") {
        return { data: ReponseAppelAddAlerteActe.data };
      }

      if (
        match[1] ===
          "/acte/alerte/a0adc2b2-03b6-4b80-a90d-7f96e780df15?provenanceRequete=Service%20Public" ||
        match[1] === "/acte/alerte/a0adc2b2-03b6-4b80-a90d-7f96e780df15"
      ) {
        return { data: null };
      }

      // Récupération des images d'un acte
      if (
        match[1] === "/acteimage/images/abcdc2b2-03b6-4b80-a90d-7f96e7807788"
      ) {
        return { data: ["imgBase64_1", "imgBase64_2"] };
      }
      if (match[1] === `/acteimage/images/${idFicheActeMariage}`) {
        return { data: [imagePngVideBase64] };
      }

      if (
        match[1] ===
        `/requetes/piecesjustificatives/3ed9ad41-ca61-416a-91df-448690804363`
      ) {
        return { data: [imagePngVideBase64] };
      }

      // Validation de la saisie d'un extrait
      if (
        match[1] ===
          "/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d/saisieExtrait" ||
        match[1] ===
          "/acte/0bce8edd-0183-495b-939d-0b3cf6918792/saisieExtrait" ||
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134c/saisieExtrait"
      ) {
        return { data: {} };
      }

      // Maj de la date de derhière délivrance
      if (
        match[1] ===
          "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235b/dernieredelivrance" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/dernieredelivrance"
      ) {
        return { data: {} };
      }

      if (match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/titulaire") {
        return { data: getTitulairesActeAPI.data };
      }

      if (match[1] === "/acte/mespocopas") {
        return { data: ["ALGER", "RABAT", "TRIPOLI", "TUNIS"] };
      }

      const error = {
        msg: "url api etat civil non mockée",
        url: match[1],
        method: context.method
      };
      const message = `Erreur mock api etatcivil: ${JSON.stringify(error)}`;
      console.error(message);
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },

    /**
     * returns the result of the PATCH request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    patch: function (match: any, data: any) {
      // TODO: Séparer clairement body, status et header (pour le moment, on doit passer les deux derniers dans data).
      return {
        body: data,
        header: data.headers,
        status: data.status
      };
    },
    delete: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },
    /**
     * returns the result of the PUT request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    put: function (match: any, data: any) {
      return {
        body: data
      };
    }
  }
];
