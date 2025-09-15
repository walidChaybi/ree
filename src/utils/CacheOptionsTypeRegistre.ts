import { ITypeRegistreDto } from "@model/etatcivil/acte/TypeRegistre";

class CacheOptionsTypeRegistre {
  private static typeRegistresParFamilleRegistre: Record<string, ITypeRegistreDto[]> = {};

  public static readonly getTypeRegistresParFamilleRegistre = (familleRegistre: string): ITypeRegistreDto[] | null =>
    CacheOptionsTypeRegistre.typeRegistresParFamilleRegistre[familleRegistre] ?? null;

  public static readonly setTypeRegistresParFamilleRegistre = (familleRegistre: string, typeRegistres: ITypeRegistreDto[]): void => {
    CacheOptionsTypeRegistre.typeRegistresParFamilleRegistre[familleRegistre] = typeRegistres;
  };

  public static readonly clearTypeRegistres = () => {
    CacheOptionsTypeRegistre.typeRegistresParFamilleRegistre = {};
  };
}

export default CacheOptionsTypeRegistre;
