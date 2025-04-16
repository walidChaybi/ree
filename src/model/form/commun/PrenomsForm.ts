export type TPrenomsForm = { [Cle in `prenom${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}`]: string } & {
  nombrePrenomsAffiches: number;
};

export interface IPrenomOrdonneDto {
  prenom: string;
  numeroOrdre: number;
  estPrenomFrRetenuSdanf?: boolean;
}

export const PrenomsForm = {
  valeursInitiales: (prenomsDto?: IPrenomOrdonneDto[]): TPrenomsForm => ({
    nombrePrenomsAffiches: prenomsDto?.length || 1,
    prenom1: "",
    prenom2: "",
    prenom3: "",
    prenom4: "",
    prenom5: "",
    prenom6: "",
    prenom7: "",
    prenom8: "",
    prenom9: "",
    prenom10: "",
    prenom11: "",
    prenom12: "",
    prenom13: "",
    prenom14: "",
    prenom15: "",
    ...(prenomsDto?.reduce((prenomsForm, prenomDto) => {
      return {
        ...prenomsForm,
        [`prenom${prenomDto.numeroOrdre}`]: prenomDto.prenom
      };
    }, {}) ?? {})
  }),

  versPrenomsOrdonnesDto: (prenomsForm?: TPrenomsForm): IPrenomOrdonneDto[] => {
    if (!prenomsForm) return [];
    return Object.entries(prenomsForm).reduce((prenomsDtos: IPrenomOrdonneDto[], [clePrenom, prenom]) => {
      if (typeof prenom === "string" && prenom) {
        prenomsDtos.push({
          numeroOrdre: parseInt(clePrenom.replace("prenom", "")),
          prenom: prenom
        });
      }
      return prenomsDtos;
    }, []);
  },

  versPrenomsStringDto: (prenomsForm?: TPrenomsForm): string[] => {
    return PrenomsForm.versPrenomsOrdonnesDto(prenomsForm)
      .sort((prenomA, prenomB) => prenomA.numeroOrdre - prenomB.numeroOrdre)
      .map(prenomOrdonne => prenomOrdonne.prenom.trim());
  },

  depuisStringDto: (prenomsDto: string[]): TPrenomsForm =>
    PrenomsForm.valeursInitiales(prenomsDto.map((prenom: string, index: number) => ({ prenom: prenom, numeroOrdre: index + 1 })))
};
