export enum Perimetre {
  ETAX = "ETA X",
  TOUS_REGISTRES = "TOUS_REGISTRES"
}

export const PerimetreEnum = {
  getEnum(strEnum: string): Perimetre {
    let perimetre: Perimetre;
    if (strEnum === "ETA X") {
      perimetre = Perimetre.ETAX;
    } else {
      //@ts-ignore
      perimetre = Perimetre[strEnum];
    }
    return perimetre;
  }
};
