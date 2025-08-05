import { ITypeRegistreDto } from "@model/etatcivil/acte/TypeRegistre";

class CacheOptionsPocopa {
  private static pocopasParFamilleRegistre: Record<string, ITypeRegistreDto[]> = {};

  public static getPocopasFamilleRegistre = (familleRegistre: string): ITypeRegistreDto[] | null =>
    CacheOptionsPocopa.pocopasParFamilleRegistre[familleRegistre] ?? null;

  public static setPocopasFamilleRegistre = (familleRegistre: string, pocopas: ITypeRegistreDto[]): void => {
    CacheOptionsPocopa.pocopasParFamilleRegistre[familleRegistre] = pocopas;
  };

  public static clearPocopas = () => {
    CacheOptionsPocopa.pocopasParFamilleRegistre = {};
  };
}

export default CacheOptionsPocopa;
