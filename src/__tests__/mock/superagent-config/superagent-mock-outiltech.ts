import mockConnectedUser from "../data/connectedUser.json";

export const configOutiltech = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-outiltech-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      if (match[1] === "/log") {
        return { headers: mockConnectedUser, data: null };
      }

      const error = { msg: "url api outiltech non mockée", url: match[1] };
      const message = `Erreur mock api outiltech: ${JSON.stringify(error)}`;
      console.error(message);
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function (match: any, data: any) {
      return {
        status: 200
      };
    }
  }
];
