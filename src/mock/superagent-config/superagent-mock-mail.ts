export const configMail = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-mail-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      // Envoyer la réponse de l'OEC
      if (match[1] === "/mail") {
        return { data: null };
      }

      const error = { msg: "url params non mockée", url: match[1] };
      const message = `Erreur mock api mail: ${JSON.stringify(error)}`;
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
        header: data ? data.headers : null
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
        header: data.headers,
        status: 200
      };
    },

    /**
     * returns the result of the PATCH request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    patch: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    },

    delete: function (match: any, data: any) {
      return {
        body: data,
        header: data.headers
      };
    }
  }
];
