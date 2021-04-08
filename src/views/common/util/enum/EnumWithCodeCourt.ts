/* istanbul ignore file */
import { Options } from "../Type";
import { EnumWithLibelle } from "./EnumWithLibelle";

export class EnumWithCodeCourt extends EnumWithLibelle {
  constructor(
    private readonly _code: string,
    private readonly _codeCourt: string,
    libelle: string
  ) {
    super(libelle);
  }

  get code() {
    return this._code;
  }

  get codeCourt() {
    return this._codeCourt;
  }

  /**
   * Le code de l'enum est trop long dans certains cas (cf. OP2_xxx de TypeFamille) on affiche alors le code court.
   */
  public static getAllLibellesWithCodeCourtAsOptions(
    clazz: any,
    inclureCodeDansLibelle = false
  ): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        options.push({
          value: key,
          str: inclureCodeDansLibelle
            ? `(${clazz[key]._codeCourt}) ${clazz[key]._libelle}`
            : clazz[key]._libelle
        });
      }
    }
    return options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str));
  }
}
