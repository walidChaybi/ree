export const configFakeUrl = [
  {
    nbRequetes: 0,
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-requete-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match, params, headers, context) {
      //
      if (
        match[1] === "/requetes?parametre1=titi&parametre2=3&parametre3=tutu"
      ) {
        return true;
      } else if (match[1] === "/requetes/count?statuts=A_SIGNER") {
        return { data: this.nbRequetes };
      }

      const error = {
        msg: "url api fake requete v1 non mockée",
        url: match[1]
      };
      console.log("Erreur mock api: ", error);
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
    get: function (match, data, test1, test2, test3) {
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
    },

    /**
     * returns the result of the DELETE request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    delete: function (match, data) {
      return {
        status: 201
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
        status: 201
      };
    },

    /**
     * returns the result of the PUT request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    put: function (match, data) {
      return {
        status: 201
      };
    }
  }
];
