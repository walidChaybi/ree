import { IAccordionReceSection } from "@pages/fiche/FicheUtils";
import { getContentAutorite, getContentLieu, getContentNotaire } from "@pages/fiche/hook/constructionComposants/pacs/FichePacsUtils";
import { getFichesPersonne } from "@pages/fiche/hook/constructionComposants/personne/FichePersonne";
import { getStatuts } from "@pages/fiche/hook/constructionComposants/statut/StatutUtils";
import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import { SectionPartProps } from "@widget/section/SectionPart";
import { AjoutePartAuPanelAreas } from "@widget/section/SectionUtils";
import DateRECE from "../../../utils/DateRECE";
import { IAutorite } from "../commun/IAutorite";
import { IPersonneDTO, Personne } from "../commun/Personne";
import { EStatutPacs } from "../enum/EStatutPacs";
import { IStatutFicheDTO, StatutFiche } from "../fiche/StatutFiche";
import { AnnulationUtils, IAnnulation } from "./IAnnulation";
import { DissolutionUtils, IDissolution } from "./IDissolution";
import { IModification, ModificationUtils } from "./IModification";
import { IPartenaireDTO, Partenaire } from "./Partenaire";

export interface IFichePacsDto {
  id: string;
  annee: string;
  numero: string;
  statut: keyof typeof EStatutPacs;
  autorite: IAutorite;
  annulation: IAnnulation | null;
  dissolution: IDissolution | null;
  modifications: IModification[] | null;
  statutsFiche: IStatutFicheDTO[];
  personnes: IPersonneDTO[];
  partenaires: IPartenaireDTO[];
  paysEnregistrement?: string;
  dateInscription: TDateArrayDTO;
  dateEnregistrementParAutorite: TDateArrayDTO;
  dateDerniereDelivrance?: number;
  dateDerniereMaj?: number;
}

export class FichePacs {
  private static readonly champsObligatoires: (keyof IFichePacsDto)[] = [
    "id",
    "annee",
    "numero",
    "statut",
    "autorite",
    "annulation",
    "dissolution",
    "modifications",
    "statutsFiche",
    "personnes",
    "dateInscription",
    "dateEnregistrementParAutorite",
    "partenaires"
  ];

  private constructor(
    public readonly id: string,
    public readonly numero: string,
    public readonly annee: string,
    public readonly statut: EStatutPacs,
    public readonly autorite: IAutorite,
    public readonly annulation: IAnnulation | null,
    public readonly dissolution: IDissolution | null,
    public readonly modifications: IModification[] | null,
    public readonly statutsFiche: StatutFiche[],
    public readonly personnes: Personne[],
    public readonly partenaires: Partenaire[],
    public readonly dateInscription: Date,
    public readonly dateEnregistrementParAutorite: Date,
    public readonly dateDerniereDelivrance: DateRECE | null,
    public readonly dateDerniereMaj: DateRECE | null
  ) {}

  public static readonly depuisDto = (fichePacs: IFichePacsDto): FichePacs | null => {
    switch (true) {
      case FichePacs.champsObligatoires.some(cle => fichePacs[cle] === undefined):
        console.error(`Un champ obligatoire d'un FichePacs n'est pas défini.`);
        return null;
      case !Object.keys(EStatutPacs).includes(fichePacs.statut):
        console.error(
          `Le statut d'un FichePacs a la valeur ${fichePacs.statut} au lieu d'une des suivantes : ${Object.keys(EStatutPacs)}.`
        );
        return null;
    }

    return new FichePacs(
      fichePacs.id,
      fichePacs.numero,
      fichePacs.annee,
      EStatutPacs[fichePacs.statut],
      fichePacs.autorite,
      fichePacs.annulation,
      fichePacs.dissolution,
      fichePacs.modifications,
      fichePacs.statutsFiche
        .map<StatutFiche | null>(StatutFiche.depuisDto)
        .filter((statutFiche): statutFiche is StatutFiche => statutFiche !== null),
      fichePacs.personnes
        .map<Personne | null>(personne => Personne.depuisDto(personne))
        .filter((personne: Personne | null): personne is Personne => personne !== null),
      fichePacs.partenaires.map(Partenaire.depuisDto).filter((partenaire): partenaire is Partenaire => partenaire !== null),
      DateUtils.getDateDepuisDateArrayDto(fichePacs.dateInscription),
      DateUtils.getDateDepuisDateArrayDto(fichePacs.dateEnregistrementParAutorite),
      fichePacs.dateDerniereDelivrance ? DateRECE.depuisTimestamp(fichePacs.dateDerniereDelivrance) : null,
      fichePacs.dateDerniereMaj ? DateRECE.depuisTimestamp(fichePacs.dateDerniereMaj) : null
    );
  };

  get commePanelAccordionReceSection(): IAccordionReceSection {
    const panelAreas: SectionPanelAreaProps[] = [];

    const deuxColonnes = 2;

    AjoutePartAuPanelAreas(
      panelAreas,
      this,
      this.getInscriptionRegistrePacs,
      "1",
      "Inscription au registre des PACS des étrangers nés à l'étranger",
      1
    );

    AjoutePartAuPanelAreas(panelAreas, this.partenaires, Partenaire.commeTableauSectionPartProps, "2", "", deuxColonnes);
    AjoutePartAuPanelAreas(panelAreas, this, this.getEnregistrementPacs, "3", "Enregistrement du PACS", deuxColonnes);
    if (this.modifications) {
      AjoutePartAuPanelAreas(
        panelAreas,
        this.modifications[0],
        ModificationUtils.commeSectionPartProps,
        "4",
        "Modification du PACS",
        deuxColonnes
      );
    }
    AjoutePartAuPanelAreas(panelAreas, this.dissolution, DissolutionUtils.commeSectionPartProps, "5", "Dissolution du PACS", deuxColonnes);
    AjoutePartAuPanelAreas(panelAreas, this.annulation, AnnulationUtils.commeSectionPartProps, "6", "Annulation du PACS", deuxColonnes);

    panelAreas.push({
      parts: getStatuts(this.statutsFiche),
      title: "Historique des statuts de la fiche"
    });

    const fichesPersonne: SectionPanelProps[] = getFichesPersonne(this.personnes);

    return {
      panels: [
        {
          panelAreas,
          title: "Visualisation du PACS"
        },
        ...fichesPersonne
      ]
    };
  }

  private readonly getInscriptionRegistrePacs = (): SectionPartProps[] => {
    const part: SectionPartProps = {
      partContent: {
        title: "",
        contents: [
          {
            libelle: "Statut du PACS",
            value: this.statut
          },
          {
            libelle: "Date d'enregistrement (par l'autorité)",
            value: DateUtils.getDateString(this.dateEnregistrementParAutorite)
          },

          {
            libelle: "Date d'inscription au registre",
            value: DateUtils.getDateString(this.dateInscription)
          }
        ]
      }
    };
    return [part];
  };

  private readonly getEnregistrementPacs = (): SectionPartProps[] => {
    const part1: SectionPartProps = {
      partContent: {
        contents: [
          getContentAutorite(this.autorite),
          ...getContentNotaire(this.autorite),
          {
            libelle: "Date",
            value: DateUtils.getDateString(this.dateEnregistrementParAutorite)
          }
        ]
      }
    };

    const part2: SectionPartProps = {
      partContent: {
        title: "",
        contents: getContentLieu(this.autorite)
      }
    };

    return [part1, part2];
  };
}
