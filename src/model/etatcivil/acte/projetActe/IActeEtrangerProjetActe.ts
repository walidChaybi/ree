export interface IActeEtranger {
  texteEnonciations: string | null;
  typeActeEtranger: string | null;
  infoTypeActe?: string | null;
  cadreNaissance: string | null;
  jourEnregistrement?: string | null;
  moisEnregistrement?: string | null;
  anneeEnregistrement?: string | null;
  adresseEnregistrement:
    | {
        ville: string | null;
        region: string | null;
        pays: string | null;
      }
    | {};
  redacteur: string | null;
  reference: string | null;
  complement: string | null;
  mentions: string | null;
}
