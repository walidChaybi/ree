export enum Perimetre {
  ETAX = "ETA X",
  MEAE = "MEAE"
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
