import { IResultatRMCRequete } from "../../model/rmc/requete/IResultatRMCRequete";

export const DataTableauRequete = {
  previousDataLinkState: undefined,
  nextDataLinkState: undefined,
  rowsNumberState: 2,
  minRangeState: 0,
  maxRangeState: 105
};

export const ReponseAppelRMCRequete = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 201,
  url: "/rece/rece-requete-api/v1/requetes/rmc",
  data: {
    requetes: [
      {
        id: "d8708d77-a359-4553-be72-1eb5f246d4da",
        numero: "123abc"
      }
    ]
  }
};

export const DataRMCRequeteAvecResultat: IResultatRMCRequete[] = [
  {
    idRequete: "d8708d77-a359-4553-be72-1eb5f246d4da",
    numeroRequete: "123abc"
  },
  {
    idRequete: "2748bb45-22cd-41ea-90db-0483b8ffc8a8"
  }
];
