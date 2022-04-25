import { v4 as uuidv4 } from "uuid";
export class Generateur {
  public static genereCleUnique() {
    return uuidv4();
  }
}
