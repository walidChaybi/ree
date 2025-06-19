export interface INumeroRcRca {
  anneeInscription: string;
  numero: string;
}

export type TNumeroInscriptionRcRcaForm = {
  [Cle in `ligne${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`]: INumeroRcRca;
} & {
  nombreNumerosAffiches: number;
};

interface INumeroInscriptionRcRcaOrdonneDto {
  numeroInscriptionRcRca: string;
  numeroOrdre: number;
}

export const NumeroInscriptionRcRcaForm = {
  valeursInitiales: (numeroInscriptionRcRcaDtos?: INumeroInscriptionRcRcaOrdonneDto[]): TNumeroInscriptionRcRcaForm => {
    const nombreNumerosAffiches = numeroInscriptionRcRcaDtos?.length ?? 0;

    return {
      nombreNumerosAffiches: nombreNumerosAffiches || 1,
      ligne1: { anneeInscription: "", numero: "" },
      ligne2: { anneeInscription: "", numero: "" },
      ligne3: { anneeInscription: "", numero: "" },
      ligne4: { anneeInscription: "", numero: "" },
      ligne5: { anneeInscription: "", numero: "" },
      ligne6: { anneeInscription: "", numero: "" },
      ligne7: { anneeInscription: "", numero: "" },
      ligne8: { anneeInscription: "", numero: "" },
      ...(numeroInscriptionRcRcaDtos?.reduce((numeroInscriptionRcRcaForm, numeroInscriptionRcRcaDto) => {
        return {
          ...numeroInscriptionRcRcaForm,
          [`ligne${numeroInscriptionRcRcaDto.numeroOrdre}`]: numeroInscriptionRcRcaDto.numeroInscriptionRcRca
        };
      }, {}) ?? {})
    };
  }
};
