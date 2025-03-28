export enum StatutActeDto {
  BROUILLON = "Brouillon",
  VALIDE = "Validé",
  ANNULE = "Annulé",
  SIGNE = "Signé"
}

export const getStatutActe = (str: string): StatutActeDto | null => {
  return Object.values(StatutActeDto).find(statut => statut === str) ?? null;
};
