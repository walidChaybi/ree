/* istanbul ignore file */

import * as superagent from "superagent";
import {Pact} from "@pact-foundation/pact";

export class ApiPact {
  private path: string;
  private queryParams: Object;
  private headerIdSso: string;

  constructor(private readonly provider: Pact) {
    this.path = "";
    this.queryParams = "";
    this.headerIdSso = "";
  }

  public get(path: string) {
    this.path = path;
    return this;
  }

  public setHeaderIdSso(headerIdSso: string) {
    this.headerIdSso = headerIdSso;
    return this;
  }

  public queryParameters(queryParameters: Object) {
    this.queryParams = queryParameters;
    return this;
  }

  public execute() {
    return superagent
        .get(`${this.provider.mockService.baseUrl}/${this.path}`)
        .set("id_sso", this.headerIdSso)
        .query(this.queryParams)
        .then(res => {
          return Promise.resolve(res);
        });
  }
}
