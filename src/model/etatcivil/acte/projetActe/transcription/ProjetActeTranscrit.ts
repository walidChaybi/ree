import { EStatutActe } from "@model/etatcivil/enum/EStatutActe";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { TDateArrayDTO } from "@util/DateUtils";
import DateRECE from "../../../../../utils/DateRECE";
import { IActeEtrangerDto } from "../../IActeEtrangerDto";
import { ICorpsTexte } from "../../ICorpsTexte";
import { IMention } from "../../mention/IMention";
import { AnalyseMarginaleProjetActeTranscrit, IAnalyseMarginaleProjetActeTranscritDto } from "./AnalyseMarginaleProjetActeTranscrit";
import { DeclarantProjetActeTranscrit, IDeclarantProjetActeTranscritDto } from "./DeclarantProjetActeTranscrit";
import { EvenementProjetActeTranscrit, IEvenementProjetActeTranscritDto } from "./EvenementProjetActeTranscrit";
import { FormuleFinale, IFormuleFinaleDto } from "./FormuleFinale";
import { ITitulaireProjetActeTranscritDto, TitulaireProjetActeTranscrit } from "./TitulaireProjetActeTranscrit";

export interface IProjetActeTranscritDto {
  id: string;
  dateCreation: number;
  modeCreation: ETypeRedactionActe.TRANSCRIT;
  statut: keyof typeof EStatutActe;
  dateStatut: number;
  nature: keyof typeof ENatureActe;
  dateDerniereMaj: TDateArrayDTO;
  evenement: IEvenementProjetActeTranscritDto;
  titulaires: ITitulaireProjetActeTranscritDto[];
  corpsTexte: ICorpsTexte;
  analyseMarginales: IAnalyseMarginaleProjetActeTranscritDto[];
  type: keyof typeof ETypeActe;
  declarant: IDeclarantProjetActeTranscritDto;
  formuleFinale: IFormuleFinaleDto;
  acteEtranger: IActeEtrangerDto;
  visibiliteArchiviste: string;
  mentions: IMention[];
}

export type IProjetActeTranscritPatchDto = Omit<IProjetActeTranscritDto, "dateCreation" | "dateStatut" | "dateDerniereMaj" | "corpsTexte">;
export type IProjetActeTranscritPostDto = Omit<
  IProjetActeTranscritDto,
  "dateCreation" | "id" | "dateStatut" | "dateDerniereMaj" | "corpsTexte" | "statut" | "type"
>;

export class ProjetActeTranscrit {
  private static readonly champsObligatoires: (keyof IProjetActeTranscritDto)[] = [
    "id",
    "dateCreation",
    "modeCreation",
    "statut",
    "dateStatut",
    "nature",
    "dateDerniereMaj",
    "evenement",
    "titulaires",
    "corpsTexte",
    "analyseMarginales",
    "type",
    "declarant",
    "formuleFinale",
    "acteEtranger"
  ];

  private constructor(
    public readonly id: string,
    public readonly dateCreation: DateRECE,
    public readonly modeCreation: ETypeRedactionActe.TRANSCRIT,
    public readonly statut: keyof typeof EStatutActe,
    public readonly dateStatut: DateRECE,
    public readonly nature: keyof typeof ENatureActe,
    public readonly dateDerniereMaj: DateRECE,
    public readonly evenement: EvenementProjetActeTranscrit,
    public readonly titulaires: TitulaireProjetActeTranscrit[],
    public readonly corpsTexte: ICorpsTexte,
    public readonly analysesMarginales: AnalyseMarginaleProjetActeTranscrit[],
    public readonly type: ETypeActe,
    public readonly declarant: DeclarantProjetActeTranscrit,
    public readonly formuleFinale: FormuleFinale,
    public readonly acteEtranger: IActeEtrangerDto
  ) {}

  public static readonly depuisDto = (projetActeTranscrit: IProjetActeTranscritDto): ProjetActeTranscrit | null => {
    switch (true) {
      case ProjetActeTranscrit.champsObligatoires.some(cle => projetActeTranscrit[cle] === undefined):
        console.error("Un champ obligatoire d'un ProjetActeTranscrit n'est pas défini.");
        return null;
      case ETypeRedactionActe[projetActeTranscrit.modeCreation] !== ETypeRedactionActe.TRANSCRIT:
        console.error(
          `Le modeCreation du ProjetActeTranscrit a la valeur ${projetActeTranscrit.modeCreation} au lieu de la suivante : ${ETypeRedactionActe.TRANSCRIT}.`
        );
        return null;
      case EStatutActe[projetActeTranscrit.statut] !== EStatutActe.BROUILLON:
        console.error(
          `Le statut du ProjetActeTranscrit a la valeur ${projetActeTranscrit.statut} au lieu de la suivante : ${EStatutActe.BROUILLON}.`
        );
        return null;
      case !Object.keys(ENatureActe).includes(projetActeTranscrit.nature):
        console.error(
          `La nature du ProjetActeTranscrit a la valeur ${projetActeTranscrit.nature} au lieu d'une des suivantes : ${Object.keys(ENatureActe)}.`
        );
        return null;
      case !Object.keys(ETypeActe).includes(projetActeTranscrit.type):
        console.error(
          `Le type du ProjetActeTranscrit a la valeur ${projetActeTranscrit.type} au lieu d'une des suivantes : ${Object.keys(ETypeActe)}.`
        );
        return null;
    }

    const declarant = DeclarantProjetActeTranscrit.depuisDto(projetActeTranscrit.declarant);
    if (!declarant) return null;

    const formuleFinale = FormuleFinale.depuisDto(projetActeTranscrit.formuleFinale);
    if (!formuleFinale) return null;

    return new ProjetActeTranscrit(
      projetActeTranscrit.id ?? "",
      DateRECE.depuisTimestamp(projetActeTranscrit.dateCreation),
      ETypeRedactionActe[projetActeTranscrit.modeCreation],
      projetActeTranscrit.statut,
      DateRECE.depuisTimestamp(projetActeTranscrit.dateStatut),
      projetActeTranscrit.nature,
      DateRECE.depuisDateArrayDTO(projetActeTranscrit.dateDerniereMaj),
      EvenementProjetActeTranscrit.depuisDto(projetActeTranscrit.evenement),
      projetActeTranscrit.titulaires
        .map(TitulaireProjetActeTranscrit.depuisDto)
        .filter((titulaire): titulaire is TitulaireProjetActeTranscrit => titulaire !== null),
      projetActeTranscrit.corpsTexte,
      projetActeTranscrit.analyseMarginales
        .map(AnalyseMarginaleProjetActeTranscrit.depuisDto)
        .filter((analyseMarginale): analyseMarginale is AnalyseMarginaleProjetActeTranscrit => analyseMarginale !== null),
      ETypeActe[projetActeTranscrit.type],
      declarant,
      formuleFinale,
      projetActeTranscrit.acteEtranger
    );
  };
}
