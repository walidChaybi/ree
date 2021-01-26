import mockRC from "../data/RC.json";
import mockRCA from "../data/RCA.json";
import { pacsModificationNotaire } from "../data/PACS";
//import mockPACS from "./data/PACS";

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
        "/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0"
      ) {
        return { data: pacsModificationNotaire.data };
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
        status: 201
      };
    }
  }
];
