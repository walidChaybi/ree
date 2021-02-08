export class Rot18 {
  static readonly alphabet18 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  static readonly rotated18 =
    "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm5678901234";

  static crypte(str?: string): string | undefined {
    let strCryptee = str;
    if (str) {
      strCryptee = this.substitute(str, Rot18.alphabet18, Rot18.rotated18);
    }
    return strCryptee;
  }

  static decrypte(str?: string): string | undefined {
    let strDecryptee = str;
    if (str) {
      strDecryptee = this.substitute(str, Rot18.rotated18, Rot18.alphabet18);
    }
    return strDecryptee;
  }

  private static readonly substitute = function (
    p: string,
    alphabet: string,
    substitution: string
  ) {
    return p
      .split("")
      .map(function (c) {
        if (alphabet.indexOf(c) !== -1) {
          return substitution.charAt(alphabet.indexOf(c));
        } else {
          return c;
        }
      })
      .join("");
  };
}
