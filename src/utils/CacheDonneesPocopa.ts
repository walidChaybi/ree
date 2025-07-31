import { ITypeRegistreDto } from "@model/etatcivil/acte/ITypeRegistre";
import { Options } from "@util/Type";

class CacheDonneesPocopa {
  private static pocopasFamilleRegistre: Record<string, ITypeRegistreDto[]> = {};
  private static pocopas: ITypeRegistreDto[] = [];

  public static getPocopasFamilleRegistre = (familleRegistre: string): ITypeRegistreDto[] | null =>
    CacheDonneesPocopa.pocopasFamilleRegistre[familleRegistre] ?? null;

  public static setPocopasFamilleRegistre = (familleRegistre: string, pocopas: ITypeRegistreDto[]): void => {
    CacheDonneesPocopa.pocopasFamilleRegistre[familleRegistre] = pocopas;
  };

  public static getPocopas = (): ITypeRegistreDto[] | null => CacheDonneesPocopa.pocopas ?? null;

  public static setPocopas = (pocopas: ITypeRegistreDto[]): void => {
    CacheDonneesPocopa.pocopas = pocopas;
  };

  public static versOptions = (pocopas: ITypeRegistreDto[]): Options => {
    return pocopas.map(pocopa => ({
      cle: pocopa.pocopa,
      libelle: pocopa.pocopa
    }));
  };

  public static clearPocopas = () => {
    CacheDonneesPocopa.pocopas = [];
    CacheDonneesPocopa.pocopasFamilleRegistre = {};
  };
}

export default CacheDonneesPocopa;
