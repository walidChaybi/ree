export enum ETypeService {
  MINISTERE = "MINISTERE",
  SERVICE = "SERVICE",
  DEPARTEMENT = "DEPARTEMENT",
  BUREAU = "BUREAU",
  SECTION = "SECTION",
  POSTE = "POSTE",
  SECTION_CONSULAIRE = "SECTION_CONSULAIRE"
}

export const TypeService = {
  estEnum: (valeur: string): boolean =>
    Object.values<string>(ETypeService).includes(valeur),

  depuisString: (valeur: string): ETypeService | null =>
    TypeService.estEnum(valeur) ? (valeur as ETypeService) : null
} as const;
