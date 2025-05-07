export type TNumeroInscriptionRcRcaForm = {
  [Cle in `ligne${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`]: string;
} & {
  nombreNumerosAffiches: number;
};

export interface INumeroInscriptionRcRcaOrdonneDto {
  numeroInscriptionRcRca: string;
  numeroOrdre: number;
}

export const NumeroInscriptionRcRcaForm = {
  valeursInitiales: (numeroInscriptionRcRcaDtos?: INumeroInscriptionRcRcaOrdonneDto[]): TNumeroInscriptionRcRcaForm => ({
    nombreNumerosAffiches: numeroInscriptionRcRcaDtos?.length || 1,
    ligne1: "",
    ligne2: "",
    ligne3: "",
    ligne4: "",
    ligne5: "",
    ligne6: "",
    ligne7: "",
    ligne8: "",
    ...(numeroInscriptionRcRcaDtos?.reduce((numeroInscriptionRcRcaForm, numeroInscriptionRcRcaDto) => {
      return {
        ...numeroInscriptionRcRcaForm,
        [`ligne${numeroInscriptionRcRcaDto.numeroOrdre}`]: numeroInscriptionRcRcaDto.numeroInscriptionRcRca
      };
    }, {}) ?? {})
  })
};
