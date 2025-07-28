import { IAdresseDto } from "@api/configurations/adresse/GetAdressesConfigApi";
import { ICommuneDto } from "@api/configurations/adresse/GetCommunesConfigApi";
import { IDepartementDto } from "@api/configurations/adresse/GetDepartementsConfigApi";

class CacheDonneesApiGeo {
  private static communes: Record<string, ICommuneDto[]> = {};
  private static departements: Record<string, IDepartementDto[]> = {};
  private static adresses: Record<string, IAdresseDto[]> = {};

  public static getCommunes = (recherche: string): ICommuneDto[] | null => CacheDonneesApiGeo.communes[recherche] ?? null;

  public static setCommunes = (recherche: string, communes: ICommuneDto[]): void => {
    CacheDonneesApiGeo.communes[recherche] = communes;
  };

  public static getDepartements = (recherche: string): IDepartementDto[] | null => CacheDonneesApiGeo.departements[recherche] ?? null;

  public static setDepartements = (recherche: string, departements: IDepartementDto[]): void => {
    CacheDonneesApiGeo.departements[recherche] = departements;
  };

  public static getAdresses = (recherche: string): IAdresseDto[] | null => CacheDonneesApiGeo.adresses[recherche] ?? null;

  public static setAdresses = (recherche: string, adresses: IAdresseDto[]): void => {
    CacheDonneesApiGeo.adresses[recherche] = adresses;
  };

  public static clearCommunes = () => (CacheDonneesApiGeo.communes = {});
  public static clearDepartements = () => (CacheDonneesApiGeo.departements = {});
  public static clearAdresses = () => (CacheDonneesApiGeo.adresses = {});
}

export default CacheDonneesApiGeo;
