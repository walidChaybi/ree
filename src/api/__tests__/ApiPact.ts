import * as superagent from "superagent";
import { Pact, InteractionObject, Interaction } from "@pact-foundation/pact";

export class ApiPact {
  private constructor(private provider: Pact) {}

  public get(path: string) {
    return this;
  }
}
