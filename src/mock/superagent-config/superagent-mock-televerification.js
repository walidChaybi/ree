export const configTeleverification = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-televerification-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      if (match[1] === "/televerifications/ctv") {
        return { data: "111111-222222" };
      }

      if (
        match[1] ===
          "/televerifications/ctv/111111-222222/bbac2335-562c-4b14-96aa-4386814c02a2" ||
        match[1] ===
          "/televerifications/ctv/111111-222222/9bfa282d-1e66-4538-b242-b9de4f683777" ||
        match[1] ===
          "/televerifications/ctv/111111-222222/9bfa282d-1e66-4538-b242-b9de4f683777"
      ) {
        return true;
      }

      if (match[1] === "/televerifications/generer") {
        return true;
      }

      const error = {
        msg: "url api télévérification non mockée",
        url: match[1]
      };
      const message = `Erreur mock api télévérification: ${JSON.stringify(
        error
      )}`;
      console.error(message);
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

    /**
     * returns the result of the PATCH request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
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
