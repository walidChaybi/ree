import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { IRMCAutoParams } from "../../../../views/pages/rechercheMultiCriteres/auto/hook/RMCAutoHook";
import { URL_MES_REQUETES_V2 } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const criteres: IRMCAutoParams = {
  idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de3",
  dataRequetes: [],
  urlWithParam: URL_MES_REQUETES_V2
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Auto", async () => {
  //const rmcAutoUrlData: IUrlData = useRMCAutoHook(criteres);
});

afterAll(() => {
  superagentMock.unset();
});
