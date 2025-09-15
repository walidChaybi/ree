import { ITypeRegistrePocopaDto } from "@model/etatcivil/acte/TypeRegistre";

class CacheOptionsPoste {
  private static postesParFamilleRegistre: Record<string, ITypeRegistrePocopaDto[]> = {};

  public static readonly getPostesFamilleRegistre = (familleRegistre: string): ITypeRegistrePocopaDto[] | null =>
    CacheOptionsPoste.postesParFamilleRegistre[familleRegistre] ?? null;

  public static setPostesFamilleRegistre = (familleRegistre: string, postes: ITypeRegistrePocopaDto[]): void => {
    CacheOptionsPoste.postesParFamilleRegistre[familleRegistre] = postes;
  };

  public static clearPostes = () => {
    CacheOptionsPoste.postesParFamilleRegistre = {};
  };
}

export default CacheOptionsPoste;
