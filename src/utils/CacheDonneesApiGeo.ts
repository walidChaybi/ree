import { ICommuneDto } from "@api/configurations/adresse/GetCommunesConfigApi";
import { IDepartementDto } from "@api/configurations/adresse/GetDepartementsConfigApi";

class CacheDonneesApiGeo {
  private static communes: Record<string, ICommuneDto[]> = {};
  private static departements: Record<string, IDepartementDto[]> = {};

  public static getCommunes = (recherche: string): ICommuneDto[] | null => CacheDonneesApiGeo.communes[recherche] ?? null;

  public static setCommunes = (recherche: string, communes: ICommuneDto[]): void => {
    CacheDonneesApiGeo.communes[recherche] = communes;
  };

  public static getDepartements = (recherche: string): IDepartementDto[] | null => CacheDonneesApiGeo.departements[recherche] ?? null;

  public static setDepartements = (recherche: string, departements: IDepartementDto[]): void => {
    CacheDonneesApiGeo.departements[recherche] = departements;
  };

  public static clearCommunes = () => (CacheDonneesApiGeo.communes = {});

  public static clearDepartements = () => (CacheDonneesApiGeo.departements = {});
}

export default CacheDonneesApiGeo;
