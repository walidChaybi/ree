export interface IActeEtranger {
  texteEnonciations: string | null;
  typeActeEtranger: string | null;
  typeActe?: string | null;
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
  referenceEtComplement: string | null;
  mentions: string | null;
}
