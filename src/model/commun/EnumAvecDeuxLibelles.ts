export type TEnumAvecDeuxLibelles<TClesEnum extends string> = Record<TClesEnum, { court: string; long: string }>;

interface IEnumAvecDeuxLibellesUtils<TClesEnum extends string> {
  getDepuisLibelleCourt: (libelleCourt: string) => TClesEnum | null;
  getDepuisLibelleLong: (libelleLong: string) => TClesEnum | null;
}

export const constructeurEnumAvecDeuxLibellesUtils = <TClesEnum extends string>(
  enumAvecDeuxLibelles: TEnumAvecDeuxLibelles<TClesEnum>
): IEnumAvecDeuxLibellesUtils<TClesEnum> => ({
  getDepuisLibelleCourt: libelleCourt =>
    (Object.entries(enumAvecDeuxLibelles) as [TClesEnum, { court: string; long: string }][]).find(
      ([cle, libelles]) => libelleCourt === libelles.court
    )?.[0] ?? null,

  getDepuisLibelleLong: libelleLong =>
    (Object.entries(enumAvecDeuxLibelles) as [TClesEnum, { court: string; long: string }][]).find(
      ([cle, libelles]) => libelleLong === libelles.long
    )?.[0] ?? null
});
