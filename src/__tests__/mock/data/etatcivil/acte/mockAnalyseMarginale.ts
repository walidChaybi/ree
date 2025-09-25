import { IAnalyseMarginaleDto } from "@model/etatcivil/acte/AnalyseMarginale";
import { ITitulaireActeDto } from "@model/etatcivil/acte/TitulaireActe";
import DateRECE from "../../../../../utils/DateRECE";

export const creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto = (titulaires: ITitulaireActeDto[]): IAnalyseMarginaleDto[] =>
  titulaires.length
    ? [
        {
          id: "idAnalyseMarginale",
          titulaires: titulaires.map(titulaire => ({
            nom: titulaire.nom,
            nomPartie1: titulaire.nomPartie1,
            nomPartie2: titulaire.nomPartie2,
            prenoms: titulaire.prenoms,
            ordre: titulaire.ordre,
            dateDeclarationConjointe: titulaire.dateDeclarationConjointe,
            typeDeclarationConjointe: titulaire.typeDeclarationConjointe
          })),

          estValide: true,
          dateDebut: titulaires[0].naissance ? DateRECE.depuisObjetDate(titulaires[0].naissance).versTimestamp() : 0
        }
      ]
    : [];
