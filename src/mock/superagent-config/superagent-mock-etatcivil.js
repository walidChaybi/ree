import mockRC from "../data/RC.json";
import mockRCA from "../data/RCA.json";
import { ReponseAppelRMCActe } from "../data/RMCActe";
import { ReponseAppelRMCInscription } from "../data/RMCInscription";
import { pacsModificationNotaire } from "../data/PACS";
import { acte } from "../../__tests__/pages/fiche/data/ficheActe";

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
      } else if (
        match[1] === "/repertoirecivil/rca/135e4dfe-9757-4d5d-8715-359c6e73289b"
      ) {
        return { data: mockRCA.data };
      } else if (
        match[1] ===
          "/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0" ||
        match[1] ===
          "/repertoirecivil/pacs/85160d6e-893b-47c2-a9a8-b25573189f0c"
      ) {
        return { data: pacsModificationNotaire.data };
      } else if (
        match[1] ===
          "/repertoirecivil/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f" ||
        match[1] ===
          "/repertoirecivil/acte/d8708d77-a359-4553-be72-1eb5f246d4da"
      ) {
        return { data: acte };
      } else if (
        match[1] ===
        "/repertoirecivil/acte/corps/b41079a5-9e8d-478c-b04c-c4c4ey86537g"
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
