import { ITypeRegistreDto } from "@model/etatcivil/acte/TypeRegistre";

class CacheOptionsPoste {
  private static postesParFamilleRegistre: Record<string, ITypeRegistreDto[]> = {};

  public static readonly getPostesFamilleRegistre = (familleRegistre: string): ITypeRegistreDto[] | null =>
    CacheOptionsPoste.postesParFamilleRegistre[familleRegistre] ?? null;

  public static setPostesFamilleRegistre = (familleRegistre: string, postes: ITypeRegistreDto[]): void => {
    CacheOptionsPoste.postesParFamilleRegistre[familleRegistre] = postes;
  };

  public static clearPostes = () => {
    CacheOptionsPoste.postesParFamilleRegistre = {};
  };
}

export default CacheOptionsPoste;
