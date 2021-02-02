/* istanbul ignore file */
export class EnumWithLibelle {
  constructor(private readonly _libelle: string) {}

  get libelle() {
    return this._libelle;
  }

  public static getEnumFor(str: string, clazz: any) {
    return str ? clazz[str] : str;
  }
}
