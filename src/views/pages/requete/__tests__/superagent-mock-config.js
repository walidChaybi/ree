import DONNEES_REQUETE from "./data/requete";
// ./superagent-mock-config.js file
module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: "http://10.110.192.130:80/rece-requete-api/v1(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function(match, params, headers, context) {
      console.log("match mock test", match[1]);
      if (
        match[1] === "/requetes?parametre1=titi&parametre2=3&parametre3=tutu"
      ) {
        return true;
      }

      if (match[1] === "/requetes") {
        return true;
      }

      if (
        match[1] ===
        "/requetes/req1?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER"
      ) {
        return { data: [DONNEES_REQUETE] };
      }

      if (
        match[1] ===
        "/requetes/req2?nomOec=Garisson&prenomOec=Juliette&statut=A_SIGNER"
      ) {
        return { status: 404 };
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function(match, data) {
      return {
        body: data
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function(match, data) {
      return {
        status: 201
      };
    }
  }
];
