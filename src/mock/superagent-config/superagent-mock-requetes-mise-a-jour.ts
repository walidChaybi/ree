const getMockUrlMethodePatch = (uri: string) => {
  switch (uri) {
    case "/requetes/mise-a-jour/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/update-statut-requete-mise-a-jour/TRAITEE_MIS_A_JOUR":
    case "/requetes/mise-a-jour/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/update-statut-requete-mise-a-jour/TRAITEE_MIS_A_JOUR?estMiseAjourAnalyseMarginale=true":
    case "/requetes/mise-a-jour/er5ez456-354v-461z-c5fd-162md289m74h/update-statut-requete-mise-a-jour/TRAITEE_MIS_A_JOUR":
    case "/requetes/mise-a-jour/931c715b-ede1-4895-ad70-931f2ac4e43d/update-statut-requete-mise-a-jour/ABANDONNEE":
      return { status: 200 };
  }
};

const getMockUrlMethodePost = (uri: string) => {
  switch (uri) {
    case "/requetes/mise-a-jour":
      return { data: { id: "6e89c1c1-16c4-4e40-9b72-7b567270b26f" } };
  }
};

export const configRequetesMiseAJour = [
  {
    nbRequetes: 20,
    /**
     * regular expression of URL
     */
    pattern: "http://localhost/rece/rece-requete-api/v2(.*)",

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures: function (match: any, params: any, headers: any, context: any) {
      const uri: string = match[1];

      switch (context.method) {
        case "patch":
          return getMockUrlMethodePatch(uri);
        case "post":
          return getMockUrlMethodePost(uri);
      }
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
    }
  }
];
