import { IMentionMiseAJourDto } from "@hook/acte/mentions/MiseAJourMentionsApiHook";
import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { TDateArrayDTO } from "@util/DateUtils";
import {
  premiereLettreEnMinuscule,
  SNP,
  SPC,
  supprimeSautDeLigneEtEspaceInutiles,
  triListeObjetsSurDate,
  triListeObjetsSurPropriete
} from "@util/Utils";
import DateRECE from "../../../utils/DateRECE";
import { ChoixDelivrance } from "../../requete/enum/ChoixDelivrance";
import { IPersonneDTO, Personne } from "../commun/Personne";
import { EOrigineActe } from "../enum/EOrigineActe";
import { EStatutActe } from "../enum/EStatutActe";
import { ETypeActe } from "../enum/ETypeActe";
import { ENatureActe } from "../enum/NatureActe";
import { NATIONALITE, NatureMention } from "../enum/NatureMention";
import { ETypeVisibiliteArchiviste } from "../enum/TypeVisibiliteArchiviste";
import { AlerteFicheActe, IAlerteFicheActeDto } from "../fiche/AlerteFicheActe";
import { AnalyseMarginale, IAnalyseMarginaleDto } from "./AnalyseMarginale";
import { DetailMariage, IDetailMariageDto } from "./DetailMariage";
import { ICorpsTexte } from "./ICorpsTexte";
import { IEvenementDto } from "./IEvenement";
import { ICorpsImage } from "./imageActe/ICorpsImage";
import { TypeMention } from "./mention/ITypeMention";
import { IMentionDto, Mention } from "./mention/Mention";
import { IRectificationCorpsExtraitDto, RectificationCorpsExtrait } from "./RectificationCorpsExtrait";
import { IRegistreDto, Registre } from "./Registre";
import { ITitulaireActeDto, TitulaireActe } from "./TitulaireActe";

export interface IFicheActeDto {
  id: string;
  evenement?: IEvenementDto;
  numero?: string;
  numeroBisTer?: string;
  titulaires: ITitulaireActeDto[];
  personnes: IPersonneDTO[];
  estReecrit?: boolean;
  registre: IRegistreDto;
  dateDerniereMaj?: TDateArrayDTO;
  dateDerniereDelivrance?: number;
  nature: keyof typeof ENatureActe;
  visibiliteArchiviste: keyof typeof ETypeVisibiliteArchiviste;
  origine: keyof typeof EOrigineActe;
  type: keyof typeof ETypeActe;
  statut: keyof typeof EStatutActe;
  analyseMarginales: IAnalyseMarginaleDto[];
  corpsExtraitRectifications: IRectificationCorpsExtraitDto[];
  mentions: IMentionDto[];
  alerteActes: IAlerteFicheActeDto[];
  detailMariage?: IDetailMariageDto;
  corpsTexte?: ICorpsTexte;
  corpsImage?: ICorpsImage;
  referenceActe: string;
  referenceRegistreSansNumeroDActe?: string;
}

export class FicheActe {
  private static readonly champsObligatoires: (keyof IFicheActeDto)[] = [
    "id",
    "titulaires",
    "nature",
    "personnes",
    "visibiliteArchiviste",
    "analyseMarginales",
    "type",
    "corpsExtraitRectifications",
    "mentions",
    "referenceActe",
    "origine",
    "statut",
    "registre",
    "alerteActes"
  ];

  private constructor(
    public readonly id: string,
    public readonly referenceActe: string,
    public readonly titulaires: TitulaireActe[],
    public readonly personnes: Personne[],
    public readonly type: keyof typeof ETypeActe,
    public readonly nature: keyof typeof ENatureActe,
    public readonly statut: keyof typeof EStatutActe,
    public readonly origine: keyof typeof EOrigineActe,
    public readonly visibiliteArchiviste: keyof typeof ETypeVisibiliteArchiviste,
    public readonly analysesMarginales: AnalyseMarginale[],
    public readonly rectificationsCorpsExtrait: RectificationCorpsExtrait[],
    public readonly mentions: Mention[],
    public readonly alertes: AlerteFicheActe[],
    public readonly numero: string | null,
    public readonly registre: Registre,
    public readonly dateDerniereMaj: DateRECE | null,
    public readonly dateDerniereDelivrance: DateRECE | null,
    public readonly numeroBisTer: string | null,
    public readonly referenceRegistreSansNumeroDActe: string | null,
    public readonly evenement: IEvenementDto | null,
    public readonly detailMariage: DetailMariage | null,
    public readonly estReecrit: boolean | null,
    public readonly corpsTexte: ICorpsTexte | null,
    public readonly corpsImage: ICorpsImage | null
  ) {}

  public static readonly depuisDto = (ficheActe: IFicheActeDto): FicheActe | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("IFicheActeDto", ficheActe, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IFicheActeDto", ficheActe, "type", ETypeActe):
      case valeurDtoAbsenteDansEnum("IFicheActeDto", ficheActe, "nature", ENatureActe):
      case valeurDtoAbsenteDansEnum("IFicheActeDto", ficheActe, "statut", EStatutActe):
      case valeurDtoAbsenteDansEnum("IFicheActeDto", ficheActe, "origine", EOrigineActe):
      case valeurDtoAbsenteDansEnum("IFicheActeDto", ficheActe, "visibiliteArchiviste", ETypeVisibiliteArchiviste):
        return null;
    }

    const registre = Registre.depuisDto(ficheActe.registre);
    if (!registre) return null;

    return new FicheActe(
      ficheActe.id,
      ficheActe.referenceActe,
      triListeObjetsSurPropriete(
        ficheActe.titulaires.map(TitulaireActe.depuisDto).filter((titulaire): titulaire is TitulaireActe => titulaire !== null),
        "ordre"
      ),
      ficheActe.personnes
        .map(personne => Personne.depuisDto(personne, ficheActe.numero ?? ""))
        .filter((personne): personne is Personne => personne !== null),
      ficheActe.type,
      ficheActe.nature,
      ficheActe.statut,
      ficheActe.origine,
      ficheActe.visibiliteArchiviste,
      ficheActe.analyseMarginales.map(AnalyseMarginale.depuisDto).filter((am): am is AnalyseMarginale => am !== null),
      ficheActe.corpsExtraitRectifications
        .map(RectificationCorpsExtrait.depuisDto)
        .filter((rectification): rectification is RectificationCorpsExtrait => rectification !== null),
      ficheActe.mentions.map(Mention.depuisDto).filter((mention): mention is Mention => mention !== null),
      triListeObjetsSurPropriete(
        ficheActe.alerteActes.map(AlerteFicheActe.depuisDto).filter((alerte): alerte is AlerteFicheActe => alerte !== null),
        "dateCreation"
      ).reverse(),
      ficheActe.numero ?? null,
      registre,
      ficheActe.dateDerniereMaj ? DateRECE.depuisDateArrayDTO(ficheActe.dateDerniereMaj) : null,
      typeof ficheActe.dateDerniereDelivrance === "number" ? DateRECE.depuisTimestamp(ficheActe.dateDerniereDelivrance) : null,
      ficheActe.numeroBisTer ?? null,
      ficheActe.referenceRegistreSansNumeroDActe ?? null,
      ficheActe.evenement ?? null,
      ficheActe.detailMariage ? DetailMariage.depuisDto(ficheActe.detailMariage) : null,
      ficheActe.estReecrit ?? null,
      ficheActe.corpsTexte ?? null,
      ficheActe.corpsImage ?? null
    );
  };

  public readonly getAnalyseMarginaleLaPlusRecente = (): AnalyseMarginale | undefined => {
    if (!this.analysesMarginales.length) return undefined;

    const analysesMarginalesTriees: AnalyseMarginale[] = triListeObjetsSurDate([...this.analysesMarginales], "dateDebut").reverse();

    const analyseMarginaleLaPlusRecente = analysesMarginalesTriees.find(analyseMarginale => !analyseMarginale.dateFin?.estPassee());

    // si toutes les analyses marginales ont une date de fin révolue alors on prend la plus récente
    return analyseMarginaleLaPlusRecente ?? analysesMarginalesTriees[0];
  };

  public readonly getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe = (): TitulaireActe[] => {
    const analyseMarginale = this.getAnalyseMarginaleLaPlusRecente();

    if (!analyseMarginale) return [];

    const titulairesAMs: TitulaireActe[] = [];

    if (analyseMarginale.titulaires[0]) {
      titulairesAMs.push(analyseMarginale.titulaires[0].versTitulaireActe()!);

      titulairesAMs[0].majDeclarationConjointe(this.titulaires[0]);

      titulairesAMs[0].majNomSecable(this.titulaires[0]);
      titulairesAMs[0].majSexeAgeNaissanceEtFiliation(this.titulaires[0]);
    }

    if (analyseMarginale.titulaires[1]) {
      titulairesAMs.push(analyseMarginale.titulaires[1].versTitulaireActe()!);

      if (this.titulaires[1]) {
        titulairesAMs[1].majNomSecable(this.titulaires[1]);
        titulairesAMs[1].majSexeAgeNaissanceEtFiliation(this.titulaires[1]);
      }
    }

    return titulairesAMs;
  };

  public readonly aDonneesLieuOuAnneeEvenementAbsentes = (): boolean =>
    !this.evenement?.annee || (!this.evenement?.lieuReprise && !this.evenement?.ville && !this.evenement?.region && !this.evenement?.pays);

  public readonly estActeTexte = (): boolean => this.type === "TEXTE" || !this.corpsImage;

  public readonly estActeImage = (): boolean =>
    Boolean(this.type === "IMAGE" || (this.corpsImage?.images && this.corpsImage.images.length > 0));

  public readonly estActeImageReecrit = (): boolean => Boolean(this.type === "IMAGE" && this.estReecrit && this.corpsTexte?.texte);

  public readonly estEnErreur = (): boolean => {
    switch (this.nature) {
      case "MARIAGE":
        return (
          this.titulaires[0]?.sexe === this.titulaires[1]?.sexe ||
          this.titulaires.some(titulaire => ["INCONNU", "INDETERMINE"].includes(titulaire.sexe))
        );
      case "NAISSANCE":
      case "DECES":
        return (
          this.titulaires[0].sexe === "INDETERMINE" ||
          this.titulaires[0].parentsSontDeMemeSexe() ||
          this.titulaires[0].aParentDeSexeIndetermine()
        );
      default:
        return false;
    }
  };

  public readonly estIncomplet = (): boolean => {
    switch (this.nature) {
      case "MARIAGE":
        return (
          this.titulaireAnalyseMarginaleLaPlusRecenteANomEtPrenomAbsent() ||
          this.aDonneesLieuOuAnneeEvenementAbsentes() ||
          this.titulaires.some(titulaire => titulaire.sexe === "INCONNU")
        );
      case "NAISSANCE":
      case "DECES":
        return (
          this.titulaireAnalyseMarginaleLaPlusRecenteANomEtPrenomAbsent() ||
          this.aDonneesLieuOuAnneeEvenementAbsentes() ||
          this.titulaires.some(titulaire => titulaire.sexe === "INCONNU") ||
          this.titulaires.some(titulaire => titulaire.aParentDeSexeInconnu())
        );
      default:
        return false;
    }
  };

  public readonly titulaireAnalyseMarginaleLaPlusRecenteANomEtPrenomAbsent = (): boolean => {
    const analyseMarginale = this.getAnalyseMarginaleLaPlusRecente();

    return analyseMarginale
      ? analyseMarginale.titulaires.some(
          titulaire => (!titulaire.nom && titulaire.prenoms.length === 0) || (titulaire.nom === SNP && titulaire.prenoms[0] === SPC)
        )
      : true;
  };

  public readonly necessiteMentionNationalite = (choixDelivrance?: ChoixDelivrance): boolean =>
    this.nature === "NAISSANCE" &&
    ["ACQ", "OP2", "OP3"].includes(this.registre.famille) &&
    (this.estActeTexte || this.estActeImageReecrit()) &&
    !this.mentions.some(mention => mention.typeMention.natureMention?.code === NATIONALITE) &&
    ChoixDelivrance.estAvecFiliation(choixDelivrance);

  public readonly getMentionNationalite = (choixDelivrance?: ChoixDelivrance): IMentionMiseAJourDto[] => {
    if (!this.necessiteMentionNationalite(choixDelivrance)) return [];

    let max = 0;
    this.mentions?.forEach(mention => {
      if (mention.numeroOrdreExtrait) {
        max = max < mention.numeroOrdreExtrait ? mention.numeroOrdreExtrait : max;
      }
    });
    return [
      {
        numeroOrdreExtrait: max + 1,
        textes: {
          texteMentionDelivrance: extraireMentionNationalite(this.corpsTexte?.texte)
        },
        typeMention: {
          idTypeMention: TypeMention.getIdTypeMentionNationalitePourAjoutMentionDelivrance(),
          idNatureMention: NatureMention.depuisCode(NATIONALITE)?.id
        }
      }
    ];
  };

  public readonly getTitulairesPourAnalyseMarginale = () => {
    const nombreDeTitulaires = this.nature === "MARIAGE" ? 2 : 1;

    return [...Array(nombreDeTitulaires).keys()].map(index => this.getTitulairePourAnalyseMarginale(index));
  };

  public readonly getTitulairePourAnalyseMarginale = (indexTitulaire: number) => {
    return this.getAnalyseMarginaleLaPlusRecente()?.titulaires[indexTitulaire]?.versTitulaireActe() ?? this.titulaires[indexTitulaire];
  };
}

const extraireMentionNationalite = (texte?: string): string => {
  if (!texte) return "Nationalite";

  const SOUS_LE_NOM = "sous le nom de";
  const SOUS_L_IDENTITE = "sous l'identité de";

  const regex = (() => {
    switch (true) {
      case texte.indexOf(SOUS_LE_NOM) !== -1:
        return /^(Français par|Française par)[:\s]+(.{1,750}?)sous le nom de[^(]*([^)]*?)$/gm; // NOSONAR catastrophic backtracking. Problème mitigé
      case texte.indexOf(SOUS_L_IDENTITE) !== -1:
        return /^(Français par|Française par)[:\s]+(.{1,750}?)sous l'identité de[^(]*([^)]*?)$/gm; // NOSONAR catastrophic backtracking. Problème mitigé
      default:
        return /^(Français par|Française par)[:\s]+(.{1,750})$/gm;
    }
  })();

  const result = regex.exec(texte);
  const partieMilieu = supprimeSautDeLigneEtEspaceInutiles(premiereLettreEnMinuscule(result?.[2]));
  const entreParenthese = supprimeSautDeLigneEtEspaceInutiles(result?.[3]?.concat(")"));

  return `${result?.[1]} ${partieMilieu} ${entreParenthese}`;
};
