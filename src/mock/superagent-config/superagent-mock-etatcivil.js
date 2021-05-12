import {
  acte,
  acte1,
  acte2,
  acte3,
  acte4
} from "../../__tests__/pages/fiche/data/ficheActe";
import {
  ReponseAppelNomenclatureNatureRC,
  ReponseAppelNomenclatureNatureRCA
} from "../data/nomenclatures";
import { pacsModificationNotaire } from "../data/PACS";
import mockRC from "../data/RC.json";
import mockRCA from "../data/RCA.json";
import { ReponseAppelRMCActe } from "../data/RMCActe";
import { ReponseAppelRMCInscription } from "../data/RMCInscription";

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
        match[1] ===
          "/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0" ||
        match[1] ===
          "/repertoirecivil/pacs/85160d6e-893b-47c2-a9a8-b25573189f0c"
      ) {
        return { data: pacsModificationNotaire.data };
      } else if (
        match[1] === "/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f" ||
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
      } else if (
        match[1] === "/acte/corps/b41079a5-9e8d-478c-b04c-c4c4ey86537g"
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
      } else if (
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

      if (match[1] === "/acte/rmc?range=0-105") {
        return { data: ReponseAppelRMCActe.data };
      }

      if (match[1] === "/repertoirecivil/rmc?range=0-105") {
        return { data: ReponseAppelRMCInscription.data };
      }

      if (match[1] === "/nomenclature/NATURE_RC") {
        return { data: ReponseAppelNomenclatureNatureRC.data };
      }

      if (match[1] === "/nomenclature/NATURE_RCA") {
        return { data: ReponseAppelNomenclatureNatureRCA.data };
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
        status: 201,
        body: data
      };
    }
  }
];
