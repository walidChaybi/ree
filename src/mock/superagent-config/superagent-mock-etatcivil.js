import {
  acte,
  acte1,
  acte2,
  acte3,
  acte4,
  acte5,
  acteMariage
} from "../../__tests__/pages/fiche/data/ficheActe";
import { ActeAnalyseMarginales } from "../data/ActeAnalyseMarginales";
import {
  ReponseAppelAddAlerteActe,
  ReponseAppelGetAlertesActe
} from "../data/Alertes";
import {
  ficheActe1,
  ficheActe2,
  ficheActeMariage,
  idFicheActe1,
  idFicheActe2,
  idFicheActeMariage
} from "../data/ficheActe";
import { fichePacs, idFichePacs } from "../data/fichePacs";
import {
  ficheRca,
  FicheRcaDecisionJuridictionEtrangere,
  idFicheRca
} from "../data/ficheRCA";
import { imagePngVideBase64 } from "../data/ImagePng";
import { mentions } from "../data/mentions";
import { decrets } from "../data/NomenclatureEtatCivilDecrets";
import {
  ReponseAppelNomenclatureMandataire,
  ReponseAppelNomenclatureNatureMention,
  ReponseAppelNomenclatureNatureRC,
  ReponseAppelNomenclatureNatureRCA,
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
  ReponseAppelRMCInscription,
  ReponseAppelRMCInscription4DernierResultats,
  ReponseAppelRMCInscription4PremiersResultats
} from "../data/RMCInscription";

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
    fixtures: function (match, params, headers, context) {
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
        match[1] ===
          "/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0" ||
        match[1] ===
          "/repertoirecivil/pacs/85160d6e-893b-47c2-a9a8-b25573189f0c"
      ) {
        return { data: pacsModificationNotaire.data };
      } else if (
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f" ||
        match[1] ===
          "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f?recupereImagesEtTexte=true" ||
        match[1] === "/acte/d8708d77-a359-4553-be72-1eb5f246d4da"
      ) {
        return { data: acte };
      } else if (match[1] === "/acte/d8708d77-a359-4553-be72-1eb5f246d4dc") {
        return { data: acte1 };
      } else if (match[1] === "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a8") {
        return { data: acte2 };
      } else if (match[1] === "/acte/d8708d77-a359-4553-be72-1eb5f246d4db") {
        return { data: acte3 };
      } else if (match[1] === "/acte/2748bb45-22cd-41ea-90db-0483b8ffc8a9") {
        return { data: acte4 };
      } else if (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a") {
        return { data: acte5 };
      } else if (match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac671348") {
        return { data: acteMariage };
      } else if (match[1] === "/acte/923a10fb-0b15-452d-83c0-d24c76d1d19d") {
        return { data: ActeAnalyseMarginales };
      }

      /////////////////////////////////////////////////////////////////////
      // Mention
      if (
        match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" &&
        context.method === "get"
      ) {
        return { data: mentions };
      }
      if (
        (match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/mentions" ||
          match[1] === "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235b/mentions" ||
          match[1] ===
            "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235a/corpstexte?type=EXTRAIT_AVEC_FILIATION") &&
        context.method === "post"
      ) {
        return { data: true };
      }

      /////////////////////////////////////////////////////////////////////
      // nombre de titulaires utilisé pour les sur l'apercu en prise en chage
      if (
        match[1] ===
        "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/count/titulaire"
      ) {
        return ficheActe1;
      }

      if (
        // acte corps
        match[1] === "/acte/corps/b41079a5-9e8d-478c-b04c-c4c4ey86537g" ||
        match[1] === "/acte/corps/923a10fb-0b15-452d-83c0-d24c76d1de8d" ||
        match[1] === "/acte/corps/b41079a3-9e8d-478c-b04c-c4c2ac47134f" ||
        match[1] === "/acte/corps/19c0d767-64e5-4376-aa1f-6d781a2a235a" ||
        match[1] === "/acte/corps/b41079a5-9e8d-478c-b04c-c4c2ac67134b" ||
        // acte texte
        match[1] === "/acte/texte/b41079a5-9e8d-478c-b04c-c4c4ey86537g"
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

      /////////////////////////////////////////////////////////////////////
      // actes utilisés pour le test de pagination (avec changement de plage)
      if (match[1] === `/acte/${idFicheActe1}`) {
        return ficheActe1;
      }

      if (match[1] === `/acte/${idFicheActe2}`) {
        return ficheActe2;
      }
      /////////////////////////////////////////////////////////////////////

      if (
        match[1] === `/acte/${idFicheActeMariage}` ||
        match[1] === `/acte/${idFicheActeMariage}?recupereImagesEtTexte=true`
      ) {
        return ficheActeMariage;
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

      if (match[1] === "/nomenclature/typemention") {
        return { data: ReponseAppelNomenclatureTypeMention.data };
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
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134b/alertes"
      ) {
        return { data: ReponseAppelGetAlertesActe.data };
      }

      if (match[1] === "/acte/alerte?provenanceRequete=Service%20Public") {
        return { data: ReponseAppelAddAlerteActe.data };
      }

      if (
        match[1] ===
        "/acte/alerte/a0adc2b2-03b6-4b80-a90d-7f96e780df15?provenanceRequete=Service%20Public"
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

      // Validation de la saisie d'un extrait
      if (
        match[1] === "/acte/923a10fb-0b15-452d-83c0-d24c76d1de8d/saisieExtrait"
      ) {
        return { data: {} };
      }

      // Maj de la date de derhière délivrance
      if (
        match[1] ===
        "/acte/19c0d767-64e5-4376-aa1f-6d781a2a235b/dernieredelivrance"
      ) {
        return { data: {} };
      }

      const error = {
        msg: "url api etat civil non mockée",
        url: match[1],
        method: context.method
      };
      console.log("Erreur mock api etat civil: ", error);
      return {
        data: error
      };
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match, data) {
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
    post: function (match, data) {
      return {
        body: data,
        header: data.headers
      };
    },

    patch: function (match, data) {
      return {
        body: data,
        header: data.headers
      };
    },
    delete: function (match, data) {
      return {
        body: data,
        header: data.headers
      };
    }
  }
];
