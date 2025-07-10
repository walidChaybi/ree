export interface INumeroRcRcaPacs {
  anneeInscription: string;
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
      ligne1: { anneeInscription: "", numero: "" },
      ligne2: { anneeInscription: "", numero: "" },
      ligne3: { anneeInscription: "", numero: "" },
      ligne4: { anneeInscription: "", numero: "" },
      ligne5: { anneeInscription: "", numero: "" },
      ligne6: { anneeInscription: "", numero: "" },
      ligne7: { anneeInscription: "", numero: "" },
      ligne8: { anneeInscription: "", numero: "" },
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
    case !numeroRcRcaPacs.anneeInscription:
      return "";
    case !numeroRcRcaPacs.numero:
      return numeroRcRcaPacs.anneeInscription;
    default:
      return `${numeroRcRcaPacs.anneeInscription}-${numeroRcRcaPacs.numero}`;
  }
};
