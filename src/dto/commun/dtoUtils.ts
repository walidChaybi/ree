export const valeurDtoAbsenteDansEnum = <TType extends object, TEnum extends { [cleEnum: string]: string }>(
  nomDto: string,
  dto: TType,
  cle: keyof TType extends string ? keyof TType : never,
  enumeration: TEnum
): boolean => {
  if (!Object.keys(enumeration).includes(dto[cle] as string)) {
    console.error(`Le ${cle} d'un ${nomDto} a la valeur ${dto[cle]} au lieu d'une des suivantes : ${Object.keys(enumeration)}`);
    return true;
  }
  return false;
};

export const champsObligatoiresDuDtoAbsents = <TType extends object>(
  nomDto: string,
  dto: TType,
  champsObligatoires: keyof TType extends string ? (keyof TType)[] : never
): boolean =>
  champsObligatoires
    .map(cle => {
      if (dto[cle] === undefined) {
        console.error(`Le champ obligatoire ${cle} d'un ${nomDto} n'est pas défini.`);
        return true;
      }
      return false;
    })
    .some(valeur => valeur);

export const nettoyerAttributsDto = <TObjet extends any[] | { [cle: string]: any }>(objet: TObjet): TObjet => {
  return (
    Array.isArray(objet) ? supprimeElementsVidesTableau(objet) : supprimeAttributsVidesObjet(objet as { [cle: string]: any })
  ) as TObjet;
};

const supprimeAttributsVidesObjet = <TObjet extends { [cle: string]: any }>(objet: TObjet): TObjet => {
  let objetFinal: Partial<TObjet> = {};
  let elementNettoye;
  for (const cle in objet) {
    switch (true) {
      case typeof objet[cle] === "number":
      case typeof objet[cle] === "boolean":
        objetFinal = { ...objetFinal, ...{ [cle]: objet[cle] } };
        break;
      case !objet[cle]:
        break;
      case typeof objet[cle] === "object":
        elementNettoye = Array.isArray(objet[cle]) ? supprimeElementsVidesTableau(objet[cle]) : supprimeAttributsVidesObjet(objet[cle]);
        if (Array.isArray(elementNettoye) || Object.keys(elementNettoye).length) {
          objetFinal = {
            ...objetFinal,
            ...{ [cle]: elementNettoye }
          };
        }
        break;
      default:
        objetFinal = { ...objetFinal, ...{ [cle]: objet[cle] } };
        break;
    }
  }
  return objetFinal as TObjet;
};

const supprimeElementsVidesTableau = (tableau: any[]): any[] => {
  let tableauFinal: any[] = [];
  let elementNettoye;
  tableau.forEach(element => {
    switch (true) {
      case typeof element === "number":
      case typeof element === "boolean":
        tableauFinal.push(element);
        break;
      case !element:
        break;
      case typeof element === "object":
        elementNettoye = Array.isArray(element) ? supprimeElementsVidesTableau(element) : supprimeAttributsVidesObjet(element);
        if (Array.isArray(elementNettoye) || Object.keys(elementNettoye).length) {
          tableauFinal.push(elementNettoye);
        }
        break;
      default:
        tableauFinal.push(element);
        break;
    }
  });
  return tableauFinal;
};
