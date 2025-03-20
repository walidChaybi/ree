/* v8 ignore start A TESTER 03/25 */
interface INationaliteDto {
  nationalite: string;
}

export interface INationalitesForm {
  nationalitesAffichees: number;
  nationalite1: string;
  nationalite2: string;
  nationalite3: string;
}

export const NationalitesForm = {
  valeursDefauts: (nationalitesDtos?: INationaliteDto[]): INationalitesForm => ({
    nationalitesAffichees: nationalitesDtos?.length ?? 1,
    nationalite1: nationalitesDtos?.[0]?.nationalite ?? "",
    nationalite2: nationalitesDtos?.[1]?.nationalite ?? "",
    nationalite3: nationalitesDtos?.[2]?.nationalite ?? ""
  }),

  versDto: (valeursNationalites: INationalitesForm): INationaliteDto[] =>
    Object.entries(valeursNationalites).reduce(
      (nationalitesDtos: INationaliteDto[], [cleNationalite, valeurNationalite]) => [
        ...nationalitesDtos,
        ...(cleNationalite !== "nationalitesAffichees" && valeurNationalite ? [{ nationalite: valeurNationalite }] : [])
      ],
      []
    )
};
/* v8 ignore end */
