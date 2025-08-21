export interface INumeroRcRcaPacs {
  annee: string;
  numero: string;
}

export type TNumeroRcRcaPacsForm = {
  [Cle in `ligne${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`]: INumeroRcRcaPacs;
} & {
  nombreNumerosAffiches: number;
};

interface INumeroRcRcaPacsOrdonneDto {
  numeroRcRcaPacs: string;
  numeroOrdre: number;
}

export const NumeroRcRcaPacsForm = {
  valeursInitiales: (numeroRcRcaPacsDtos?: INumeroRcRcaPacsOrdonneDto[]): TNumeroRcRcaPacsForm => {
    const nombreNumerosAffiches = numeroRcRcaPacsDtos?.length ?? 0;

    return {
      nombreNumerosAffiches: nombreNumerosAffiches || 1,
      ligne1: { annee: "", numero: "" },
      ligne2: { annee: "", numero: "" },
      ligne3: { annee: "", numero: "" },
      ligne4: { annee: "", numero: "" },
      ligne5: { annee: "", numero: "" },
      ligne6: { annee: "", numero: "" },
      ligne7: { annee: "", numero: "" },
      ligne8: { annee: "", numero: "" },
      ...(numeroRcRcaPacsDtos?.reduce((numeroRcRcaPacsForm, numeroRcRcaPacsDto) => {
        return {
          ...numeroRcRcaPacsForm,
          [`ligne${numeroRcRcaPacsDto.numeroOrdre}`]: numeroRcRcaPacsDto.numeroRcRcaPacs
        };
      }, {}) ?? {})
    };
  }
};

export const numeroRcRcaPacsVersDto = (numeroRcRcaPacs: INumeroRcRcaPacs): string => {
  switch (true) {
    case !numeroRcRcaPacs.annee:
      return "";
    case !numeroRcRcaPacs.numero:
      return numeroRcRcaPacs.annee;
    default:
      return `${numeroRcRcaPacs.annee}-${numeroRcRcaPacs.numero}`;
  }
};
