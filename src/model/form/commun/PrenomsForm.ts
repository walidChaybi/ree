/* v8 ignore start A TESTER 03/25 */
interface IPrenomDto {
  numeroOrdre: number;
  prenom: string;
}

export interface IPrenomsForm {
  prenomsAffiches: number;
  prenom1: string;
  prenom2: string;
  prenom3: string;
  prenom4: string;
  prenom5: string;
  prenom6: string;
  prenom7: string;
  prenom8: string;
  prenom9: string;
  prenom10: string;
  prenom11: string;
  prenom12: string;
  prenom13: string;
  prenom14: string;
  prenom15: string;
}

export const PrenomsForm = {
  valeursDefauts: (prenomsDto?: IPrenomDto[]): IPrenomsForm => ({
    prenomsAffiches: prenomsDto?.length ?? 1,
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

  versDto: (prenomsForm: IPrenomsForm): IPrenomDto[] =>
    Object.entries(prenomsForm).reduce((prenomsDtos: IPrenomDto[], [clePrenom, prenom]) => {
      if (clePrenom !== "prenomsAffiches" && prenom) {
        prenomsDtos.push({
          numeroOrdre: parseInt(clePrenom.replace("prenom", "")),
          prenom: prenom
        });
      }
      return prenomsDtos;
    }, [])
};
/* v8 ignore end */
