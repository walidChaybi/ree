import { CINQ, DIX, NEUF, ZERO } from "@util/Utils";

export class Rot5 {
  static crypte(str?: string): string | undefined {
    if (!str) return undefined;

    return str
      .split("")
      .map(c => {
        if (ZERO <= parseInt(c) && parseInt(c) <= NEUF) {
          return ((parseInt(c) + CINQ) % DIX).toString();
        }
        return c;
      })
      .join("");
  }

  static decrypte(str?: string): string | undefined {
    if (!str) return undefined;

    return str
      .split("")
      .map(c => {
        if (ZERO <= parseInt(c) && parseInt(c) <= NEUF) {
          return ((parseInt(c) - CINQ + DIX) % DIX).toString();
        }
        return c;
      })
      .join("");
  }
}
